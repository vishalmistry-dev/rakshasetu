import { APP_CONFIG } from '@/shared/config/app.config'
import { SubdomainType } from '@/shared/types/auth.types'
import { cookies } from 'next/headers'
import { AUTH_CONFIGS } from './auth.config'

export class AuthService {
  static async validateToken<T = any>(subdomain: SubdomainType): Promise<T | null> {
    const config = AUTH_CONFIGS[subdomain]
    const cookieStore = await cookies()
    const token = cookieStore.get(config.cookieName)?.value

    if (!token) return null

    try {
      const res = await fetch(`${APP_CONFIG.api.baseURL}${config.apiEndpoint}`, {
        method: 'GET',
        headers: {
          Cookie: `${config.cookieName}=${token}`,
        },
        credentials: 'include',
        cache: 'no-store',
      })

      if (!res.ok) return null

      const data = await res.json()
      return data
    } catch {
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
