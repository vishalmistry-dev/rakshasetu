import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  deleteNotification,
  getPreferences,
  getUnreadCount,
  listNotifications,
  markAllAsRead,
  markAsRead,
  updatePreferences,
} from './notifications.controller'

const router = Router()

// All routes require authentication
router.use(authenticateMerchant)

// Notification routes
router.get('/', listNotifications)
router.get('/unread-count', getUnreadCount)
router.post('/mark-all-read', markAllAsRead)
router.patch('/:id/read', markAsRead)
router.delete('/:id', deleteNotification)

// Preferences
router.get('/preferences', getPreferences)
router.put('/preferences', updatePreferences)

export default router
