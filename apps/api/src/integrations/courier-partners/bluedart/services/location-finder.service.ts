import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { blueDartClient } from '../bluedart.client'
import { BLUEDART_CONFIG } from '../bluedart.config'
import { LocationServiceRequest, LocationServiceResponse } from '../bluedart.types'

/**
 * Check if pincode is serviceable
 */
export const checkServiceability = async (pincode: string): Promise<LocationServiceResponse> => {
  try {
    logger.info(`Checking serviceability for pincode: ${pincode}`)

    const request: LocationServiceRequest = {
      Pincode: pincode,
    }

    const response = await blueDartClient.post<LocationServiceResponse>(
      BLUEDART_CONFIG.endpoints.locationFinder,
      request
    )

    // Check for errors
    if (response.IsError) {
      throw new AppError(`Pincode ${pincode} is not serviceable`, 400)
    }

    logger.info(`Pincode ${pincode} serviceability: ${response.PincodeData?.IsServicable}`)
    return response
  } catch (error) {
    logger.error(`Failed to check serviceability for ${pincode}:`, error)
    throw error
  }
}

/**
 * Check if COD is available for pincode
 */
export const isCODAvailable = async (pincode: string): Promise<boolean> => {
  try {
    const response = await checkServiceability(pincode)
    return response.PincodeData?.IsCODAvailable || false
  } catch (error) {
    logger.error(`Failed to check COD availability for ${pincode}:`, error)
    return false
  }
}

/**
 * Get pincode details
 */
export const getPincodeDetails = async (pincode: string) => {
  const response = await checkServiceability(pincode)

  return {
    pincode: response.PincodeData.Pincode,
    city: response.PincodeData.City,
    state: response.PincodeData.State,
    areaName: response.PincodeData.AreaName,
    isServicable: response.PincodeData.IsServicable,
    isCODAvailable: response.PincodeData.IsCODAvailable,
  }
}
