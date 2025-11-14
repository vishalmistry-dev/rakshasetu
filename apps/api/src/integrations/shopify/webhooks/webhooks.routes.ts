import express, { Router } from 'express'
import { appUninstalled, ordersCreate, productsCreate, productsUpdate } from './webhooks.controller'
import { validateShopifyWebhook } from './webhooks.middleware'

const router = Router()

// IMPORTANT: Preserve raw body for HMAC validation
router.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString()
    },
  })
)

// All webhooks require HMAC validation
router.use(validateShopifyWebhook)

// Webhook endpoints
router.post('/orders/create', ordersCreate)
router.post('/products/create', productsCreate)
router.post('/products/update', productsUpdate)
router.post('/app/uninstalled', appUninstalled)

export default router
