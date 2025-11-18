import { ESCROW_STATUS, PAYMENT_METHOD } from '@rakshasetu/database'
import { z } from 'zod'

// ============================================
// ZOD SCHEMAS
// ============================================

export const InitiateEscrowSchema = z.object({
  orderId: z.string().uuid(),
  amount: z.number().positive(),
  paymentMethod: z.nativeEnum(PAYMENT_METHOD),
  merchantId: z.string().uuid(),
  customerId: z.string().uuid().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
})

export const ReleaseEscrowSchema = z.object({
  escrowId: z.string().uuid(),
  reason: z.string().optional(),
  releaseAmount: z.number().positive().optional(),
})

export const RefundEscrowSchema = z.object({
  escrowId: z.string().uuid(),
  reason: z.string(),
  refundAmount: z.number().positive().optional(),
})

export const EscrowQuerySchema = z.object({
  merchantId: z.string().uuid().optional(),
  status: z.nativeEnum(ESCROW_STATUS).optional(),
  paymentMethod: z.nativeEnum(PAYMENT_METHOD).optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

// ============================================
// TYPESCRIPT TYPES
// ============================================

export type InitiateEscrowInput = z.infer<typeof InitiateEscrowSchema>
export type ReleaseEscrowInput = z.infer<typeof ReleaseEscrowSchema>
export type RefundEscrowInput = z.infer<typeof RefundEscrowSchema>
export type EscrowQuery = z.infer<typeof EscrowQuerySchema>
