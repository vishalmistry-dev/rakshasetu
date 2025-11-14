"use client"

import { usePathname } from "next/navigation"
import AuthLayout from "./AuthLayout"
import { AuthSideContent } from "./SideSection"

interface AuthConfig {
  side: AuthSideContent
  header: {
    title: string
    linkHref: string
    linkLabel: string
  }
}

interface AuthLayoutWrapperProps {
  children: React.ReactNode
  authContent: Record<string, AuthConfig>
  baseRoute: string // "/merchant" or "/admin"
  defaultRoute: string // "/login"
  brandName?: string
  tagline?: string
}

export function AuthLayoutWrapper({
  children,
  authContent,
  baseRoute,
  defaultRoute,
  brandName = "RakshaSetu",
  tagline,
}: AuthLayoutWrapperProps) {
  const pathname = usePathname()

  // Extract route: "/merchant/register" -> "/register"
  const route = pathname.replace(baseRoute, "") || defaultRoute

  // Get config or use default
  const config = authContent[route] || authContent[defaultRoute]

  return (
    <AuthLayout
      sideContent={config.side}
      headerProps={config.header}
      brandName={brandName}
      tagline={tagline}
    >
      {children}
    </AuthLayout>
  )
}
