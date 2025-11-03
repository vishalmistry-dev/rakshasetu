import { asyncHandler } from '@/common/utils'
import { Request, Response } from 'express'
import { handleAppUninstalled } from './handlers/app-uninstalled.handler'
import { handleOrderCreated } from './handlers/order-created.handler'
import { handleProductCreated } from './handlers/product-created.handler'
import { handleProductUpdated } from './handlers/product-updated.handler'

// Orders created
export const ordersCreate = asyncHandler(async (req: Request, res: Response) => {
  const shop = req.get('X-Shopify-Shop-Domain') || ''
  const order = req.body

  await handleOrderCreated(order, shop)

  res.status(200).send('OK')
})

// Products created
export const productsCreate = asyncHandler(async (req: Request, res: Response) => {
  const shop = req.get('X-Shopify-Shop-Domain') || ''
  const product = req.body

  await handleProductCreated(product, shop)

  res.status(200).send('OK')
})

// Products updated
export const productsUpdate = asyncHandler(async (req: Request, res: Response) => {
  const shop = req.get('X-Shopify-Shop-Domain') || ''
  const product = req.body

  await handleProductUpdated(product, shop)

  res.status(200).send('OK')
})

// App uninstalled
export const appUninstalled = asyncHandler(async (req: Request, res: Response) => {
  const shop = req.get('X-Shopify-Shop-Domain') || ''

  await handleAppUninstalled(shop)

  res.status(200).send('OK')
})
