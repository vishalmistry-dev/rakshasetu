import { AppError } from '@/common/errors'
import { prisma } from '@/config/prisma'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/core/auth/shared/token.manager'

export const exchangeToken = async (shop: string, token: string) => {
  if (!shop || !token) {
    throw new AppError('Shop and token are required', 400)
  }

  // Verify the refresh token
  const payload = verifyRefreshToken(token)

  if (!payload || !payload.id) {
    throw new AppError('Invalid or expired token', 401)
  }

  // Find merchant
  const merchant = await prisma.merchant.findUnique({
    where: {
      id: payload.id,
      email: payload.email,
    },
    select: {
      id: true,
      businessName: true,
      email: true,
      refreshToken: true,
      refreshTokenExpires: true,
    },
  })

  if (!merchant) {
    throw new AppError('Merchant not found', 404)
  }

  // Verify token matches and is not expired
  if (merchant.refreshToken !== token) {
    throw new AppError('Invalid token', 401)
  }

  if (merchant.refreshTokenExpires && new Date() > merchant.refreshTokenExpires) {
    throw new AppError('Token expired', 401)
  }

  // Verify merchant has access to this shop
  const store = await prisma.merchantStore.findFirst({
    where: {
      merchantId: merchant.id,
      storeUrl: shop,
      isActive: true,
    },
  })

  if (!store) {
    throw new AppError('Store not found or access denied', 403)
  }

  // Generate new JWT tokens for dashboard
  const accessToken = generateAccessToken({
    id: merchant.id,
    email: merchant.email,
  })

  const newRefreshToken = generateRefreshToken({
    id: merchant.id,
    email: merchant.email,
  })

  // Update refresh token in database
  await prisma.merchant.update({
    where: { id: merchant.id },
    data: {
      refreshToken: newRefreshToken,
      refreshTokenExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      lastLoginAt: new Date(),
    },
  })

  return {
    accessToken,
    refreshToken: newRefreshToken,
    merchant: {
      id: merchant.id,
      businessName: merchant.businessName,
      email: merchant.email,
    },
  }
}
