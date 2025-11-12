import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const SUBDOMAIN_MAP = {
  shop: 'shop',
  merchant: 'merchant',
  admin: 'admin',
  rsmart: 'rsmart',
} as const

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const subdomain = getSubdomain(host)
  const url = req.nextUrl.clone()

  // Skip static files and API routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Handle subdomain routing
  if (subdomain && subdomain in SUBDOMAIN_MAP) {
    const prefix = `/${SUBDOMAIN_MAP[subdomain as keyof typeof SUBDOMAIN_MAP]}`

    if (!url.pathname.startsWith(prefix)) {
      url.pathname = `${prefix}${url.pathname}`
      return NextResponse.rewrite(url)
    }
  } else {
    // No subdomain = main website
    // Redirect localhost:3000 to /website
    if (url.pathname === '/') {
      url.pathname = '/website'
      return NextResponse.rewrite(url)
    }

    if (!url.pathname.startsWith('/website')) {
      url.pathname = `/website${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

function getSubdomain(host: string): string | null {
  const hostname = host.split(':')[0]

  if (hostname.includes('localhost')) {
    const parts = hostname.split('.')
    return parts.length > 1 ? parts[0] : null
  }

  const parts = hostname.split('.')
  return parts.length >= 3 ? parts[0] : null
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
