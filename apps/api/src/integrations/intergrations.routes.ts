import { Router } from 'express'

import sandboxRoutes from './sandbox/webhooks/sandbox.webhook.routes'
import shopifyRoutes from './shopify/shopify.routes'

const integrationRouter = Router()

integrationRouter.use('/shopify', shopifyRoutes)

integrationRouter.use('/sandbox', sandboxRoutes)

export default integrationRouter
