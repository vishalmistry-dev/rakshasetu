'use client'

import { usePathname } from 'next/navigation'
import { merchantAuthContent, type MerchantAuthRoute } from '../config/authContent'

export function useMerchantAuth() {
  const pathname = usePathname()

  // Extract route from pathname: "/merchant/register" -> "/register"
  const route = pathname.replace('/merchant', '') as MerchantAuthRoute

  // Get config or use default
  const config = merchantAuthContent[route] || merchantAuthContent['/login']

  return { config, route, pathname }
}
