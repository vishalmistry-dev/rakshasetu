import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import { ReturnsController } from './returns.controller'

const router = Router()

/**
 * @route   POST /api/v1/shop/returns
 * @desc    Create return request
 * @access  Public/Customer (add auth later)
 */
router.post('/', ReturnsController.createReturnRequest)

/**
 * @route   GET /api/v1/shop/returns
 * @desc    List return requests
 * @access  Merchant
 */
router.get('/', authenticateMerchant, ReturnsController.listReturns)

/**
 * @route   GET /api/v1/shop/returns/:id
 * @desc    Get return request details
 * @access  Merchant
 */
router.get('/:id', authenticateMerchant, ReturnsController.getReturn)

/**
 * @route   PATCH /api/v1/shop/returns/:id/approve
 * @desc    Approve return request
 * @access  Merchant
 */
router.patch('/:id/approve', authenticateMerchant, ReturnsController.approveReturn)

/**
 * @route   PATCH /api/v1/shop/returns/:id/reject
 * @desc    Reject return request
 * @access  Merchant
 */
router.patch('/:id/reject', authenticateMerchant, ReturnsController.rejectReturn)

/**
 * @route   PATCH /api/v1/shop/returns/:id/pickup
 * @desc    Schedule reverse pickup
 * @access  Merchant
 */
router.patch('/:id/pickup', authenticateMerchant, ReturnsController.schedulePickup)

/**
 * @route   PATCH /api/v1/shop/returns/:id/refund
 * @desc    Process refund (system/admin)
 * @access  Merchant/Admin
 */
router.patch('/:id/refund', authenticateMerchant, ReturnsController.processRefund)

export default router
