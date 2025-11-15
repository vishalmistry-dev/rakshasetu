import { logger } from '@/common/utils/logger.utils'
import { sandboxClient } from '../../sandbox.client'
import { SANDBOX_CONFIG } from '../../sandbox.config'
import { PANVerifyRequest, PANVerifyResponse } from '../../sandbox.types'

export class PANVerificationService {
  async verify(pan: string, reason: string = 'KYC Verification'): Promise<PANVerifyResponse> {
    logger.info('Verifying PAN', { pan })

    const data: PANVerifyRequest = {
      pan: pan.toUpperCase(),
      consent: 'Y',
      reason,
    }

    return await sandboxClient.post<PANVerifyResponse>(SANDBOX_CONFIG.ENDPOINTS.PAN_VERIFY, data)
  }

  validatePANFormat(pan: string): boolean {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return panRegex.test(pan.toUpperCase())
  }
}

export const panVerificationService = new PANVerificationService()
