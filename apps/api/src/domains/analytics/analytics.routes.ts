import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  exportAnalytics,
  getComparisonAnalytics,
  getCustomerInsights,
  getMerchantAnalytics,
  getProductPerformance,
  getRevenueReport,
  getShippingAnalytics,
} from './analytics.controller'

const router = Router()

// All routes require merchant authentication
router.use(authenticateMerchant)

// Analytics routes
router.get('/overview', getMerchantAnalytics)
router.get('/revenue', getRevenueReport)
router.get('/products', getProductPerformance)
router.get('/customers', getCustomerInsights)
router.get('/shipping', getShippingAnalytics)
router.get('/comparison', getComparisonAnalytics)
router.get('/export', exportAnalytics)

export default router
