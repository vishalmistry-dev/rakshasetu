import {
  authenticateAdmin,
  requirePermission,
} from '@/core/auth/middlewares/authenticateAdmin.middleware'
import { Router } from 'express'
import {
  getDispute,
  getDisputeStatistics,
  listDisputes,
  rejectDispute,
  resolveDispute,
  updateDisputeStatus,
} from './disputes.controller'

const router = Router()

// All routes require admin authentication
router.use(authenticateAdmin)

// Get dispute statistics
router.get('/statistics', getDisputeStatistics)

// List disputes
router.get('/', listDisputes)

// Get dispute details
router.get('/:id', getDispute)

// Resolve dispute (requires permission)
router.post('/:id/resolve', requirePermission('DISPUTE_MANAGE'), resolveDispute)

// Reject dispute (requires permission)
router.post('/:id/reject', requirePermission('DISPUTE_MANAGE'), rejectDispute)

// Update dispute status
router.patch('/:id/status', requirePermission('DISPUTE_MANAGE'), updateDisputeStatus)

export default router
