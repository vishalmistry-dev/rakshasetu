import { AppError } from '@/common/errors'
import { prisma } from '@rakshasetu/database'
import { NextFunction, Request, Response } from 'express'
import {
  ApproveReturnSchema,
  CreateReturnRequestSchema,
  RejectReturnSchema,
  ReturnQuerySchema,
  SchedulePickupSchema,
} from './returns.schema'
import { ReturnsService } from './returns.service'

const returnsService = new ReturnsService(prisma)

export class ReturnsController {
  /**
   * POST /api/v1/shop/returns
   * Create return request
   */
  static async createReturnRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = CreateReturnRequestSchema.parse(req.body)

      const returnRequest = await returnsService.createReturnRequest(validated)

      res.status(201).json({
        success: true,
        data: returnRequest,
        message: 'Return request created successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /api/v1/shop/returns
   * List return requests
   */
  static async listReturns(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = ReturnQuerySchema.parse(req.query)

      const result = await returnsService.listReturns(validated)

      res.json({
        success: true,
        data: result.returns,
        pagination: result.pagination,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /api/v1/shop/returns/:id
   * Get return request details
   */
  static async getReturn(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const returnRequest = await returnsService.getReturn(id)

      res.json({
        success: true,
        data: returnRequest,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * PATCH /api/v1/shop/returns/:id/approve
   * Approve return request
   */
  static async approveReturn(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const validated = ApproveReturnSchema.parse({
        returnId: id,
        ...req.body,
      })

      const merchantId = req.merchant?.id

      if (!merchantId) throw new AppError('Merchant id not found', 401)

      const returnRequest = await returnsService.approveReturn(validated, merchantId)

      res.json({
        success: true,
        data: returnRequest,
        message: 'Return request approved',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * PATCH /api/v1/shop/returns/:id/reject
   * Reject return request
   */
  static async rejectReturn(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const validated = RejectReturnSchema.parse({
        returnId: id,
        ...req.body,
      })

      // @ts-ignore - merchant attached by middleware
      const merchantId = req.merchant?.id
      if (!merchantId) throw new AppError('Merchant id not found', 401)

      const returnRequest = await returnsService.rejectReturn(validated, merchantId)

      res.json({
        success: true,
        data: returnRequest,
        message: 'Return request rejected',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * PATCH /api/v1/shop/returns/:id/pickup
   * Schedule reverse pickup
   */
  static async schedulePickup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const validated = SchedulePickupSchema.parse({
        returnId: id,
        ...req.body,
      })

      // @ts-ignore - merchant attached by middleware
      const merchantId = req.merchant?.id
      if (!merchantId) throw new AppError('Merchant id not found', 401)

      const returnRequest = await returnsService.schedulePickup(validated, merchantId)

      res.json({
        success: true,
        data: returnRequest,
        message: 'Pickup scheduled successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * PATCH /api/v1/shop/returns/:id/refund
   * Process refund (called after return delivered)
   */
  static async processRefund(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const returnRequest = await returnsService.processRefund(id)

      res.json({
        success: true,
        data: returnRequest,
        message: 'Refund processed successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}
