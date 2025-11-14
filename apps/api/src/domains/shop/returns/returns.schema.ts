import { RETURN_REASON, RETURN_STATUS } from '@rakshasetu/database'
import { z } from 'zod'

// ============================================
// ZOD SCHEMAS
// ============================================

export const CreateReturnRequestSchema = z.object({
  orderId: z.string().uuid(),
  itemId: z.string().uuid(),
  reason: z.nativeEnum(RETURN_REASON),
  description: z.string().min(10).max(500).optional(),
  images: z.array(z.string().url()).max(5).optional(),
  refundAmount: z.number().positive().optional(),
})

export const ApproveReturnSchema = z.object({
  returnId: z.string().uuid(),
  approvalNote: z.string().max(500).optional(),
  refundAmount: z.number().positive().optional(),
})

export const RejectReturnSchema = z.object({
  returnId: z.string().uuid(),
  rejectionReason: z.string().min(10).max(500),
})

export const SchedulePickupSchema = z.object({
  returnId: z.string().uuid(),
  pickupDate: z.string().datetime(),
  pickupAddress: z.object({
    name: z.string(),
    phone: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
  }),
  courierCode: z.string().optional(),
})

export const ReturnQuerySchema = z.object({
  merchantId: z.string().uuid().optional(),
  orderId: z.string().uuid().optional(),
  status: z.nativeEnum(RETURN_STATUS).optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

// ============================================
// TYPESCRIPT TYPES
// ============================================

export type CreateReturnRequestInput = z.infer<typeof CreateReturnRequestSchema>
export type ApproveReturnInput = z.infer<typeof ApproveReturnSchema>
export type RejectReturnInput = z.infer<typeof RejectReturnSchema>
export type SchedulePickupInput = z.infer<typeof SchedulePickupSchema>
export type ReturnQuery = z.infer<typeof ReturnQuerySchema>
