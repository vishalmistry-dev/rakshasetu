import { cn } from '@/lib/utils'
import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove padding */
  noPadding?: boolean
  /** Hover effect */
  hoverable?: boolean
  /** Click handler */
  onClick?: () => void
}

export function Card({
  className,
  noPadding,
  hoverable,
  onClick,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        !noPadding && 'p-6',
        hoverable && 'transition-shadow hover:shadow-md',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  action?: React.ReactNode
}

export function CardHeader({
  className,
  title,
  description,
  action,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn('flex items-start justify-between', className)}
      {...props}
    >
      <div className="space-y-1">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        {children}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  )
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardContent({
  className,
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={cn('mt-4', className)} {...props}>
      {children}
    </div>
  )
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export function CardFooter({
  className,
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn('mt-6 flex items-center justify-end gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}
