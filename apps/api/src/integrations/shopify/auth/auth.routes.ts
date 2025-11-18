import { Router } from 'express'
import * as authController from './auth.controller'

const router = Router()

// Exchange setup token for JWT tokens
router.post('/exchange-token', authController.exchangeToken)

export default router
