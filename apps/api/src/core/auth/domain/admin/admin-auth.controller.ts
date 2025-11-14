import { asyncHandler, sendResponse } from '@/common/utils'
import * as adminAuthService from './admin-auth.service'

// Login
export const login = asyncHandler(async (req, res) => {
  const data = req.body

  const result = await adminAuthService.loginAdmin(data)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  })
})

// Refresh token
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Refresh token is required',
    })
  }

  const tokens = await adminAuthService.refreshAdminToken(refreshToken)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Token refreshed successfully',
    data: tokens,
  })
})

// Logout
export const logout = asyncHandler(async (req, res) => {
  const adminId = req.admin!.id

  await adminAuthService.logoutAdmin(adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logout successful',
  })
})

// Get current admin
export const getCurrentAdmin = asyncHandler(async (req, res) => {
  const adminId = req.admin!.id

  const admin = await adminAuthService.getCurrentAdmin(adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin retrieved successfully',
    data: admin,
  })
})

// Create admin (super admin only)
export const createAdmin = asyncHandler(async (req, res) => {
  const data = req.body

  const admin = await adminAuthService.createAdmin(data)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin created successfully',
    data: admin,
  })
})
