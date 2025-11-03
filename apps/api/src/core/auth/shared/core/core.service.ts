import { AppError } from '@/common/errors/AppErrorHandler'
import { prisma } from '@/config/prisma'

import { generateUniqueId, generateUsername } from '@/common/utils'
import { authenticator } from 'otplib'
import { RegisterMerchantInput } from '../../domain/merchant/merchant-auth.schema'
import { RegisterUserInput } from '../../domain/user/user-auth.schema'
import { LoginInput, ResetPasswordInput, VerifyEmailInput, VerifyOtpInput } from '../dto'
import { generateOtp } from '../otp.manager'
import { comparePasswords, hashPassword } from '../password.manager'
import { generateRefreshToken, verifyRefreshToken } from '../token.manager'

type entityType = 'user' | 'merchant' | 'admin'

export const createAuthCoreService = (entity: entityType) => {
  const model: any =
    entity === 'user' ? prisma.user : entity === 'merchant' ? prisma.merchant : prisma.admin

  // --------------------------- REGISTER --------------------------- //
  const register = async <T extends RegisterUserInput | RegisterMerchantInput>(data: T) => {
    const existing = await model.findFirst({
      where: { OR: [{ email: data.email }, { mobile: data.mobile }] },
    })

    if (existing)
      throw new AppError(
        entity === 'user' ? 'Email or mobile already in use' : 'Merchant already registered',
        409
      )

    const hashedPassword = await hashPassword(data.password)
    const userName = await generateUsername(data.firstName, data.lastName)
    const verificationCode = generateOtp()
    const idPrefix = entity === 'user' ? 'usr' : 'mrc'
    const recordId = await generateUniqueId(idPrefix, entity, 'id')

    await model.create({
      data: {
        id: recordId,
        ...data,
        password: hashedPassword,
        userName,
        verificationCode,
        verificationSentAt: new Date(),
        status: 'ACTIVE',
      },
    })

    return { message: 'Registered successfully. Please verify your email.' }
  }

  // --------------------------- LOGIN --------------------------- //
  const login = async ({ emailOrUsername, password }: LoginInput) => {
    const record = await model.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { userName: emailOrUsername }],
      },
      include: entity === 'admin' ? { role: { include: { permissions: true } } } : {},
    })

    if (!record) throw new AppError(`${entity} not found`, 404)

    const isValid = await comparePasswords(password, record.password)
    if (!isValid) throw new AppError('Invalid credentials', 401)

    return {
      message:
        record.twoFactorStatus && entity !== 'admin'
          ? '2FA authentication required'
          : 'Logged in successfully',
      record: {
        id: record.id,
        firstName: record.firstName,
        lastName: record.lastName,
        email: record.email,
        userName: record.userName,
        ...(entity === 'user' ? { type: record.type } : {}),
        ...(entity === 'admin' ? { role: record.role } : {}),
        twoFactorStatus: record.twoFactorStatus,
      },
    }
  }

  // --------------------------- VERIFY EMAIL --------------------------- //
  const verifyEmail = async ({ email, code }: VerifyEmailInput) => {
    const record = await model.findUnique({ where: { email } })
    if (!record) throw new AppError(`${entity} not found`, 404)
    if (record.emailVerified) throw new AppError('Email already verified', 400)

    const expiry = new Date(record.verificationSentAt!.getTime() + 10 * 60 * 1000)
    if (new Date() > expiry) throw new AppError('Verification code expired', 400)
    if (record.verificationCode !== code) throw new AppError('Invalid verification code', 400)

    const updatedRecord = await model.update({
      where: { email },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),
        verificationCode: null,
        verificationSentAt: null,
      },
      include: entity === 'admin' ? { role: { include: { permissions: true } } } : {},
    })

    return {
      message: 'Email verified successfully.',
      record: {
        id: updatedRecord.id,
        firstName: updatedRecord.firstName,
        lastName: updatedRecord.lastName,
        email: updatedRecord.email,
        userName: updatedRecord.userName,
        emailVerified: updatedRecord.emailVerified,
        ...(entity === 'user' ? { type: updatedRecord.type } : {}),
        ...(entity === 'admin' ? { role: updatedRecord.role } : {}),
      },
    }
  }

  // --------------------------- RESEND OTP --------------------------- //
  const resendOtp = async (email: string) => {
    const record = await model.findUnique({ where: { email } })
    if (!record) throw new AppError(`${entity} not found`, 404)
    if (record.emailVerified) throw new AppError('Email already verified', 400)

    const verificationCode = generateOtp()
    await model.update({
      where: { email },
      data: { verificationCode, verificationSentAt: new Date() },
    })

    return { message: 'OTP resent successfully.' }
  }

  // --------------------------- FORGOT PASSWORD --------------------------- //
  const forgotPassword = async (email: string) => {
    const record = await model.findUnique({ where: { email } })
    if (!record) throw new AppError(`${entity} not found`, 404)

    const refreshToken = generateRefreshToken({
      id: record.id,
      email: record.email,
    })

    await model.update({
      where: { email },
      data: {
        refreshToken,
        refreshTokenExpires: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    return { message: 'Password reset link sent to your email.' }
  }

  // --------------------------- RESET PASSWORD --------------------------- //
  const resetPassword = async (token: string, { newPassword, conPassword }: ResetPasswordInput) => {
    if (newPassword !== conPassword) throw new AppError('Passwords do not match', 400)

    const payload = verifyRefreshToken(token)
    if (!payload || typeof payload !== 'object' || !('id' in payload))
      throw new AppError('Invalid or expired token', 401)

    const record = await model.findUnique({ where: { id: payload.id } })
    if (!record) throw new AppError(`${entity} not found`, 404)

    if (
      record.refreshToken !== token ||
      !record.refreshTokenExpires ||
      new Date() > record.refreshTokenExpires
    )
      throw new AppError('Invalid or expired token', 401)

    const hashedPassword = await hashPassword(newPassword)
    await model.update({
      where: { id: record.id },
      data: {
        password: hashedPassword,
        refreshToken: null,
        refreshTokenExpires: null,
      },
    })

    return { message: 'Password reset successfully.' }
  }

  // --------------------------- VERIFY 2FA --------------------------- //
  const verify2FA = async ({ userId, otp }: VerifyOtpInput) => {
    const record = await model.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        userName: true,
        firstName: true,
        lastName: true,
        twoFactorSecret: true,
        twoFactorStatus: true,
        ...(entity === 'user' ? { type: true } : {}),
      },
    })

    if (!record || !record.twoFactorStatus || !record.twoFactorSecret)
      throw new AppError('2FA not enabled for this user', 403)

    const isValid = authenticator.verify({
      token: otp,
      secret: record.twoFactorSecret,
    })

    if (!isValid) throw new AppError('Invalid OTP', 401)

    return {
      message: '2FA verified successfully',
      record: {
        id: record.id,
        email: record.email,
        userName: record.userName,
        firstName: record.firstName,
        lastName: record.lastName,
        ...(entity === 'user' ? { type: record.type } : {}),
      },
    }
  }

  return {
    register,
    login,
    verifyEmail,
    resendOtp,
    forgotPassword,
    resetPassword,
    verify2FA,
  }
}
