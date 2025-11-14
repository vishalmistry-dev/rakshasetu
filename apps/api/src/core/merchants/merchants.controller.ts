import { asyncHandler, sendResponse } from '@/common/utils'
import * as merchantService from './merchants.service'

// Get merchant profile
export const getProfile = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id

  const profile = await merchantService.getMerchantProfile(merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile retrieved successfully',
    data: profile,
  })
})

// Complete onboarding
export const onboard = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const data = req.body

  const result = await merchantService.onboardMerchant(merchantId, data)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result.profile,
  })
})

// Get all settings
export const getSettings = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id

  const settings = await merchantService.getAllSettings(merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Settings retrieved successfully',
    data: settings,
  })
})

// Update general settings
export const updateGeneral = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const data = req.body

  const merchant = await merchantService.updateGeneralSettings(merchantId, data)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'General settings updated successfully',
    data: merchant,
  })
})

// Update notifications
export const updateNotifications = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const data = req.body

  const notifications = await merchantService.updateNotificationSettings(merchantId, data)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notification settings updated successfully',
    data: notifications,
  })
})

// Update preferences
export const updatePreferences = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const data = req.body

  const preferences = await merchantService.updatePreferences(merchantId, data)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Preferences updated successfully',
    data: preferences,
  })
})

// Update logistics
export const updateLogistics = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const data = req.body

  const logistics = await merchantService.updateLogisticsSettings(merchantId, data)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logistics settings updated successfully',
    data: logistics,
  })
})
