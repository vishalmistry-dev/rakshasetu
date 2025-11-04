import { logger } from '@/common/utils'
import { blueDartClient } from '../bluedart.client'
import { BLUEDART_CONFIG } from '../bluedart.config'
import { TrackingRequest, TrackingResponse } from '../bluedart.types'

/**
 * Track shipment by waybill number
 */
export const trackShipment = async (waybillNo: string): Promise<TrackingResponse> => {
  try {
    logger.info(`Tracking BlueDart shipment: ${waybillNo}`)

    const request: TrackingRequest = {
      WaybillNo: waybillNo,
    }

    const response = await blueDartClient.post<TrackingResponse>(
      BLUEDART_CONFIG.endpoints.tracking,
      request
    )

    logger.info(`Shipment tracking successful: ${waybillNo}`)
    return response
  } catch (error) {
    logger.error(`Failed to track BlueDart shipment ${waybillNo}:`, error)
    throw error
  }
}

/**
 * Get latest shipment status
 */
export const getLatestStatus = (
  trackingResponse: TrackingResponse
): {
  status: string
  statusDate: string
  statusTime: string
  location: string
} => {
  const shipmentData = trackingResponse.ShipmentData

  return {
    status: shipmentData.Status,
    statusDate: shipmentData.StatusDate,
    statusTime: shipmentData.StatusTime,
    location: shipmentData.Scans?.[0]?.ScannedLocation || '',
  }
}
