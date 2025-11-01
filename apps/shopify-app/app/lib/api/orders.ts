/* eslint-disable @typescript-eslint/no-unused-vars */

export const ordersApi = {
  async getStats(_shop: string) {
    // Prefix with _ to mark as intentionally unused
    return {
      today: { orders: 24, revenue: 12000, delivered: 18, pending: 6 },
      recent: [
        { id: '1', number: 'RKS-001', amount: 500, method: 'COD', status: 'Pending' },
        { id: '2', number: 'RKS-002', amount: 800, method: 'POD', status: 'Shipped' },
        { id: '3', number: 'RKS-003', amount: 1200, method: 'Prepaid', status: 'Delivered' },
      ],
    }
  },
}
