import { Router } from 'express'

import mainAuthRoutes from '@/core/auth/auth.routes'
import merchantRoutes from '@/core/merchants/merchants.routes'
import shopRoutes from '@/domains/shop/shop.routes'
import integrationRoutes from '@/integrations/intergrations.routes'
import logisticsRoutes from '../domains/logistics/logistics.routes'
import paymentRoutes from '../integrations/payment-gateways/payment-gateway.routes'

const mainRouter = Router()

mainRouter.use(`/auth`, mainAuthRoutes)

mainRouter.use('/integrations', integrationRoutes)

mainRouter.use('/merchants', merchantRoutes)

mainRouter.use('/shop', shopRoutes)

mainRouter.use('/logistics', logisticsRoutes)

mainRouter.use('/payments', paymentRoutes)

export default mainRouter
