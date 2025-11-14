import { AppError } from '@/common/errors'
import { logger } from '@/common/utils'
import { prisma } from '@/config/prisma'

// ========================== LIST DISPUTES ==========================
export const listDisputes = async (filters: {
  status?: string
  merchantId?: string
  search?: string
  page?: number
  limit?: number
}) => {
  try {
    const { status, merchantId, search, page = 1, limit = 20 } = filters
    const skip = (page - 1) * limit

    const where: any = {}

    if (status) where.status = status

    if (merchantId) {
      where.order = {
        merchantId,
      }
    }

    if (search) {
      where.OR = [
        { reason: { contains: search, mode: 'insensitive' } },
        { resolution: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [disputes, total] = await Promise.all([
      prisma.shopDisputeTicket.findMany({
        where,
        include: {
          order: {
            select: {
              id: true,
              name: true,
              totalPrice: true,
              customerName: true,
              merchant: {
                select: {
                  id: true,
                  businessName: true,
                },
              },
            },
          },
          resolvedByAdmin: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          refund: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.shopDisputeTicket.count({ where }),
    ])

    logger.info(`Listed ${disputes.length} disputes`)

    return {
      disputes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    logger.error('Failed to list disputes:', error)
    throw error
  }
}

// ========================== GET DISPUTE DETAILS ==========================
export const getDisputeById = async (disputeId: string) => {
  try {
    const dispute = await prisma.shopDisputeTicket.findUnique({
      where: { id: disputeId },
      include: {
        order: {
          include: {
            merchant: {
              select: {
                id: true,
                businessName: true,
                email: true,
                phone: true,
              },
            },
            store: {
              select: {
                id: true,
                storeName: true,
              },
            },
            lineItems: {
              include: {
                product: {
                  select: {
                    id: true,
                    title: true,
                    imageUrl: true,
                  },
                },
              },
            },
            shipping: {
              include: {
                trackingEvents: {
                  orderBy: { timestamp: 'desc' },
                  take: 5,
                },
              },
            },
          },
        },
        resolvedByAdmin: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        refund: true,
      },
    })

    if (!dispute) {
      throw new AppError('Dispute not found', 404)
    }

    logger.info(`Fetched dispute details: ${disputeId}`)

    return dispute
  } catch (error) {
    logger.error('Failed to get dispute:', error)
    throw error
  }
}

// ========================== RESOLVE DISPUTE ==========================
export const resolveDispute = async (
  disputeId: string,
  resolution: string,
  adminId: string,
  refundAmount?: number
) => {
  try {
    const dispute = await prisma.shopDisputeTicket.findUnique({
      where: { id: disputeId },
      include: {
        order: true,
      },
    })

    if (!dispute) {
      throw new AppError('Dispute not found', 404)
    }

    if (dispute.status !== 'PENDING' && dispute.status !== 'IN_PROGRESS') {
      throw new AppError('Dispute already resolved', 400)
    }

    // Update dispute status
    const updated = await prisma.shopDisputeTicket.update({
      where: { id: disputeId },
      data: {
        status: 'RESOLVED',
        resolution,
        resolvedAt: new Date(),
        resolvedByAdminId: adminId,
      },
    })

    // Create refund if amount specified
    if (refundAmount && refundAmount > 0) {
      await prisma.shopRefund.create({
        data: {
          id: `rfd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          disputeId: disputeId,
          orderId: dispute.orderId,
          amount: refundAmount,
          refundMethod: 'RAZORPAY',
          status: 'PENDING',
          refundAmountStatus: 'PARTIALLY_REFUNDED',
          notes: `Dispute resolution: ${resolution}`,
        },
      })
    }

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'DISPUTE_RESOLVED',
        resource: 'DISPUTE',
        resourceId: disputeId,
        metadata: {
          orderId: dispute.orderId,
          resolution,
          refundAmount,
        },
      },
    })

    logger.info(`Dispute ${disputeId} resolved by admin ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to resolve dispute:', error)
    throw error
  }
}

// ========================== REJECT DISPUTE ==========================
export const rejectDispute = async (disputeId: string, reason: string, adminId: string) => {
  try {
    const dispute = await prisma.shopDisputeTicket.findUnique({
      where: { id: disputeId },
    })

    if (!dispute) {
      throw new AppError('Dispute not found', 404)
    }

    if (dispute.status !== 'PENDING' && dispute.status !== 'IN_PROGRESS') {
      throw new AppError('Dispute already processed', 400)
    }

    // Update dispute status
    const updated = await prisma.shopDisputeTicket.update({
      where: { id: disputeId },
      data: {
        status: 'REJECTED',
        resolution: reason,
        resolvedAt: new Date(),
        resolvedByAdminId: adminId,
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'DISPUTE_REJECTED',
        resource: 'DISPUTE',
        resourceId: disputeId,
        metadata: {
          orderId: dispute.orderId,
          reason,
        },
      },
    })

    logger.info(`Dispute ${disputeId} rejected by admin ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to reject dispute:', error)
    throw error
  }
}

// ========================== UPDATE DISPUTE STATUS ==========================
export const updateDisputeStatus = async (disputeId: string, status: string, adminId: string) => {
  try {
    const dispute = await prisma.shopDisputeTicket.findUnique({
      where: { id: disputeId },
    })

    if (!dispute) {
      throw new AppError('Dispute not found', 404)
    }

    // Update dispute status
    const updated = await prisma.shopDisputeTicket.update({
      where: { id: disputeId },
      data: {
        status: status as any,
        updatedAt: new Date(),
      },
    })

    // Log activity
    await prisma.adminActivityLog.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        adminId,
        action: 'DISPUTE_STATUS_UPDATED',
        resource: 'DISPUTE',
        resourceId: disputeId,
        metadata: {
          oldStatus: dispute.status,
          newStatus: status,
        },
      },
    })

    logger.info(`Dispute ${disputeId} status updated to ${status} by admin ${adminId}`)

    return updated
  } catch (error) {
    logger.error('Failed to update dispute status:', error)
    throw error
  }
}

// ========================== GET DISPUTE STATISTICS ==========================
export const getDisputeStatistics = async () => {
  try {
    const [totalDisputes, disputesByStatus, recentDisputes, avgResolutionTime] = await Promise.all([
      // Total disputes
      prisma.shopDisputeTicket.count(),

      // Disputes by status
      prisma.shopDisputeTicket.groupBy({
        by: ['status'],
        _count: { id: true },
      }),

      // Disputes in last 7 days
      prisma.shopDisputeTicket.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Average resolution time (for resolved disputes)
      prisma.$queryRaw<Array<{ avg_hours: number }>>`
        SELECT AVG(EXTRACT(EPOCH FROM ("resolvedAt" - "createdAt")) / 3600) as avg_hours
        FROM shop_dispute_tickets
        WHERE "resolvedAt" IS NOT NULL
      `,
    ])

    logger.info('Dispute statistics fetched')

    return {
      totalDisputes,
      disputesByStatus: disputesByStatus.map((item) => ({
        status: item.status,
        count: item._count.id,
      })),
      recentDisputes,
      avgResolutionTimeHours: avgResolutionTime[0]?.avg_hours || 0,
    }
  } catch (error) {
    logger.error('Failed to get dispute statistics:', error)
    throw error
  }
}
