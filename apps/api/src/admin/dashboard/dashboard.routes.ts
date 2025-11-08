import { authenticateAdmin } from '@/core/auth/middlewares'
import { Router } from 'express'
import { getDashboardOverview, getPlatformStats, getRecentActivity } from './dashboard.controller'

const router = Router()

// All routes require admin authentication
router.use(authenticateAdmin)

// Dashboard routes
router.get('/overview', getDashboardOverview)
router.get('/activity', getRecentActivity)
router.get('/stats', getPlatformStats)

export default router
