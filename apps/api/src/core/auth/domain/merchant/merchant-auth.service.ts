import { AppError } from '@/common/errors'
import { prisma } from '@/config/prisma'
import { sendEmail } from '@/integrations/communication'
import { comparePasswords, hashPassword } from '../../shared/password.manager'
import { generateRefreshToken, verifyRefreshToken } from '../../shared/token.manager'

// ========================== SET PASSWORD (First Time) ==========================
export const setMerchantPassword = async (
  token: string,
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    throw new AppError('Passwords do not match', 400)
  }

  // Verify token
  const payload = verifyRefreshToken(token)

  if (!payload || typeof payload !== 'object' || !('id' in payload)) {
    throw new AppError('Invalid or expired token', 401)
  }

  const merchant = await prisma.merchant.findUnique({
    where: { id: payload.id },
  })

  if (!merchant) {
    throw new AppError('Merchant not found', 404)
  }

  // Check if password already set
  if (merchant.password) {
    throw new AppError('Password already set. Please use login.', 400)
  }

  // Hash password
  const hashedPassword = await hashPassword(password)

  await prisma.merchant.update({
    where: { id: merchant.id },
    data: {
      password: hashedPassword,
      refreshToken: null,
      refreshTokenExpires: null,
    },
  })

  return {
    message: 'Password set successfully. You can now login to your dashboard.',
  }
}

// ========================== LOGIN ==========================
export const loginMerchant = async (email: string, password: string) => {
  // Find merchant
  const merchant = await prisma.merchant.findUnique({
    where: { email },
    select: {
      id: true,
      businessName: true,
      email: true,
      phone: true,
      password: true,
      status: true,
      isActive: true,
      mode: true,
      emailVerified: true,
    },
  })

  if (!merchant) {
    throw new AppError('Invalid credentials', 401)
  }

  // Check if password exists
  if (!merchant.password) {
    throw new AppError('Please set your password first. Check your email for the link.', 400)
  }

  // Verify password
  const isValid = await comparePasswords(password, merchant.password)

  if (!isValid) {
    throw new AppError('Invalid credentials', 401)
  }

  // Check if active
  if (!merchant.isActive || merchant.status !== 'ACTIVE') {
    throw new AppError('Account is inactive. Please contact support.', 403)
  }

  // Update last login
  await prisma.merchant.update({
    where: { id: merchant.id },
    data: { lastLoginAt: new Date() },
  })

  return {
    message: 'Logged in successfully',
    merchant: {
      id: merchant.id,
      businessName: merchant.businessName,
      email: merchant.email,
      phone: merchant.phone,
      mode: merchant.mode,
      emailVerified: merchant.emailVerified,
    },
  }
}

// ========================== FORGOT PASSWORD ==========================
export const forgotMerchantPassword = async (email: string) => {
  const merchant = await prisma.merchant.findUnique({
    where: { email },
  })

  if (!merchant) {
    // Don't reveal if merchant exists
    return { message: 'If a merchant with this email exists, a reset link has been sent.' }
  }

  // Check if password is set
  if (!merchant.password) {
    throw new AppError('Password not set yet. Please use the setup link sent to your email.', 400)
  }

  // Generate reset token
  const resetToken = generateRefreshToken({
    id: merchant.id,
    email: merchant.email,
  })

  await prisma.merchant.update({
    where: { email },
    data: {
      refreshToken: resetToken,
      refreshTokenExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    },
  })

  // TODO: Send reset email with resetToken

  await sendEmail(merchant.email, 'password-reset', { resetToken })

  return {
    message: 'Password reset link sent to your email',
    resetToken, // Remove this in production, only for development
  }
}

// ========================== RESET PASSWORD ==========================
export const resetMerchantPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string
) => {
  if (newPassword !== confirmPassword) {
    throw new AppError('Passwords do not match', 400)
  }

  // Verify token
  const payload = verifyRefreshToken(token)

  if (!payload || typeof payload !== 'object' || !('id' in payload)) {
    throw new AppError('Invalid or expired token', 401)
  }

  const merchant = await prisma.merchant.findUnique({
    where: { id: payload.id },
  })

  if (!merchant) {
    throw new AppError('Merchant not found', 404)
  }

  // Check token match and expiry
  if (
    merchant.refreshToken !== token ||
    !merchant.refreshTokenExpires ||
    new Date() > merchant.refreshTokenExpires
  ) {
    throw new AppError('Invalid or expired token', 401)
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword)

  await prisma.merchant.update({
    where: { id: merchant.id },
    data: {
      password: hashedPassword,
      refreshToken: null,
      refreshTokenExpires: null,
    },
  })

  return { message: 'Password reset successfully' }
}

// ========================== GET MERCHANT BY ID (for middleware) ==========================
export const getMerchantById = async (merchantId: string) => {
  const merchant = await prisma.merchant.findUnique({
    where: { id: merchantId },
    select: {
      id: true,
      businessName: true,
      email: true,
      phone: true,
      status: true,
      isActive: true,
      mode: true,
    },
  })

  if (!merchant) {
    throw new AppError('Merchant not found', 404)
  }

  return merchant
}
