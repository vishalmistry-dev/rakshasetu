import { upload } from '@/common/middleware'
import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  deleteFile,
  exportOrders,
  generateInvoice,
  generateShippingLabel,
  getFile,
  listFiles,
  uploadFile,
  uploadMultipleFiles,
} from './files.controller'

const router = Router()

// All routes require merchant authentication
router.use(authenticateMerchant)

// Upload routes
router.post('/upload', upload.single('file'), uploadFile)
router.post('/upload/multiple', upload.array('files', 10), uploadMultipleFiles)

// File management
router.get('/', listFiles)
router.get('/:id', getFile)
router.delete('/:id', deleteFile)

// Document generation
router.post('/invoice/:orderId', generateInvoice)
router.post('/shipping-label/:shippingId', generateShippingLabel)

// Export
router.get('/export/orders', exportOrders)

export default router
