import { asyncHandler, sendResponse } from '@/common/utils'
import * as analyticsService from './analytics.service'

// Get merchant analytics
export const getMerchantAnalytics = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined
  const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined

  const data = await analyticsService.getMerchantAnalytics(merchantId, startDate, endDate)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Analytics retrieved successfully',
    data,
  })
})

// Get revenue report
export const getRevenueReport = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const period = (req.query.period as 'daily' | 'weekly' | 'monthly') || 'daily'
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined
  const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined

  const data = await analyticsService.getRevenueReport(merchantId, period, startDate, endDate)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Revenue report generated successfully',
    data,
  })
})

// Get product performance
export const getProductPerformance = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined
  const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined

  const data = await analyticsService.getProductPerformance(merchantId, startDate, endDate)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product performance retrieved successfully',
    data,
  })
})

// Get customer insights
export const getCustomerInsights = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined
  const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined

  const data = await analyticsService.getCustomerInsights(merchantId, startDate, endDate)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer insights retrieved successfully',
    data,
  })
})

// Get shipping analytics
export const getShippingAnalytics = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined
  const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined

  const data = await analyticsService.getShippingAnalytics(merchantId, startDate, endDate)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shipping analytics retrieved successfully',
    data,
  })
})

// Get comparison analytics
export const getComparisonAnalytics = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id

  const currentStart = new Date(req.query.currentStart as string)
  const currentEnd = new Date(req.query.currentEnd as string)
  const previousStart = new Date(req.query.previousStart as string)
  const previousEnd = new Date(req.query.previousEnd as string)

  const data = await analyticsService.getComparisonAnalytics(
    merchantId,
    currentStart,
    currentEnd,
    previousStart,
    previousEnd
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Comparison analytics retrieved successfully',
    data,
  })
})

// Export analytics data
export const exportAnalytics = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const reportType = req.query.type as string
  const format = (req.query.format as 'csv' | 'json') || 'json'
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined
  const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined

  const result = await analyticsService.exportAnalyticsData(
    merchantId,
    reportType,
    format,
    startDate,
    endDate
  )

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="${reportType}-report.csv"`)
    return res.send(result.data)
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Analytics exported successfully',
    data: result.data,
  })
})
