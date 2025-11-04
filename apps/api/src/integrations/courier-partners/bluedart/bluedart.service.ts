import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { CreateWaybillRequest } from './bluedart.types'
import * as locationFinderService from './services/location-finder.service'
import * as pickupService from './services/pickup.service'
import * as trackingService from './services/tracking.service'
import * as transitTimeService from './services/transit-time.service'
import * as waybillService from './services/waybill.service'

// ========================== CREATE SHIPMENT ==========================
export const createShipment = async (data: {
  // Consignee details
  consigneeName: string
  consigneeAddress: string
  consigneePincode: string
  consigneeCity: string
  consigneeState: string
  consigneeMobile: string
  consigneeEmail?: string

  // Shipper details (merchant)
  shipperCode: string
  shipperName: string
  shipperAddress: string
  shipperPincode: string
  shipperCity: string
  shipperState: string
  shipperMobile: string

  // Package details
  weight: number // in kg
  pieces: number
  productCode?: string // A = Express, D = Domestic
  collectableAmount?: number // For COD
  commodity?: string

  // Pickup
  registerPickup?: boolean
  pickupDate?: string
  pickupTime?: string
}) => {
  try {
    // Build waybill request
    const waybillRequest: CreateWaybillRequest = {
      Request: {
        Consignee: {
          ConsigneeName: data.consigneeName,
          ConsigneeAddress1: data.consigneeAddress,
          ConsigneePincode: data.consigneePincode,
          ConsigneeCity: data.consigneeCity,
          ConsigneeState: data.consigneeState,
          ConsigneeMobile: data.consigneeMobile,
          ConsigneeEmailID: data.consigneeEmail,
        },
        Shipper: {
          CustomerCode: data.shipperCode,
          CustomerName: data.shipperName,
          CustomerAddress1: data.shipperAddress,
          CustomerPincode: data.shipperPincode,
          CustomerCity: data.shipperCity,
          CustomerState: data.shipperState,
          CustomerMobile: data.shipperMobile,
        },
        Services: {
          ProductCode: data.productCode || 'A',
          ProductType: 2, // Non-documents
          ActualWeight: data.weight,
          Pieces: data.pieces,
          CollectableAmount: data.collectableAmount,
          Commodity: {
            CommodityDetail: data.commodity || 'General Shipment',
          },
          Dimensions: [
            {
              Weight: data.weight,
              Count: data.pieces,
            },
          ],
          RegisterPickup: data.registerPickup || false,
          PickupDate: data.pickupDate,
          PickupTime: data.pickupTime,
        },
      },
      Profile: {
        LoginID: '',
        LicenceKey: '',
        Api_type: '',
      },
    }

    const response = await waybillService.createWaybill(waybillRequest)

    return {
      success: true,
      awbNumber: response.ShipmentData.AWBNo,
      tokenNumber: response.ShipmentData.TokenNumber,
      originArea: response.ShipmentData.OriginArea,
      destinationArea: response.ShipmentData.DestinationArea,
      pickupScheduleDate: response.ShipmentData.PickupScheduleDate,
      label: waybillService.getWaybillLabel(response), // PDF buffer
    }
  } catch (error) {
    logger.error('Failed to create BlueDart shipment:', error)
    throw error
  }
}

// ========================== TRACK SHIPMENT ==========================
export const trackShipment = async (awbNumber: string) => {
  try {
    const response = await trackingService.trackShipment(awbNumber)
    const latestStatus = trackingService.getLatestStatus(response)

    return {
      awbNumber,
      status: latestStatus.status,
      statusDate: latestStatus.statusDate,
      statusTime: latestStatus.statusTime,
      currentLocation: latestStatus.location,
      origin: response.ShipmentData.Origin,
      destination: response.ShipmentData.Destination,
      scans: response.ShipmentData.Scans,
    }
  } catch (error) {
    logger.error('Failed to track BlueDart shipment:', error)
    throw error
  }
}

// ========================== SCHEDULE PICKUP ==========================
export const schedulePickup = async (data: {
  pickupDate: string
  pickupTime: string
  pickupPincode: string
  pickupAddress: string
  pickupContactPerson: string
  pickupMobile: string
  numberOfPieces: number
  customerCode: string
}) => {
  try {
    const response = await pickupService.registerPickup({
      Request: {
        PickupDetails: {
          PickupDate: data.pickupDate,
          PickupTime: data.pickupTime,
          PickupLocation: data.pickupAddress,
          PickupAreaName: '',
          PickupPincode: data.pickupPincode,
          PickupContactPerson: data.pickupContactPerson,
          PickupMobileNumber: data.pickupMobile,
          NumberOfPieces: data.numberOfPieces,
        },
        CustomerDetails: {
          CustomerCode: data.customerCode,
          CustomerName: data.pickupContactPerson,
          CustomerAddress1: data.pickupAddress,
          CustomerPincode: data.pickupPincode,
          CustomerMobile: data.pickupMobile,
        },
      },
      Profile: {
        LoginID: '',
        LicenceKey: '',
        Api_type: '',
      },
    })

    return {
      success: true,
      pickupNumber: response.PickupRegistrationData.PickupRegistrationNumber,
      tokenNumber: response.PickupRegistrationData.TokenNumber,
      scheduleDate: response.PickupRegistrationData.PickupScheduleDate,
    }
  } catch (error) {
    logger.error('Failed to schedule BlueDart pickup:', error)
    throw error
  }
}

// ========================== CANCEL PICKUP ==========================
export const cancelPickup = async (pickupNumber: string) => {
  try {
    const success = await pickupService.cancelPickup(pickupNumber)
    return { success }
  } catch (error) {
    logger.error('Failed to cancel BlueDart pickup:', error)
    throw error
  }
}

// ========================== GET QUOTE ==========================
export const getShippingQuote = async (data: {
  originPincode: string
  destinationPincode: string
  weight: number
  collectableAmount?: number
}) => {
  try {
    // Check serviceability
    const [originCheck, destCheck, transitTime] = await Promise.all([
      locationFinderService.checkServiceability(data.originPincode),
      locationFinderService.checkServiceability(data.destinationPincode),
      transitTimeService.getTransitTime(data.originPincode, data.destinationPincode),
    ])

    if (!destCheck.PincodeData.IsServicable) {
      throw new AppError('Destination pincode is not serviceable', 400)
    }

    // Calculate estimated charges (you'll need BlueDart rate card)
    // This is a placeholder - actual rates depend on BlueDart contract
    const baseRate = data.weight * 50 // ₹50 per kg
    const codCharge = data.collectableAmount ? data.collectableAmount * 0.02 : 0 // 2% COD

    return {
      serviceable: true,
      transitDays: transitTime.TransitDays,
      estimatedDelivery: transitTime.TransitTime,
      isCODAvailable: destCheck.PincodeData.IsCODAvailable,
      charges: {
        baseCharge: baseRate,
        codCharge: codCharge,
        gst: (baseRate + codCharge) * 0.18,
        total: (baseRate + codCharge) * 1.18,
      },
    }
  } catch (error) {
    logger.error('Failed to get BlueDart quote:', error)
    throw error
  }
}

// ========================== CHECK SERVICEABILITY ==========================
export const checkServiceability = async (pincode: string) => {
  try {
    return await locationFinderService.getPincodeDetails(pincode)
  } catch (error) {
    logger.error('Failed to check BlueDart serviceability:', error)
    throw error
  }
}
