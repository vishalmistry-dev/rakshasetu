import {
  ESCROW_STATUS,
  ORDER_STATUS,
  PAYMENT_METHOD,
  PrismaClient,
  TRANSACTION_STATUS,
} from '@rakshasetu/database'
import type {
  EscrowQuery,
  InitiateEscrowInput,
  RefundEscrowInput,
  ReleaseEscrowInput,
} from './escrow.schema'
import type {
  EscrowListResponse,
  EscrowMetadata,
  EscrowResponse,
  IEscrowPolicy,
} from './escrow.types'
import { AUTO_RELEASE_TIMERS, ESCROW_EVENT, ESCROW_TRANSITIONS } from './escrow.types'

import { AppError } from '@/common/errors'
import { CODPolicy } from './policies/cod.policy'
import { PODPolicy } from './policies/pod.policy'
import { PrepaidPolicy } from './policies/prepaid.policy'

export class EscrowService {
  private prisma: PrismaClient
  private policies: Map<PAYMENT_METHOD, IEscrowPolicy>

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
    this.policies = new Map([
      [PAYMENT_METHOD.COD, new CODPolicy()],
      [PAYMENT_METHOD.POD, new PODPolicy()],
      [PAYMENT_METHOD.PREPAID, new PrepaidPolicy()],
    ])
  }

  // ============================================
  // PUBLIC METHODS
  // ============================================

  /**
   * Initiate escrow for an order
   */
  async initiateEscrow(input: InitiateEscrowInput): Promise<EscrowResponse> {
    // Get order details
    const order = await this.prisma.shopOrder.findUnique({
      where: { id: input.orderId },
      include: {
        transaction: true,
        shipping: true,
      },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    if (order.merchantId !== input.merchantId) {
      throw new AppError('Not authorized for this order', 403)
    }

    // Check if escrow already exists
    if (order.transaction) {
      throw new AppError('Escrow already exists for this order', 400)
    }

    // Validate with policy
    const policy = this.getPolicy(input.paymentMethod)
    const validation = await policy.canInitiate(order)

    if (!validation.valid) {
      throw new AppError(validation.reason || 'Cannot initiate escrow', 400)
    }

    // Calculate auto-release time
    const autoReleaseAt = this.calculateAutoReleaseTime(input.paymentMethod)

    // Calculate amounts
    const platformFee = order.platformFee || 0
    const shippingCharge = order.shippingCharge || 0
    const codCharge = order.codCharge || 0
    const chargesDeducted = platformFee + codCharge
    const sellerReceives = input.amount - chargesDeducted

    // Create escrow transaction
    const transaction = await this.prisma.shopTransaction.create({
      data: {
        id: this.generateId(),
        orderId: input.orderId,
        buyerPaid: input.amount,
        chargesDeducted,
        sellerReceives,
        platformFee,
        shippingCharge,
        codCharge,
        status: TRANSACTION_STATUS.INITIATED,
      },
    })

    // Update order with escrow status
    await this.prisma.shopOrder.update({
      where: { id: input.orderId },
      data: {
        isEscrowed: true,
        escrowStatus: ESCROW_STATUS.INITIATED,
        escrowMeta: {
          autoReleaseAt: autoReleaseAt.toISOString(),
          paymentMethod: input.paymentMethod,
          ...input.metadata,
        } as any,
      },
    })

    // Log event
    await this.logEscrowEvent(transaction.id, ESCROW_EVENT.INITIATED, {
      amount: input.amount,
      paymentMethod: input.paymentMethod,
    })

    return this.mapToResponse(transaction, order)
  }

  /**
   * Move escrow to HELD status (after payment captured)
   */
  async holdEscrow(transactionId: string): Promise<EscrowResponse> {
    const transaction = await this.getTransaction(transactionId)
    const order = await this.getOrderByTransactionId(transactionId)

    // Validate state transition
    this.validateTransition(order.escrowStatus!, ESCROW_STATUS.HELD)

    // Update transaction
    await this.prisma.shopTransaction.update({
      where: { id: transactionId },
      data: {
        status: TRANSACTION_STATUS.ON_HOLD,
      },
    })

    // Update order
    const updatedOrder = await this.prisma.shopOrder.update({
      where: { id: order.id },
      data: {
        escrowStatus: ESCROW_STATUS.HELD,
        escrowMeta: {
          ...(order.escrowMeta as any),
          holdStartedAt: new Date().toISOString(),
        } as any,
      },
    })

    await this.logEscrowEvent(transactionId, ESCROW_EVENT.HELD, {
      amount: transaction.buyerPaid,
    })

    return this.mapToResponse(transaction, updatedOrder)
  }

  /**
   * Request release of escrow (after delivery)
   */
  async requestRelease(input: ReleaseEscrowInput): Promise<EscrowResponse> {
    const transaction = await this.getTransaction(input.escrowId)
    const order = await this.getOrderByTransactionId(input.escrowId)

    // Get payment method from order meta
    const paymentMethod = (order.escrowMeta as any)?.paymentMethod || order.paymentType

    // Validate with policy
    const policy = this.getPolicy(paymentMethod)
    const validation = await policy.canRelease(transaction, order)

    if (!validation.valid) {
      throw new AppError(validation.reason || 'Cannot release escrow', 400)
    }

    // Validate state transition
    this.validateTransition(order.escrowStatus!, ESCROW_STATUS.RELEASE_REQUESTED)

    // Update transaction
    await this.prisma.shopTransaction.update({
      where: { id: input.escrowId },
      data: {
        releaseRequested: true,
        releaseRequestedAt: new Date(),
        releaseNotes: input.reason,
      },
    })

    // Update order
    const updatedOrder = await this.prisma.shopOrder.update({
      where: { id: order.id },
      data: {
        escrowStatus: ESCROW_STATUS.RELEASE_REQUESTED,
        escrowMeta: {
          ...(order.escrowMeta as any),
          releaseReason: input.reason,
        } as any,
      },
    })

    await this.logEscrowEvent(input.escrowId, ESCROW_EVENT.RELEASE_REQUESTED, {
      reason: input.reason,
    })

    // Auto-release after holding period
    await this.scheduleAutoRelease(input.escrowId, paymentMethod)

    return this.mapToResponse(transaction, updatedOrder)
  }

  /**
   * Release escrow to merchant
   */
  async releaseEscrow(escrowId: string, adminId?: string): Promise<EscrowResponse> {
    const transaction = await this.getTransaction(escrowId)
    const order = await this.getOrderByTransactionId(escrowId)

    // Get payment method
    const paymentMethod = (order.escrowMeta as any)?.paymentMethod || order.paymentType

    // Calculate release amount
    const policy = this.getPolicy(paymentMethod)
    const releaseAmount = await policy.calculateReleaseAmount(transaction, order)

    // Validate state transition
    this.validateTransition(order.escrowStatus!, ESCROW_STATUS.RELEASED)

    // Update transaction
    await this.prisma.shopTransaction.update({
      where: { id: escrowId },
      data: {
        status: TRANSACTION_STATUS.RELEASED_TO_SELLER,
        releaseApprovedByAdmin: true,
        releaseApprovedAt: new Date(),
        releaseApprovedByAdminId: adminId,
      },
    })

    // Update order
    const updatedOrder = await this.prisma.shopOrder.update({
      where: { id: order.id },
      data: {
        escrowStatus: ESCROW_STATUS.RELEASED,
        status: ORDER_STATUS.DELIVERED,
        fulfillmentStatus: 'FULFILLED',
        escrowMeta: {
          ...(order.escrowMeta as any),
          releasedBy: adminId || 'SYSTEM',
          releasedAt: new Date().toISOString(),
          platformFee: transaction.platformFee,
        } as any,
      },
    })

    // Update merchant account
    await this.creditMerchantAccount(order.merchantId, releaseAmount, escrowId)

    await this.logEscrowEvent(escrowId, ESCROW_EVENT.RELEASED, {
      amount: releaseAmount,
      releasedBy: adminId || 'SYSTEM',
    })

    return this.mapToResponse(transaction, updatedOrder)
  }

  /**
   * Refund escrow to customer
   */
  async refundEscrow(input: RefundEscrowInput, adminId?: string): Promise<EscrowResponse> {
    const transaction = await this.getTransaction(input.escrowId)
    const order = await this.getOrderByTransactionId(input.escrowId)

    // Get payment method
    const paymentMethod = (order.escrowMeta as any)?.paymentMethod || order.paymentType

    // Validate with policy
    const policy = this.getPolicy(paymentMethod)
    const validation = await policy.canRefund(transaction, order)

    if (!validation.valid) {
      throw new AppError(validation.reason || 'Cannot refund escrow', 400)
    }

    // Validate state transition
    this.validateTransition(order.escrowStatus!, ESCROW_STATUS.REFUNDED)

    const refundAmount = input.refundAmount || transaction.buyerPaid

    // Process refund via payment gateway (if prepaid)
    if (paymentMethod === PAYMENT_METHOD.PREPAID) {
      // TODO: Integrate with Razorpay refund API
      // const payment = await this.prisma.shopPayment.findFirst({
      //   where: { orderId: order.id }
      // });
      // await razorpayService.refund(payment.gatewayPaymentId, refundAmount);
    }

    // Update transaction
    await this.prisma.shopTransaction.update({
      where: { id: input.escrowId },
      data: {
        status: TRANSACTION_STATUS.REFUNDED_TO_BUYER,
      },
    })

    // Update order
    const updatedOrder = await this.prisma.shopOrder.update({
      where: { id: order.id },
      data: {
        escrowStatus: ESCROW_STATUS.REFUNDED,
        status: ORDER_STATUS.REFUND_COMPLETED,
        escrowMeta: {
          ...(order.escrowMeta as any),
          refundReason: input.reason,
          refundedBy: adminId || 'SYSTEM',
          refundedAt: new Date().toISOString(),
          refundAmount,
        } as any,
      },
    })

    await this.logEscrowEvent(input.escrowId, ESCROW_EVENT.REFUNDED, {
      amount: refundAmount,
      reason: input.reason,
      refundedBy: adminId || 'SYSTEM',
    })

    return this.mapToResponse(transaction, updatedOrder)
  }

  /**
   * Get escrow by ID
   */
  async getEscrow(escrowId: string): Promise<EscrowResponse> {
    const transaction = await this.getTransaction(escrowId)
    const order = await this.getOrderByTransactionId(escrowId)
    return this.mapToResponse(transaction, order)
  }

  /**
   * List escrows with filters
   */
  async listEscrows(query: EscrowQuery): Promise<EscrowListResponse> {
    const { page, limit, merchantId, status, paymentMethod, fromDate, toDate } = query

    const orderWhere: any = {}

    if (merchantId) {
      orderWhere.merchantId = merchantId
    }

    if (status) {
      orderWhere.escrowStatus = status
    }

    if (paymentMethod) {
      orderWhere.paymentType = paymentMethod
    }

    if (fromDate || toDate) {
      orderWhere.createdAt = {}
      if (fromDate) orderWhere.createdAt.gte = new Date(fromDate)
      if (toDate) orderWhere.createdAt.lte = new Date(toDate)
    }

    // Only orders with escrow
    orderWhere.isEscrowed = true

    const [orders, total] = await Promise.all([
      this.prisma.shopOrder.findMany({
        where: orderWhere,
        include: {
          transaction: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.shopOrder.count({ where: orderWhere }),
    ])

    const escrows = orders
      .filter((o) => o.transaction)
      .map((o) => this.mapToResponse(o.transaction!, o))

    return {
      escrows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  /**
   * Open dispute for escrow
   */
  async openDispute(escrowId: string, disputeId: string): Promise<EscrowResponse> {
    const transaction = await this.getTransaction(escrowId)
    const order = await this.getOrderByTransactionId(escrowId)

    // Validate state transition
    this.validateTransition(order.escrowStatus!, ESCROW_STATUS.DISPUTE_OPEN)

    // Update transaction
    await this.prisma.shopTransaction.update({
      where: { id: escrowId },
      data: {
        status: TRANSACTION_STATUS.DISPUTED,
      },
    })

    // Update order
    const updatedOrder = await this.prisma.shopOrder.update({
      where: { id: order.id },
      data: {
        escrowStatus: ESCROW_STATUS.DISPUTE_OPEN,
        status: ORDER_STATUS.DISPUTE_OPEN,
        escrowMeta: {
          ...(order.escrowMeta as any),
          disputeId,
          disputeOpenedAt: new Date().toISOString(),
        } as any,
      },
    })

    await this.logEscrowEvent(escrowId, ESCROW_EVENT.DISPUTE_OPENED, {
      disputeId,
    })

    return this.mapToResponse(transaction, updatedOrder)
  }

  // ============================================
  // PRIVATE HELPERS
  // ============================================

  private async getTransaction(id: string) {
    const transaction = await this.prisma.shopTransaction.findUnique({
      where: { id },
    })

    if (!transaction) {
      throw new AppError('Escrow transaction not found', 404)
    }

    return transaction
  }

  private async getOrderByTransactionId(transactionId: string) {
    const transaction = await this.prisma.shopTransaction.findUnique({
      where: { id: transactionId },
      include: {
        order: {
          include: {
            shipping: true,
          },
        },
      },
    })

    if (!transaction?.order) {
      throw new AppError('Order not found for transaction', 404)
    }

    return transaction.order
  }

  private getPolicy(paymentMethod: PAYMENT_METHOD): IEscrowPolicy {
    const policy = this.policies.get(paymentMethod)
    if (!policy) {
      throw new AppError(`No policy found for payment method: ${paymentMethod}`, 400)
    }
    return policy
  }

  private validateTransition(currentStatus: ESCROW_STATUS, nextStatus: ESCROW_STATUS): void {
    const transitions = ESCROW_TRANSITIONS[currentStatus]
    if (!transitions) {
      throw new AppError(`Invalid current status: ${currentStatus}`, 400)
    }

    const isValidTransition = transitions.allowedNext.some((status) => status === nextStatus)
    if (!isValidTransition) {
      throw new AppError(`Cannot transition from ${currentStatus} to ${nextStatus}`, 400)
    }
  }

  private calculateAutoReleaseTime(paymentMethod: PAYMENT_METHOD): Date {
    const hours = AUTO_RELEASE_TIMERS[paymentMethod] || AUTO_RELEASE_TIMERS.PREPAID
    const releaseTime = new Date()
    releaseTime.setHours(releaseTime.getHours() + hours)
    return releaseTime
  }

  private async scheduleAutoRelease(
    escrowId: string,
    paymentMethod: PAYMENT_METHOD
  ): Promise<void> {
    const hours = AUTO_RELEASE_TIMERS[paymentMethod] || AUTO_RELEASE_TIMERS.PREPAID

    // TODO: Implement with Bull Queue
    // await escrowQueue.add(
    //   'auto-release',
    //   { escrowId },
    //   { delay: hours * 60 * 60 * 1000 }
    // );

    await this.logEscrowEvent(escrowId, ESCROW_EVENT.AUTO_RELEASE_SCHEDULED, {
      scheduledFor: this.calculateAutoReleaseTime(paymentMethod).toISOString(),
    })
  }

  private async creditMerchantAccount(
    merchantId: string,
    amount: number,
    escrowId: string
  ): Promise<void> {
    // Get or create merchant account
    let account = await this.prisma.merchantAccount.findUnique({
      where: { merchantId },
    })

    if (!account) {
      account = await this.prisma.merchantAccount.create({
        data: {
          id: this.generateId(),
          merchantId,
          availableBalance: 0,
          pendingCharges: 0,
          totalEarnings: 0,
          totalWithdrawn: 0,
          totalCharges: 0,
        },
      })
    }

    await this.prisma.merchantAccount.update({
      where: { merchantId },
      data: {
        availableBalance: { increment: amount },
        totalEarnings: { increment: amount },
      },
    })
  }

  private async logEscrowEvent(escrowId: string, event: ESCROW_EVENT, data: any): Promise<void> {
    // TODO: Implement event logging to separate table or external service
    console.log(`[ESCROW_EVENT] ${event}:`, {
      escrowId,
      ...data,
      timestamp: new Date().toISOString(),
    })
  }

  private generateId(): string {
    return `escrow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private mapToResponse(transaction: any, order: any): EscrowResponse {
    const escrowMeta = (order.escrowMeta || {}) as any

    return {
      id: transaction.id,
      orderId: order.id,
      transactionId: transaction.id,
      status: order.escrowStatus || ESCROW_STATUS.INITIATED,
      amount: transaction.buyerPaid,
      amountReleased:
        order.escrowStatus === ESCROW_STATUS.RELEASED ? transaction.sellerReceives : 0,
      amountRefunded: order.escrowStatus === ESCROW_STATUS.REFUNDED ? transaction.buyerPaid : 0,
      paymentMethod: escrowMeta.paymentMethod || order.paymentType,
      merchantId: order.merchantId,
      customerId: order.customerId || undefined,
      holdStartedAt: escrowMeta.holdStartedAt ? new Date(escrowMeta.holdStartedAt) : undefined,
      releaseRequestedAt: transaction.releaseRequestedAt || undefined,
      releasedAt: escrowMeta.releasedAt ? new Date(escrowMeta.releasedAt) : undefined,
      refundedAt: escrowMeta.refundedAt ? new Date(escrowMeta.refundedAt) : undefined,
      autoReleaseAt: escrowMeta.autoReleaseAt ? new Date(escrowMeta.autoReleaseAt) : undefined,
      metadata: escrowMeta as EscrowMetadata,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    }
  }
}
