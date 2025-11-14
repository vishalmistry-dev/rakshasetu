import {
  CreateShipmentInput,
  CreateShipmentOutput,
  GetQuoteInput,
  ICourierProvider,
  QuoteOutput,
  SchedulePickupInput,
  SchedulePickupOutput,
  ServiceabilityOutput,
  TrackingOutput,
} from '../courier.interface'
import * as blueDartService from './bluedart.service'

export class BlueDartAdapter implements ICourierProvider {
  name = 'BlueDart'

  async createShipment(data: CreateShipmentInput): Promise<CreateShipmentOutput> {
    const result = await blueDartService.createShipment({
      consigneeName: data.consigneeName,
      consigneeAddress: data.consigneeAddress,
      consigneePincode: data.consigneePincode,
      consigneeCity: data.consigneeCity,
      consigneeState: data.consigneeState,
      consigneeMobile: data.consigneeMobile,
      consigneeEmail: data.consigneeEmail,
      shipperCode: data.shipperCode,
      shipperName: data.shipperName,
      shipperAddress: data.shipperAddress,
      shipperPincode: data.shipperPincode,
      shipperCity: data.shipperCity,
      shipperState: data.shipperState,
      shipperMobile: data.shipperMobile,
      weight: data.weight,
      pieces: data.pieces,
      collectableAmount: data.collectableAmount,
      commodity: data.commodity,
      registerPickup: data.schedulePickup,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
    })

    return {
      success: result.success,
      trackingNumber: result.awbNumber,
      courierName: this.name,
      pickupScheduled: !!result.pickupScheduleDate,
      pickupDate: result.pickupScheduleDate,
      label: result.label || undefined,
    }
  }

  async trackShipment(trackingNumber: string): Promise<TrackingOutput> {
    const result = await blueDartService.trackShipment(trackingNumber)

    return {
      trackingNumber,
      courierName: this.name,
      status: result.status,
      statusCode: result.status,
      currentLocation: result.currentLocation,
      origin: result.origin,
      destination: result.destination,
      scans: result.scans.map((scan) => ({
        date: scan.ScanDate,
        time: scan.ScanTime,
        location: scan.ScannedLocation,
        status: scan.StatusCode,
        description: scan.StatusDescription,
      })),
    }
  }

  async schedulePickup(data: SchedulePickupInput): Promise<SchedulePickupOutput> {
    const result = await blueDartService.schedulePickup({
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
      pickupPincode: data.pickupPincode,
      pickupAddress: data.pickupAddress,
      pickupContactPerson: data.pickupContactPerson,
      pickupMobile: data.pickupMobile,
      numberOfPieces: data.numberOfPieces,
      customerCode: data.customerCode,
    })

    return {
      success: result.success,
      pickupId: result.pickupNumber,
      scheduleDate: result.scheduleDate,
      courierName: this.name,
    }
  }

  async cancelPickup(pickupId: string): Promise<boolean> {
    const result = await blueDartService.cancelPickup(pickupId)
    return result.success
  }

  async getQuote(data: GetQuoteInput): Promise<QuoteOutput> {
    const result = await blueDartService.getShippingQuote({
      originPincode: data.originPincode,
      destinationPincode: data.destinationPincode,
      weight: data.weight,
      collectableAmount: data.collectableAmount,
    })

    return {
      courierName: this.name,
      serviceable: result.serviceable,
      transitDays: result.transitDays,
      estimatedDelivery: result.estimatedDelivery,
      charges: result.charges,
    }
  }

  async checkServiceability(pincode: string): Promise<ServiceabilityOutput> {
    const result = await blueDartService.checkServiceability(pincode)

    return {
      pincode: result.pincode,
      city: result.city,
      state: result.state,
      serviceable: result.isServicable,
      codAvailable: result.isCODAvailable,
      courierName: this.name,
    }
  }
}
