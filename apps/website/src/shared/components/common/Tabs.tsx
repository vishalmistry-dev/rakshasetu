"use client"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import * as React from "react"

// ==========================================
// TYPES
// ==========================================

export interface Tab {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string | number
  disabled?: boolean
  href?: string
}

export interface TabsProps extends VariantProps<typeof tabsVariants> {
  tabs: Tab[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string

  // URL sync
  urlSync?: boolean
  urlParam?: string

  // Accessibility
  ariaLabel?: string
}

// ==========================================
// VARIANTS
// ==========================================

const tabsVariants = cva(
  "inline-flex items-center justify-center gap-1 bg-white",
  {
    variants: {
      variant: {
        underline: "border-b border-gray-200",
        pills: "bg-gray-100 p-1 rounded-lg",
        buttons: "gap-2",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "md",
    },
  }
)

const tabVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        underline: "border-b-2 border-transparent hover:text-foreground data-[active=true]:border-primary data-[active=true]:text-foreground",
        pills: "rounded-md hover:bg-white/80 data-[active=true]:bg-white data-[active=true]:shadow-sm",
        buttons: "border border-gray-200 rounded-md hover:bg-gray-50 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-2.5 text-lg",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "sm",
    },
  }
)

// ==========================================
// COMPONENT
// ==========================================

export function Tabs({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
  variant = "underline",
  size = "md",
  urlSync = false,
  urlParam = "tab",
  ariaLabel = "Tabs",
}: TabsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get value from URL if urlSync is enabled
  const urlValue = urlSync ? searchParams.get(urlParam) : null

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = React.useState(
    defaultValue || tabs[0]?.value || ""
  )

  // Determine active value
  const activeValue = controlledValue || urlValue || internalValue

  // Handle tab change
  const handleTabChange = (tabValue: string, href?: string) => {
    if (href) {
      // If tab has href, navigate to it
      return
    }

    // Update internal state
    setInternalValue(tabValue)

    // Call onChange callback
    onChange?.(tabValue)

    // Update URL if urlSync is enabled
    if (urlSync && typeof window !== "undefined") {
      const params = new URLSearchParams(searchParams.toString())
      params.set(urlParam, tabValue)
      window.history.pushState(null, "", `${pathname}?${params.toString()}`)
    }
  }

  return (
    <div
      className={cn(tabsVariants({ variant }), className)}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const isActive = activeValue === tab.value
        const Icon = tab.icon

        const tabContent = (
          <>
            {Icon && <Icon className="h-4 w-4" />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={cn(
                "ml-1 px-2 py-0.5 text-xs font-medium rounded-full",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-200 text-gray-700"
              )}>
                {tab.badge}
              </span>
            )}
          </>
        )

        const tabClassName = cn(
          tabVariants({ variant, size }),
          tab.disabled && "opacity-50 cursor-not-allowed"
        )

        if (tab.href) {
          return (
            <Link
              key={tab.value}
              href={tab.href}
              className={tabClassName}
              data-active={isActive}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              onClick={(e) => {
                if (tab.disabled) {
                  e.preventDefault()
                } else {
                  handleTabChange(tab.value, tab.href)
                }
              }}
            >
              {tabContent}
            </Link>
          )
        }

        return (
          <button
            key={tab.value}
            className={tabClassName}
            data-active={isActive}
            disabled={tab.disabled}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleTabChange(tab.value)}
          >
            {tabContent}
          </button>
        )
      })}
    </div>
  )
}
