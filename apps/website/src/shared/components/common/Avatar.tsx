import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import React from 'react'

export interface AvatarProps {
  /** Image URL */
  src?: string
  /** Alt text */
  alt?: string
  /** Fallback text (initials) */
  fallback?: string
  /** Size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Shape */
  shape?: 'circle' | 'square'
  /** Show online status */
  status?: 'online' | 'offline' | 'away'
  /** Custom styling */
  className?: string
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  shape = 'circle',
  status,
  className,
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  }

  const statusSizeClasses = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  }

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  }

  const showImage = src && !imageError

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden bg-gray-100 font-medium text-gray-600',
          sizeClasses[size],
          shape === 'circle' ? 'rounded-full' : 'rounded-lg'
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : fallback ? (
          <span>{fallback}</span>
        ) : (
          <User className="h-1/2 w-1/2" />
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            statusSizeClasses[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  )
}
