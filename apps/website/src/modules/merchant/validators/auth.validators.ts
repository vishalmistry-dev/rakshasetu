import { z } from 'zod'

export const MerchantLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const MerchantPasswordResetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(128, 'Password cannot exceed 128 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type MerchantLoginInput = z.infer<typeof MerchantLoginSchema>
export type MerchantResetPasswordInput = z.infer<typeof MerchantPasswordResetSchema>
