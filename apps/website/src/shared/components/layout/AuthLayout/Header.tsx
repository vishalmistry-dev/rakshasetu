"use client"

import { cn } from "@/lib/utils"
import { Logo } from "@/shared/components/common/Logo"
import Link from "next/link"

interface AuthHeaderProps {
  title?: string
  linkHref?: string
  linkLabel?: string
  logoHref?: string
  className?: string
}

export default function AuthHeader({
  title,
  linkHref,
  linkLabel,
  logoHref = "/",
  className
}: AuthHeaderProps) {
  return (
    <header className={cn(
      "fixed top-0 left-0 w-full lg:w-[66.6667%] z-50 p-4 md:px-8 py-4 bg-white border-b border-gray-100",
      className
    )}>
      <div className="flex items-center justify-between">
        <Link href={logoHref}>
          <Logo />
        </Link>
        {title && linkHref && linkLabel && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>{title}</span>
            <Link
              href={linkHref}
              className="font-medium text-accent-hover hover:text-primary transition-colors"
            >
              {linkLabel}
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
