import { Router } from 'express'
import razorpayRoutes from './razorpay/razorpay.routes'

const router = Router()

// Razorpay routes
router.use('/razorpay', razorpayRoutes)

// Future payment gateways can be added here
// router.use('/stripe', stripeRoutes)
// router.use('/paytm', paytmRoutes)

export default router
