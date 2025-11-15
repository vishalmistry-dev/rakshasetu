import { logger } from '@/common/utils/logger.utils'
import { sandboxClient } from '../../sandbox.client'
import { SANDBOX_CONFIG } from '../../sandbox.config'
import {
  DigiLockerFetchResponse,
  DigiLockerInitRequest,
  DigiLockerInitResponse,
  DigiLockerStatusResponse,
} from '../../sandbox.types'

export class DigiLockerService {
  async initiate(data: DigiLockerInitRequest): Promise<DigiLockerInitResponse> {
    logger.info('Initiating DigiLocker verification', { documents: data.documents })

    return await sandboxClient.post<DigiLockerInitResponse>(
      SANDBOX_CONFIG.ENDPOINTS.DIGILOCKER_INIT,
      data
    )
  }

  async getStatus(requestId: string): Promise<DigiLockerStatusResponse> {
    return await sandboxClient.get<DigiLockerStatusResponse>(
      SANDBOX_CONFIG.ENDPOINTS.DIGILOCKER_STATUS,
      { request_id: requestId }
    )
  }

  async fetchDocuments(requestId: string): Promise<DigiLockerFetchResponse> {
    logger.info('Fetching DigiLocker documents', { requestId })

    return await sandboxClient.get<DigiLockerFetchResponse>(
      SANDBOX_CONFIG.ENDPOINTS.DIGILOCKER_FETCH,
      { request_id: requestId }
    )
  }
}

export const digiLockerService = new DigiLockerService()
