import { authenticateShopify } from '@/integrations/shopify/middlewares/authenticateShopify.middleware'
import { Router } from 'express'
import oauthRoutes from './oauth/oauth.routes'
import webhookRoutes from './webhooks/webhooks.routes'

import authRoutes from './auth/auth.routes'
import merchantRoutes from './routes/merchants.routes'
import orderRoutes from './routes/orders.routes'

const router = Router()

// OAuth routes
router.use('/oauth', oauthRoutes)

// Webhooks routes
router.use('/webhooks', webhookRoutes)

router.use('/auth', authRoutes)

router.use('/merchants', authenticateShopify, merchantRoutes)
router.use('/orders', authenticateShopify, orderRoutes)

export default router
