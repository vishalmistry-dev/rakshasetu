import { asyncHandler, sendResponse } from '@/common/utils'
import * as orderService from './orders.service'

// List orders
export const listOrders = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const params = req.query

  const result = await orderService.listOrders(merchantId, params)

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
  const merchantId = req.merchant!.id
  const { id } = req.params

  const order = await orderService.getOrderById(id, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order retrieved successfully',
    data: order,
  })
})

// Get order stats
export const getStats = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { storeId } = req.query

  const stats = await orderService.getOrderStats(merchantId, storeId as string)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order stats retrieved successfully',
    data: stats,
  })
})

// Update order status
export const updateStatus = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { id } = req.params
  const { status } = req.body

  const order = await orderService.updateOrderStatus(id, merchantId, status)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order status updated successfully',
    data: order,
  })
})
