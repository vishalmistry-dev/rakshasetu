import { ESCROW_STATUS, PAYMENT_METHOD } from '@rakshasetu/database'

// ============================================
// ESCROW POLICY INTERFACE
// ============================================

export interface IEscrowPolicy {
  canInitiate(order: any): Promise<{ valid: boolean; reason?: string }>
  canRelease(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }>
  canRefund(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }>
  calculateReleaseAmount(escrow: any, order: any): Promise<number>
  getHoldingPeriod(): number
}

// ============================================
// ESCROW STATE TRANSITIONS
// ============================================

export const ESCROW_TRANSITIONS: Record<
  ESCROW_STATUS,
  {
    allowedNext: ESCROW_STATUS[]
    triggers: Record<string, string[]>
  }
> = {
  INITIATED: {
    allowedNext: [ESCROW_STATUS.HELD, ESCROW_STATUS.REFUNDED],
    triggers: {
      HELD: ['PAYMENT_CAPTURED', 'ORDER_CONFIRMED'],
      REFUNDED: ['PAYMENT_FAILED', 'ORDER_CANCELLED'],
    },
  },
  HELD: {
    allowedNext: [
      ESCROW_STATUS.RELEASE_REQUESTED,
      ESCROW_STATUS.DISPUTE_OPEN,
      ESCROW_STATUS.REFUNDED,
    ],
    triggers: {
      RELEASE_REQUESTED: ['ORDER_DELIVERED', 'AUTO_RELEASE_TIMER'],
      DISPUTE_OPEN: ['DISPUTE_RAISED'],
      REFUNDED: ['ORDER_CANCELLED', 'MERCHANT_CANCELLED'],
    },
  },
  RELEASE_REQUESTED: {
    allowedNext: [ESCROW_STATUS.RELEASED, ESCROW_STATUS.DISPUTE_OPEN],
    triggers: {
      RELEASED: ['RELEASE_APPROVED', 'AUTO_RELEASE_TIMER_EXPIRED'],
      DISPUTE_OPEN: ['DISPUTE_RAISED_BEFORE_RELEASE'],
    },
  },
  DISPUTE_OPEN: {
    allowedNext: [ESCROW_STATUS.DISPUTE_RESOLVED, ESCROW_STATUS.RELEASED, ESCROW_STATUS.REFUNDED],
    triggers: {
      DISPUTE_RESOLVED: ['ADMIN_RESOLVED'],
      RELEASED: ['DISPUTE_RESOLVED_MERCHANT_FAVOR'],
      REFUNDED: ['DISPUTE_RESOLVED_CUSTOMER_FAVOR'],
    },
  },
  RELEASED: {
    allowedNext: [],
    triggers: {},
  },
  REFUNDED: {
    allowedNext: [],
    triggers: {},
  },
  DISPUTE_RESOLVED: {
    allowedNext: [ESCROW_STATUS.RELEASED, ESCROW_STATUS.REFUNDED],
    triggers: {
      RELEASED: ['RESOLUTION_MERCHANT_FAVOR'],
      REFUNDED: ['RESOLUTION_CUSTOMER_FAVOR'],
    },
  },
}

// ============================================
// AUTO-RELEASE TIMERS (in hours)
// ============================================

export const AUTO_RELEASE_TIMERS: Record<PAYMENT_METHOD, number> = {
  [PAYMENT_METHOD.PREPAID]: 72,
  [PAYMENT_METHOD.COD]: 24,
  [PAYMENT_METHOD.POD]: 24,
}

// ============================================
// ESCROW EVENTS
// ============================================

export enum ESCROW_EVENT {
  INITIATED = 'ESCROW_INITIATED',
  HELD = 'ESCROW_HELD',
  RELEASE_REQUESTED = 'ESCROW_RELEASE_REQUESTED',
  RELEASED = 'ESCROW_RELEASED',
  REFUND_REQUESTED = 'ESCROW_REFUND_REQUESTED',
  REFUNDED = 'ESCROW_REFUNDED',
  DISPUTE_OPENED = 'ESCROW_DISPUTE_OPENED',
  DISPUTE_RESOLVED = 'ESCROW_DISPUTE_RESOLVED',
  AUTO_RELEASE_SCHEDULED = 'ESCROW_AUTO_RELEASE_SCHEDULED',
  AUTO_RELEASED = 'ESCROW_AUTO_RELEASED',
}

// ============================================
// ESCROW METADATA
// ============================================

export interface EscrowMetadata {
  orderId: string
  orderNumber?: string
  paymentId?: string
  razorpayPaymentId?: string
  autoReleaseAt?: Date
  deliveryConfirmedAt?: Date
  disputeId?: string
  refundId?: string
  platformFee?: number
  merchantShare?: number
  paymentMethod?: PAYMENT_METHOD
  deductions?: Array<{
    type: string
    amount: number
    reason: string
  }>
}

// ============================================
// RESPONSE TYPES
// ============================================

export interface EscrowResponse {
  id: string
  orderId: string
  transactionId: string
  status: ESCROW_STATUS
  amount: number
  amountReleased: number
  amountRefunded: number
  paymentMethod: PAYMENT_METHOD
  merchantId: string
  customerId?: string
  holdStartedAt?: Date
  releaseRequestedAt?: Date
  releasedAt?: Date
  refundedAt?: Date
  autoReleaseAt?: Date
  metadata?: EscrowMetadata
  createdAt: Date
  updatedAt: Date
}

export interface EscrowListResponse {
  escrows: EscrowResponse[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
