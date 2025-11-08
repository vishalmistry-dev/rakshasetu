import { Router } from 'express'

import mainAuthRoutes from '@/core/auth/auth.routes'
import merchantRoutes from '@/core/merchants/merchants.routes'
import shopRoutes from '@/domains/shop/shop.routes'
import integrationRoutes from '@/integrations/intergrations.routes'
import adminRoutes from '../admin/admin.routes'
import analyticsRoutes from '../domains/analytics/analytics.routes'
import filesRoutes from '../domains/files/files.routes'
import logisticsRoutes from '../domains/logistics/logistics.routes'
import notificationRoutes from '../domains/notifications/notifications.routes'
import paymentRoutes from '../integrations/payment-gateways/payment-gateway.routes'

// Main routes
const mainRouter = Router()

// API v1 routes
const v1Router = Router()

v1Router.use(`/auth`, mainAuthRoutes)

v1Router.use('/integrations', integrationRoutes)

v1Router.use('/merchants', merchantRoutes)

v1Router.use('/shop', shopRoutes)

v1Router.use('/logistics', logisticsRoutes)

v1Router.use('/payments', paymentRoutes)

v1Router.use('/admin', adminRoutes)

v1Router.use('/notifications', notificationRoutes)

v1Router.use('/analytics', analyticsRoutes)

v1Router.use('/files', filesRoutes)

// Mount v1 routes
mainRouter.use('/v1', v1Router)

export default mainRouter
