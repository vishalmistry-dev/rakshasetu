import { cn } from '@/lib/utils'
import React from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width (default: full) */
  width?: string | number
  /** Height (default: auto based on variant) */
  height?: string | number
  /** Variant */
  variant?: 'text' | 'circular' | 'rectangular'
  /** Animation */
  animation?: 'pulse' | 'wave' | 'none'
}

export function Skeleton({
  className,
  width,
  height,
  variant = 'rectangular',
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const styles: React.CSSProperties = {}
  if (width) styles.width = typeof width === 'number' ? `${width}px` : width
  if (height) styles.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn(
        'bg-gray-200',
        animation === 'pulse' && 'animate-pulse',
        animation === 'wave' && 'animate-shimmer',
        variant === 'text' && 'h-4 rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-lg',
        className
      )}
      style={styles}
      {...props}
    />
  )
}

// Pre-built skeleton patterns
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="space-y-4">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" height={100} />
        <div className="flex gap-2">
          <Skeleton variant="rectangular" height={32} width={80} />
          <Skeleton variant="rectangular" height={32} width={80} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton variant="rectangular" height={40} width="30%" />
          <Skeleton variant="rectangular" height={40} width="25%" />
          <Skeleton variant="rectangular" height={40} width="20%" />
          <Skeleton variant="rectangular" height={40} width="25%" />
        </div>
      ))}
    </div>
  )
}
