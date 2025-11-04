import { bodySchema, querySchema, validateRequest } from '@/common/utils'
import { authenticateMerchant } from '@/core/auth/middlewares'
import { Router } from 'express'
import {
  cancelShipment,
  createShipment,
  getShipment,
  listShipments,
  trackShipment,
} from './shipments.controller'
import { createShipmentSchema, listShipmentsQuerySchema } from './shipments.schema'

const router = Router()

// All routes require merchant authentication
router.use(authenticateMerchant)

// Create shipment
router.post('/', validateRequest(bodySchema(createShipmentSchema)), createShipment)

// List shipments
router.get('/', validateRequest(querySchema(listShipmentsQuerySchema)), listShipments)

// Get shipment details
router.get('/:id', getShipment)

// Track shipment
router.get('/:id/track', trackShipment)

// Cancel shipment
router.delete('/:id', cancelShipment)

export default router
