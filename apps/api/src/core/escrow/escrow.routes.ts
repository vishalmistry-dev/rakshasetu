import { authenticateAdmin, authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import { EscrowController } from './escrow.controller'

const router = Router()

// ============================================
// MERCHANT ROUTES
// ============================================

/**
 * @route   POST /api/v1/escrow/initiate
 * @desc    Initiate escrow for an order
 * @access  Merchant
 */
router.post('/initiate', authenticateMerchant, EscrowController.initiateEscrow)

/**
 * @route   POST /api/v1/escrow/:id/release-request
 * @desc    Request release of escrow
 * @access  Merchant
 */
router.post('/:id/release-request', authenticateMerchant, EscrowController.requestRelease)

/**
 * @route   GET /api/v1/escrow/:id
 * @desc    Get escrow by ID
 * @access  Merchant/Admin
 */
router.get('/:id', authenticateMerchant, EscrowController.getEscrow)

/**
 * @route   GET /api/v1/escrow
 * @desc    List escrows with filters
 * @access  Merchant
 */
router.get('/', authenticateMerchant, EscrowController.listEscrows)

// ============================================
// ADMIN ROUTES
// ============================================

/**
 * @route   POST /api/v1/escrow/:id/hold
 * @desc    Move escrow to HELD status
 * @access  Admin
 */
router.post('/:id/hold', authenticateAdmin, EscrowController.holdEscrow)

/**
 * @route   POST /api/v1/escrow/:id/release
 * @desc    Release escrow to merchant
 * @access  Admin
 */
router.post('/:id/release', authenticateAdmin, EscrowController.releaseEscrow)

/**
 * @route   POST /api/v1/escrow/:id/refund
 * @desc    Refund escrow to customer
 * @access  Admin
 */
router.post('/:id/refund', authenticateAdmin, EscrowController.refundEscrow)

/**
 * @route   POST /api/v1/escrow/:id/dispute
 * @desc    Open dispute for escrow
 * @access  Admin
 */
router.post('/:id/dispute', authenticateAdmin, EscrowController.openDispute)

export default router
