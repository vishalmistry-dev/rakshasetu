import { z } from 'zod'

export const listProductsQuerySchema = z.object({
  storeId: z.string().optional(),
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

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>
