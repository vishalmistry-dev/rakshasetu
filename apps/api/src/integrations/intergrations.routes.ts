import { Router } from 'express'

import shopifyRoutes from './shopify/shopify.routes'

const integrationRouter = Router()

integrationRouter.use('/shopify', shopifyRoutes)

export default integrationRouter
