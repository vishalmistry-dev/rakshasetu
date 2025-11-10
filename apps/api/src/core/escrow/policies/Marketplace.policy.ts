import { IEscrowPolicy } from '../escrow.schema'

/**
 * Marketplace Policy: For RSmart P2P buyer-seller transactions
 * Longer holding period, stricter release criteria
 */
export class MarketplacePolicy implements IEscrowPolicy {
  async canInitiate(order: any): Promise<{ valid: boolean; reason?: string }> {
    // Marketplace orders require payment captured
    if (order.financialStatus !== 'CAPTURED') {
      return { valid: false, reason: 'Payment must be captured for marketplace orders' }
    }

    return { valid: true }
  }

  async canRelease(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }> {
    // Marketplace requires both parties confirmation or timeout

    // Check if delivered
    if (order.status !== 'DELIVERED' && order.status !== 'FINISHED') {
      return { valid: false, reason: 'Order must be delivered before release' }
    }

    // Check buyer confirmation or auto-release timeout
    const autoReleaseTime = escrow.metadata?.autoReleaseAt
    if (autoReleaseTime && new Date() < new Date(autoReleaseTime)) {
      // Still in holding period, need explicit buyer confirmation
      const buyerConfirmed = escrow.metadata?.buyerConfirmed === true
      if (!buyerConfirmed) {
        return { valid: false, reason: 'Awaiting buyer confirmation or auto-release timeout' }
      }
    }

    // Check for open disputes
    if (order.status === 'DISPUTE_OPEN' || order.status === 'ON_DISPUTE') {
      return { valid: false, reason: 'Cannot release while dispute is open' }
    }

    return { valid: true }
  }

  async canRefund(escrow: any, order: any): Promise<{ valid: boolean; reason?: string }> {
    // Can refund if order cancelled by seller
    if (order.status === 'CANCELLED') {
      return { valid: true }
    }

    // Can refund if dispute resolved in buyer favor
    if (order.status === 'REFUNDED' || escrow.status === 'REFUNDED_TO_BUYER') {
      return { valid: true }
    }

    return { valid: false, reason: 'Marketplace order not eligible for refund' }
  }

  async calculateReleaseAmount(escrow: any, order: any): Promise<number> {
    // Marketplace: Deduct platform fee + any penalties
    let releaseAmount = escrow.sellerReceives

    // Apply any additional marketplace deductions
    const deductions = escrow.metadata?.deductions || []
    const totalDeductions = deductions.reduce((sum: number, d: any) => sum + d.amount, 0)

    return Math.max(0, releaseAmount - totalDeductions)
  }

  getHoldingPeriod(): number {
    // 120 hours (5 days) for P2P transactions - longer protection period
    return 120
  }
}
