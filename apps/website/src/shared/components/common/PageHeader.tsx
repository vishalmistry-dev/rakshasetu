import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/form/Button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export interface PageHeaderProps {
  /** Page title */
  title: string
  /** Page description */
  description?: string
  /** Back button */
  onBack?: () => void
  /** Right side actions */
  actions?: React.ReactNode
  /** Breadcrumbs */
  breadcrumbs?: React.ReactNode
  /** Custom styling */
  className?: string
}

export function PageHeader({
  title,
  description,
  onBack,
  actions,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('border-b border-gray-200 bg-white', className)}>
      <div className="px-6 py-6">
        {breadcrumbs && <div className="mb-4">{breadcrumbs}</div>}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mt-1"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}

            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex items-center gap-2">{actions}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export interface BreadcrumbProps {
  items: Array<{
    label: string
    href?: string
    onClick?: () => void
  }>
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-gray-400">/</span>
          )}
          {item.href || item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="font-medium text-gray-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
