import { Router } from 'express'
import { sandboxWebhookController } from './sandbox.webhooks.controller'

const router = Router()

// Webhook endpoint - no authentication required
// Sandbox will send webhooks to this endpoint
router.post('/webhook', sandboxWebhookController.handleWebhook)

export default router
