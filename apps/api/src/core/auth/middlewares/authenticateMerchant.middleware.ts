// core/auth/middlewares/authenticateMerchant.middleware.ts
import { AppError } from '@/common/errors'
import { CookieMerchantType } from '@/common/types/common.types'
import { prisma } from '@/config/prisma'
import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../shared/token.manager'

export const authenticateMerchant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header or cookies
    const token =
      req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.merchantAccessToken

    if (!token) {
      throw new AppError('Unauthorized: Merchant access token not provided', 401)
    }

    // Verify token
    const payload = verifyAccessToken(token)

    if (!payload || !payload.id) {
      throw new AppError('Unauthorized: Invalid token provided', 401)
    }

    const merchant = await prisma.merchant.findUnique({
      where: { id: payload.id, email: payload.email },
      select: {
        id: true,
        businessName: true,
        email: true,
      },
    })

    if (!merchant) {
      throw new AppError('Unauthorized: User not found', 401)
    }

    // Attach merchant payload to request
    req.merchant = merchant as CookieMerchantType // will be typed as CookieMerchantType

    next()
  } catch (err: any) {
    next(new AppError(err.message || 'Merchant authentication failed', 401))
  }
}
