import * as orderController from '@/domains/shop/orders/orders.controller'
import { Router } from 'express'

const router = Router()

// List orders
router.get('/', orderController.listOrders)

// Order stats (for dashboard)
router.get('/stats', orderController.getStats)

// Get single order
router.get('/:id', orderController.getOrder)

// Update order status
router.patch('/:id/status', orderController.updateStatus)

export default router
