import { AppError } from '@/common/errors'
import {
  ApproveReturnInput,
  CreateReturnRequestInput,
  RejectReturnInput,
  ReturnQuery,
  SchedulePickupInput,
} from '@/domains/shop/returns/returns.schema'
import {
  RETURN_EVENT,
  ReturnListResponse,
  ReturnRequestResponse,
} from '@/domains/shop/returns/returns.types'
import { ORDER_STATUS, PrismaClient, RETURN_STATUS } from '@rakshasetu/database'
import { EscrowService } from '../../../core/escrow/escrow.service'

export class ReturnsService {
  private prisma: PrismaClient
  private escrowService: EscrowService

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
    this.escrowService = new EscrowService(prisma)
  }

  // ============================================
  // PUBLIC METHODS
  // ============================================

  /**
   * Create return request
   */
  async createReturnRequest(input: CreateReturnRequestInput): Promise<ReturnRequestResponse> {
    // Get order and item
    const order = await this.prisma.shopOrder.findUnique({
      where: { id: input.orderId },
      include: {
        lineItems: true,
      },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    const item = order.lineItems.find((i) => i.id === input.itemId)
    if (!item) {
      throw new AppError('Item not found in order', 404)
    }

    // Validate order status
    if (order.status !== ORDER_STATUS.DELIVERED) {
      throw new AppError('Returns can only be created for delivered orders', 400)
    }

    // Check if return already exists
    const existingReturn = await this.prisma.returnRequest.findFirst({
      where: {
        orderId: input.orderId,
        itemId: input.itemId,
        status: {
          in: [RETURN_STATUS.REQUESTED, RETURN_STATUS.APPROVED, RETURN_STATUS.PICKED_UP],
        },
      },
    })

    if (existingReturn) {
      throw new AppError('Return request already exists for this item', 400)
    }

    // Create return request
    const returnRequest = await this.prisma.returnRequest.create({
      data: {
        id: this.generateId(),
        orderId: input.orderId,
        itemId: input.itemId,
        reason: input.reason,
        status: RETURN_STATUS.REQUESTED,
        refundAmount: input.refundAmount || item.price * item.quantity,
      },
    })

    // Update order status
    await this.prisma.shopOrder.update({
      where: { id: input.orderId },
      data: {
        status: ORDER_STATUS.RETURN_REQUESTED,
      },
    })

    // Log event
    await this.logReturnEvent(returnRequest.id, RETURN_EVENT.REQUESTED, {
      reason: input.reason,
      refundAmount: returnRequest.refundAmount,
    })

    return this.mapToResponse(returnRequest, order, item)
  }

  /**
   * Approve return request
   */
  async approveReturn(
    input: ApproveReturnInput,
    merchantId: string
  ): Promise<ReturnRequestResponse> {
    const returnRequest = await this.getReturnRequest(input.returnId)

    // Get order
    const order = await this.prisma.shopOrder.findUnique({
      where: { id: returnRequest.orderId },
      include: { lineItems: true },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    // Verify merchant
    if (order.merchantId !== merchantId) {
      throw new AppError('Not authorized to approve this return', 403)
    }

    // Validate status
    if (returnRequest.status !== RETURN_STATUS.REQUESTED) {
      throw new AppError('Return request is not in requested status', 400)
    }

    // Update return request
    const updated = await this.prisma.returnRequest.update({
      where: { id: input.returnId },
      data: {
        status: RETURN_STATUS.APPROVED,
        refundAmount: input.refundAmount || returnRequest.refundAmount,
      },
    })

    await this.logReturnEvent(input.returnId, RETURN_EVENT.APPROVED, {
      approvedBy: merchantId,
      approvalNote: input.approvalNote,
    })

    const item = order.lineItems.find((i) => i.id === returnRequest.itemId)
    return this.mapToResponse(updated, order, item!)
  }

  /**
   * Reject return request
   */
  async rejectReturn(input: RejectReturnInput, merchantId: string): Promise<ReturnRequestResponse> {
    const returnRequest = await this.getReturnRequest(input.returnId)

    // Get order
    const order = await this.prisma.shopOrder.findUnique({
      where: { id: returnRequest.orderId },
      include: { lineItems: true },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    // Verify merchant
    if (order.merchantId !== merchantId) {
      throw new AppError('Not authorized to reject this return', 403)
    }

    // Validate status
    if (returnRequest.status !== RETURN_STATUS.REQUESTED) {
      throw new AppError('Return request is not in requested status', 400)
    }

    // Update return request
    const updated = await this.prisma.returnRequest.update({
      where: { id: input.returnId },
      data: {
        status: RETURN_STATUS.REJECTED,
      },
    })

    // Update order status back to delivered
    await this.prisma.shopOrder.update({
      where: { id: returnRequest.orderId },
      data: {
        status: ORDER_STATUS.DELIVERED,
      },
    })

    await this.logReturnEvent(input.returnId, RETURN_EVENT.REJECTED, {
      rejectedBy: merchantId,
      rejectionReason: input.rejectionReason,
    })

    const item = order.lineItems.find((i) => i.id === returnRequest.itemId)
    return this.mapToResponse(updated, order, item!)
  }

  /**
   * Schedule reverse pickup
   */
  async schedulePickup(
    input: SchedulePickupInput,
    merchantId: string
  ): Promise<ReturnRequestResponse> {
    const returnRequest = await this.getReturnRequest(input.returnId)

    // Get order
    const order = await this.prisma.shopOrder.findUnique({
      where: { id: returnRequest.orderId },
      include: { lineItems: true },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    // Verify merchant
    if (order.merchantId !== merchantId) {
      throw new AppError('Not authorized to schedule pickup', 403)
    }

    // Validate status
    if (returnRequest.status !== RETURN_STATUS.APPROVED) {
      throw new AppError('Return must be approved before scheduling pickup', 400)
    }

    // TODO: Integrate with courier API to schedule reverse pickup
    // const reverseShipment = await courierService.scheduleReversePickup({
    //   orderId: order.id,
    //   pickupAddress: input.pickupAddress,
    //   pickupDate: input.pickupDate,
    // });

    // Update return request
    const updated = await this.prisma.returnRequest.update({
      where: { id: input.returnId },
      data: {
        pickupScheduledAt: new Date(input.pickupDate),
        pickupCourierCode: input.courierCode || 'BLUEDART',
      },
    })

    // Update order status
    await this.prisma.shopOrder.update({
      where: { id: returnRequest.orderId },
      data: {
        status: ORDER_STATUS.RETURN_IN_TRANSIT,
      },
    })

    await this.logReturnEvent(input.returnId, RETURN_EVENT.PICKUP_SCHEDULED, {
      pickupDate: input.pickupDate,
      courierCode: input.courierCode,
    })

    const item = order.lineItems.find((i) => i.id === returnRequest.itemId)
    return this.mapToResponse(updated, order, item!)
  }

  /**
   * Process refund after return delivered
   */
  async processRefund(returnId: string): Promise<ReturnRequestResponse> {
    const returnRequest = await this.getReturnRequest(returnId)

    // Get order
    const order = await this.prisma.shopOrder.findUnique({
      where: { id: returnRequest.orderId },
      include: {
        lineItems: true,
        transaction: true,
      },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    // Validate status - should be picked up and delivered back
    if (returnRequest.status !== RETURN_STATUS.PICKED_UP) {
      throw new AppError('Return must be picked up before processing refund', 400)
    }

    // Process refund via escrow
    if (order.transaction && order.isEscrowed) {
      await this.escrowService.refundEscrow(
        {
          escrowId: order.transaction.id,
          reason: `Return approved for order ${order.id}`,
          refundAmount: returnRequest.refundAmount || undefined,
        },
        'SYSTEM'
      )
    }

    // Update return request
    const updated = await this.prisma.returnRequest.update({
      where: { id: returnId },
      data: {
        status: RETURN_STATUS.REFUNDED,
        refundSynced: true,
      },
    })

    // Update order status
    await this.prisma.shopOrder.update({
      where: { id: returnRequest.orderId },
      data: {
        status: ORDER_STATUS.RETURNED,
      },
    })

    await this.logReturnEvent(returnId, RETURN_EVENT.REFUNDED, {
      refundAmount: returnRequest.refundAmount,
    })

    const item = order.lineItems.find((i) => i.id === returnRequest.itemId)
    return this.mapToResponse(updated, order, item!)
  }

  /**
   * Get return request by ID
   */
  async getReturn(returnId: string): Promise<ReturnRequestResponse> {
    const returnRequest = await this.getReturnRequest(returnId)

    const order = await this.prisma.shopOrder.findUnique({
      where: { id: returnRequest.orderId },
      include: { lineItems: true },
    })

    if (!order) {
      throw new AppError('Order not found', 404)
    }

    const item = order.lineItems.find((i) => i.id === returnRequest.itemId)
    return this.mapToResponse(returnRequest, order, item!)
  }

  /**
   * List return requests with filters
   */
  async listReturns(query: ReturnQuery): Promise<ReturnListResponse> {
    const { page, limit, merchantId, orderId, status, fromDate, toDate } = query

    const where: any = {}

    if (orderId) {
      where.orderId = orderId
    }

    if (status) {
      where.status = status
    }

    if (merchantId) {
      where.order = {
        merchantId,
      }
    }

    if (fromDate || toDate) {
      where.createdAt = {}
      if (fromDate) where.createdAt.gte = new Date(fromDate)
      if (toDate) where.createdAt.lte = new Date(toDate)
    }

    const [returns, total] = await Promise.all([
      this.prisma.returnRequest.findMany({
        where,
        include: {
          order: {
            include: {
              lineItems: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.returnRequest.count({ where }),
    ])

    const mappedReturns = returns.map((r) => {
      const item = r.order.lineItems.find((i) => i.id === r.itemId)
      return this.mapToResponse(r, r.order, item!)
    })

    return {
      returns: mappedReturns,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  // ============================================
  // PRIVATE HELPERS
  // ============================================

  private async getReturnRequest(id: string) {
    const returnRequest = await this.prisma.returnRequest.findUnique({
      where: { id },
    })

    if (!returnRequest) {
      throw new AppError('Return request not found', 404)
    }

    return returnRequest
  }

  private async logReturnEvent(returnId: string, event: RETURN_EVENT, data: any): Promise<void> {
    console.log(`[RETURN_EVENT] ${event}:`, {
      returnId,
      ...data,
      timestamp: new Date().toISOString(),
    })
  }

  private generateId(): string {
    return `return_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private mapToResponse(returnRequest: any, order: any, item: any): ReturnRequestResponse {
    return {
      id: returnRequest.id,
      orderId: returnRequest.orderId,
      orderNumber: order.externalId,
      itemId: returnRequest.itemId,
      itemName: item?.name || item?.title,
      reason: returnRequest.reason,
      status: returnRequest.status,
      refundAmount: returnRequest.refundAmount,
      pickupScheduledAt: returnRequest.pickupScheduledAt,
      pickupCourierCode: returnRequest.pickupCourierCode,
      refundSynced: returnRequest.refundSynced,
      createdAt: returnRequest.createdAt,
      updatedAt: returnRequest.updatedAt,
    }
  }
}
