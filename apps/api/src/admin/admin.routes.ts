import { Router } from 'express'
import dashboardRoutes from './dashboard/dashboard.routes'
import disputeRoutes from './disputes/disputes.routes'
import merchantRoutes from './merchants/merchants.routes'
import notificationRoutes from './notifications/notifications.routes'
import orderRoutes from './orders/orders.routes'
import settingsRoutes from './settings/settings.routes'

const router = Router()

// Admin routes
router.use('/dashboard', dashboardRoutes)
router.use('/merchants', merchantRoutes)
router.use('/orders', orderRoutes)
router.use('/disputes', disputeRoutes)
router.use('/notifications', notificationRoutes)
router.use('/settings', settingsRoutes)

export default router
