import { logger } from '@/common/utils/logger.utils'
import { sandboxClient } from '../../sandbox.client'
import { SANDBOX_CONFIG } from '../../sandbox.config'
import { BankStatusResponse, BankVerifyRequest, BankVerifyResponse } from '../../sandbox.types'

export class BankVerificationService {
  async initiateVerification(
    accountNumber: string,
    ifsc: string,
    name?: string,
    reason: string = 'Bank Account Verification'
  ): Promise<BankVerifyResponse> {
    logger.info('Initiating bank account verification', { accountNumber, ifsc })

    const data: BankVerifyRequest = {
      account_number: accountNumber,
      ifsc: ifsc.toUpperCase(),
      ...(name && { name }),
      consent: 'Y',
      reason,
    }

    return await sandboxClient.post<BankVerifyResponse>(SANDBOX_CONFIG.ENDPOINTS.BANK_VERIFY, data)
  }

  async getStatus(verificationId: string): Promise<BankStatusResponse> {
    logger.info('Checking bank verification status', { verificationId })

    return await sandboxClient.get<BankStatusResponse>(SANDBOX_CONFIG.ENDPOINTS.BANK_STATUS, {
      verification_id: verificationId,
    })
  }

  async pollUntilComplete(
    verificationId: string,
    maxAttempts: number = 10,
    intervalMs: number = 3000
  ): Promise<BankStatusResponse> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await this.getStatus(verificationId)

      if (status.status === 'SUCCESS' || status.status === 'FAILED') {
        return status
      }

      await this.delay(intervalMs)
    }

    throw new Error('Bank verification timed out')
  }

  validateIFSCFormat(ifsc: string): boolean {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    return ifscRegex.test(ifsc.toUpperCase())
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const bankVerificationService = new BankVerificationService()
