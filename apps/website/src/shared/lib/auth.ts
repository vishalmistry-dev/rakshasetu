// ============================================
// FILE 5: shared/lib/auth.ts
// Server-side auth utilities
// ============================================
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Auth configuration for each subdomain
const AUTH_CONFIG = {
  admin: {
    cookieName: 'adminAccessToken',
    apiEndpoint: '/admin/current-admin',
    loginPath: '/admin/login',
  },
  merchant: {
    cookieName: 'merchantAccessToken',
    apiEndpoint: '/merchant/current-merchant',
    loginPath: '/merchant/login',
  },
  shop: {
    cookieName: 'shopAccessToken',
    apiEndpoint: '/shop/current-user',
    loginPath: '/shop/login',
  },
  rsmart: {
    cookieName: 'rsmartAccessToken',
    apiEndpoint: '/rsmart/current-user',
    loginPath: '/rsmart/login',
  },
} as const

type SubdomainType = keyof typeof AUTH_CONFIG

/**
 * Get current authenticated user
 * Use this in Server Components to validate token and get user data
 *
 * @example
 * const admin = await getCurrentUser("admin")
 */
export async function getCurrentUser<T = any>(subdomain: SubdomainType): Promise<T> {
  const config = AUTH_CONFIG[subdomain]
  const cookieStore = await cookies()
  const token = cookieStore.get(config.cookieName)?.value

  // No token = redirect to login
  if (!token) {
    redirect(config.loginPath)
  }

  try {
    // Validate token with API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${config.apiEndpoint}`, {
      method: 'GET',
      headers: {
        Cookie: `${config.cookieName}=${token}`,
      },
      credentials: 'include',
      cache: 'no-store', // Always fetch fresh
    })

    if (!res.ok) {
      throw new Error('Unauthorized')
    }

    const data = await res.json()
    return data
  } catch (error) {
    // Invalid token = redirect to login
    redirect(config.loginPath)
  }
}

/**
 * Check if user is authenticated (doesn't fetch full data)
 * Use this when you only need to know if someone is logged in
 *
 * @example
 * const isLoggedIn = await isAuthenticated("merchant")
 */
export async function isAuthenticated(subdomain: SubdomainType): Promise<boolean> {
  const config = AUTH_CONFIG[subdomain]
  const cookieStore = await cookies()
  const token = cookieStore.get(config.cookieName)?.value

  if (!token) return false

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${config.apiEndpoint}`, {
      method: 'GET',
      headers: {
        Cookie: `${config.cookieName}=${token}`,
      },
      credentials: 'include',
      cache: 'no-store',
    })
    return res.ok
  } catch {
    return false
  }
}
