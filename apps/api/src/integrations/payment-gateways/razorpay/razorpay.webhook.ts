import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'
import { Request } from 'express'
import { razorpayClient } from './razorpay.client'
import { RazorpayWebhookPayload } from './razorpay.types'

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

// Handle payment captured
async function handlePaymentCaptured(data: RazorpayWebhookPayload) {
  const razorpayPayment = data.payload.payment?.entity

  if (!razorpayPayment) return

  const payment = await prisma.shopPayment.findFirst({
    where: {
      razorpayPaymentId: razorpayPayment.id,
    },
  })

  if (payment) {
    await prisma.shopPayment.update({
      where: { id: payment.id },
      data: {
        status: 'CAPTURED',
        paidAt: new Date(),
      },
    })

    // Update orders
    await prisma.shopOrder.updateMany({
      where: {
        shopOrderGroupId: payment.orderGroupId,
      },
      data: {
        status: 'PAYMENT_RECEIVED',
        financialStatus: 'CAPTURED',
      },
    })

    logger.info(`Payment captured via webhook: ${razorpayPayment.id}`)
  }
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

  if (payment) {
    await prisma.shopPayment.update({
      where: { id: payment.id },
      data: {
        status: 'FAILED',
        errorCode: razorpayPayment.error_code || undefined,
        errorMessage: razorpayPayment.error_description || undefined,
      },
    })

    logger.info(`Payment failed via webhook: ${razorpayPayment.id}`)
  }
}

// Handle refund processed
async function handleRefundProcessed(data: RazorpayWebhookPayload) {
  const refund = data.payload.refund?.entity

  if (!refund) return

  logger.info(`Refund processed webhook received: ${refund.id}`)
}
