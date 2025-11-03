import { AppError } from '@/common/errors'
import { prisma } from '@/config/prisma'

interface ListProductsParams {
  storeId?: string
  search?: string
  page?: number
  limit?: number
}

// ========================== LIST PRODUCTS ==========================
export const listProducts = async (merchantId: string, params: ListProductsParams) => {
  const { storeId, search, page = 1, limit = 20 } = params

  const skip = (page - 1) * limit

  // Build where clause
  const where: any = {
    merchantId,
  }

  if (storeId) {
    where.storeId = storeId
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } },
    ]
  }

  // Get products and count
  const [products, total] = await Promise.all([
    prisma.shopProduct.findMany({
      where,
      include: {
        store: {
          select: {
            id: true,
            storeName: true,
            storeUrl: true,
          },
        },
        variants: {
          select: {
            id: true,
            title: true,
            price: true,
            sku: true,
            inventoryQty: true,
            isAvailable: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.shopProduct.count({ where }),
  ])

  return {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// ========================== GET PRODUCT BY ID ==========================
export const getProductById = async (productId: string, merchantId: string) => {
  const product = await prisma.shopProduct.findFirst({
    where: {
      id: productId,
      merchantId,
    },
    include: {
      store: true,
      variants: true,
    },
  })

  if (!product) {
    throw new AppError('Product not found', 404)
  }

  return product
}

// ========================== SYNC PRODUCTS FROM SHOPIFY ==========================
export const syncProductsFromShopify = async (storeId: string, merchantId: string) => {
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

  // Update sync status
  await prisma.merchantStore.update({
    where: { id: storeId },
    data: {
      syncStatus: 'SYNCING',
      lastProductsSyncedAt: new Date(),
    },
  })

  // TODO: Implement actual Shopify product fetch
  // For now, just update status
  await prisma.merchantStore.update({
    where: { id: storeId },
    data: {
      syncStatus: 'COMPLETED',
    },
  })

  return {
    message: 'Product sync initiated',
  }
}
