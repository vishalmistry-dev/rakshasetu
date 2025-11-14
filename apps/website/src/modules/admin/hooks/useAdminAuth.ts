'use client'

import { usePathname } from 'next/navigation'
import { adminAuthContent, type AdminAuthRoute } from '../config/authContent'

export function useAdminAuth() {
  const pathname = usePathname()

  // Extract route from pathname: "/admin/login" -> "/login"
  const route = pathname.replace('/admin', '') as AdminAuthRoute

  // Get config or use default
  const config = adminAuthContent[route] || adminAuthContent['/login']

  return { config, route, pathname }
}
