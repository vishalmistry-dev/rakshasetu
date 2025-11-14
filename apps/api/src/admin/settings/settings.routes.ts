import { authenticateAdmin, requirePermission } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  addCourier,
  calculateFees,
  deleteCourier,
  getCourierConfiguration,
  getEmailTemplates,
  getFeeConfiguration,
  getPlatformSettings,
  updateCourierConfiguration,
  updateEmailTemplate,
  updateFeeConfiguration,
  updatePlatformSettings,
} from './settings.controller'

const router = Router()

// All routes require admin authentication
router.use(authenticateAdmin)

// Platform settings
router.get('/platform', getPlatformSettings)
router.put('/platform', requirePermission('SETTINGS_MANAGE'), updatePlatformSettings)

// Fee configuration
router.get('/fees', getFeeConfiguration)
router.put('/fees', requirePermission('SETTINGS_MANAGE'), updateFeeConfiguration)
router.post('/fees/calculate', calculateFees)

// Courier configuration
router.get('/couriers', getCourierConfiguration)
router.post('/couriers', requirePermission('SETTINGS_MANAGE'), addCourier)
router.put('/couriers/:id', requirePermission('SETTINGS_MANAGE'), updateCourierConfiguration)
router.delete('/couriers/:id', requirePermission('SETTINGS_MANAGE'), deleteCourier)

// Email templates
router.get('/email-templates', getEmailTemplates)
router.put('/email-templates/:id', requirePermission('SETTINGS_MANAGE'), updateEmailTemplate)

export default router
