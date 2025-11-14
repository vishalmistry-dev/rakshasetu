import { asyncHandler, sendResponse } from '@/common/utils'
import * as merchantsService from './merchants.service'

// List merchants
export const listMerchants = asyncHandler(async (req, res) => {
  const filters = {
    status: req.query.status as string,
    search: req.query.search as string,
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
  }

  const result = await merchantsService.listMerchants(filters)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Merchants retrieved successfully',
    data: result.merchants,
    meta: result.pagination,
  })
})

// Get merchant details
export const getMerchant = asyncHandler(async (req, res) => {
  const { id } = req.params

  const result = await merchantsService.getMerchantById(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Merchant details retrieved successfully',
    data: result,
  })
})

// Update merchant status
export const updateMerchantStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const adminId = req.admin!.id

  const merchant = await merchantsService.updateMerchantStatus(id, status, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Merchant status updated successfully',
    data: merchant,
  })
})

// Approve merchant
export const approveMerchant = asyncHandler(async (req, res) => {
  const { id } = req.params
  const adminId = req.admin!.id

  const merchant = await merchantsService.approveMerchant(id, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Merchant approved successfully',
    data: merchant,
  })
})

// Reject merchant
export const rejectMerchant = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { reason } = req.body
  const adminId = req.admin!.id

  const merchant = await merchantsService.rejectMerchant(id, adminId, reason)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Merchant rejected successfully',
    data: merchant,
  })
})

// Delete merchant
export const deleteMerchant = asyncHandler(async (req, res) => {
  const { id } = req.params
  const adminId = req.admin!.id

  await merchantsService.deleteMerchant(id, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Merchant deleted successfully',
  })
})

// Get merchant stats
export const getMerchantStats = asyncHandler(async (req, res) => {
  const { id } = req.params

  const stats = await merchantsService.getMerchantStats(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Merchant stats retrieved successfully',
    data: stats,
  })
})
