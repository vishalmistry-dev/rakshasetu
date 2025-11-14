// Payment Order
export interface CreatePaymentOrderInput {
  amount: number // in paise (₹100 = 10000 paise)
  currency?: string
  receipt: string
  notes?: Record<string, string>
}

export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  notes: Record<string, any>
  created_at: number
}

// Payment Verification
export interface VerifyPaymentInput {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

// Payment Details
export interface RazorpayPayment {
  id: string
  entity: string
  amount: number
  currency: string
  status: string
  order_id: string
  method: string
  amount_refunded: number
  refund_status: string | null
  captured: boolean
  description: string
  email: string
  contact: string
  notes: Record<string, any>
  fee: number
  tax: number
  error_code: string | null
  error_description: string | null
  created_at: number
  [key: string]: any // Allow additional fields
}

// Refund
export interface CreateRefundInput {
  paymentId: string
  amount?: number // Full refund if not provided
  notes?: Record<string, string>
}

export interface RazorpayRefund {
  id: string
  entity: string
  amount: number
  currency: string
  payment_id: string
  notes: Record<string, any>
  receipt: string | null
  acquirer_data: Record<string, any>
  created_at: number
  batch_id: string | null
  status: string
  speed_processed: string
  [key: string]: any // Allow additional fields
}

// Webhook
export interface RazorpayWebhookPayload {
  entity: string
  account_id: string
  event: string
  contains: string[]
  payload: {
    payment?: {
      entity: RazorpayPayment
    }
    order?: {
      entity: RazorpayOrder
    }
    refund?: {
      entity: RazorpayRefund
    }
  }
  created_at: number
}
