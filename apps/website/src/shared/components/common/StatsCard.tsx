import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface StatsCardProps {
  /** Stat label */
  label: string
  /** Stat value */
  value: string | number
  /** Change percentage */
  change?: {
    value: number
    trend: 'up' | 'down'
  }
  /** Icon */
  icon?: LucideIcon
  /** Icon color */
  iconColor?: string
  /** Loading state */
  loading?: boolean
  /** Custom styling */
  className?: string
}

export function StatsCard({
  label,
  value,
  change,
  icon: Icon,
  iconColor = 'text-orange-600',
  loading,
  className,
}: StatsCardProps) {
  if (loading) {
    return (
      <div className={cn('rounded-lg border border-gray-200 bg-white p-6', className)}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'text-sm font-medium',
                  change.trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}
              >
                {change.trend === 'up' ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('rounded-lg bg-orange-50 p-3', iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  )
}
