import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== LIST MERCHANTS ==========================
export const listMerchants = async (filters: {
  status?: string
  search?: string
  page?: number
  limit?: number
}) => {
  try {
    const { status, search, page = 1, limit = 20 } = filters
    const skip = (page - 1) * limit

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [merchants, total] = await Promise.all([
      prisma.merchant.findMany({
        where,
        include: {
          stores: {
            select: {
              id: true,
              storeName: true,
              storeSlug: true,
              status: true,
            },
          },
          _count: {
            select: {
              stores: true,
              orders: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.merchant.count({ where }),
    ])

    logger.info(`Listed ${merchants.length} merchants`)

    return {
      merchants,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    logger.error('Failed to list merchants:', error)
    throw error
  }
}

// ========================== GET MERCHANT DETAILS ==========================
export const getMerchantById = async (merchantId: string) => {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
      include: {
        stores: {
          include: {
            _count: {
              select: {
                products: true,
                orders: true,
              },
            },
          },
        },
        orders: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            totalPrice: true,
            status: true,
            createdAt: true,
          },
        },
        account: true,
        addresses: true,
        _count: {
          select: {
            stores: true,
            orders: true,
          },
        },
      },
    })

    if (!merchant) {
      throw new AppError('Merchant not found', 404)
    }

    // Get revenue stats
    const revenueStats = await prisma.shopOrder.aggregate({
      where: {
        merchantId,
        status: 'DELIVERED',
      },
      _sum: {
        totalPrice: true,
      },
      _count: {
        id: true,
      },
    })

    logger.info(`Fetched merchant details: ${merchantId}`)

    return {
      merchant,
      stats: {
        totalRevenue: revenueStats._sum.totalPrice || 0,
        completedOrders: revenueStats._count.id,
      },
    }
  } catch (error) {
    logger.error('Failed to get merchant:', error)
    throw error
  }
}

// ========================== UPDATE MERCHANT STATUS ==========================
export const updateMerchantStatus = async (merchantId: string, status: string, adminId: string) => {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    })

    if (!merchant) {
      throw new AppError('Merchant not found', 404)
    }

    // Update merchant status
    const updated = await prisma.merchant.update({
      where: { id: merchantId },
      data: { status: status as any },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'MERCHANT_STATUS_UPDATED',
        resource: 'MERCHANT',
        resourceId: merchantId,
        metadata: {
          oldStatus: merchant.status,
          newStatus: status,
        },
      },
    })

    logger.info(`Merchant ${merchantId} status updated to ${status} by admin ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to update merchant status:', error)
    throw error
  }
}

// ========================== APPROVE/REJECT MERCHANT ==========================
export const approveMerchant = async (merchantId: string, adminId: string) => {
  return updateMerchantStatus(merchantId, 'ACTIVE', adminId)
}

export const rejectMerchant = async (merchantId: string, adminId: string, reason?: string) => {
  try {
    const merchant = await prisma.merchant.update({
      where: { id: merchantId },
      data: {
        status: 'INACTIVE',
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'MERCHANT_REJECTED',
        resource: 'MERCHANT',
        resourceId: merchantId,
        metadata: {
          reason: reason || 'No reason provided',
        },
      },
    })

    logger.info(`Merchant ${merchantId} rejected by admin ${adminId}`)

    return merchant
  } catch (error) {
    logger.error('Failed to reject merchant:', error)
    throw error
  }
}

// ========================== DELETE MERCHANT ==========================
export const deleteMerchant = async (merchantId: string, adminId: string) => {
  try {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    })

    if (!merchant) {
      throw new AppError('Merchant not found', 404)
    }

    // Check if merchant has orders
    if (merchant._count.orders > 0) {
      throw new AppError('Cannot delete merchant with existing orders. Deactivate instead.', 400)
    }

    // Delete merchant (cascade will handle related records)
    await prisma.merchant.delete({
      where: { id: merchantId },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'MERCHANT_DELETED',
        resource: 'MERCHANT',
        resourceId: merchantId,
        metadata: {
          businessName: merchant.businessName,
          email: merchant.email,
        },
      },
    })

    logger.info(`Merchant ${merchantId} deleted by admin ${adminId}`)

    return { success: true }
  } catch (error) {
    logger.error('Failed to delete merchant:', error)
    throw error
  }
}

// ========================== GET MERCHANT STATS ==========================
export const getMerchantStats = async (merchantId: string) => {
  try {
    const [orderStats, revenueByMonth, topProducts] = await Promise.all([
      // Order stats
      prisma.shopOrder.groupBy({
        by: ['status'],
        where: { merchantId },
        _count: { id: true },
      }),

      // Revenue by month (last 12 months)
      prisma.$queryRaw`
        SELECT
          DATE_TRUNC('month', "createdAt") as month,
          COUNT(*) as orders,
          SUM("totalPrice") as revenue
        FROM shop_orders
        WHERE "merchantId" = ${merchantId}
          AND "createdAt" >= NOW() - INTERVAL '12 months'
        GROUP BY month
        ORDER BY month DESC
      `,

      // Top selling products
      prisma.shopOrderItem.groupBy({
        by: ['productId'],
        where: {
          order: {
            merchantId,
            status: 'DELIVERED',
          },
        },
        _sum: {
          quantity: true,
        },
        _count: {
          id: true,
        },
        orderBy: {
          _sum: {
            quantity: 'desc',
          },
        },
        take: 10,
      }),
    ])

    logger.info(`Fetched stats for merchant: ${merchantId}`)

    return {
      ordersByStatus: orderStats.map((stat) => ({
        status: stat.status,
        count: stat._count.id,
      })),
      revenueByMonth,
      topProducts,
    }
  } catch (error) {
    logger.error('Failed to get merchant stats:', error)
    throw error
  }
}
