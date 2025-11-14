import { asyncHandler, sendResponse } from '@/common/utils'
import * as razorpayService from './razorpay.service'

// Create payment order
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { orderGroupId, amount } = req.body

  const result = await razorpayService.createPaymentOrder({
    orderGroupId,
    amount,
    merchantId,
  })

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Payment order created successfully',
    data: result,
  })
})

// Verify payment
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  const result = await razorpayService.verifyPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment verified successfully',
    data: result,
  })
})

// Capture payment
export const capturePayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params
  const { amount } = req.body

  const result = await razorpayService.capturePayment({
    paymentId,
    amount,
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment captured successfully',
    data: result,
  })
})

// Create refund
export const createRefund = asyncHandler(async (req, res) => {
  const { paymentId } = req.params
  const { amount, reason } = req.body

  const result = await razorpayService.createRefund({
    paymentId,
    amount,
    reason,
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Refund created successfully',
    data: result,
  })
})

// Get payment status
export const getPaymentStatus = asyncHandler(async (req, res) => {
  const { paymentId } = req.params

  const result = await razorpayService.getPaymentStatus(paymentId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment status retrieved successfully',
    data: result,
  })
})

// Handle webhook
export const handleWebhook = asyncHandler(async (req, res) => {
  const { handleRazorpayWebhook } = await import('./razorpay.webhook')

  const result = await handleRazorpayWebhook(req)

  sendResponse(res, {
    statusCode: 200,
    success: result.success,
    message: result.message,
  })
})
