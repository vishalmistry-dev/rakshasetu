import { asyncHandler, sendResponse } from '@/common/utils'
import { cookieOptions } from '@/config/constants'
import { generateAccessToken } from '../../shared/token.manager'
import * as merchantAuthService from './merchant-auth.service'

// ========================== SET PASSWORD ==========================
export const setPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params
  const { password, confirmPassword } = req.body

  const result = await merchantAuthService.setMerchantPassword(token, password, confirmPassword)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
  })
})

// ========================== LOGIN ==========================
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const { merchant, message } = await merchantAuthService.loginMerchant(email, password)

  // Generate JWT
  const accessToken = generateAccessToken({
    id: merchant.id,
    email: merchant.email,
    businessName: merchant.businessName,
  })

  // Set cookie
  res.cookie('merchantAccessToken', accessToken, cookieOptions)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message,
    data: {
      merchant: {
        id: merchant.id,
        businessName: merchant.businessName,
        email: merchant.email,
        mode: merchant.mode,
      },
    },
  })
})

// ========================== FORGOT PASSWORD ==========================
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body

  const result = await merchantAuthService.forgotMerchantPassword(email)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result.resetToken ? { resetToken: result.resetToken } : undefined, // Only in dev
  })
})

// ========================== RESET PASSWORD ==========================
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params
  const { newPassword, confirmPassword } = req.body

  const result = await merchantAuthService.resetMerchantPassword(
    token,
    newPassword,
    confirmPassword
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
  })
})

// ========================== LOGOUT ==========================
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('merchantAccessToken', {
    ...cookieOptions,
    maxAge: 0,
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged out successfully',
  })
})
