import { prisma } from '@rakshasetu/database'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '@/common/errors'
import {
  EscrowQuerySchema,
  InitiateEscrowSchema,
  RefundEscrowSchema,
  ReleaseEscrowSchema,
} from './escrow.schema'
import { EscrowService } from './escrow.service'

const escrowService = new EscrowService(prisma)

export class EscrowController {
  /**
   * POST /api/v1/escrow/initiate
   * Initiate escrow for an order
   */
  static async initiateEscrow(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = InitiateEscrowSchema.parse(req.body)

      const escrow = await escrowService.initiateEscrow(validated)

      res.status(201).json({
        success: true,
        data: escrow,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * POST /api/v1/escrow/:id/hold
   * Move escrow to HELD status
   */
  static async holdEscrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const escrow = await escrowService.holdEscrow(id)

      res.json({
        success: true,
        data: escrow,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * POST /api/v1/escrow/:id/release-request
   * Request release of escrow
   */
  static async requestRelease(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const validated = ReleaseEscrowSchema.parse({
        escrowId: id,
        ...req.body,
      })

      const escrow = await escrowService.requestRelease(validated)

      res.json({
        success: true,
        data: escrow,
        message: 'Release requested. Funds will be released after holding period.',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * POST /api/v1/escrow/:id/release
   * Release escrow to merchant (admin only)
   */
  static async releaseEscrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      // @ts-ignore - admin attached by middleware
      const adminId = req.admin?.id

      const escrow = await escrowService.releaseEscrow(id, adminId)

      res.json({
        success: true,
        data: escrow,
        message: 'Funds released to merchant successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * POST /api/v1/escrow/:id/refund
   * Refund escrow to customer
   */
  static async refundEscrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const validated = RefundEscrowSchema.parse({
        escrowId: id,
        ...req.body,
      })

      // @ts-ignore - admin attached by middleware
      const adminId = req.admin?.id

      const escrow = await escrowService.refundEscrow(validated, adminId)

      res.json({
        success: true,
        data: escrow,
        message: 'Refund processed successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /api/v1/escrow/:id
   * Get escrow by ID
   */
  static async getEscrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const escrow = await escrowService.getEscrow(id)

      res.json({
        success: true,
        data: escrow,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /api/v1/escrow
   * List escrows with filters
   */
  static async listEscrows(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = EscrowQuerySchema.parse(req.query)

      const result = await escrowService.listEscrows(validated)

      res.json({
        success: true,
        data: result.escrows,
        pagination: result.pagination,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * POST /api/v1/escrow/:id/dispute
   * Open dispute for escrow
   */
  static async openDispute(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { disputeId } = req.body

      if (!disputeId) {
        throw new AppError('Dispute ID is required', 400)
      }

      const escrow = await escrowService.openDispute(id, disputeId)

      res.json({
        success: true,
        data: escrow,
        message: 'Dispute opened. Funds are now on hold.',
      })
    } catch (error) {
      next(error)
    }
  }
}
