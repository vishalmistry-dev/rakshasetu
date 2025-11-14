import { asyncHandler, sendResponse } from '@/common/utils'
import * as productService from './products.service'

// List products
export const listProducts = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const params = req.query

  const result = await productService.listProducts(merchantId, params)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    data: result.products,
    meta: result.pagination,
  })
})

// Get product details
export const getProduct = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { id } = req.params

  const product = await productService.getProductById(id, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  })
})

// Trigger manual sync
export const syncProducts = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const { storeId } = req.body

  const result = await productService.syncProductsFromShopify(storeId, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
  })
})
