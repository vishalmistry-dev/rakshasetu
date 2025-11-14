import { z } from 'zod'

// Set password (first time after Shopify install)
export const setPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
})

// Login
export const loginMerchantSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Forgot password
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// Reset password
export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
})

export type SetPasswordInput = z.infer<typeof setPasswordSchema>
export type LoginMerchantInput = z.infer<typeof loginMerchantSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
