import { z } from 'zod'

// Onboarding schema
export const onboardingSchema = z.object({
  // Business details
  businessType: z.string().optional(),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),

  // Bank details
  bankAccount: z.string().min(1, 'Bank account is required'),
  ifscCode: z.string().min(1, 'IFSC code is required'),
  accountHolder: z.string().min(1, 'Account holder name is required'),

  // Pickup address
  pickupAddress: z
    .object({
      name: z.string().min(1),
      phone: z.string().min(10),
      line1: z.string().min(1),
      line2: z.string().optional(),
      city: z.string().min(1),
      state: z.string().min(1),
      pincode: z.string().min(6).max(6),
      country: z.string().default('India'),
      landmark: z.string().optional(),
    })
    .optional(),
})

// General settings
export const generalSettingsSchema = z.object({
  businessName: z.string().min(1).optional(),
  phone: z.string().min(10).optional(),
})

// Notification settings
export const notificationSettingsSchema = z.object({
  notifyOnNewOrder: z.boolean().optional(),
  notifyOnPayment: z.boolean().optional(),
  notifyOnShipment: z.boolean().optional(),
  notifyOnDelivery: z.boolean().optional(),
  notifyOnReturn: z.boolean().optional(),
  notifyOnDispute: z.boolean().optional(),
  emailEnabled: z.boolean().optional(),
  whatsappEnabled: z.boolean().optional(),
  smsEnabled: z.boolean().optional(),
  notificationEmail: z.string().email().optional(),
  notificationWhatsApp: z.string().optional(),
  notificationPhone: z.string().optional(),
})

// Preferences
export const preferencesSchema = z.object({
  sortQuotesBy: z.string().optional(),
  quoteCacheDuration: z.number().optional(),
  codEnabled: z.boolean().optional(),
  codMinOrderValue: z.number().optional(),
  remittanceCycle: z.enum(['DAILY', 'WEEKLY', 'ON_DELIVERY']).optional(),
  slaThresholdDays: z.number().optional(),
  allowManualOverride: z.boolean().optional(),
})

// Logistics settings
export const logisticsSettingsSchema = z.object({
  defaultCourier: z.string().optional(),
  codEnabled: z.boolean().optional(),
  codMinOrderValue: z.number().optional(),
  returnsEnabled: z.boolean().optional(),
  returnWindowDays: z.number().optional(),
  returnShippingPaidBy: z.string().optional(),
  exchangesEnabled: z.boolean().optional(),
})

export type OnboardingInput = z.infer<typeof onboardingSchema>
export type GeneralSettingsInput = z.infer<typeof generalSettingsSchema>
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>
export type PreferencesInput = z.infer<typeof preferencesSchema>
export type LogisticsSettingsInput = z.infer<typeof logisticsSettingsSchema>
