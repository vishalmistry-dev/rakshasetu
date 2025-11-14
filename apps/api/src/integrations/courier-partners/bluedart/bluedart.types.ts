// Authentication
export interface BlueDartAuthResponse {
  JWTToken: string
  expires_in?: number
}

// Waybill (Create Shipment)
export interface CreateWaybillRequest {
  Request: {
    Consignee: {
      ConsigneeName: string
      ConsigneeAddress1: string
      ConsigneeAddress2?: string
      ConsigneeAddress3?: string
      ConsigneePincode: string
      ConsigneeCity?: string
      ConsigneeState?: string
      ConsigneeMobile: string
      ConsigneeEmailID?: string
      ConsigneeTelephone?: string
    }
    Shipper: {
      CustomerCode: string
      CustomerName: string
      CustomerAddress1: string
      CustomerAddress2?: string
      CustomerAddress3?: string
      CustomerPincode: string
      CustomerCity?: string
      CustomerState?: string
      CustomerMobile: string
      CustomerEmailID?: string
      CustomerTelephone?: string
      IsToPayCustomer?: boolean
    }
    Services: {
      ProductCode: string
      ProductType: number
      SubProductCode?: string
      RegisterPickup?: boolean
      PickupDate?: string
      PickupTime?: string
      Commodity?: {
        CommodityDetail: string
        CommodityValue?: number
      }
      Dimensions?: {
        Length?: number
        Width?: number
        Height?: number
        Weight: number
        Count: number
      }[]
      SpecialInstruction?: string
      ActualWeight: number
      CollectableAmount?: number
      PackType?: string
      PDFOutputNotRequired?: boolean
      Pieces?: number
    }
  }
  Profile: {
    LoginID: string
    LicenceKey: string
    Api_type: string
  }
}

export interface CreateWaybillResponse {
  IsError: boolean
  Status: {
    StatusCode: string
    StatusInformation: string
  }
  ShipmentData: {
    AWBNo: string
    AWBPrintContent?: string // Base64 PDF
    OriginArea: string
    DestinationArea: string
    TokenNumber?: string
    PickupScheduleDate?: string
  }
}

// Tracking
export interface TrackingRequest {
  WaybillNo: string
}

export interface TrackingResponse {
  ShipmentData: {
    Waybill: string
    Status: string
    StatusDate: string
    StatusTime: string
    Instructions: string
    StatusCode: string
    StatusDescription: string
    Origin: string
    Destination: string
    Scans: {
      ScanDate: string
      ScanTime: string
      ScanType: string
      Scan: string
      ScannedLocation: string
      StatusCode: string
      StatusDescription: string
      Instructions: string
    }[]
  }
}

// Pickup
export interface PickupRegistrationRequest {
  Request: {
    PickupDetails: {
      PickupDate: string
      PickupTime: string
      PickupLocation: string
      PickupAreaName: string
      PickupPincode: string
      PickupCity?: string
      PickupContactPerson: string
      PickupMobileNumber: string
      PickupEmailID?: string
      NumberOfPieces: number
      PickupPackageType?: string
    }
    CustomerDetails: {
      CustomerCode: string
      CustomerName: string
      CustomerAddress1: string
      CustomerPincode: string
      CustomerMobile: string
    }
  }
  Profile: {
    LoginID: string
    LicenceKey: string
    Api_type: string
  }
}

export interface PickupRegistrationResponse {
  IsError: boolean
  Status: {
    StatusCode: string
    StatusInformation: string
  }
  PickupRegistrationData: {
    PickupRegistrationNumber: string
    TokenNumber: string
    PickupScheduleDate: string
  }
}

// Transit Time
export interface TransitTimeRequest {
  OriginPincode: string
  DestinationPincode: string
  ProductCode: string
  ProductType: number
}

export interface TransitTimeResponse {
  TransitTime: string
  TransitDays: number
}

// Location Finder (Serviceability)
export interface LocationServiceRequest {
  Pincode: string
}

export interface LocationServiceResponse {
  IsError: boolean
  PincodeData: {
    Pincode: string
    City: string
    State: string
    AreaName: string
    IsCODAvailable: boolean
    IsServicable: boolean
  }
}
