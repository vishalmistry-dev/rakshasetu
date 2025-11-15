import { logger } from '@/common/utils/logger.utils'
import { prisma } from '@/config/prisma'
import { bankVerificationService } from '@/integrations/sandbox/kyc/services/bank-verification.service'
import { digiLockerService } from '@/integrations/sandbox/kyc/services/digi-locker.service'

/**
 * Background worker to check pending KYC verifications
 * Run this every 5 minutes to poll Sandbox for updates
 */
export class KYCStatusChecker {
  async checkPendingVerifications() {
    logger.info('Checking pending KYC verifications')

    // Check DigiLocker verifications
    await this.checkDigiLockerVerifications()

    // Check Bank verifications
    await this.checkBankVerifications()
  }

  private async checkDigiLockerVerifications() {
    const pendingVerifications = await prisma.merchantKYCVerification.findMany({
      where: {
        type: 'DIGILOCKER',
        status: 'PENDING',
        expiresAt: { gt: new Date() },
      },
      take: 50, // Process 50 at a time
    })

    for (const verification of pendingVerifications) {
      try {
        const status = await digiLockerService.getStatus(verification.requestId!)

        if (status.status === 'COMPLETED') {
          const documents = await digiLockerService.fetchDocuments(verification.requestId!)

          await prisma.merchantKYCVerification.update({
            where: { id: verification.id },
            data: {
              status: 'COMPLETED',
              verifiedData: documents,
              verifiedAt: new Date(),
            },
          })

          logger.info('DigiLocker verification completed', {
            verificationId: verification.id,
          })
        } else if (status.status === 'FAILED' || status.status === 'EXPIRED') {
          await prisma.merchantKYCVerification.update({
            where: { id: verification.id },
            data: { status: status.status },
          })
        }
      } catch (error) {
        logger.error('Error checking DigiLocker status', {
          verificationId: verification.id,
          error,
        })
      }
    }
  }

  private async checkBankVerifications() {
    const pendingVerifications = await prisma.merchantKYCVerification.findMany({
      where: {
        type: 'BANK_ACCOUNT',
        status: 'PENDING',
      },
      take: 50,
    })

    for (const verification of pendingVerifications) {
      try {
        const status = await bankVerificationService.getStatus(verification.requestId!)

        if (status.status === 'SUCCESS' || status.status === 'FAILED') {
          await prisma.merchantKYCVerification.update({
            where: { id: verification.id },
            data: {
              status: status.status === 'SUCCESS' ? 'COMPLETED' : 'FAILED',
              verifiedData: status,
              verifiedAt: new Date(),
            },
          })

          if (status.status === 'SUCCESS') {
            await prisma.merchant.update({
              where: { id: verification.merchantId },
              data: {
                bankAccountVerified: true,
                bankAccountVerifiedAt: new Date(),
              },
            })
          }

          logger.info('Bank verification completed', {
            verificationId: verification.id,
            status: status.status,
          })
        }
      } catch (error) {
        logger.error('Error checking bank verification status', {
          verificationId: verification.id,
          error,
        })
      }
    }
  }
}

export const kycStatusChecker = new KYCStatusChecker()
