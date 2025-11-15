import { SubdomainType } from '@/shared/types/auth.types'
import { redirect } from 'next/navigation'
import { AuthService } from './auth.service'

export class AuthGuard {
  static async requireAuth<T = any>(subdomain: SubdomainType): Promise<T> {
    const result = await AuthService.validateToken<T>(subdomain)

    if (!result) {
      redirect(AuthService.getLoginPath(subdomain))
    }

    return result // return raw merchant
  }

  static async optionalAuth<T = any>(subdomain: SubdomainType): Promise<T | null> {
    return AuthService.validateToken<T>(subdomain)
  }
}
