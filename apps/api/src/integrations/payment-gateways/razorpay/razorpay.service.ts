import { AppError } from '@/common/errors'
import { generateUniqueId, logger } from '@/common/utils'
import { prisma } from '@/config/prisma'
import { razorpayClient } from './razorpay.client'
import { RAZORPAY_CONFIG } from './razorpay.config'

// ========================== CREATE PAYMENT ORDER ==========================
export const createPaymentOrder = async (data: {
  orderGroupId: string
  amount: number // in rupees
  customerEmail?: string
  customerPhone?: string
  merchantId: string
}) => {
  try {
    // Get order group details
    const orderGroup = await prisma.shopOrderGroup.findUnique({
      where: { id: data.orderGroupId },
      include: {
        orders: true,
      },
    })

    if (!orderGroup) {
      throw new AppError('Order group not found', 404)
    }

    // Convert amount to paise
    const amountInPaise = Math.round(data.amount * 100)

    // Create Razorpay order
    const razorpayOrder = await razorpayClient.createOrder({
      amount: amountInPaise,
      currency: 'INR',
      receipt: data.orderGroupId,
      notes: {
        order_group_id: data.orderGroupId,
        merchant_id: data.merchantId,
      },
    })

    // Create payment record
    const paymentId = await generateUniqueId('pay', 'shopPayment')

    const payment = await prisma.shopPayment.create({
      data: {
        id: paymentId,
        orderGroupId: data.orderGroupId,
        merchantId: data.merchantId,
        amount: data.amount,
        currency: 'INR',
        method: 'PREPAID',
        status: 'INITIATED',
        source: 'SHOP',
        razorpayOrderId: razorpayOrder.id,
      },
    })

    logger.info(`Payment order created: ${razorpayOrder.id}`)

    return {
      paymentId: payment.id,
      razorpayOrderId: razorpayOrder.id,
      amount: data.amount,
      currency: 'INR',
      keyId: RAZORPAY_CONFIG.keyId,
    }
  } catch (error) {
    logger.error('Failed to create payment order:', error)
    throw error
  }
}

// ========================== VERIFY PAYMENT ==========================
export const verifyPayment = async (data: {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}) => {
  try {
    // Verify signature
    const isValid = razorpayClient.verifyPaymentSignature(data)

    if (!isValid) {
      throw new AppError('Invalid payment signature', 400)
    }

    // Get payment by Razorpay order ID
    const payment = await prisma.shopPayment.findFirst({
      where: {
        razorpayOrderId: data.razorpay_order_id,
      },
      include: {
        shopOrderGroup: {
          include: {
            orders: true,
          },
        },
      },
    })

    if (!payment) {
      throw new AppError('Payment not found', 404)
    }

    // Get payment details from Razorpay
    const razorpayPayment = await razorpayClient.getPayment(data.razorpay_payment_id)

    // Update payment
    await prisma.shopPayment.update({
      where: { id: payment.id },
      data: {
        razorpayPaymentId: razorpayPayment.id,
        status: razorpayPayment.captured ? 'CAPTURED' : 'AUTHORIZED',
        paidAt: razorpayPayment.captured ? new Date() : null,
        metadata: {
          razorpayPayment,
        },
      },
    })

    // Update all orders in group
    if (razorpayPayment.captured) {
      await prisma.shopOrder.updateMany({
        where: {
          shopOrderGroupId: payment.orderGroupId,
        },
        data: {
          status: 'PAYMENT_RECEIVED',
          financialStatus: 'CAPTURED',
          paymentType: 'PREPAID',
        },
      })

      logger.info(`Payment verified for order group: ${payment.orderGroupId}`)
    }

    return {
      success: true,
      paymentId: payment.id,
      razorpayPaymentId: razorpayPayment.id,
      status: razorpayPayment.status,
      captured: razorpayPayment.captured,
    }
  } catch (error) {
    logger.error('Payment verification failed:', error)
    throw error
  }
}

