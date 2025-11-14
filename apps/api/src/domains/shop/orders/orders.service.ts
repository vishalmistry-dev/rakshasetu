import { AppError } from '@/common/errors'
import { prisma } from '@/config/prisma'
import type { ORDER_STATUS } from '@rakshasetu/database'

interface ListOrdersParams {
  storeId?: string
  status?: string
  search?: string
  page?: number
  limit?: number
}

// ========================== LIST ORDERS ==========================
export const listOrders = async (merchantId: string, params: ListOrdersParams) => {
  const { storeId, status, search, page = 1, limit = 20 } = params

  const skip = (page - 1) * limit

  // Build where clause
  const where: any = {
    merchantId,
  }

  if (storeId) {
    where.storeId = storeId
  }

  if (status) {
    where.status = status
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { externalId: { contains: search, mode: 'insensitive' } },
      { customerName: { contains: search, mode: 'insensitive' } },
      { customerEmail: { contains: search, mode: 'insensitive' } },
    ]
  }

  // Get orders and count
  const [orders, total] = await Promise.all([
    prisma.shopOrder.findMany({
      where,
      include: {
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
                title: true,
                imageUrl: true,
              },
            },
          },
        },
        shipping: {
          select: {
            trackingId: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.shopOrder.count({ where }),
  ])

  return {
    orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// ========================== GET ORDER BY ID ==========================
export const getOrderById = async (orderId: string, merchantId: string) => {
  const order = await prisma.shopOrder.findFirst({
    where: {
      id: orderId,
      merchantId,
    },
    include: {
      store: true,
      lineItems: {
        include: {
          product: true,
          variant: true,
        },
      },
      transaction: true,
      shipping: {
        include: {
          trackingEvents: {
            orderBy: {
              timestamp: 'desc',
            },
          },
        },
      },
      returnRequests: true,
      dispute: true,
    },
  })

  if (!order) {
    throw new AppError('Order not found', 404)
  }

  return order
}

// ========================== GET ORDER STATS ==========================
export const getOrderStats = async (merchantId: string, storeId?: string) => {
  const where: any = { merchantId }

  if (storeId) {
    where.storeId = storeId
  }

  const [
    totalOrders,
    pendingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    revenueResult,
  ] = await Promise.all([
    prisma.shopOrder.count({ where }),
    prisma.shopOrder.count({
      where: {
        ...where,
        status: {
          in: ['CREATED', 'PAYMENT_PENDING', 'PAYMENT_RECEIVED'],
        },
      },
    }),
    prisma.shopOrder.count({
      where: {
        ...where,
        status: {
          in: ['PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY'],
        },
      },
    }),
    prisma.shopOrder.count({
      where: {
        ...where,
        status: 'DELIVERED',
      },
    }),
    prisma.shopOrder.count({
      where: {
        ...where,
        status: 'CANCELLED',
      },
    }),
    prisma.shopOrder.aggregate({
      where: {
        ...where,
        status: {
          notIn: ['CANCELLED', 'REFUND_COMPLETED'],
        },
      },
      _sum: {
        totalPrice: true,
      },
    }),
  ])

  return {
    totalOrders,
    pendingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue: revenueResult._sum.totalPrice || 0,
  }
}

export const updateOrderStatus = async (
  orderId: string,
  merchantId: string,
  status: ORDER_STATUS
) => {
  // Verify order belongs to merchant
  const order = await prisma.shopOrder.findFirst({
    where: {
      id: orderId,
      merchantId,
    },
  })

  if (!order) {
    throw new AppError('Order not found', 404)
  }

  // Update status
  const updatedOrder = await prisma.shopOrder.update({
    where: { id: orderId },
    data: { status },
  })

  return updatedOrder
}
