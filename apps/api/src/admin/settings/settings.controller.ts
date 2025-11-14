import { asyncHandler, sendResponse } from '@/common/utils'
import * as settingsService from './settings.service'

// Get platform settings
export const getPlatformSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getPlatformSettings()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Platform settings retrieved successfully',
    data: settings,
  })
})

// Update platform settings
export const updatePlatformSettings = asyncHandler(async (req, res) => {
  const adminId = req.admin!.id
  const data = req.body

  const settings = await settingsService.updatePlatformSettings(data, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Platform settings updated successfully',
    data: settings,
  })
})

// Get fee configuration
export const getFeeConfiguration = asyncHandler(async (req, res) => {
  const fees = await settingsService.getFeeConfiguration()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fee configuration retrieved successfully',
    data: fees,
  })
})

// Update fee configuration
export const updateFeeConfiguration = asyncHandler(async (req, res) => {
  const adminId = req.admin!.id
  const data = req.body

  const fees = await settingsService.updateFeeConfiguration(data, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fee configuration updated successfully',
    data: fees,
  })
})

// Calculate fees
export const calculateFees = asyncHandler(async (req, res) => {
  const { orderAmount, isCOD } = req.body

  const calculation = await settingsService.calculateFees(orderAmount, isCOD)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fees calculated successfully',
    data: calculation,
  })
})

// Get courier configuration
export const getCourierConfiguration = asyncHandler(async (req, res) => {
  const couriers = await settingsService.getCourierConfiguration()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courier configuration retrieved successfully',
    data: couriers,
  })
})

// Update courier configuration
export const updateCourierConfiguration = asyncHandler(async (req, res) => {
  const { id } = req.params
  const adminId = req.admin!.id
  const data = req.body

  const courier = await settingsService.updateCourierConfiguration(id, data, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courier configuration updated successfully',
    data: courier,
  })
})

// Add courier
export const addCourier = asyncHandler(async (req, res) => {
  const adminId = req.admin!.id
  const data = req.body

  const courier = await settingsService.addCourier(data, adminId)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Courier added successfully',
    data: courier,
  })
})

// Delete courier
export const deleteCourier = asyncHandler(async (req, res) => {
  const { id } = req.params
  const adminId = req.admin!.id

  await settingsService.deleteCourier(id, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courier deleted successfully',
  })
})

// Get email templates
export const getEmailTemplates = asyncHandler(async (req, res) => {
  const templates = await settingsService.getEmailTemplates()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Email templates retrieved successfully',
    data: templates,
  })
})

// Update email template
export const updateEmailTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params
  const adminId = req.admin!.id
  const data = req.body

  const template = await settingsService.updateEmailTemplate(id, data, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Email template updated successfully',
    data: template,
  })
})
