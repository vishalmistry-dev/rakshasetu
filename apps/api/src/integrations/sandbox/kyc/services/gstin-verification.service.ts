import { logger } from '@/common/utils/logger.utils'
import { sandboxClient } from '../../sandbox.client'
import { SANDBOX_CONFIG } from '../../sandbox.config'
import {
  GSTINSearchRequest,
  GSTINSearchResponse,
  GSTINVerifyRequest,
  GSTINVerifyResponse,
} from '../../sandbox.types'

export class GSTINVerificationService {
  async search(pan: string, stateCode?: string): Promise<GSTINSearchResponse> {
    logger.info('Searching GSTIN by PAN', { pan, stateCode })

    const data: GSTINSearchRequest = {
      pan: pan.toUpperCase(),
      ...(stateCode && { state_code: stateCode }),
    }

    return await sandboxClient.post<GSTINSearchResponse>(
      SANDBOX_CONFIG.ENDPOINTS.GSTIN_SEARCH,
      data
    )
  }

  async verify(
    gstin: string,
    reason: string = 'Business Verification'
  ): Promise<GSTINVerifyResponse> {
    logger.info('Verifying GSTIN', { gstin })

    const data: GSTINVerifyRequest = {
      gstin: gstin.toUpperCase(),
      consent: 'Y',
      reason,
    }

    return await sandboxClient.post<GSTINVerifyResponse>(
      SANDBOX_CONFIG.ENDPOINTS.GSTIN_VERIFY,
      data
    )
  }

  validateGSTINFormat(gstin: string): boolean {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return gstinRegex.test(gstin.toUpperCase())
  }

  extractPANFromGSTIN(gstin: string): string {
    return gstin.substring(2, 12)
  }
}

export const gstinVerificationService = new GSTINVerificationService()
