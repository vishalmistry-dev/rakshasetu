import { ROUTE_CONFIG } from '@/config/routes'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Helper: check if path matches any public route
function isPublicRoute(path: string, routes: readonly string[]): boolean {
  return routes.some((route) => path.startsWith(route))
}

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // --- detect subdomain ---
  let subdomain: keyof typeof ROUTE_CONFIG | undefined
  if (host.startsWith('admin.')) subdomain = 'admin'
  else if (host.startsWith('merchant.')) subdomain = 'merchant'
  else if (host.startsWith('shop.')) subdomain = 'shop'
  else if (host.startsWith('rsmart.')) subdomain = 'rsmart'

  const moduleConfig = subdomain ? ROUTE_CONFIG[subdomain] : null

  // --- if we found a subdomain, rewrite the request internally ---
  if (moduleConfig) {
    const { internalPath } = moduleConfig
    const rewrittenPath = pathname.startsWith(internalPath)
      ? pathname
      : `${internalPath}${pathname}`

    // --- Auth checks now run against the rewritten path ---
    const { cookie, publicRoutes } = moduleConfig
    const token = request.cookies.get(cookie)?.value
    const isPublic = isPublicRoute(rewrittenPath, publicRoutes)

    if (!isPublic && !token) {
      // redirect to login on that subdomain
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (rewrittenPath.endsWith('/login') && token) {
      return NextResponse.redirect(new URL(`${internalPath}/dashboard`, request.url))
    }

    // rewrite for internal routing
    if (!pathname.startsWith(internalPath)) {
      return NextResponse.rewrite(new URL(rewrittenPath, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
