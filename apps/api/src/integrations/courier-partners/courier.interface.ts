// Generic courier provider interface
export interface ICourierProvider {
  name: string

  // Create shipment
  createShipment(data: CreateShipmentInput): Promise<CreateShipmentOutput>

  // Track shipment
  trackShipment(trackingNumber: string): Promise<TrackingOutput>

  // Schedule pickup
  schedulePickup(data: SchedulePickupInput): Promise<SchedulePickupOutput>

  // Cancel pickup
  cancelPickup(pickupId: string): Promise<boolean>

  // Get quote
  getQuote(data: GetQuoteInput): Promise<QuoteOutput>

  // Check serviceability
  checkServiceability(pincode: string): Promise<ServiceabilityOutput>
}

// ========================== INPUT TYPES ==========================

export interface CreateShipmentInput {
  // Consignee
  consigneeName: string
  consigneeAddress: string
  consigneePincode: string
  consigneeCity: string
  consigneeState: string
  consigneeMobile: string
  consigneeEmail?: string

  // Shipper
  shipperCode: string
  shipperName: string
  shipperAddress: string
  shipperPincode: string
  shipperCity: string
  shipperState: string
  shipperMobile: string

  // Package
  weight: number // kg
  pieces: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  commodity?: string
  invoiceValue?: number

  // Payment
  paymentMode: 'PREPAID' | 'COD'
  collectableAmount?: number

  // Pickup
  schedulePickup?: boolean
  pickupDate?: string
  pickupTime?: string
}

export interface SchedulePickupInput {
  pickupDate: string
  pickupTime: string
  pickupAddress: string
  pickupPincode: string
  pickupContactPerson: string
  pickupMobile: string
  numberOfPieces: number
  customerCode: string
}

export interface GetQuoteInput {
  originPincode: string
  destinationPincode: string
  weight: number
  paymentMode: 'PREPAID' | 'COD'
  collectableAmount?: number
}

// ========================== OUTPUT TYPES ==========================

export interface CreateShipmentOutput {
  success: boolean
  trackingNumber: string // AWB/Waybill number
  courierName: string
  pickupScheduled?: boolean
  pickupDate?: string
  estimatedDelivery?: string
  label?: Buffer // PDF label
  labelUrl?: string
}

export interface TrackingOutput {
  trackingNumber: string
  courierName: string
  status: string
  statusCode: string
  currentLocation: string
  origin: string
  destination: string
  estimatedDelivery?: string
  scans: {
    date: string
    time: string
    location: string
    status: string
    description: string
  }[]
}

export interface SchedulePickupOutput {
  success: boolean
  pickupId: string
  scheduleDate: string
  courierName: string
}

export interface QuoteOutput {
  courierName: string
  serviceable: boolean
  transitDays: number
  estimatedDelivery?: string
  charges: {
    baseCharge: number
    codCharge: number
    fuelSurcharge?: number
    gst: number
    total: number
  }
}

export interface ServiceabilityOutput {
  pincode: string
  city: string
  state: string
  serviceable: boolean
  codAvailable: boolean
  courierName: string
}
