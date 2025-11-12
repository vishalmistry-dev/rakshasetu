import { cn } from '@/lib/utils'
import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max width */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Add padding */
  padding?: boolean
}

export function Container({
  className,
  size = 'xl',
  padding = true,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        size === 'sm' && 'max-w-screen-sm',
        size === 'md' && 'max-w-screen-md',
        size === 'lg' && 'max-w-screen-lg',
        size === 'xl' && 'max-w-screen-xl',
        size === 'full' && 'max-w-full',
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
