// core/auth/middlewares/authorizeRole.middleware.ts
import { AppError } from '@/common/errors'
import { NextFunction, Request, Response } from 'express'

export const authorizeRole = (allowedRoles: ('USER' | 'MERCHANT')[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role = req.user?.role

    if (!role) {
      return next(new AppError('Unauthorized: Role not found', 401))
    }

    if (!allowedRoles.includes(role)) {
      return next(new AppError('Forbidden: Insufficient role', 403))
    }

    next()
  }
}
