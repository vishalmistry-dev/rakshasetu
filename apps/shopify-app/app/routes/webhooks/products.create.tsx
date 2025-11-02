import { logWebhook, logWebhookError } from '../../lib/webhooks/logger';
import { authenticate } from '../../shopify.server';
import type { ShopifyProduct } from '../../types/webhook';

export async function action({ request }: { request: Request }) {
  try {
    const { topic, shop, payload } = await authenticate.webhook(request);

    const product = payload as ShopifyProduct;

    logWebhook(topic, shop, {
      productId: product.id,
      title: product.title,
      vendor: product.vendor,
      variantCount: product.variants.length,
      status: product.status,
    });

    // TODO: Sync product to database

    return new Response('OK', { status: 200 });
  } catch (error) {
    logWebhookError('products/create', 'unknown', error as Error);
    return new Response('Error', { status: 500 });
  }
}
