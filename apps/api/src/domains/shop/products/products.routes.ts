import { querySchema, validateRequest } from '@/common/utils'
import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import { getProduct, listProducts, syncProducts } from './products.controller'
import { listProductsQuerySchema } from './products.schema'

const router = Router()

// All routes require authentication
router.use(authenticateMerchant)

// List products
router.get('/', validateRequest(querySchema(listProductsQuerySchema)), listProducts)

// Get product by ID
router.get('/:id', getProduct)

// Trigger manual sync
router.post('/sync', syncProducts)

export default router
