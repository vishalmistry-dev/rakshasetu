import { asyncHandler, sendResponse } from '@/common/utils'
import * as notificationsService from './notifications.service'

// List admin notifications
export const listNotifications = asyncHandler(async (req, res) => {
  const adminId = req.admin!.id

  const filters = {
    adminId,
    isRead: req.query.isRead === 'true' ? true : req.query.isRead === 'false' ? false : undefined,
    priority: req.query.priority as string,
    type: req.query.type as string,
    page: req.query.page ? parseInt(req.query.page as string) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
  }

  const result = await notificationsService.listAdminNotifications(filters)

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
  const adminId = req.admin!.id

  const result = await notificationsService.getUnreadCount(adminId)

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
  const adminId = req.admin!.id

  const result = await notificationsService.markAllAsRead(adminId)

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
