import { apiClient } from './client'

interface OrderStats {
  totalOrders: number
  pendingOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  totalRevenue: number
}

export const ordersApi = {
  async getStats(shop: string) {
    const response = await apiClient<OrderStats>(`/integrations/shopify/orders/stats?shop=${shop}`)

    // Transform backend response to match existing UI structure
    return {
      today: {
        orders: response.data.totalOrders,
        revenue: response.data.totalRevenue,
        delivered: response.data.deliveredOrders,
        pending: response.data.pendingOrders,
      },
      recent: [], // Will be populated later when we fetch orders list
    }
  },

  async list(shop: string, page = 1, limit = 20) {
    const response = await apiClient<
      Array<{
        id: string
        name: string
        totalPrice: number
        status: string
        createdAt: string
      }>
    >(`/integrations/shopify/orders?shop=${shop}&page=${page}&limit=${limit}`)

    return response.data
  },
}
