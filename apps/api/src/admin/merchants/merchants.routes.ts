import { authenticateAdmin, requirePermission } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  approveMerchant,
  deleteMerchant,
  getMerchant,
  getMerchantStats,
  listMerchants,
  rejectMerchant,
  updateMerchantStatus,
} from './merchants.controller'

const router = Router()

// All routes require admin authentication
router.use(authenticateAdmin)

// List merchants
router.get('/', listMerchants)

// Get merchant details
router.get('/:id', getMerchant)

// Get merchant stats
router.get('/:id/stats', getMerchantStats)

// Update merchant status (requires permission)
router.patch('/:id/status', requirePermission('MERCHANT_MANAGE'), updateMerchantStatus)

// Approve merchant
router.post('/:id/approve', requirePermission('MERCHANT_MANAGE'), approveMerchant)

// Reject merchant
router.post('/:id/reject', requirePermission('MERCHANT_MANAGE'), rejectMerchant)

// Delete merchant (super admin only)
router.delete('/:id', requirePermission('MERCHANT_DELETE'), deleteMerchant)

export default router
