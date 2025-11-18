import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

export interface LoadingOverlayProps {
  /** Show/hide overlay */
  show: boolean
  /** Loading message */
  message?: string
  /** Blur background */
  blur?: boolean
  /** Custom spinner */
  spinner?: React.ReactNode
  /** Overlay opacity (0-100) */
  opacity?: number
  /** Full screen or container relative */
  fullScreen?: boolean
  className?: string
}

export function LoadingOverlay({
  show,
  message,
  blur = true,
  spinner,
  opacity = 80,
  fullScreen = false,
  className,
}: LoadingOverlayProps) {
  if (!show) return null

  return (
    <div
      className={cn(
        'z-50 flex items-center justify-center bg-white transition-opacity',
        fullScreen ? 'fixed inset-0' : 'absolute inset-0',
        blur && 'backdrop-blur-sm',
        className
      )}
      style={{ opacity: opacity / 100 }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        {spinner || <Loader2 className="h-8 w-8 animate-spin text-orange-600" />}
        {message && (
          <p className="text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>
    </div>
  )
}
