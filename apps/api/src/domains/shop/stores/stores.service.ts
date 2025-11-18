import { AppError } from '@/common/errors'
import { prisma } from '@/config/prisma'

// ========================== LIST STORES ==========================
export const listStores = async (merchantId: string) => {
  const stores = await prisma.merchantStore.findMany({
    where: {
      merchantId,
      isActive: true,
    },
    select: {
      id: true,
      storeName: true,
      storeUrl: true,
      storeType: true,
      status: true,
      installedAt: true,
      lastActiveAt: true,
      totalOrders: true,
      totalRevenue: true,
      onboardingComplete: true,
    },
    orderBy: {
      installedAt: 'desc',
    },
  })

  return stores
}

// ========================== GET STORE DETAILS ==========================
export const getStoreById = async (storeId: string, merchantId: string) => {
  const store = await prisma.merchantStore.findFirst({
    where: {
      id: storeId,
      merchantId, // Ensure merchant owns this store
    },
    include: {
      config: true,
      subscription: true,
      preferences: true,
    },
  })

  if (!store) {
    throw new AppError('Store not found', 404)
  }

  return store
}

// ========================== GET STORE STATS ==========================
export const getStoreStats = async (storeId: string, merchantId: string) => {
  // Verify store belongs to merchant
  const store = await prisma.merchantStore.findFirst({
    where: {
      id: storeId,
      merchantId,
    },
  })

  if (!store) {
    throw new AppError('Store not found', 404)
  }

  // Get order stats
  const [totalOrders, pendingOrders, completedOrders] = await Promise.all([
    prisma.shopOrder.count({
      where: { storeId },
    }),
    prisma.shopOrder.count({
      where: {
        storeId,
        status: {
          in: ['CREATED', 'PAYMENT_PENDING', 'PAYMENT_RECEIVED'],
        },
      },
    }),
    prisma.shopOrder.count({
      where: {
        storeId,
        status: 'DELIVERED',
      },
    }),
  ])

  // Get revenue
  const revenueResult = await prisma.shopOrder.aggregate({
    where: {
      storeId,
      status: {
        notIn: ['CANCELLED', 'REFUND_COMPLETED'],
      },
    },
    _sum: {
      totalPrice: true,
    },
  })

  const totalRevenue = revenueResult._sum.totalPrice || 0

  // Get product count
  const totalProducts = await prisma.shopProduct.count({
    where: { storeId },
  })

  // Get recent orders
  const recentOrders = await prisma.shopOrder.findMany({
    where: { storeId },
    select: {
      id: true,
      externalId: true,
      name: true,
      totalPrice: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  })

  return {
    totalOrders,
    pendingOrders,
    completedOrders,
    totalRevenue,
    totalProducts,
    recentOrders,
    store: {
      id: store.id,
      name: store.storeName,
      url: store.storeUrl,
    },
  }
}
