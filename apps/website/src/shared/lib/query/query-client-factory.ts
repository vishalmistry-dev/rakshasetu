import { queryClientConfig } from '@/shared/config/query-client.config'
import { QueryClient } from '@tanstack/react-query'

export class QueryClientFactory {
  private static instance: QueryClient | null = null

  static createClient(): QueryClient {
    return new QueryClient(queryClientConfig)
  }

  static getSingletonClient(): QueryClient {
    if (!this.instance) {
      this.instance = this.createClient()
    }
    return this.instance
  }
}
