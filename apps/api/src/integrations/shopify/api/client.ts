import axios, { AxiosInstance } from 'axios'

interface ShopifyClientConfig {
  shop: string
  accessToken: string
}

export class ShopifyClient {
  private client: AxiosInstance

  constructor(config: ShopifyClientConfig) {
    this.client = axios.create({
      baseURL: `https://${config.shop}/admin/api/2024-10`,
      headers: {
        'X-Shopify-Access-Token': config.accessToken,
        'Content-Type': 'application/json',
      },
    })
  }

  // Generic request method
  async request<T>(method: string, path: string, data?: any): Promise<T> {
    const response = await this.client.request({
      method,
      url: path,
      data,
    })
    return response.data
  }

  // GET request
  async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path)
  }

  // POST request
  async post<T>(path: string, data: any): Promise<T> {
    return this.request<T>('POST', path, data)
  }

  // PUT request
  async put<T>(path: string, data: any): Promise<T> {
    return this.request<T>('PUT', path, data)
  }

  // DELETE request
  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path)
  }
}

// Factory function
export const createShopifyClient = (shop: string, accessToken: string): ShopifyClient => {
  return new ShopifyClient({ shop, accessToken })
}
