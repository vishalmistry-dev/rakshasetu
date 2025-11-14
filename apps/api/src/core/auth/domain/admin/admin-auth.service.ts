import { AppError } from '@/common/errors'
import { generateUniqueId, logger } from '@/common/utils'
import { prisma } from '@/config/prisma'
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyRefreshToken,
} from '@/core/auth/shared'
import type { AdminJwtPayload, AdminLoginInput, CreateAdminInput } from './admin-auth.schema'

// ========================== LOGIN ==========================
export const loginAdmin = async (data: AdminLoginInput) => {
  try {
    // Find admin by email
    const admin = await prisma.admin.findUnique({
      where: { email: data.email },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    })

    if (!admin) {
      throw new AppError('Invalid email or password', 401)
    }

    // Check if admin is active
    if (admin.status !== 'ACTIVE') {
      throw new AppError('Your account has been deactivated', 403)
    }

    // Verify password
    const isPasswordValid = await comparePasswords(data.password, admin.password)

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401)
    }

    // Get permissions
    const permissions = admin.role.permissions.map((p) => p.name)

    // Generate tokens
    const payload: AdminJwtPayload = {
      adminId: admin.id,
      email: admin.email,
      roleId: admin.roleId,
      permissions,
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    // Store refresh token
    const refreshTokenExpires = new Date()
    refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 30) // 30 days

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        refreshToken,
        refreshTokenExpires,
      },
    })

    logger.info(`Admin logged in: ${admin.email}`)

    return {
      accessToken,
      refreshToken,
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        userName: admin.userName,
        email: admin.email,
        role: admin.role.name,
        permissions,
      },
    }
  } catch (error) {
    logger.error('Admin login failed:', error)
    throw error
  }
}

// ========================== REFRESH TOKEN ==========================
export const refreshAdminToken = async (refreshToken: string) => {
  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken) as AdminJwtPayload

    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    })

    if (!admin) {
      throw new AppError('Admin not found', 404)
    }

    if (admin.status !== 'ACTIVE') {
      throw new AppError('Account deactivated', 403)
    }

    // Check if refresh token matches
    if (admin.refreshToken !== refreshToken) {
      throw new AppError('Invalid refresh token', 401)
    }

    // Check if refresh token expired
    if (admin.refreshTokenExpires && admin.refreshTokenExpires < new Date()) {
      throw new AppError('Refresh token expired', 401)
    }

    // Generate new tokens
    const permissions = admin.role.permissions.map((p) => p.name)
    const payload: AdminJwtPayload = {
      adminId: admin.id,
      email: admin.email,
      roleId: admin.roleId,
      permissions,
    }

    const newAccessToken = generateAccessToken(payload)
    const newRefreshToken = generateRefreshToken(payload)

    // Update refresh token
    const newRefreshTokenExpires = new Date()
    newRefreshTokenExpires.setDate(newRefreshTokenExpires.getDate() + 30)

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        refreshToken: newRefreshToken,
        refreshTokenExpires: newRefreshTokenExpires,
      },
    })

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  } catch (error) {
    logger.error('Token refresh failed:', error)
    throw error
  }
}

// ========================== LOGOUT ==========================
export const logoutAdmin = async (adminId: string) => {
  try {
    await prisma.admin.update({
      where: { id: adminId },
      data: {
        refreshToken: null,
        refreshTokenExpires: null,
      },
    })

    logger.info(`Admin logged out: ${adminId}`)
  } catch (error) {
    logger.error('Logout failed:', error)
    throw error
  }
}

// ========================== CREATE ADMIN (Super Admin Only) ==========================
export const createAdmin = async (data: CreateAdminInput) => {
  try {
    // Check if email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: data.email },
    })

    if (existingAdmin) {
      throw new AppError('Email already exists', 400)
    }

    // Check if username already exists
    const existingUserName = await prisma.admin.findUnique({
      where: { userName: data.userName },
    })

    if (existingUserName) {
      throw new AppError('Username already exists', 400)
    }

    // Check if role exists
    const role = await prisma.adminRole.findUnique({
      where: { id: data.roleId },
    })

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password)

    // Create admin
    const adminId = await generateUniqueId('adm', 'admin')

    const admin = await prisma.admin.create({
      data: {
        id: adminId,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        password: hashedPassword,
        roleId: data.roleId,
      },
      include: {
        role: true,
      },
    })

    logger.info(`Admin created: ${admin.email}`)

    return {
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      userName: admin.userName,
      email: admin.email,
      role: admin.role.name,
      status: admin.status,
    }
  } catch (error) {
    logger.error('Failed to create admin:', error)
    throw error
  }
}

// ========================== GET CURRENT ADMIN ==========================
export const getCurrentAdmin = async (adminId: string) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    })

    if (!admin) {
      throw new AppError('Admin not found', 404)
    }

    return {
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      userName: admin.userName,
      email: admin.email,
      image: admin.image,
      status: admin.status,
      role: {
        id: admin.role.id,
        name: admin.role.name,
        description: admin.role.description,
      },
      permissions: admin.role.permissions.map((p) => p.name),
      createdAt: admin.createdAt,
    }
  } catch (error) {
    logger.error('Failed to get admin:', error)
    throw error
  }
}
