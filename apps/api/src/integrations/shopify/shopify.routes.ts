import { Router } from 'express'
import oauthRoutes from './oauth/oauth.routes'
import webhookRoutes from './webhooks/webhooks.routes'

const router = Router()

// OAuth routes
router.use('/oauth', oauthRoutes)

// Webhooks routes
router.use('/webhooks', webhookRoutes)

export default router
