// src/core/merchants/kyc/merchant-kyc.service.ts

import { AppError } from '@/common/errors'
import { logger } from '@/common/utils/logger.utils'
import { prisma } from '@/config/prisma'
import { bankVerificationService } from '@/integrations/sandbox/kyc/services/bank-verification.service'
import { digiLockerService } from '@/integrations/sandbox/kyc/services/digi-locker.service'
import { gstinVerificationService } from '@/integrations/sandbox/kyc/services/gstin-verification.service'
import { panVerificationService } from '@/integrations/sandbox/kyc/services/pan-verification.service'

export class MerchantKYCService {
  async initiateDigiLocker(merchantId: string, documents: string[], purpose?: string) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    })

    if (!merchant) {
      throw new AppError('Merchant not found', 404)
    }

    const redirectUrl = `${process.env.FRONTEND_URL}/merchants/kyc/digilocker/callback`

    const response = await digiLockerService.initiate({
      redirect_url: redirectUrl,
      purpose: purpose || 'Merchant KYC Verification',
      documents: documents as any,
    })

    // Store request in database
    await prisma.merchantKYCVerification.create({
      data: {
        merchantId,
        type: 'DIGILOCKER',
        requestId: response.request_id,
        status: 'PENDING',
        expiresAt: new Date(response.expires_at),
        metadata: { documents },
      },
    })

    return {
      request_id: response.request_id,
      consent_url: response.consent_url,
      expires_at: response.expires_at,
    }
  }

  async getDigiLockerStatus(merchantId: string, requestId: string) {
    const verification = await prisma.merchantKYCVerification.findFirst({
      where: { merchantId, requestId, type: 'DIGILOCKER' },
    })

    if (!verification) {
      throw new AppError('Verification request not found', 404)
    }

    const status = await digiLockerService.getStatus(requestId)

    // Update status in database
    await prisma.merchantKYCVerification.update({
      where: { id: verification.id },
      data: { status: status.status },
    })

    return status
  }

  async fetchDigiLockerDocuments(merchantId: string, requestId: string) {
    const verification = await prisma.merchantKYCVerification.findFirst({
      where: { merchantId, requestId, type: 'DIGILOCKER' },
    })

    if (!verification) {
      throw new AppError('Verification request not found', 404)
    }

    const response = await digiLockerService.fetchDocuments(requestId)

    // Store documents in database
    await prisma.merchantKYCVerification.update({
      where: { id: verification.id },
      data: {
        status: 'COMPLETED',
        verifiedData: response.documents,
        verifiedAt: new Date(),
      },
    })

    // Update merchant KYC status
    await this.updateMerchantKYCStatus(merchantId)

    return response
  }

  async verifyPAN(merchantId: string, pan: string) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    })

    if (!merchant) {
      throw new AppError('Merchant not found', 404)
    }

    const response = await panVerificationService.verify(pan)

    // Store verification
    await prisma.merchantKYCVerification.create({
      data: {
        merchantId,
        type: 'PAN',
        status: response.status === 'VALID' ? 'COMPLETED' : 'FAILED',
        verifiedData: response,
        verifiedAt: new Date(),
      },
    })

    // Update merchant PAN
    if (response.status === 'VALID') {
      await prisma.merchant.update({
        where: { id: merchantId },
        data: {
          pan: response.pan,
          panName: response.name,
          panVerifiedAt: new Date(),
        },
      })
    }

    await this.updateMerchantKYCStatus(merchantId)

    return response
  }

  async searchGSTIN(merchantId: string, pan: string, stateCode?: string) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    })

    if (!merchant) {
      throw new AppError('Merchant not found', 404)
    }

    return await gstinVerificationService.search(pan, stateCode)
  }

  async verifyGSTIN(merchantId: string, gstin: string) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    })

    if (!merchant) {
      throw new AppError('Merchant not found', 404)
    }

    const response = await gstinVerificationService.verify(gstin)

    // Store verification
    await prisma.merchantKYCVerification.create({
      data: {
        merchantId,
        type: 'GSTIN',
        status: response.status === 'Active' ? 'COMPLETED' : 'FAILED',
        verifiedData: response,
        verifiedAt: new Date(),
      },
    })

    // Update merchant GSTIN
    if (response.status === 'Active') {
      await prisma.merchant.update({
        where: { id: merchantId },
        data: {
          gstin: response.gstin,
          gstinVerifiedAt: new Date(),
          businessName: response.legal_name,
          tradeName: response.trade_name,
        },
      })
    }

    await this.updateMerchantKYCStatus(merchantId)

    return response
  }

  async verifyBankAccount(merchantId: string, accountNumber: string, ifsc: string, name?: string) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    })

    if (!merchant) {
      throw new AppError('Merchant not found', 404)
    }

    const initiateResponse = await bankVerificationService.initiateVerification(
      accountNumber,
      ifsc,
      name
    )

    // Store verification request
    const verification = await prisma.merchantKYCVerification.create({
      data: {
        merchantId,
        type: 'BANK_ACCOUNT',
        requestId: initiateResponse.verification_id,
        status: 'PENDING',
        metadata: { account_number: accountNumber, ifsc },
      },
    })

    return {
      verification_id: initiateResponse.verification_id,
      status: initiateResponse.status,
    }
  }

  async getBankVerificationStatus(merchantId: string, verificationId: string) {
    const verification = await prisma.merchantKYCVerification.findFirst({
      where: { merchantId, requestId: verificationId, type: 'BANK_ACCOUNT' },
    })

    if (!verification) {
      throw new AppError('Verification request not found', 404)
    }

    const status = await bankVerificationService.getStatus(verificationId)

    // Update status
    await prisma.merchantKYCVerification.update({
      where: { id: verification.id },
      data: {
        status:
          status.status === 'SUCCESS'
            ? 'COMPLETED'
            : status.status === 'FAILED'
              ? 'FAILED'
              : 'PENDING',
        verifiedData: status,
        ...(status.status === 'SUCCESS' && { verifiedAt: new Date() }),
      },
    })

    // Update merchant bank details if verified
    if (status.status === 'SUCCESS') {
      await prisma.merchant.update({
        where: { id: merchantId },
        data: {
          bankAccountVerified: true,
          bankAccountVerifiedAt: new Date(),
        },
      })

      await this.updateMerchantKYCStatus(merchantId)
    }

    return status
  }

  async getKYCStatus(merchantId: string) {
    const verifications = await prisma.merchantKYCVerification.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
    })

    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
      select: {
        kycStatus: true,
        kycCompletedAt: true,
        pan: true,
        panVerifiedAt: true,
        gstin: true,
        gstinVerifiedAt: true,
        bankAccountVerified: true,
        bankAccountVerifiedAt: true,
      },
    })

    return {
      merchant,
      verifications,
    }
  }

  private async updateMerchantKYCStatus(merchantId: string) {
    const merchant = await prisma.merchant.findUnique({
      where: { id: merchantId },
    })

    // Check if all required KYC is complete
    const isKYCComplete =
      merchant?.panVerifiedAt && merchant?.gstinVerifiedAt && merchant?.bankAccountVerified

    if (isKYCComplete && merchant?.kycStatus !== 'COMPLETED') {
      await prisma.merchant.update({
        where: { id: merchantId },
        data: {
          kycStatus: 'COMPLETED',
          kycCompletedAt: new Date(),
        },
      })

      logger.info('Merchant KYC completed', { merchantId })
    }
  }
}

export const merchantKYCService = new MerchantKYCService()
