import { ROUTE_CONFIG } from '@/config/routes'
import { showToast } from '@/shared/components/common/Toast'
import { APP_CONFIG } from '@/shared/config/app.config'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

function isPublicRoute(path: string, routes: readonly string[]): boolean {
  return routes.some((route) => path.startsWith(route))
}

// 🆕 Validate token via API
async function validateToken(
  token: string,
  subdomain: keyof typeof ROUTE_CONFIG
): Promise<boolean> {
  try {
    const { cookie } = ROUTE_CONFIG[subdomain]

    // Map subdomain to API endpoint
    const endpointMap = {
      merchant: '/merchants/profile',
      admin: '/api/admin/me',
      shop: '/api/shop/me',
      rsmart: '/api/rsmart/me',
    }

    const endpoint = endpointMap[subdomain]

    const res = await fetch(`${APP_CONFIG.api.baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        Cookie: `${cookie}=${token}`,
      },
      credentials: 'include',
      cache: 'no-store',
    })

    return res.ok
  } catch (error) {
    console.error('❌ Token validation error:', error)
    return false
  }
}

const DEV_MODULE_ROUTES: Record<keyof typeof ROUTE_CONFIG, string[]> = {
  merchant: [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/dashboard',
    '/stores',
    '/products',
    '/product',
    '/orders',
    '/order',
    '/inventory',
    '/customers',
    '/customer',
    '/analytics',
    '/settings',
    '/logistics',
    '/shipments',
    '/shipment',
    '/track',
    '/ndr',
    '/returns',
    '/couriers',
    '/billing',
    '/pickups',
    '/financial',
    '/notifications',
    '/activity',
    '/marketing',
    '/categories',
  ],
  admin: [
    '/login',
    '/register',
    '/dashboard',
    '/users',
    '/user',
    '/merchants',
    '/merchant',
    '/analytics',
    '/system',
    '/reports',
  ],
  shop: [
    '/login',
    '/register',
    '/dashboard',
    '/browse',
    '/cart',
    '/checkout',
    '/profile',
    '/item',
    '/category',
  ],
  rsmart: ['/login', '/register', '/dashboard', '/devices', '/device', '/automation', '/scenes'],
}

const DEV_MODULE_PRIORITY: Array<keyof typeof ROUTE_CONFIG> = [
  'merchant',
  'admin',
  'shop',
  'rsmart',
]

function detectModuleFromPath(pathname: string): keyof typeof ROUTE_CONFIG {
  for (const [module, routes] of Object.entries(DEV_MODULE_ROUTES)) {
    for (const route of routes) {
      if (pathname === route || pathname.startsWith(route + '/')) {
        return module as keyof typeof ROUTE_CONFIG
      }
    }
  }
  return DEV_MODULE_PRIORITY[0]
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname
  const isDev = process.env.NODE_ENV !== 'production'
  const host = request.headers.get('host') || ''

  // -----------------------------------------------------
  // 1. STATIC ASSET PROTECTION (Important!)
  // -----------------------------------------------------
  const isStaticAsset =
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|js|css|map|woff|woff2|ttf|eot|otf)$/) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/static')

  if (isStaticAsset) {
    return NextResponse.next()
  }

  // -----------------------------------------------------
  // 2. DEV MODE LOGIC — Auto detect module
  // -----------------------------------------------------
  let subdomain: keyof typeof ROUTE_CONFIG | undefined

  if (isDev) {
    const hasModulePrefix =
      pathname.startsWith('/merchant') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/shop') ||
      pathname.startsWith('/rsmart') ||
      pathname.startsWith('/website')

    // Auto detect missing prefix (but avoid static files)
    if (!hasModulePrefix && pathname !== '/' && !pathname.startsWith('/_next')) {
      const detectedModule = detectModuleFromPath(pathname)

      console.log(`🔀 DEV: Auto-redirecting ${pathname} → /${detectedModule}${pathname}`)
      return NextResponse.redirect(new URL(`/${detectedModule}${pathname}`, request.url))
    }

    // Determine module based on prefix
    if (pathname.startsWith('/merchant')) subdomain = 'merchant'
    else if (pathname.startsWith('/admin')) subdomain = 'admin'
    else if (pathname.startsWith('/shop')) subdomain = 'shop'
    else if (pathname.startsWith('/rsmart')) subdomain = 'rsmart'
  }

  // -----------------------------------------------------
  // 3. PROD MODE: real subdomains
  // -----------------------------------------------------
  if (!isDev) {
    if (host.startsWith('admin.')) subdomain = 'admin'
    else if (host.startsWith('merchant.')) subdomain = 'merchant'
    else if (host.startsWith('shop.')) subdomain = 'shop'
    else if (host.startsWith('rsmart.')) subdomain = 'rsmart'
  }

  // -----------------------------------------------------
  // 4. PUBLIC WEBSITE (fallback)
  // -----------------------------------------------------
  if (!subdomain) {
    if (!pathname.startsWith('/website')) {
      return NextResponse.rewrite(new URL(`/website${pathname}`, request.url))
    }
    return NextResponse.next()
  }

  // -----------------------------------------------------
  // 5. AUTH CHECKING WITH TOKEN VALIDATION
  // -----------------------------------------------------
  const { internalPath, cookie, publicRoutes } = ROUTE_CONFIG[subdomain]
  const token = request.cookies.get(cookie)?.value
  const isPublic = isPublicRoute(pathname, publicRoutes)

  // 🆕 If protected route and has token, validate it
  if (!isPublic && token) {
    const isValid = await validateToken(token, subdomain)

    if (!isValid) {
      console.log('❌ Token invalid/expired, clearing cookie and redirecting to login')
      const response = NextResponse.redirect(new URL(`${internalPath}/login`, request.url))
      response.cookies.delete(cookie)
      showToast('info', {
        title: 'Session expired',
        description: 'Your login session is expired please login again.',
      })
      return response
    }
  }

  // Not logged in → force login
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL(`${internalPath}/login`, request.url))
  }

  // Logged in → block login page (with validation)
  if (pathname === `${internalPath}/login` && token) {
    // 🆕 Validate token before redirecting to dashboard
    const isValid = await validateToken(token, subdomain)

    if (isValid) {
      return NextResponse.redirect(new URL(`${internalPath}/dashboard`, request.url))
    } else {
      // Invalid token - let them stay on login page and clear cookie
      console.log('❌ Invalid token on login page, clearing cookie')
      const response = NextResponse.next()
      response.cookies.delete(cookie)
      return response
    }
  }

  // -----------------------------------------------------
  // 6. PROD ONLY — Rewrite to internalPath
  // -----------------------------------------------------
  if (!isDev && !pathname.startsWith(internalPath)) {
    return NextResponse.rewrite(new URL(`${internalPath}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
