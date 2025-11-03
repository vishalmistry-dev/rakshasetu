import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import { getStats, getStore, listStores } from './stores.controller'

const router = Router()

// All routes require merchant authentication
router.use(authenticateMerchant)

// List all stores
router.get('/', listStores)

// Get store details
router.get('/:id', getStore)

// Get store stats (for dashboard)
router.get('/:id/stats', getStats)

export default router
