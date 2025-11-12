import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/form/Button'
import { PackageOpen } from 'lucide-react'
import React from 'react'

export interface EmptyStateProps {
  /** Icon to display */
  icon?: React.ReactNode
  /** Title text */
  title: string
  /** Description text */
  description?: string
  /** Primary action button */
  action?: {
    label: string
    onClick: () => void
  }
  /** Secondary action button */
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  /** Custom content below description */
  children?: React.ReactNode
  /** Custom styling */
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        {icon || <PackageOpen className="h-8 w-8 text-gray-400" />}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

      {description && (
        <p className="mb-6 max-w-md text-sm text-gray-500">{description}</p>
      )}

      {children}

      {(action || secondaryAction) && (
        <div className="flex items-center gap-3">
          {action && (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
