import {
  MerchantLoginInput,
  MerchantResetPasswordInput,
} from '@/modules/merchant/validators/auth.validators'
import { ApiClient } from '@/shared/lib/api/api-client'
import { MerchantUser } from '@/shared/types/auth.types'

export class MerchantRepository {
  // Auth
  static async login(credentials: MerchantLoginInput) {
    return ApiClient.post('/auth/merchant/login', credentials)
  }

  static async register(data: any) {
    return ApiClient.post('/auth/merchant/register', data)
  }

  static async verify(data: any) {
    return ApiClient.post('/auth/merchant/verify', data)
  }

  static async logout() {
    return ApiClient.post('/auth/merchant/logout')
  }

  static async forgotPassword(data: { email: string }) {
    return ApiClient.post('/auth/merchant/forgot-password', data)
  }

  static async resetPassword(token: string, data: MerchantResetPasswordInput) {
    return ApiClient.post(`/auth/merchant/reset-password/${token}`, data)
  }

  // Current merchant
  static async getCurrentMerchant(): Promise<MerchantUser> {
    return ApiClient.get<MerchantUser>('/merchants/profile')
  }
}
