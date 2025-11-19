export interface ShopifyWebhookHeaders {
  'x-shopify-topic': string
  'x-shopify-hmac-sha256': string
  'x-shopify-shop-domain': string
  'x-shopify-webhook-id': string
}

export interface ShopifyOrder {
  id: number
  order_number: number
  email: string
  created_at: string
  total_price: string
  financial_status: string
  fulfillment_status: string | null
  customer: {
    id: number
    email: string
    first_name: string
    last_name: string
  }
  line_items: Array<{
    id: number
    title: string
    quantity: number
    price: string
  }>
  note: string | null
}

export interface ShopifyProduct {
  id: number
  title: string
  body_html: string
  vendor: string
  status: string
  images: Array<{ id: number; src: string }>
  variants: Array<{
    id: number
    title: string
    price: string
    inventory_quantity: number
  }>
}
