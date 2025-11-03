import { AppError } from '@/common/errors'
import { prisma } from '@/config/prisma'
import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../shared/token.manager'

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.adminAccessToken

    if (!token) {
      throw new AppError('Unauthorized: Admin access token not provided', 401)
    }

    const payload = verifyAccessToken(token)

    if (!payload || !payload.id) {
      throw new AppError('Unauthorized: Invalid token provided', 401)
    }

    const admin = await prisma.admin.findUnique({
      where: { id: payload.id, email: payload.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        status: true,
        roleId: true,
      },
    })

    if (!admin || admin.status !== 'ACTIVE') {
      throw new AppError('Unauthorized: Admin not found or inactive', 401)
    }

    req.admin = admin
    next()
  } catch (err: any) {
    next(new AppError(err.message || 'Admin authentication failed', 401))
  }
}
