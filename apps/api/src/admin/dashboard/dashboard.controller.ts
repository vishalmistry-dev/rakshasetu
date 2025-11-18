import { asyncHandler, sendResponse } from '@/common/utils'
import * as dashboardService from './dashboard.service'

// Get dashboard overview
export const getDashboardOverview = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboardOverview()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dashboard overview retrieved successfully',
    data,
  })
})

// Get recent activity
export const getRecentActivity = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 20

  const data = await dashboardService.getRecentActivity(limit)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Recent activity retrieved successfully',
    data,
  })
})

// Get platform stats
export const getPlatformStats = asyncHandler(async (req, res) => {
  const days = req.query.days ? parseInt(req.query.days as string) : 30

  const data = await dashboardService.getPlatformStats(days)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Platform stats retrieved successfully',
    data,
  })
})
