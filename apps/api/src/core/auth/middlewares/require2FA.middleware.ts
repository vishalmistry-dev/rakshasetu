import { AppError } from '@/common/errors'
import { NextFunction, Request, Response } from 'express'

export const require2FA = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user

    if (!user) {
      throw new AppError('Unauthorized: No user found', 401)
    }

    // Check if 2FA is enabled and not yet verified in this session
    if (user.is2FAEnabled && !user.is2FAVerified) {
      throw new AppError('Two-factor authentication required', 403)
    }

    next()
  } catch (err) {
    next(err)
  }
}
