import { Router } from 'express'
import { handleCallback, startOAuth } from './oauth.controller'

const router = Router()

// Start OAuth flow
router.get('/', startOAuth)

// OAuth callback
router.get('/callback', handleCallback)

export default router
