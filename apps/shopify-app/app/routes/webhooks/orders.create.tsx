import { logWebhook, logWebhookError } from '../../lib/webhooks/logger';
import { authenticate } from '../../shopify.server';
import type { ShopifyOrder } from '../../types/webhook';

export async function action({ request }: { request: Request }) {
  try {
    const { topic, shop, payload } = await authenticate.webhook(request);

    const order = payload as ShopifyOrder;

    logWebhook(topic, shop, {
      orderId: order.id,
      orderNumber: order.order_number,
      email: order.email,
      totalPrice: order.total_price,
      financialStatus: order.financial_status,
      itemCount: order.line_items.length,
    });

    // TODO: Process order - save to database, send notifications, etc.

    return new Response('OK', { status: 200 });
  } catch (error) {
    logWebhookError('orders/create', 'unknown', error as Error);
    return new Response('Error', { status: 500 });
  }
}
