import { asyncHandler, sendResponse } from '@/common/utils'
import * as storeService from './stores.service'

// List all stores for merchant
export const listStores = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id

  const stores = await storeService.listStores(merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Stores retrieved successfully',
    data: stores,
    meta: {
      total: stores.length,
    },
  })
})

// Get store details
export const getStore = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { id } = req.params

  const store = await storeService.getStoreById(id, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Store details retrieved successfully',
    data: store,
  })
})

// Get store stats (for dashboard)
export const getStats = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { id } = req.params

  const stats = await storeService.getStoreStats(id, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Store stats retrieved successfully',
    data: stats,
  })
})
