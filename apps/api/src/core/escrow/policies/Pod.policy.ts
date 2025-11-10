import { ORDER_STATUS } from '@rakshasetu/database'
import { IEscrowPolicy } from '../escrow.schema'

/**
 * POD Policy: Payment collected at delivery, held briefly, then released
 */
export class PODPolicy implements IEscrowPolicy {
  async canInitiate(order: any): Promise<{ valid: boolean; reason?: string }> {
    // POD escrow initiated when order created
    return { valid: true }
  }

  async canRelease(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }> {
    // Can release after payment collected at delivery
    if (order.status !== ORDER_STATUS.DELIVERED) {
      return { valid: false, reason: 'Order must be delivered before releasing POD' }
    }

    // Check if POD payment collected
    if (order.financialStatus !== 'CAPTURED') {
      return { valid: false, reason: 'POD payment not yet collected' }
    }

    return { valid: true }
  }

  async canRefund(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }> {
    // POD can be cancelled before delivery
    if (order.status === ORDER_STATUS.CANCELLED || order.status === ORDER_STATUS.RETURN_REQUESTED) {
      return { valid: true }
    }

    // Can refund if customer disputes after payment
    if (order.status === ORDER_STATUS.DISPUTE_OPEN) {
      return { valid: true }
    }

    return { valid: false, reason: 'POD orders cannot be refunded after successful delivery' }
  }

  async calculateReleaseAmount(escrow: any, order: any): Promise<number> {
    // Release full amount minus platform fees
    return escrow.sellerReceives
  }

  getHoldingPeriod(): number {
    // 24 hours after payment collected
    return 24
  }
}
