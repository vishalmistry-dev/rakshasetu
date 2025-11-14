import { cn } from '@/lib/utils'
import Image from 'next/image'

export interface LogoProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Collapsed state (shows icon only) */
  isCollapsed?: boolean
  /** Custom styling */
  className?: string
  /** Custom full logo path */
  src?: string
  /** Custom icon logo path */
  iconSrc?: string
}

export function Logo({
  size = 'md',
  isCollapsed = false,
  className,
  src = '/assets/logo/logo.png',
  iconSrc = '/assets/logo/compact-logo.png'
}: LogoProps) {

  // Full logo aspect ratio: 920:271 ≈ 3.39:1
  const fullLogoDimensions = {
    sm: { height: 32, width: 109 },   // Readable on mobile
    md: { height: 40, width: 136 },   // Standard header size
    lg: { height: 48, width: 163 },   // Large/prominent placement
  }

  // Icon logo: 1200:1200 = 1:1 (square)
  const iconDimensions = {
    sm: { height: 32, width: 32 },
    md: { height: 40, width: 40 },
    lg: { height: 48, width: 48 },
  }

  const dimensions = isCollapsed ? iconDimensions[size] : fullLogoDimensions[size]
  const logoSrc = isCollapsed ? iconSrc : src

  return (
    <div className={cn('relative transition-all duration-300', className)}>
      <Image
        src={logoSrc}
        alt={isCollapsed ? "RakshaSetu Icon" : "RakshaSetu Logo"}
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        priority
      />
    </div>
  )
}
