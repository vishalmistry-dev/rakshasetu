import { asyncHandler, sendResponse } from '@/common/utils'
import * as disputesService from './disputes.service'

// List disputes
export const listDisputes = asyncHandler(async (req, res) => {
  const filters = {
    status: req.query.status as string,
    merchantId: req.query.merchantId as string,
    search: req.query.search as string,
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
  }

  const result = await disputesService.listDisputes(filters)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Disputes retrieved successfully',
    data: result.disputes,
    meta: result.pagination,
  })
})

// Get dispute details
export const getDispute = asyncHandler(async (req, res) => {
  const { id } = req.params

  const dispute = await disputesService.getDisputeById(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dispute details retrieved successfully',
    data: dispute,
  })
})

// Resolve dispute
export const resolveDispute = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { resolution, refundAmount } = req.body
  const adminId = req.admin!.id

  const dispute = await disputesService.resolveDispute(id, resolution, adminId, refundAmount)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dispute resolved successfully',
    data: dispute,
  })
})

// Reject dispute
export const rejectDispute = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { reason } = req.body
  const adminId = req.admin!.id

  const dispute = await disputesService.rejectDispute(id, reason, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dispute rejected successfully',
    data: dispute,
  })
})

// Update dispute status
export const updateDisputeStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const adminId = req.admin!.id

  const dispute = await disputesService.updateDisputeStatus(id, status, adminId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dispute status updated successfully',
    data: dispute,
  })
})

// Get dispute statistics
export const getDisputeStatistics = asyncHandler(async (req, res) => {
  const stats = await disputesService.getDisputeStatistics()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dispute statistics retrieved successfully',
    data: stats,
  })
})
