import { cn } from "@/lib/utils"
import { AlertCircle, AlertTriangle, CheckCircle, Info, LucideIcon } from "lucide-react"

type BannerType = "info" | "success" | "warning" | "error"

interface InfoBannerProps {
  type?: BannerType
  title?: string
  description?: string | React.ReactNode
  children?: React.ReactNode
  icon?: LucideIcon
  className?: string
}

const bannerStyles: Record<BannerType, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-900",
  success: "bg-green-50 border-green-200 text-green-900",
  warning: "bg-orange-50 border-orange-200 text-orange-900",
  error: "bg-red-50 border-red-200 text-red-900",
}

const iconStyles: Record<BannerType, string> = {
  info: "text-blue-600",
  success: "text-green-600",
  warning: "text-orange-600",
  error: "text-red-600",
}

const defaultIcons: Record<BannerType, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

export function InfoBanner({
  type = "info",
  title,
  description,
  children,
  icon,
  className,
}: InfoBannerProps) {
  const Icon = icon || defaultIcons[type]

  return (
    <div
      className={cn(
        "border rounded-lg p-4",
        bannerStyles[type],
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconStyles[type])} />
        <div className="flex-1">
          {title && <p className="font-medium mb-1">{title}</p>}
          {description && (
            <div className="text-sm opacity-90">
              {typeof description === "string" ? <p>{description}</p> : description}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
