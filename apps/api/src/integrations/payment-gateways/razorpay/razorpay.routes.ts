import { bodySchema, validateRequest } from '@/common/utils'
import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  capturePayment,
  createPaymentOrder,
  createRefund,
  getPaymentStatus,
  handleWebhook,
  verifyPayment,
} from './razorpay.controller'
import {
  capturePaymentSchema,
  createPaymentOrderSchema,
  createRefundSchema,
  verifyPaymentSchema,
} from './razorpay.schema'

const router = Router()

// Webhook (no auth required - Razorpay will call this)
router.post('/webhook', handleWebhook)

// Protected routes (require merchant authentication)
router.use(authenticateMerchant)

// Create payment order
router.post('/orders', validateRequest(bodySchema(createPaymentOrderSchema)), createPaymentOrder)

// Verify payment
router.post('/verify', validateRequest(bodySchema(verifyPaymentSchema)), verifyPayment)

// Capture payment
router.post(
  '/payments/:paymentId/capture',
  validateRequest(bodySchema(capturePaymentSchema)),
  capturePayment
)

// Create refund
router.post(
  '/payments/:paymentId/refund',
  validateRequest(bodySchema(createRefundSchema)),
  createRefund
)

// Get payment status
router.get('/payments/:paymentId/status', getPaymentStatus)

export default router
