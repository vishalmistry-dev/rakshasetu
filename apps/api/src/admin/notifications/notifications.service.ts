import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== CREATE ADMIN NOTIFICATION ==========================
export const createAdminNotification = async (data: {
  adminId?: string // If null, send to all admins
  type: string
  title: string
  message: string
  priority?: string
  resourceType?: string
  resourceId?: string
  metadata?: any
}) => {
  try {
    const notificationId = `adm_notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const notification = await prisma.adminNotification.create({
      data: {
        id: notificationId,
        adminId: data.adminId,
        type: data.type,
        title: data.title,
        message: data.message,
        priority: data.priority || 'NORMAL',
        resourceType: data.resourceType,
        resourceId: data.resourceId,
        metadata: data.metadata,
      },
    })

    logger.info(`Admin notification created: ${notificationId}`)

    return notification
  } catch (error) {
    logger.error('Failed to create admin notification:', error)
    throw error
  }
}

// ========================== LIST ADMIN NOTIFICATIONS ==========================
export const listAdminNotifications = async (filters: {
  adminId?: string
  isRead?: boolean
  priority?: string
  type?: string
  page?: number
  limit?: number
}) => {
  try {
    const { adminId, isRead, priority, type, page = 1, limit = 20 } = filters
    const skip = (page - 1) * limit

    const where: any = {}

    if (adminId) where.adminId = adminId
    if (type) where.type = type
    if (priority) where.priority = priority
    if (isRead !== undefined) where.isRead = isRead

    const [notifications, total] = await Promise.all([
      prisma.adminNotification.findMany({
        where,
        orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.adminNotification.count({ where }),
    ])

    logger.info(`Listed ${notifications.length} admin notifications`)

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
    logger.error('Failed to list admin notifications:', error)
    throw error
  }
}

// ========================== MARK AS READ ==========================
export const markAsRead = async (notificationId: string) => {
  try {
    const notification = await prisma.adminNotification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    })

    logger.info(`Admin notification marked as read: ${notificationId}`)

    return notification
  } catch (error) {
    logger.error('Failed to mark admin notification as read:', error)
    throw error
  }
}

// ========================== MARK ALL AS READ ==========================
export const markAllAsRead = async (adminId: string) => {
  try {
    const result = await prisma.adminNotification.updateMany({
      where: {
        adminId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    })

    logger.info(`Marked ${result.count} admin notifications as read`)

    return result
  } catch (error) {
    logger.error('Failed to mark all admin notifications as read:', error)
    throw error
  }
}

// ========================== GET UNREAD COUNT ==========================
export const getUnreadCount = async (adminId?: string) => {
  try {
    const where: any = { isRead: false }
    if (adminId) where.adminId = adminId

    const count = await prisma.adminNotification.count({ where })

    return { unreadCount: count }
  } catch (error) {
    logger.error('Failed to get unread count:', error)
    throw error
  }
}

// ========================== DELETE NOTIFICATION ==========================
export const deleteNotification = async (notificationId: string) => {
  try {
    await prisma.adminNotification.delete({
      where: { id: notificationId },
    })

    logger.info(`Admin notification deleted: ${notificationId}`)

    return { success: true }
  } catch (error) {
    logger.error('Failed to delete admin notification:', error)
    throw error
  }
}

// ========================== NOTIFICATION HELPERS ==========================

// Notify when high-value order placed
export const notifyHighValueOrder = async (orderId: string) => {
  try {
    const order = await prisma.shopOrder.findUnique({
      where: { id: orderId },
      include: {
        merchant: {
          select: {
            businessName: true,
          },
        },
      },
    })

    if (!order || order.totalPrice < 50000) return

    await createAdminNotification({
      type: 'HIGH_VALUE_ORDER',
      title: 'High-Value Order Alert',
      message: `Order ${order.name} worth ₹${order.totalPrice} from ${order.merchant.businessName}`,
      priority: 'HIGH',
      resourceType: 'ORDER',
      resourceId: orderId,
      metadata: {
        amount: order.totalPrice,
        merchantId: order.merchantId,
      },
    })
  } catch (error) {
    logger.error('Failed to notify high-value order:', error)
  }
}

// Notify when new merchant registers
export const notifyNewMerchant = async (merchantId: string) => {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    })

    if (!merchant) return

    await createAdminNotification({
      type: 'MERCHANT_PENDING',
      title: 'New Merchant Registration',
      message: `${merchant.businessName} has registered and pending approval`,
      priority: 'NORMAL',
      resourceType: 'MERCHANT',
      resourceId: merchantId,
    })
  } catch (error) {
    logger.error('Failed to notify new merchant:', error)
  }
}

// Notify when dispute raised
export const notifyDisputeRaised = async (disputeId: string) => {
  try {
    const dispute = await prisma.shopDisputeTicket.findUnique({
      where: { id: disputeId },
      include: {
        order: {
          select: {
            name: true,
            totalPrice: true,
          },
        },
      },
    })

    if (!dispute) return

    await createAdminNotification({
      type: 'DISPUTE_RAISED',
      title: 'New Dispute Raised',
      message: `Dispute raised for order ${dispute.order.name} - ₹${dispute.order.totalPrice}`,
      priority: 'URGENT',
      resourceType: 'DISPUTE',
      resourceId: disputeId,
      metadata: {
        orderId: dispute.orderId,
        reason: dispute.reason,
      },
    })
  } catch (error) {
    logger.error('Failed to notify dispute raised:', error)
  }
}

// Notify when payment fails
export const notifyPaymentFailed = async (paymentId: string) => {
  try {
    const payment = await prisma.shopPayment.findUnique({
      where: { id: paymentId },
      include: {
        merchant: {
          select: {
            businessName: true,
          },
        },
      },
    })

    if (!payment) return

    await createAdminNotification({
      type: 'PAYMENT_FAILED',
      title: 'Payment Failed',
      message: `Payment of ₹${payment.amount} failed for ${payment.merchant?.businessName}`,
      priority: 'HIGH',
      resourceType: 'PAYMENT',
      resourceId: paymentId,
      metadata: {
        amount: payment.amount,
        errorCode: payment.errorCode,
        errorMessage: payment.errorMessage,
      },
    })
  } catch (error) {
    logger.error('Failed to notify payment failed:', error)
  }
}
