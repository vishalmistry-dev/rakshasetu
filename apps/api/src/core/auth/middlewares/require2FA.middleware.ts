// core/auth/middlewares/require2FA.middleware.ts
import { AppError } from '@/common/errors'
import { NextFunction, Request, Response } from 'express'

export const require2FA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user

    // Determine the entity we are checking
    const entity = user

    if (!entity) {
      throw new AppError('Unauthorized: No user or merchant found', 401)
    }

    // Check if 2FA is enabled and verified
    if (entity.is2FAEnabled && !entity.is2FAVerified) {
      throw new AppError('Two-factor authentication required', 403)
    }

    next()
  } catch (err) {
    next(err)
  }
}
