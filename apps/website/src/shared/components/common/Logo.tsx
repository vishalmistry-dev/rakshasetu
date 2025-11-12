import { cn } from '@/lib/utils'

export interface LogoProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Show text */
  showText?: boolean
  /** Custom styling */
  className?: string
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Logo Icon - Replace with your actual logo */}
      <div
        className={cn(
          'flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600',
          sizeClasses[size]
        )}
      >
        <span className="font-bold text-white">R</span>
      </div>

      {showText && (
        <span
          className={cn(
            'font-bold text-gray-900',
            textSizeClasses[size]
          )}
        >
          RakshaSetu
        </span>
      )}
    </div>
  )
}
