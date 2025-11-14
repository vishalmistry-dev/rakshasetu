import { ORDER_STATUS } from '@rakshasetu/database'
import { z } from 'zod'

export const listOrdersQuerySchema = z.object({
  storeId: z.string().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20)),
})

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(ORDER_STATUS),
})

export type ListOrdersQuery = z.infer<typeof listOrdersQuerySchema>
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>
