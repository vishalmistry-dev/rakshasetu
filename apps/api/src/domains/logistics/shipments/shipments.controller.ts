import { asyncHandler, sendResponse } from '@/common/utils'
import * as shipmentService from './shipments.service'

// Create shipment
export const createShipment = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const data = req.body

  const result = await shipmentService.createShipment(merchantId, data)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Shipment created successfully',
    data: {
      shipmentId: result.shipping.id,
      trackingNumber: result.trackingNumber,
      courierName: result.courierName,
      estimatedDelivery: result.estimatedDelivery,
    },
  })
})

// Get shipment details
export const getShipment = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { id } = req.params

  const shipment = await shipmentService.getShipmentById(id, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shipment retrieved successfully',
    data: shipment,
  })
})

// List shipments
export const listShipments = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const filters = req.query

  const result = await shipmentService.listShipments(merchantId, filters)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shipments retrieved successfully',
    data: result.shipments,
    meta: result.pagination,
  })
})

// Track shipment
export const trackShipment = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { id } = req.params

  const tracking = await shipmentService.trackShipment(id, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tracking data retrieved successfully',
    data: tracking,
  })
})

// Cancel shipment
export const cancelShipment = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { id } = req.params

  const result = await shipmentService.cancelShipment(id, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shipment cancelled successfully',
    data: result,
  })
})
