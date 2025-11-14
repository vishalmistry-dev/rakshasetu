import { authenticateAdmin } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  deleteNotification,
  getUnreadCount,
  listNotifications,
  markAllAsRead,
  markAsRead,
} from './notifications.controller'

const router = Router()

// All routes require admin authentication
router.use(authenticateAdmin)

// Notification routes
router.get('/', listNotifications)
router.get('/unread-count', getUnreadCount)
router.post('/mark-all-read', markAllAsRead)
router.patch('/:id/read', markAsRead)
router.delete('/:id', deleteNotification)

export default router
