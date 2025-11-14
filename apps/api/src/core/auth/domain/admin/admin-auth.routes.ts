import { bodySchema, validateRequest } from '@/common/utils'
import { authenticateAdmin } from '@/core/auth/middlewares'
import { Router } from 'express'
import { createAdmin, getCurrentAdmin, login, logout, refreshToken } from './admin-auth.controller'
import { adminLoginSchema, createAdminSchema } from './admin-auth.schema'

const router = Router()

// Public routes
router.post('/login', validateRequest(bodySchema(adminLoginSchema)), login)
router.post('/refresh', refreshToken)

// Protected routes
router.use(authenticateAdmin)

router.post('/logout', logout)
router.get('/me', getCurrentAdmin)

// Super admin only (add permission check if needed)
router.post('/admins', validateRequest(bodySchema(createAdminSchema)), createAdmin)

export default router