// ========================== CAPTURE PAYMENT ==========================
export const capturePayment = async (data: { paymentId: string; amount?: number }) => {
  try {
    // Get payment
    const payment = await prisma.shopPayment.findUnique({
      where: { id: data.paymentId },
    })

    if (!payment || !payment.razorpayPaymentId) {
      throw new AppError('Payment not found', 404)
    }

    // Calculate amount in paise
    const amountInPaise = data.amount
      ? Math.round(data.amount * 100)
      : Math.round(payment.amount * 100)

    // Capture payment
    const razorpayPayment = await razorpayClient.capturePayment(
      payment.razorpayPaymentId,
      amountInPaise
    )

    // Update payment
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

    logger.info(`Payment captured: ${payment.razorpayPaymentId}`)

    return {
      success: true,
      paymentId: payment.id,
      amount: razorpayPayment.amount / 100,
    }
  } catch (error) {
    logger.error('Failed to capture payment:', error)
    throw error
  }
}

// ========================== CREATE REFUND ==========================
export const createRefund = async (data: {
  paymentId: string
  amount?: number // Partial refund amount (in rupees)
  reason?: string
}) => {
  try {
    // Get payment
    const payment = await prisma.shopPayment.findUnique({
      where: { id: data.paymentId },
    })

    if (!payment) {
      throw new AppError('Payment not found', 404)
    }

    if (payment.status !== 'CAPTURED') {
      throw new AppError('Can only refund captured payments', 400)
    }

    if (!payment.razorpayPaymentId) {
      throw new AppError('Razorpay payment ID not found', 400)
    }

    // Calculate refund amount
    const refundAmount = data.amount ? Math.round(data.amount * 100) : undefined // Full refund if not specified

    // Create refund
    const refund = await razorpayClient.createRefund({
      paymentId: payment.razorpayPaymentId,
      amount: refundAmount,
      notes: {
        payment_id: payment.id,
        order_group_id: payment.orderGroupId,
        reason: data.reason || 'Customer requested refund',
      },
    })

    // Update payment status
    const isFullRefund = !refundAmount || refundAmount >= payment.amount * 100

    await prisma.shopPayment.update({
      where: { id: payment.id },
      data: {
        status: isFullRefund ? 'REFUNDED' : 'PARTIALLY_REFUNDED',
      },
    })

    logger.info(`Refund created: ${refund.id}`)

    return {
      success: true,
      refundId: refund.id,
      amount: refund.amount / 100,
      status: refund.status,
    }
  } catch (error) {
    logger.error('Failed to create refund:', error)
    throw error
  }
}

// ========================== GET PAYMENT STATUS ==========================
export const getPaymentStatus = async (paymentId: string) => {
  try {
    const payment = await prisma.shopPayment.findUnique({
      where: { id: paymentId },
      include: {
        shopOrderGroup: {
          select: {
            id: true,
            orders: {
              select: {
                id: true,
                name: true,
                totalPrice: true,
                status: true,
              },
            },
          },
        },
      },
    })

    if (!payment) {
      throw new AppError('Payment not found', 404)
    }

    // If Razorpay payment ID exists, fetch latest status
    if (payment.razorpayPaymentId) {
      try {
        const razorpayPayment = await razorpayClient.getPayment(payment.razorpayPaymentId)

        // Update payment if status changed
        const newStatus = razorpayPayment.captured
          ? 'CAPTURED'
          : razorpayPayment.status.toUpperCase()

        if (newStatus !== payment.status) {
          await prisma.shopPayment.update({
            where: { id: payment.id },
            data: {
              status: newStatus as any,
            },
          })
        }

        return {
          paymentId: payment.id,
          orderGroupId: payment.orderGroupId,
          amount: payment.amount,
          status: razorpayPayment.status,
          captured: razorpayPayment.captured,
          method: razorpayPayment.method,
          createdAt: payment.createdAt,
        }
      } catch (error) {
        logger.warn('Failed to fetch payment from Razorpay, using local data')
      }
    }

    return {
      paymentId: payment.id,
      orderGroupId: payment.orderGroupId,
      amount: payment.amount,
      status: payment.status,
      method: payment.method,
      createdAt: payment.createdAt,
    }
  } catch (error) {
    logger.error('Failed to get payment status:', error)
    throw error
  }
}
