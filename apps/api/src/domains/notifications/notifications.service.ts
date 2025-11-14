import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== CREATE NOTIFICATION ==========================
export const createNotification = async (data: {
  userId?: string
  merchantId?: string
  type: string
  title: string
  message: string
  resourceType?: string
  resourceId?: string
  metadata?: any
}) => {
  try {
    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const notification = await prisma.notification.create({
      data: {
        id: notificationId,
        userId: data.userId,
        merchantId: data.merchantId,
        type: data.type,
        title: data.title,
        message: data.message,
        resourceType: data.resourceType,
        resourceId: data.resourceId,
        metadata: data.metadata,
      },
    })

    logger.info(`Notification created: ${notificationId}`)

    return notification
  } catch (error) {
    logger.error('Failed to create notification:', error)
    throw error
  }
}

// ========================== SEND EMAIL NOTIFICATION ==========================
export const sendEmailNotification = async (data: {
  to: string
  subject: string
  template: string
  data: any
}) => {
  try {
    await emailService.sendEmail({
      to: data.to,
      subject: data.subject,
      template: data.template,
      data: data.data,
    })

    logger.info(`Email notification sent to: ${data.to}`)
  } catch (error) {
    logger.error('Failed to send email notification:', error)
    throw error
  }
}

// ========================== SEND SMS NOTIFICATION ==========================
export const sendSMSNotification = async (data: { to: string; message: string }) => {
  try {
    await smsService.sendSMS({
      to: data.to,
      message: data.message,
    })

    logger.info(`SMS notification sent to: ${data.to}`)
  } catch (error) {
    logger.error('Failed to send SMS notification:', error)
    throw error
  }
}

// ========================== LIST NOTIFICATIONS ==========================
export const listNotifications = async (filters: {
  userId?: string
  merchantId?: string
  isRead?: boolean
  type?: string
  page?: number
  limit?: number
}) => {
  try {
    const { userId, merchantId, isRead, type, page = 1, limit = 20 } = filters
    const skip = (page - 1) * limit

    const where: any = {}

    if (userId) where.userId = userId
    if (merchantId) where.merchantId = merchantId
    if (type) where.type = type
    if (isRead !== undefined) where.isRead = isRead

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where }),
    ])

    logger.info(`Listed ${notifications.length} notifications`)

    return {
      notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    logger.error('Failed to list notifications:', error)
    throw error
  }
}

// ========================== MARK AS READ ==========================
export const markAsRead = async (notificationId: string) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    })

    logger.info(`Notification marked as read: ${notificationId}`)

    return notification
  } catch (error) {
    logger.error('Failed to mark notification as read:', error)
    throw error
  }
}

// ========================== MARK ALL AS READ ==========================
export const markAllAsRead = async (userId?: string, merchantId?: string) => {
  try {
    const where: any = { isRead: false }

    if (userId) where.userId = userId
    if (merchantId) where.merchantId = merchantId

    const result = await prisma.notification.updateMany({
      where,
      data: {
        isRead: true,
        readAt: new Date(),
      },
    })

    logger.info(`Marked ${result.count} notifications as read`)

    return result
  } catch (error) {
    logger.error('Failed to mark all as read:', error)
    throw error
  }
}

// ========================== DELETE NOTIFICATION ==========================
export const deleteNotification = async (notificationId: string) => {
  try {
    await prisma.notification.delete({
      where: { id: notificationId },
    })

    logger.info(`Notification deleted: ${notificationId}`)

    return { success: true }
  } catch (error) {
    logger.error('Failed to delete notification:', error)
    throw error
  }
}

// ========================== GET UNREAD COUNT ==========================
export const getUnreadCount = async (userId?: string, merchantId?: string) => {
  try {
    const where: any = { isRead: false }

    if (userId) where.userId = userId
    if (merchantId) where.merchantId = merchantId

    const count = await prisma.notification.count({ where })

    return { unreadCount: count }
  } catch (error) {
    logger.error('Failed to get unread count:', error)
    throw error
  }
}

// ========================== NOTIFICATION PREFERENCES ==========================
export const getNotificationPreferences = async (merchantId: string) => {
  try {
    const preferences = await prisma.merchantNotifications.findUnique({
      where: { merchantId },
    })

    if (!preferences) {
      // Create default preferences
      return await prisma.merchantNotifications.create({
        data: {
          id: `notif_pref_${Date.now()}`,
          merchantId,
          emailOnNewOrder: true,
          emailOnShipment: true,
          emailOnDelivery: true,
          emailOnReturn: true,
          smsOnNewOrder: false,
          smsOnShipment: true,
          smsOnDelivery: true,
        },
      })
    }

    return preferences
  } catch (error) {
    logger.error('Failed to get notification preferences:', error)
    throw error
  }
}

export const updateNotificationPreferences = async (merchantId: string, data: any) => {
  try {
    const preferences = await prisma.merchantNotifications.upsert({
      where: { merchantId },
      update: data,
      create: {
        id: `notif_pref_${Date.now()}`,
        merchantId,
        ...data,
      },
    })

    logger.info(`Notification preferences updated for merchant: ${merchantId}`)

    return preferences
  } catch (error) {
    logger.error('Failed to update notification preferences:', error)
    throw error
  }
}

// ========================== NOTIFICATION HELPERS ==========================
export const notifyOrderCreated = async (orderId: string) => {
  try {
    const order = await prisma.shopOrder.findUnique({
      where: { id: orderId },
      include: {
        merchant: true,
      },
    })

    if (!order) return

    // Create in-app notification
    await createNotification({
      merchantId: order.merchantId,
      type: 'ORDER_CREATED',
      title: 'New Order Received',
      message: `Order ${order.name} has been created`,
      resourceType: 'ORDER',
      resourceId: order.id,
    })

    // Send email if enabled
    const prefs = await getNotificationPreferences(order.merchantId)
    if (prefs.emailOnNewOrder) {
      await sendEmailNotification({
        to: order.merchant.email,
        subject: 'New Order Received',
        template: 'order-created',
        data: { order },
      })
    }

    // Send SMS if enabled
    if (prefs.smsOnNewOrder && order.merchant.phone) {
      await sendSMSNotification({
        to: order.merchant.phone,
        message: `New order ${order.name} received. Amount: ₹${order.totalPrice}`,
      })
    }
  } catch (error) {
    logger.error('Failed to notify order created:', error)
  }
}

export const notifyOrderShipped = async (orderId: string) => {
  try {
    const order = await prisma.shopOrder.findUnique({
      where: { id: orderId },
      include: {
        merchant: true,
        shipping: true,
      },
    })

    if (!order) return

    // Create notification
    await createNotification({
      merchantId: order.merchantId,
      type: 'ORDER_SHIPPED',
      title: 'Order Shipped',
      message: `Order ${order.name} has been shipped`,
      resourceType: 'ORDER',
      resourceId: order.id,
    })

    // Email/SMS notifications
    const prefs = await getNotificationPreferences(order.merchantId)
    if (prefs.emailOnShipment) {
      await sendEmailNotification({
        to: order.merchant.email,
        subject: 'Order Shipped',
        template: 'order-shipped',
        data: { order },
      })
    }

    if (prefs.smsOnShipment && order.merchant.phone) {
      await sendSMSNotification({
        to: order.merchant.phone,
        message: `Order ${order.name} has been shipped. Track: ${order.shipping?.trackingId}`,
      })
    }
  } catch (error) {
    logger.error('Failed to notify order shipped:', error)
  }
}
