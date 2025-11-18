import { AppError } from '@/common/errors'
import { CookieMerchantType } from '@/common/types/common.types'
import { prisma } from '@/config/prisma'
import { NextFunction, Request, Response } from 'express'

export const authenticateShopify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get shop from query, body, or headers
    const shop =
      (req.query.shop as string) ||
      (req.body.shop as string) ||
      (req.headers['x-shopify-shop-domain'] as string)

    if (!shop) {
      throw new AppError('Shop domain is required', 400)
    }

    // Find store and merchant
    const store = await prisma.merchantStore.findFirst({
      where: {
        storeUrl: shop,
        isActive: true,
        status: 'ACTIVE',
      },
      include: {
        merchant: {
          select: {
            id: true,
            businessName: true,
            email: true,
          },
        },
      },
    })

    if (!store) {
      throw new AppError('Store not found or inactive', 404)
    }

    // Attach to request - matches CookieMerchantType
    req.merchant = {
      id: store.merchant.id,
      businessName: store.merchant.businessName,
      email: store.merchant.email,
    } as CookieMerchantType

    // Additional Shopify-specific data
    req.shop = shop
    req.storeId = store.id

    next()
  } catch (err: any) {
    next(new AppError(err.message || 'Shopify authentication failed', 401))
  }
}
