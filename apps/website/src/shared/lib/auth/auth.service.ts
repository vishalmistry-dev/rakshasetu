import { APP_CONFIG } from '@/shared/config/app.config'
import { SubdomainType } from '@/shared/types/auth.types'
import axios from 'axios'
import { cookies } from 'next/headers'
import { AUTH_CONFIGS } from './auth.config'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export class AuthService {
  static async validateToken<T = any>(subdomain: SubdomainType): Promise<T | null> {
    const config = AUTH_CONFIGS[subdomain]
    const cookieStore = await cookies()
    const token = cookieStore.get(config.cookieName)?.value

    if (!token) return null

    try {
      const res = await axios.get<ApiResponse<T>>(
        `${APP_CONFIG.api.baseURL}${config.apiEndpoint}`,
        {
          headers: {
            Cookie: `${config.cookieName}=${token}`,
          },
          withCredentials: true,
        }
      )

      return res.data.data ?? null
    } catch (err) {
      // Don't try to delete cookie here - middleware handles it
      return null
    }
  }

  static getLoginPath(subdomain: SubdomainType): string {
    return AUTH_CONFIGS[subdomain].loginPath
  }

  static getCookieName(subdomain: SubdomainType): string {
    return AUTH_CONFIGS[subdomain].cookieName
  }
}
