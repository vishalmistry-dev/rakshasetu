export function logWebhook(topic: string, shop: string, data: unknown) {
  const timestamp = new Date().toISOString()

  console.log('='.repeat(80))
  console.log(`[WEBHOOK] ${topic}`)
  console.log(`Shop: ${shop}`)
  console.log(`Timestamp: ${timestamp}`)
  console.log('-'.repeat(80))
  console.log(JSON.stringify(data, null, 2))
  console.log('='.repeat(80))
}

export function logWebhookError(topic: string, shop: string, error: Error) {
  console.error('='.repeat(80))
  console.error(`[WEBHOOK ERROR] ${topic}`)
  console.error(`Shop: ${shop}`)
  console.error(`Error: ${error.message}`)
  console.error('='.repeat(80))
}
