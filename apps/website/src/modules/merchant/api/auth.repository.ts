import { ApiClient } from '@/shared/lib/api/api-client'
import { MerchantUser } from '@/shared/types/auth.types'

export class MerchantRepository {
  // Auth
  static async login(credentials: { email: string; password: string }) {
    return ApiClient.post('/auth/merchant/login', credentials)
  }

  static async register(data: any) {
    return ApiClient.post('/auth/merchant/register', data)
  }

  static async logout() {
    return ApiClient.post('/auth/merchant/logout')
  }

  // Current merchant
  static async getCurrentMerchant(): Promise<MerchantUser> {
    return ApiClient.get<MerchantUser>('/merchant/current-merchant')
  }
}
