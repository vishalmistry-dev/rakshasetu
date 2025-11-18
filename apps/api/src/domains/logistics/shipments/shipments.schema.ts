import { z } from 'zod'

export const createShipmentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  courierProvider: z.enum(['bluedart', 'delhivery']).optional(),

  consigneeName: z.string().min(1, 'Consignee name is required'),
  consigneePhone: z.string().min(10, 'Valid phone number required'),
  consigneeEmail: z.string().email().optional(),
  consigneeAddress: z.object({
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().min(6).max(6, 'Valid 6-digit pincode required'),
    landmark: z.string().optional(),
  }),

  weight: z.number().positive('Weight must be positive'),
  dimensions: z
    .object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    })
    .optional(),
  pieces: z.number().int().positive('Pieces must be positive'),
  commodity: z.string().optional(),
  invoiceValue: z.number().positive('Invoice value must be positive'),

  paymentMode: z.enum(['PREPAID', 'COD']),
  collectableAmount: z.number().optional(),

  schedulePickup: z.boolean().optional(),
  pickupDate: z.string().optional(),
  pickupTime: z.string().optional(),
})

export const listShipmentsQuerySchema = z.object({
  status: z.string().optional(),
  courierName: z.string().optional(),
  orderId: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 20)),
})

export type CreateShipmentInput = z.infer<typeof createShipmentSchema>
export type ListShipmentsQuery = z.infer<typeof listShipmentsQuerySchema>
