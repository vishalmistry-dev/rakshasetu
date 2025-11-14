import { ORDER_STATUS } from '@rakshasetu/database'
import { IEscrowPolicy } from '../escrow.schema'

/**
 * COD Policy: Cash collected by courier, remitted to merchant after delivery
 */
export class CODPolicy implements IEscrowPolicy {
  async canInitiate(order: any): Promise<{ valid: boolean; reason?: string }> {
    // COD escrow is always initiated (even for ₹0)
    return { valid: true }
  }

  async canRelease(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }> {
    // Can release after COD is collected and remitted by courier
    if (!order.shipping) {
      return { valid: false, reason: 'Shipping information not available' }
    }

    // Check if delivered
    if (order.status !== ORDER_STATUS.DELIVERED) {
      return { valid: false, reason: 'Order must be delivered before releasing COD' }
    }

    // Check COD collection status in transaction
    const codCollected = escrow.codRemittedAt !== null
    if (!codCollected) {
      return { valid: false, reason: 'COD amount not yet remitted by courier' }
    }

    return { valid: true }
  }

  async canRefund(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }> {
    // COD orders can be cancelled before delivery
    if (order.status === ORDER_STATUS.CANCELLED || order.status === ORDER_STATUS.RETURN_REQUESTED) {
      return { valid: true }
    }

    return { valid: false, reason: 'COD orders cannot be refunded after delivery' }
  }

  async calculateReleaseAmount(escrow: any, order: any): Promise<number> {
    // For COD: sellerReceives = buyerPaid - charges - platformFee
    return escrow.sellerReceives
  }

  getHoldingPeriod(): number {
    // 24 hours after COD collected
    return 24
  }
}
