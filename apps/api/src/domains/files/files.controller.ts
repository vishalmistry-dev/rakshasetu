import { asyncHandler, sendResponse } from '@/common/utils'
import * as filesService from './files.service'

// Upload single file
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    })
  }

  const uploadedBy = {
    userId: req.user?.id,
    merchantId: req.merchant?.id,
    adminId: req.admin?.id,
  }

  const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : undefined

  const file = await filesService.uploadFile(req.file, uploadedBy, metadata)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'File uploaded successfully',
    data: file,
  })
})

// Upload multiple files
export const uploadMultipleFiles = asyncHandler(async (req, res) => {
  if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded',
    })
  }

  const uploadedBy = {
    userId: req.user?.id,
    merchantId: req.merchant?.id,
    adminId: req.admin?.id,
  }

  const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : undefined

  const files = await filesService.uploadMultipleFiles(
    req.files as Express.Multer.File[],
    uploadedBy,
    metadata
  )

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Files uploaded successfully',
    data: files,
  })
})

// Get file
export const getFile = asyncHandler(async (req, res) => {
  const { id } = req.params

  const file = await filesService.getFileById(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'File retrieved successfully',
    data: file,
  })
})

// List files
export const listFiles = asyncHandler(async (req, res) => {
  const filters = {
    userId: req.user?.id,
    merchantId: req.merchant?.id,
    adminId: req.admin?.id,
    fileType: req.query.fileType as string,
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
  }

  const result = await filesService.listFiles(filters)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Files retrieved successfully',
    data: result.files,
    meta: result.pagination,
  })
})

// Delete file
export const deleteFile = asyncHandler(async (req, res) => {
  const { id } = req.params

  await filesService.deleteFile(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'File deleted successfully',
  })
})

// Generate invoice
export const generateInvoice = asyncHandler(async (req, res) => {
  const { orderId } = req.params

  const result = await filesService.generateInvoice(orderId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Invoice generated successfully',
    data: result,
  })
})

// Generate shipping label
export const generateShippingLabel = asyncHandler(async (req, res) => {
  const { shippingId } = req.params

  const result = await filesService.generateShippingLabel(shippingId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Shipping label generated successfully',
    data: result,
  })
})

// Export orders
export const exportOrders = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const format = (req.query.format as 'csv' | 'excel') || 'csv'
  const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined
  const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined

  const result = await filesService.exportOrders(merchantId, format, startDate, endDate)

  res.setHeader('Content-Type', result.contentType)
  res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`)
  return res.send(result.data)
})
