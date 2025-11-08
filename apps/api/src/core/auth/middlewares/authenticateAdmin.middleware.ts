import { AppError } from '@/common/errors'
import { prisma } from '@/config/prisma'
import { verifyAccessToken } from '@/core/auth/shared'
import { NextFunction, Request, Response } from 'express'
import type { AdminJwtPayload } from '../domain/admin/admin-auth.schema'

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string
        email: string
        roleId: string
        permissions: string[]
      }
    }
  }
}

/**
 * Authenticate admin from JWT token
 */
export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401)
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyAccessToken(token) as AdminJwtPayload

    // Check if admin exists and is active
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: {
        id: true,
        email: true,
        status: true,
        roleId: true,
      },
    })

    if (!admin) {
      throw new AppError('Admin not found', 404)
    }

    if (admin.status !== 'ACTIVE') {
      throw new AppError('Account deactivated', 403)
    }

    // Attach admin to request
    req.admin = {
      id: admin.id,
      email: admin.email,
      roleId: admin.roleId,
      permissions: decoded.permissions,
    }

    next()
  } catch (error) {
    next(error)
  }
}

/**
 * Check if admin has required permission
 */
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return next(new AppError('Authentication required', 401))
    }

    if (!req.admin.permissions.includes(permission)) {
      return next(new AppError('Insufficient permissions', 403))
    }

    next()
  }
}

/**
 * Check if admin has any of the required permissions
 */
export const requireAnyPermission = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return next(new AppError('Authentication required', 401))
    }

    const hasPermission = permissions.some((p) => req.admin!.permissions.includes(p))

    if (!hasPermission) {
      return next(new AppError('Insufficient permissions', 403))
    }

    next()
  }
}
