// src/integrations/sandbox/webhooks/sandbox-webhook.controller.ts

import { AppError } from '@/common/errors'
import { asyncHandler } from '@/common/utils/asyncHandler.utils'
import { logger } from '@/common/utils/logger.utils'
import { sendResponse } from '@/common/utils/sendResponse.utils'
import { prisma } from '@/config/prisma'
import crypto from 'crypto'
import { Request, Response } from 'express'
import { SANDBOX_CONFIG } from '../sandbox.config'
import { SandboxWebhookPayload } from '../sandbox.types'

export class SandboxWebhookController {
  /**
   * Handle Sandbox webhooks
   * Sandbox sends webhooks for:
   * - DigiLocker completion
   * - Bank verification completion
   * - Verification failures
   */
  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    const signature = req.headers['x-sandbox-signature'] as string
    const payload: SandboxWebhookPayload = req.body

    // Verify webhook signature
    if (!this.verifySignature(JSON.stringify(payload), signature)) {
      throw new AppError('Invalid webhook signature', 401)
    }

    logger.info('Received Sandbox webhook', {
      event_type: payload.event_type,
      timestamp: payload.timestamp,
    })

    // Process webhook based on event type
    switch (payload.event_type) {
      case 'digilocker.completed':
        await this.handleDigiLockerCompleted(payload)
        break

      case 'bank.verified':
        await this.handleBankVerified(payload)
        break

      case 'verification.failed':
        await this.handleVerificationFailed(payload)
        break

      default:
        logger.warn('Unknown webhook event type', { event_type: payload.event_type })
    }

    sendResponse(res, {
      statusCode: 200,
      message: 'Webhook processed successfully',
      data: { received: true },
    })
  })

  private verifySignature(payload: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', SANDBOX_CONFIG.API_SECRET)
      .update(payload)
      .digest('hex')

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  }

  private async handleDigiLockerCompleted(payload: SandboxWebhookPayload) {
    const { request_id, documents } = payload.data

    logger.info('Processing DigiLocker completion', { request_id })

    // Check merchant KYC
    const merchantVerification = await prisma.merchantKYCVerification.findFirst({
      where: { requestId: request_id, type: 'DIGILOCKER' },
    })

    if (merchantVerification) {
      await prisma.merchantKYCVerification.update({
        where: { id: merchantVerification.id },
        data: {
          status: 'COMPLETED',
          verifiedData: documents,
          verifiedAt: new Date(),
        },
      })

      // Notify merchant
      await this.notifyMerchant(merchantVerification.merchantId, 'digilocker_completed')
      return
    }

    // Check user KYC
    const userVerification = await prisma.userKYCVerification.findFirst({
      where: { requestId: request_id, type: 'DIGILOCKER' },
    })

    if (userVerification) {
      await prisma.userKYCVerification.update({
        where: { id: userVerification.id },
        data: {
          status: 'COMPLETED',
          verifiedData: documents,
          verifiedAt: new Date(),
        },
      })

      await this.notifyUser(userVerification.userId, 'digilocker_completed')
      return
    }

    // Check RSmart seller KYC
    const rsmartVerification = await prisma.rsmartSellerKYC.findFirst({
      where: { requestId: request_id, type: 'DIGILOCKER' },
    })

    if (rsmartVerification) {
      await prisma.rsmartSellerKYC.update({
        where: { id: rsmartVerification.id },
        data: {
          status: 'COMPLETED',
          verifiedData: documents,
          verifiedAt: new Date(),
        },
      })

      await this.notifyUser(rsmartVerification.userId, 'seller_digilocker_completed')
    }
  }

  private async handleBankVerified(payload: SandboxWebhookPayload) {
    const { verification_id, status, account_holder_name } = payload.data

    logger.info('Processing bank verification', { verification_id, status })

    // Check merchant bank verification
    const merchantVerification = await prisma.merchantKYCVerification.findFirst({
      where: { requestId: verification_id, type: 'BANK_ACCOUNT' },
    })

    if (merchantVerification) {
      await prisma.merchantKYCVerification.update({
        where: { id: merchantVerification.id },
        data: {
          status: status === 'SUCCESS' ? 'COMPLETED' : 'FAILED',
          verifiedData: payload.data,
          verifiedAt: new Date(),
        },
      })

      if (status === 'SUCCESS') {
        await prisma.merchant.update({
          where: { id: merchantVerification.merchantId },
          data: {
            bankAccountVerified: true,
            bankAccountVerifiedAt: new Date(),
          },
        })

        await this.notifyMerchant(merchantVerification.merchantId, 'bank_verified')
      }
    }
  }

  private async handleVerificationFailed(payload: SandboxWebhookPayload) {
    const { request_id, failure_reason } = payload.data

    logger.warn('Verification failed', { request_id, failure_reason })

    // Update all possible verification types
    await prisma.merchantKYCVerification.updateMany({
      where: { requestId: request_id },
      data: { status: 'FAILED', metadata: { failure_reason } },
    })

    await prisma.userKYCVerification.updateMany({
      where: { requestId: request_id },
      data: { status: 'FAILED', metadata: { failure_reason } },
    })

    await prisma.rsmartSellerKYC.updateMany({
      where: { requestId: request_id },
      data: { status: 'FAILED', metadata: { failure_reason } },
    })
  }

  private async notifyMerchant(merchantId: string, event: string) {
    // TODO: Implement notification system
    logger.info('Notifying merchant', { merchantId, event })
    // You can trigger email, SMS, or push notification here
  }

  private async notifyUser(userId: string, event: string) {
    // TODO: Implement notification system
    logger.info('Notifying user', { userId, event })
  }
}

export const sandboxWebhookController = new SandboxWebhookController()
