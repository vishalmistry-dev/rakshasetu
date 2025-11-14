import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { blueDartClient } from '../bluedart.client'
import { BLUEDART_CONFIG } from '../bluedart.config'
import { CreateWaybillRequest, CreateWaybillResponse } from '../bluedart.types'

/**
 * Create waybill (shipment booking)
 */
export const createWaybill = async (
  request: CreateWaybillRequest
): Promise<CreateWaybillResponse> => {
  try {
    logger.info('Creating BlueDart waybill')

    // Add profile credentials
    request.Profile = {
      LoginID: BLUEDART_CONFIG.auth.loginId,
      LicenceKey: BLUEDART_CONFIG.auth.licenseKey,
      Api_type: BLUEDART_CONFIG.environment === 'production' ? 'S' : 'T', // S = Production, T = Test
    }

    const response = await blueDartClient.post<CreateWaybillResponse>(
      BLUEDART_CONFIG.endpoints.waybill,
      request
    )

    // Check for errors in response
    if (response.IsError) {
      throw new AppError(response.Status?.StatusInformation || 'Failed to create waybill', 400)
    }

    logger.info(`Waybill created successfully: ${response.ShipmentData?.AWBNo}`)
    return response
  } catch (error) {
    logger.error('Failed to create BlueDart waybill:', error)
    throw error
  }
}

/**
 * Get waybill label (PDF)
 */
export const getWaybillLabel = (waybillResponse: CreateWaybillResponse): Buffer | null => {
  try {
    if (!waybillResponse.ShipmentData?.AWBPrintContent) {
      return null
    }

    // Decode base64 PDF
    const pdfBuffer = Buffer.from(waybillResponse.ShipmentData.AWBPrintContent, 'base64')
    return pdfBuffer
  } catch (error) {
    logger.error('Failed to decode waybill label:', error)
    return null
  }
}
