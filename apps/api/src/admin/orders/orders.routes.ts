import { authenticateAdmin, requirePermission } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  getHighValueOrders,
  getOrder,
  getOrderStatistics,
  listOrders,
  updateOrderStatus,
} from './orders.controller'

const router = Router()

// All routes require admin authentication
router.use(authenticateAdmin)

// Get order statistics
router.get('/statistics', getOrderStatistics)

// Get high-value orders
router.get('/high-value', getHighValueOrders)

// List orders
router.get('/', listOrders)

// Get order details
router.get('/:id', getOrder)

// Update order status
router.patch('/:id/status', requirePermission('ORDER_MANAGE'), updateOrderStatus)

export default router
