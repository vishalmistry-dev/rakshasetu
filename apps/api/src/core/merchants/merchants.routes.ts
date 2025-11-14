import { bodySchema, validateRequest } from '@/common/utils'
import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  getProfile,
  getSettings,
  onboard,
  updateGeneral,
  updateLogistics,
  updateNotifications,
  updatePreferences,
} from './merchants.controller'
import {
  generalSettingsSchema,
  logisticsSettingsSchema,
  notificationSettingsSchema,
  onboardingSchema,
  preferencesSchema,
} from './merchants.schema'

const router = Router()

// All routes require authentication
router.use(authenticateMerchant)

// Profile
router.get('/profile', getProfile)

// Onboarding
router.post('/onboard', validateRequest(bodySchema(onboardingSchema)), onboard)

// Settings
router.get('/settings', getSettings)
router.put('/settings/general', validateRequest(bodySchema(generalSettingsSchema)), updateGeneral)
router.put(
  '/settings/notifications',
  validateRequest(bodySchema(notificationSettingsSchema)),
  updateNotifications
)
router.put(
  '/settings/preferences',
  validateRequest(bodySchema(preferencesSchema)),
  updatePreferences
)
router.put(
  '/settings/logistics',
  validateRequest(bodySchema(logisticsSettingsSchema)),
  updateLogistics
)

export default router
