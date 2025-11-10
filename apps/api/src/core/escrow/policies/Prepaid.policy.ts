import { ORDER_STATUS } from '@rakshasetu/database'
import { IEscrowPolicy } from '../escrow.schema'

/**
 * Prepaid Policy: Payment captured upfront, held until delivery confirmed
 */
export class PrepaidPolicy implements IEscrowPolicy {
  async canInitiate(order: any): Promise<{ valid: boolean; reason?: string }> {
    // Can only initiate if payment is captured
    if (order.financialStatus !== 'CAPTURED') {
      return { valid: false, reason: 'Payment must be captured before initiating escrow' }
    }

    return { valid: true }
  }

  async canRelease(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }> {
    // Can release after delivery confirmed
    if (order.status !== ORDER_STATUS.DELIVERED) {
      return { valid: false, reason: 'Order must be delivered before releasing funds' }
    }

    // Check if in dispute
    if (order.status === ORDER_STATUS.DISPUTE_OPEN) {
      return { valid: false, reason: 'Cannot release funds while dispute is open' }
    }

    return { valid: true }
  }

  async canRefund(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }> {
    // Can refund if order cancelled before delivery
    if (order.status === ORDER_STATUS.CANCELLED) {
      return { valid: true }
    }

    // Can refund if return accepted
    if (order.status === ORDER_STATUS.RETURNED) {
      return { valid: true }
    }

    // Can refund if dispute resolved in customer favor
    if (order.status === ORDER_STATUS.DISPUTE_RESOLVED) {
      // Check dispute resolution - would need to check ShopDisputeTicket
      return { valid: true }
    }

    return { valid: false, reason: 'Order not eligible for refund' }
  }

  async calculateReleaseAmount(escrow: any, order: any): Promise<number> {
    // Release = buyerPaid - platformFee - deductions
    return escrow.sellerReceives
  }

  getHoldingPeriod(): number {
    // 72 hours (3 days) after delivery
    return 72
  }
}
