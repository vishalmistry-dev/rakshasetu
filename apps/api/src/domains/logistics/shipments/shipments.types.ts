export interface CreateShipmentInput {
  // Order reference
  orderId: string

  // Courier selection
  courierProvider?: 'bluedart' | 'delhivery' // Auto-select if not provided

  // Consignee (customer)
  consigneeName: string
  consigneePhone: string
  consigneeEmail?: string
  consigneeAddress: {
    line1: string
    line2?: string
    city: string
    state: string
    pincode: string
    landmark?: string
  }

  // Shipper (merchant) - will be fetched from merchant data

  // Package details
  weight: number // kg
  dimensions?: {
    length: number // cm
    width: number
    height: number
  }
  pieces: number
  commodity?: string
  invoiceValue: number

  // Payment
  paymentMode: 'PREPAID' | 'COD'
  collectableAmount?: number

  // Pickup
  schedulePickup?: boolean
  pickupDate?: string
  pickupTime?: string
}

export interface ShipmentTrackingUpdate {
  status: string
  statusCode: string
  location: string
  timestamp: Date
  description: string
}
