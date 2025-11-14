import { Router } from 'express'
import shipmentRoutes from './shipments/shipments.routes'
// Future routes
// import quoteRoutes from './quotes/quotes.routes'
// import pickupRoutes from './pickups/pickups.routes'

const router = Router()

router.use('/shipments', shipmentRoutes)
// router.use('/quotes', quoteRoutes)
// router.use('/pickups', pickupRoutes)

export default router
