import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { RAZORPAY_CONFIG } from './razorpay.config'
import {
  CreatePaymentOrderInput,
  CreateRefundInput,
  RazorpayOrder,
  RazorpayPayment,
  RazorpayRefund,
  VerifyPaymentInput,
} from './razorpay.types'

class RazorpayClient {
  private client: Razorpay

  constructor() {
    this.client = new Razorpay({
      key_id: RAZORPAY_CONFIG.keyId,
      key_secret: RAZORPAY_CONFIG.keySecret,
    })
  }

  /**
   * Create payment order
   */
  async createOrder(input: CreatePaymentOrderInput): Promise<RazorpayOrder> {
    try {
      logger.info(`Creating Razorpay order: ${input.receipt}`)

      const order = await this.client.orders.create({
        amount: input.amount,
        currency: input.currency || RAZORPAY_CONFIG.currency,
        receipt: input.receipt,
        notes: input.notes || {},
      })

      logger.info(`Razorpay order created: ${order.id}`)
      return order as any // ✅ No type assertion needed
    } catch (error: any) {
      logger.error('Failed to create Razorpay order:', error)
      throw new AppError(
        error.error?.description || 'Failed to create payment order',
        error.statusCode || 500
      )
    }
  }

  /**
   * Verify payment signature
   */
  verifyPaymentSignature(input: VerifyPaymentInput): boolean {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = input

      // Generate expected signature
      const text = `${razorpay_order_id}|${razorpay_payment_id}`
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_CONFIG.keySecret)
        .update(text)
        .digest('hex')

      // Compare signatures
      const isValid = expectedSignature === razorpay_signature

      if (isValid) {
        logger.info(`Payment signature verified: ${razorpay_payment_id}`)
      } else {
        logger.error(`Invalid payment signature: ${razorpay_payment_id}`)
      }

      return isValid
    } catch (error) {
      logger.error('Failed to verify payment signature:', error)
      return false
    }
  }

  /**
   * Get payment details
   */
  async getPayment(paymentId: string): Promise<RazorpayPayment> {
    try {
      logger.info(`Fetching payment details: ${paymentId}`)

      const payment = await this.client.payments.fetch(paymentId)

      return payment as RazorpayPayment
    } catch (error: any) {
      logger.error(`Failed to fetch payment ${paymentId}:`, error)
      throw new AppError(
        error.error?.description || 'Failed to fetch payment details',
        error.statusCode || 500
      )
    }
  }

  /**
   * Capture payment (for authorized payments)
   */
  async capturePayment(paymentId: string, amount: number): Promise<RazorpayPayment> {
    try {
      logger.info(`Capturing payment: ${paymentId}`)

      const payment = await this.client.payments.capture(
        paymentId,
        amount,
        RAZORPAY_CONFIG.currency
      )

      logger.info(`Payment captured: ${paymentId}`)
      return payment as RazorpayPayment
    } catch (error: any) {
      logger.error(`Failed to capture payment ${paymentId}:`, error)
      throw new AppError(
        error.error?.description || 'Failed to capture payment',
        error.statusCode || 500
      )
    }
  }

  /**
   * Create refund
   */
  async createRefund(input: CreateRefundInput): Promise<RazorpayRefund> {
    try {
      logger.info(`Creating refund for payment: ${input.paymentId}`)

      const refundData: any = {
        notes: input.notes || {},
      }

      if (input.amount) {
        refundData.amount = input.amount
      }

      const refund = await this.client.payments.refund(input.paymentId, refundData)

      logger.info(`Refund created: ${refund.id}`)
      return refund as RazorpayRefund
    } catch (error: any) {
      logger.error(`Failed to create refund for ${input.paymentId}:`, error)
      throw new AppError(
        error.error?.description || 'Failed to create refund',
        error.statusCode || 500
      )
    }
  }

  /**
   * Get refund details
   */
  async getRefund(refundId: string): Promise<RazorpayRefund> {
    try {
      logger.info(`Fetching refund details: ${refundId}`)

      const refund = await this.client.refunds.fetch(refundId)

      return refund as RazorpayRefund
    } catch (error: any) {
      logger.error(`Failed to fetch refund ${refundId}:`, error)
      throw new AppError(
        error.error?.description || 'Failed to fetch refund details',
        error.statusCode || 500
      )
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_CONFIG.webhookSecret)
        .update(payload)
        .digest('hex')

      const isValid = expectedSignature === signature

      if (isValid) {
        logger.info('Webhook signature verified')
      } else {
        logger.error('Invalid webhook signature')
      }

      return isValid
    } catch (error) {
      logger.error('Failed to verify webhook signature:', error)
      return false
    }
  }
}

// Singleton instance
export const razorpayClient = new RazorpayClient()
