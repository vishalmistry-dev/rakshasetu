"use client"

import { cn } from "@/lib/utils"
import React from "react"
import AuthFooter from "./Footer"
import AuthHeader from "./Header"
import AuthSideSection, { AuthSideContent } from "./SideSection"

interface AuthLayoutProps {
  children: React.ReactNode
  sideContent?: AuthSideContent
  headerProps?: {
    title?: string
    linkHref?: string
    linkLabel?: string
    logoHref?: string
  }
  brandName?: string
  tagline?: string
  showSidebar?: boolean
  sidebarBgColor?: string
  className?: string
}

export default function AuthLayout({
  children,
  sideContent,
  headerProps,
  brandName = "RakshaSetu",
  tagline = "Built with trust in India",
  showSidebar = true,
  sidebarBgColor = "bg-gray-100",
  className
}: AuthLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-white grid grid-cols-1",
      showSidebar && "lg:grid-cols-6",
      className
    )}>
      {/* Left side - Main content */}
      <div className={cn(
        "flex flex-col min-h-screen relative",
        showSidebar ? "lg:col-span-4" : "col-span-full"
      )}>
        <AuthHeader {...headerProps} />

        <main className="flex-1 flex lg:items-center justify-center px-4 pt-24 pb-20 lg:pb-8">
          <div className="w-full max-w-md">
            {children as React.ReactNode}
          </div>
        </main>

        <AuthFooter
          brandName={brandName}
          tagline={tagline}
          showOnDesktop={!showSidebar}
        />
      </div>

      {/* Right side - Info section */}
      {showSidebar && sideContent && (
        <div className={cn(
          "hidden lg:block lg:col-span-2 h-full w-full",
          sidebarBgColor
        )}>
          <AuthSideSection
            content={sideContent}
            brandName={brandName}
            tagline={tagline}
          />
        </div>
      )}
    </div>
  )
}
