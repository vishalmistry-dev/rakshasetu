import * as merchantController from '@/core/merchants/merchants.controller'
import { Router } from 'express'

const router = Router()

// Profile
router.get('/profile', merchantController.getProfile)

// Onboarding
router.post('/onboard', merchantController.onboard)

// Settings
router.get('/settings', merchantController.getSettings)
router.put('/settings/general', merchantController.updateGeneral)
router.put('/settings/notifications', merchantController.updateNotifications)
router.put('/settings/preferences', merchantController.updatePreferences)
router.put('/settings/logistics', merchantController.updateLogistics)

export default router
