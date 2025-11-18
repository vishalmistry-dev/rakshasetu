import { bodySchema, validateRequest } from '@/common/utils'
import { Router } from 'express'
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  setPassword,
} from './merchant-auth.controller'
import {
  forgotPasswordSchema,
  loginMerchantSchema,
  resetPasswordSchema,
  setPasswordSchema,
} from './merchant-auth.schema'

const router = Router()

// ========================== PUBLIC ROUTES ==========================

// Set password (first time after Shopify install)
router.post('/set-password/:token', validateRequest(bodySchema(setPasswordSchema)), setPassword)

// Login to dashboard
router.post('/login', validateRequest(bodySchema(loginMerchantSchema)), login)

// Forgot password
router.post('/forgot-password', validateRequest(bodySchema(forgotPasswordSchema)), forgotPassword)

// Reset password
router.post(
  '/reset-password/:token',
  validateRequest(bodySchema(resetPasswordSchema)),
  resetPassword
)

// Logout
router.post('/logout', logout)

export default router
