import { z } from 'zod'

export const createPaymentOrderSchema = z.object({
  orderGroupId: z.string().min(1, 'Order group ID is required'),
  amount: z.number().positive('Amount must be positive'),
})

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, 'Razorpay order ID is required'),
  razorpay_payment_id: z.string().min(1, 'Razorpay payment ID is required'),
  razorpay_signature: z.string().min(1, 'Razorpay signature is required'),
})

export const capturePaymentSchema = z.object({
  amount: z.number().positive().optional(),
})

export const createRefundSchema = z.object({
  amount: z.number().positive().optional(),
  reason: z.string().optional(),
})

export type CreatePaymentOrderInput = z.infer<typeof createPaymentOrderSchema>
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>
export type CapturePaymentInput = z.infer<typeof capturePaymentSchema>
export type CreateRefundInput = z.infer<typeof createRefundSchema>
