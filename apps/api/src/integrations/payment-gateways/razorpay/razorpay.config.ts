import { ENV } from '@/config'

export const RAZORPAY_CONFIG = {
  keyId: ENV.RAZORPAY_KEY_ID,
  keySecret: ENV.RAZORPAY_KEY_SECRET,
  webhookSecret: ENV.RAZORPAY_WEBHOOK_SECRET,
  baseURL: ENV.RAZORPAY_BASE_URL,

  // Payment options
  currency: 'INR',

  // Webhook events
  webhookEvents: {
    PAYMENT_AUTHORIZED: 'payment.authorized',
    PAYMENT_CAPTURED: 'payment.captured',
    PAYMENT_FAILED: 'payment.failed',
    ORDER_PAID: 'order.paid',
    REFUND_CREATED: 'refund.created',
    REFUND_PROCESSED: 'refund.processed',
  },
}
