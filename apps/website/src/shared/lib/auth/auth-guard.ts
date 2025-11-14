import { SubdomainType } from '@/shared/types/auth.types'
import { redirect } from 'next/navigation'
import { AuthService } from './auth.service'

export class AuthGuard {
  static async requireAuth<T = any>(subdomain: SubdomainType): Promise<T> {
    const user = await AuthService.validateToken<T>(subdomain)

    if (!user) {
      const loginPath = AuthService.getLoginPath(subdomain)
      redirect(loginPath)
    }

    return user
  }

  static async optionalAuth<T = any>(subdomain: SubdomainType): Promise<T | null> {
    return AuthService.validateToken<T>(subdomain)
  }
}
