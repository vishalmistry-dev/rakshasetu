import { asyncHandler, sendResponse } from '@/common/utils'
import * as ordersService from './orders.service'

// List orders
export const listOrders = asyncHandler(async (req, res) => {
  const filters = {
    merchantId: req.query.merchantId as string,
    storeId: req.query.storeId as string,
    status: req.query.status as string,
    search: req.query.search as string,
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
  }

  const result = await ordersService.listOrders(filters)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: result.orders,
    meta: result.pagination,
  })
})

// Get order details
export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params

  const order = await ordersService.getOrderById(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order details retrieved successfully',
    data: order,
  })
})

// Update order status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status, notes } = req.body
  const adminId = req.admin!.id

  const order = await ordersService.updateOrderStatus(id, status, adminId, notes)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order status updated successfully',
    data: order,
  })
})

// Get high-value orders
export const getHighValueOrders = asyncHandler(async (req, res) => {
  const minAmount = req.query.minAmount ? parseFloat(req.query.minAmount as string) : 50000

  const orders = await ordersService.getHighValueOrders(minAmount)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'High-value orders retrieved successfully',
    data: orders,
  })
})

// Get order statistics
export const getOrderStatistics = asyncHandler(async (req, res) => {
  const stats = await ordersService.getOrderStatistics()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order statistics retrieved successfully',
    data: stats,
  })
})
