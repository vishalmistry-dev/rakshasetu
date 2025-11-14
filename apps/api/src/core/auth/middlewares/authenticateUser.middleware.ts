import { AppError } from '@/common/errors'
import { CookieUserType } from '@/common/types/common.types'
import { prisma } from '@/config/prisma' // ✅ Add this
import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../shared/token.manager'

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.accessToken

    if (!token) {
      throw new AppError('Unauthorized: Access token not provided', 401)
    }

    const payload = verifyAccessToken(token)

    if (!payload || !payload.id) {
      throw new AppError('Unauthorized: Invalid token provided', 401)
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id, email: payload.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        type: true,
      },
    })

    if (!user) {
      throw new AppError('Unauthorized: User not found', 401)
    }

    req.user = user as CookieUserType
    next()
  } catch (err: any) {
    next(new AppError(err.message || 'User authentication failed', 401))
  }
}
