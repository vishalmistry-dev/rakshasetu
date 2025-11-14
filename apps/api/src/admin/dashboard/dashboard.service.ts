import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== GET DASHBOARD OVERVIEW ==========================
export const getDashboardOverview = async () => {
  try {
    // Get counts
    const [
      totalMerchants,
      activeMerchants,
      totalStores,
      totalOrders,
      totalRevenue,
      pendingDisputes,
      totalShipments,
    ] = await Promise.all([
      // Merchants
      prisma.merchant.count(),
      prisma.merchant.count({ where: { status: 'ACTIVE' } }),

      // Stores
      prisma.merchantStore.count({ where: { status: 'ACTIVE' } }),

      // Orders
      prisma.shopOrder.count(),

      // Revenue (sum of all completed orders)
      prisma.shopOrder.aggregate({
        where: { status: 'DELIVERED' },
        _sum: { totalPrice: true },
      }),

      // Disputes
      prisma.shopDisputeTicket.count({ where: { status: 'PENDING' } }),

      // Shipments
      prisma.shipping.count(),
    ])

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const [newMerchants, newOrders, newDisputes] = await Promise.all([
      prisma.merchant.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.shopOrder.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.shopDisputeTicket.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
    ])

    // Get order status breakdown
    const ordersByStatus = await prisma.shopOrder.groupBy({
      by: ['status'],
      _count: { id: true },
    })

    // Get payment method breakdown
    const ordersByPaymentType = await prisma.shopOrder.groupBy({
      by: ['paymentType'],
      _count: { id: true },
      where: { paymentType: { not: null } },
    })

    logger.info('Dashboard overview fetched successfully')

    return {
      overview: {
        merchants: {
          total: totalMerchants,
          active: activeMerchants,
          newThisMonth: newMerchants,
        },
        stores: {
          total: totalStores,
        },
        orders: {
          total: totalOrders,
          newThisMonth: newOrders,
          byStatus: ordersByStatus.map((item) => ({
            status: item.status,
            count: item._count.id,
          })),
          byPaymentType: ordersByPaymentType.map((item) => ({
            type: item.paymentType,
            count: item._count.id,
          })),
        },
        revenue: {
          total: totalRevenue._sum.totalPrice || 0,
          currency: 'INR',
        },
        shipments: {
          total: totalShipments,
        },
        disputes: {
          pending: pendingDisputes,
          newThisMonth: newDisputes,
        },
      },
    }
  } catch (error) {
    logger.error('Failed to fetch dashboard overview:', error)
    throw error
  }
}

// ========================== GET RECENT ACTIVITY ==========================
export const getRecentActivity = async (limit: number = 20) => {
  try {
    // Get recent merchants
    const recentMerchants = await prisma.merchant.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        businessName: true,
        email: true,
        status: true,
        createdAt: true,
      },
    })

    // Get recent orders
    const recentOrders = await prisma.shopOrder.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        merchant: {
          select: {
            id: true,
            businessName: true,
          },
        },
      },
    })

    // Get recent disputes
    const recentDisputes = await prisma.shopDisputeTicket.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        orderId: true,
        reason: true,
        status: true,
        createdAt: true,
        order: {
          select: {
            name: true,
            merchant: {
              select: {
                businessName: true,
              },
            },
          },
        },
      },
    })

    logger.info('Recent activity fetched successfully')

    return {
      merchants: recentMerchants,
      orders: recentOrders,
      disputes: recentDisputes,
    }
  } catch (error) {
    logger.error('Failed to fetch recent activity:', error)
    throw error
  }
}

// ========================== GET PLATFORM STATS (TIME SERIES) ==========================
export const getPlatformStats = async (days: number = 30) => {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get daily stats
    const stats = await prisma.platformStats.findMany({
      where: {
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
    })

    logger.info(`Platform stats fetched for last ${days} days`)

    return stats
  } catch (error) {
    logger.error('Failed to fetch platform stats:', error)
    throw error
  }
}
