import { asyncHandler, sendResponse } from '@/common/utils'
import * as notificationsService from './notifications.service'

// List notifications
export const listNotifications = asyncHandler(async (req, res) => {
  const userId = req.user?.id
  const merchantId = req.merchant?.id

  const filters = {
    userId,
    merchantId,
    isRead: req.query.isRead === 'true' ? true : req.query.isRead === 'false' ? false : undefined,
    type: req.query.type as string,
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
  }

  const result = await notificationsService.listNotifications(filters)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notifications retrieved successfully',
    data: result.notifications,
    meta: result.pagination,
  })
})

// Get unread count
export const getUnreadCount = asyncHandler(async (req, res) => {
  const userId = req.user?.id
  const merchantId = req.merchant?.id

  const result = await notificationsService.getUnreadCount(userId, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Unread count retrieved successfully',
    data: result,
  })
})

// Mark as read
export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params

  const notification = await notificationsService.markAsRead(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notification marked as read',
    data: notification,
  })
})

// Mark all as read
export const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user?.id
  const merchantId = req.merchant?.id

  const result = await notificationsService.markAllAsRead(userId, merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All notifications marked as read',
    data: result,
  })
})

// Delete notification
export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params

  await notificationsService.deleteNotification(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notification deleted successfully',
  })
})

// Get notification preferences
export const getPreferences = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id

  const preferences = await notificationsService.getNotificationPreferences(merchantId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notification preferences retrieved successfully',
    data: preferences,
  })
})

// Update notification preferences
export const updatePreferences = asyncHandler(async (req, res) => {
  const merchantId = req.merchant!.id
  const data = req.body

  const preferences = await notificationsService.updateNotificationPreferences(merchantId, data)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notification preferences updated successfully',
    data: preferences,
  })
})
