import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'
import { ORDER_STATUS, PAYMENT_STATUS } from '@rakshasetu/database'
import { Request } from 'express'
import Razorpay from 'razorpay'
import { EscrowService } from '../../../core/escrow/escrow.service'
import { razorpayClient } from './razorpay.client'
import { RazorpayWebhookPayload } from './razorpay.types'

const escrowService = new EscrowService(prisma)

// Initialize Razorpay for auto-capture
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const handleRazorpayWebhook = async (req: Request) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string
    const payload = JSON.stringify(req.body)

    // Verify webhook signature
    const isValid = razorpayClient.verifyWebhookSignature(payload, signature)

    if (!isValid) {
      logger.error('Invalid webhook signature')
      return { success: false, message: 'Invalid signature' }
    }

    const webhookData: RazorpayWebhookPayload = req.body

    logger.info(`Razorpay webhook received: ${webhookData.event}`)

    // Handle different events
    switch (webhookData.event) {
      case 'payment.authorized':
        await handlePaymentAuthorized(webhookData)
        break

      case 'payment.captured':
        await handlePaymentCaptured(webhookData)
        break

      case 'payment.failed':
        await handlePaymentFailed(webhookData)
        break

      case 'refund.processed':
        await handleRefundProcessed(webhookData)
        break

      default:
        logger.info(`Unhandled webhook event: ${webhookData.event}`)
    }

    return { success: true, message: 'Webhook processed' }
  } catch (error) {
    logger.error('Webhook processing failed:', error)
    throw error
  }
}

// ============================================
// NEW: Handle payment authorized - Auto-capture
// ============================================
async function handlePaymentAuthorized(data: RazorpayWebhookPayload) {
  const razorpayPayment = data.payload.payment?.entity

  if (!razorpayPayment) return

  try {
    logger.info(`Auto-capturing payment: ${razorpayPayment.id}`)

    // Auto-capture using Razorpay SDK
    await razorpay.payments.capture(razorpayPayment.id, razorpayPayment.amount, 'INR')

    logger.info(`Payment auto-captured: ${razorpayPayment.id}`)
  } catch (error) {
    logger.error(`Auto-capture failed for ${razorpayPayment.id}:`, error)
  }
}

// ============================================
// UPDATED: Handle payment captured + Escrow
// ============================================
async function handlePaymentCaptured(data: RazorpayWebhookPayload) {
  const razorpayPayment = data.payload.payment?.entity

  if (!razorpayPayment) return

  const payment = await prisma.shopPayment.findFirst({
    where: {
      razorpayPaymentId: razorpayPayment.id,
    },
  })

  if (!payment) {
    logger.error(`Payment not found: ${razorpayPayment.id}`)
    return
  }

  // Update payment status
  await prisma.shopPayment.update({
    where: { id: payment.id },
    data: {
      status: PAYMENT_STATUS.CAPTURED,
      paidAt: new Date(),
    },
  })

  // Get all orders in this order group
  const orders = await prisma.shopOrder.findMany({
    where: {
      shopOrderGroupId: payment.orderGroupId,
    },
    include: {
      transaction: true,
    },
  })

  // Update all orders status
  await prisma.shopOrder.updateMany({
    where: {
      shopOrderGroupId: payment.orderGroupId,
    },
    data: {
      status: ORDER_STATUS.PAYMENT_RECEIVED,
      financialStatus: PAYMENT_STATUS.CAPTURED,
    },
  })

  // **NEW: Initiate escrow for each PREPAID order**
  for (const order of orders) {
    if (!order.isEscrowed && order.paymentType === 'PREPAID') {
      try {
        logger.info(`Initiating escrow for order: ${order.id}`)

        // Initiate escrow
        await escrowService.initiateEscrow({
          orderId: order.id,
          amount: order.totalPrice,
          paymentMethod: 'PREPAID',
          merchantId: order.merchantId,
          customerId: order.customerId || undefined,
          metadata: {
            razorpayPaymentId: razorpayPayment.id,
          },
        })

        // Get updated order with transaction
        const updatedOrder = await prisma.shopOrder.findUnique({
          where: { id: order.id },
          include: { transaction: true },
        })

        // Move to HELD status
        if (updatedOrder?.transaction) {
          await escrowService.holdEscrow(updatedOrder.transaction.id)
        }

        logger.info(`Escrow initiated and held for order: ${order.id}`)
      } catch (error) {
        logger.error(`Escrow initiation failed for order ${order.id}:`, error)
      }
    }
  }

  logger.info(`Payment captured via webhook: ${razorpayPayment.id}`)
}

// Handle payment failed
async function handlePaymentFailed(data: RazorpayWebhookPayload) {
  const razorpayPayment = data.payload.payment?.entity

  if (!razorpayPayment) return

  const payment = await prisma.shopPayment.findFirst({
    where: {
      razorpayPaymentId: razorpayPayment.id,
    },
  })

  if (!payment) {
    logger.error(`Payment not found: ${razorpayPayment.id}`)
    return
  }

  await prisma.shopPayment.update({
    where: { id: payment.id },
    data: {
      status: PAYMENT_STATUS.FAILED,
      errorCode: razorpayPayment.error_code || undefined,
      errorMessage: razorpayPayment.error_description || undefined,
    },
  })

  // Cancel all orders in the group
  await prisma.shopOrder.updateMany({
    where: {
      shopOrderGroupId: payment.orderGroupId,
    },
    data: {
      status: ORDER_STATUS.CANCELLED,
      financialStatus: PAYMENT_STATUS.FAILED,
    },
  })

  logger.info(`Payment failed via webhook: ${razorpayPayment.id}`)
}

// ============================================
// Handle refund processed
// ============================================
async function handleRefundProcessed(data: RazorpayWebhookPayload) {
  const refund = data.payload.refund?.entity

  if (!refund) return

  try {
    // Find payment
    const payment = await prisma.shopPayment.findFirst({
      where: { razorpayPaymentId: refund.payment_id },
    })

    if (!payment) {
      logger.error(`Payment not found for refund: ${refund.id}`)
      return
    }

    // Update payment status
    await prisma.shopPayment.update({
      where: { id: payment.id },
      data: {
        status: PAYMENT_STATUS.REFUNDED,
      },
    })

    // Get all orders and update their refunds
    const orders = await prisma.shopOrder.findMany({
      where: {
        shopOrderGroupId: payment.orderGroupId,
      },
    })

    for (const order of orders) {
      // Find or create refund
      const existingRefund = await prisma.shopRefund.findFirst({
        where: { orderId: order.id },
      })

      if (existingRefund) {
        // Update existing refund
        await prisma.shopRefund.update({
          where: { id: existingRefund.id },
          data: {
            status: 'PROCESSED',
            refundedAt: new Date(),
            notes: refund.notes?.reason || 'Refund processed',
          },
        })
      } else {
        // Create new refund record
        await prisma.shopRefund.create({
          data: {
            id: `refund_${Date.now()}_${order.id}`,
            orderId: order.id,
            amount: refund.amount / 100,
            refundMethod: 'RAZORPAY',
            status: 'PROCESSED',
            refundedAt: new Date(),
            notes: refund.notes?.reason || 'Refund processed',
          },
        })
      }

      // Update order status
      await prisma.shopOrder.update({
        where: { id: order.id },
        data: {
          status: ORDER_STATUS.REFUND_COMPLETED,
          escrowStatus: 'REFUNDED',
        },
      })
    }

    logger.info(`Refund processed webhook: ${refund.id}`)
  } catch (error) {
    logger.error(`Refund processed handler failed:`, error)
  }
}
