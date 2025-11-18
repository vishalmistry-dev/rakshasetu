import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== LIST ORDERS ==========================
export const listOrders = async (filters: {
  merchantId?: string
  storeId?: string
  status?: string
  search?: string
  page?: number
  limit?: number
}) => {
  try {
    const { merchantId, storeId, status, search, page = 1, limit = 20 } = filters
    const skip = (page - 1) * limit

    const where: any = {}

    if (merchantId) where.merchantId = merchantId
    if (storeId) where.storeId = storeId
    if (status) where.status = status

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [orders, total] = await Promise.all([
      prisma.shopOrder.findMany({
        where,
        include: {
          merchant: {
            select: {
              id: true,
              businessName: true,
            },
          },
          store: {
            select: {
              id: true,
              storeName: true,
            },
          },
          lineItems: {
            select: {
              id: true,
              title: true,
              quantity: true,
              price: true,
            },
          },
          shipping: {
            select: {
              id: true,
              trackingId: true,
              status: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.shopOrder.count({ where }),
    ])

    logger.info(`Listed ${orders.length} orders`)

    return {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    logger.error('Failed to list orders:', error)
    throw error
  }
}

// ========================== GET ORDER DETAILS ==========================
export const getOrderById = async (orderId: string) => {
  try {
    const order = await prisma.shopOrder.findUnique({
      where: { id: orderId },
      include: {
        merchant: {
          select: {
            id: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        store: {
          select: {
            id: true,
            storeName: true,
            storeUrl: true,
          },
        },
        lineItems: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
              },
            },
          },
        },
        transaction: true,
        shipping: {
          include: {
            logistics: true,
            trackingEvents: {
              orderBy: { timestamp: 'desc' },
              take: 10,
            },
          },
        },
        dispute: true,
        refunds: true,
        returnRequests: true,
      },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    logger.info(`Fetched order details: ${orderId}`)

    return order
  } catch (error) {
    logger.error('Failed to get order:', error)
    throw error
  }
}

// ========================== UPDATE ORDER STATUS ==========================
export const updateOrderStatus = async (
  orderId: string,
  status: string,
  adminId: string,
  notes?: string
) => {
  try {
    const order = await prisma.shopOrder.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    // Update order status
    const updated = await prisma.shopOrder.update({
      where: { id: orderId },
      data: {
        status: status as any,
        note: notes || order.note,
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'ORDER_STATUS_UPDATED',
        resource: 'ORDER',
        resourceId: orderId,
        metadata: {
          oldStatus: order.status,
          newStatus: status,
          notes,
        },
      },
    })

    logger.info(`Order ${orderId} status updated to ${status} by admin ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to update order status:', error)
    throw error
  }
}

// ========================== GET HIGH VALUE ORDERS ==========================
export const getHighValueOrders = async (minAmount: number = 50000) => {
  try {
    const orders = await prisma.shopOrder.findMany({
      where: {
        totalPrice: { gte: minAmount },
        status: { in: ['CREATED', 'PAYMENT_PENDING', 'PAYMENT_RECEIVED'] },
      },
      include: {
        merchant: {
          select: {
            id: true,
            businessName: true,
          },
        },
      },
      orderBy: { totalPrice: 'desc' },
      take: 50,
    })

    logger.info(`Found ${orders.length} high-value orders`)

    return orders
  } catch (error) {
    logger.error('Failed to get high-value orders:', error)
    throw error
  }
}

// ========================== GET ORDER STATISTICS ==========================
export const getOrderStatistics = async () => {
  try {
    const [totalOrders, ordersByStatus, recentOrders, todayOrders, avgOrderValue] =
      await Promise.all([
        // Total orders
        prisma.shopOrder.count(),

        // Orders by status
        prisma.shopOrder.groupBy({
          by: ['status'],
          _count: { id: true },
        }),

        // Orders in last 7 days
        prisma.shopOrder.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        }),

        // Orders today
        prisma.shopOrder.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        }),

        // Average order value
        prisma.shopOrder.aggregate({
          _avg: { totalPrice: true },
        }),
      ])

    logger.info('Order statistics fetched')

    return {
      totalOrders,
      ordersByStatus: ordersByStatus.map((item) => ({
        status: item.status,
        count: item._count.id,
      })),
      recentOrders,
      todayOrders,
      avgOrderValue: avgOrderValue._avg.totalPrice || 0,
    }
  } catch (error) {
    logger.error('Failed to get order statistics:', error)
    throw error
  }
}
