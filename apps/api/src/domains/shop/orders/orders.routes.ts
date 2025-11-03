import { bodySchema, querySchema, validateRequest } from '@/common/utils'
import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import { getOrder, getStats, listOrders, updateStatus } from './orders.controller'
import { listOrdersQuerySchema, updateOrderStatusSchema } from './orders.schema'

const router = Router()

// All routes require authentication
router.use(authenticateMerchant)

// Get order stats
router.get('/stats', validateRequest(querySchema(listOrdersQuerySchema)), getStats)

// List orders
router.get('/', validateRequest(querySchema(listOrdersQuerySchema)), listOrders)

// Get order by ID
router.get('/:id', getOrder)

// Update order status
router.patch('/:id/status', validateRequest(bodySchema(updateOrderStatusSchema)), updateStatus)

export default router
