import { logger } from '@/common/utils'
import { blueDartClient } from '../bluedart.client'
import { BLUEDART_CONFIG } from '../bluedart.config'
import { TransitTimeRequest, TransitTimeResponse } from '../bluedart.types'

/**
 * Get transit time between origin and destination
 */
export const getTransitTime = async (
  originPincode: string,
  destinationPincode: string,
  productCode: string = 'A', // A = Express, D = Domestic
  productType: number = 2 // 2 = Non-documents
): Promise<TransitTimeResponse> => {
  try {
    logger.info(`Getting transit time: ${originPincode} -> ${destinationPincode}`)

    const request: TransitTimeRequest = {
      OriginPincode: originPincode,
      DestinationPincode: destinationPincode,
      ProductCode: productCode,
      ProductType: productType,
    }

    const response = await blueDartClient.post<TransitTimeResponse>(
      BLUEDART_CONFIG.endpoints.transitTime,
      request
    )

    logger.info(`Transit time retrieved: ${response.TransitDays} days (${response.TransitTime})`)
    return response
  } catch (error) {
    logger.error('Failed to get BlueDart transit time:', error)
    throw error
  }
}

/**
 * Get estimated delivery date
 */
export const getEstimatedDeliveryDate = async (
  originPincode: string,
  destinationPincode: string,
  pickupDate?: Date
): Promise<Date> => {
  const transitData = await getTransitTime(originPincode, destinationPincode)

  const startDate = pickupDate || new Date()
  const deliveryDate = new Date(startDate)
  deliveryDate.setDate(deliveryDate.getDate() + transitData.TransitDays)

  return deliveryDate
}
