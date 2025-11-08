import { Router } from 'express'
import dashboardRoutes from './dashboard/dashboard.routes'
import disputeRoutes from './disputes/disputes.routes'
import merchantRoutes from './merchants/merchants.routes'
import orderRoutes from './orders/orders.routes'

const router = Router()

// Admin routes
router.use('/dashboard', dashboardRoutes)
router.use('/merchants', merchantRoutes)
router.use('/orders', orderRoutes)
router.use('/disputes', disputeRoutes)

export default router
