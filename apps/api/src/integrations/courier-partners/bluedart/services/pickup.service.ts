import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { blueDartClient } from '../bluedart.client'
import { BLUEDART_CONFIG } from '../bluedart.config'
import { PickupRegistrationRequest, PickupRegistrationResponse } from '../bluedart.types'

/**
 * Register pickup request
 */
export const registerPickup = async (
  request: PickupRegistrationRequest
): Promise<PickupRegistrationResponse> => {
  try {
    logger.info('Registering BlueDart pickup')

    // Add profile credentials
    request.Profile = {
      LoginID: BLUEDART_CONFIG.auth.loginId,
      LicenceKey: BLUEDART_CONFIG.auth.licenseKey,
      Api_type: BLUEDART_CONFIG.environment === 'production' ? 'S' : 'T',
    }

    const response = await blueDartClient.post<PickupRegistrationResponse>(
      BLUEDART_CONFIG.endpoints.pickup,
      request
    )

    // Check for errors
    if (response.IsError) {
      throw new AppError(response.Status?.StatusInformation || 'Failed to register pickup', 400)
    }

    logger.info(
      `Pickup registered successfully: ${response.PickupRegistrationData?.PickupRegistrationNumber}`
    )
    return response
  } catch (error) {
    logger.error('Failed to register BlueDart pickup:', error)
    throw error
  }
}

/**
 * Cancel pickup request
 */
export const cancelPickup = async (pickupRegistrationNumber: string): Promise<boolean> => {
  try {
    logger.info(`Cancelling BlueDart pickup: ${pickupRegistrationNumber}`)

    const request = {
      Request: {
        PickupRegistrationNumber: pickupRegistrationNumber,
      },
      Profile: {
        LoginID: BLUEDART_CONFIG.auth.loginId,
        LicenceKey: BLUEDART_CONFIG.auth.licenseKey,
        Api_type: BLUEDART_CONFIG.environment === 'production' ? 'S' : 'T',
      },
    }

    const response = await blueDartClient.post<any>(BLUEDART_CONFIG.endpoints.cancelPickup, request)

    logger.info(`Pickup cancelled successfully: ${pickupRegistrationNumber}`)
    return !response.IsError
  } catch (error) {
    logger.error('Failed to cancel BlueDart pickup:', error)
    throw error
  }
}
