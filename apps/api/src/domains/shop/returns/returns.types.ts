import { RETURN_REASON, RETURN_STATUS } from '@rakshasetu/database'

// ============================================
// RETURN REQUEST RESPONSE
// ============================================

export interface ReturnRequestResponse {
  id: string
  orderId: string
  orderNumber?: string
  itemId: string
  itemName?: string
  reason: RETURN_REASON
  status: RETURN_STATUS
  refundAmount?: number
  description?: string
  images?: string[]
  pickupScheduledAt?: Date
  pickupCourierCode?: string
  approvalNote?: string
  rejectionReason?: string
  refundSynced: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ReturnListResponse {
  returns: ReturnRequestResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ============================================
// RETURN EVENTS
// ============================================

export enum RETURN_EVENT {
  REQUESTED = 'RETURN_REQUESTED',
  APPROVED = 'RETURN_APPROVED',
  REJECTED = 'RETURN_REJECTED',
  PICKUP_SCHEDULED = 'RETURN_PICKUP_SCHEDULED',
  PICKED_UP = 'RETURN_PICKED_UP',
  IN_TRANSIT = 'RETURN_IN_TRANSIT',
  DELIVERED = 'RETURN_DELIVERED',
  REFUNDED = 'RETURN_REFUNDED',
}

// ============================================
// RETURN METADATA
// ============================================

export interface ReturnMetadata {
  customerInfo?: {
    name: string
    email: string
    phone: string
  }
  pickupAddress?: any
  description?: string
  images?: string[]
  approvalNote?: string
  rejectionReason?: string
  reverseShipmentId?: string
  trackingNumber?: string
}
