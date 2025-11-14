import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"
import React from "react"

export interface AuthSideContent {
  icon?: React.ReactNode
  title: string
  description: string
  bullets?: string[]
}

interface AuthSideSectionProps {
  content: AuthSideContent
  brandName?: string
  tagline?: string
  showFooter?: boolean
  className?: string
  contentClassName?: string
}

export default function AuthSideSection({
  content,
  brandName = "RakshaSetu",
  tagline = "Built with trust in India",
  showFooter = true,
  className,
  contentClassName
}: AuthSideSectionProps) {
  return (
    <div className={cn(
      "h-full w-full flex flex-col justify-between px-8 pt-12 pb-5 text-left",
      className
    )}>
      <div className={cn("space-y-6", contentClassName)}>
        {content.icon && <div className="flex-shrink-0">{content.icon as React.ReactNode}</div>}
        <h2 className="text-2xl font-bold text-foreground leading-tight">
          {content.title}
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          {content.description}
        </p>

        {content.bullets && content.bullets.length > 0 && (
          <ul className="space-y-3 pt-4">
            {content.bullets.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <CheckCircle className="h-4 w-4 text-accent-hover mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showFooter && (
        <footer className="text-xs text-muted-foreground text-center pt-8 border-t border-gray-200 mt-8">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-accent-hover font-semibold">{brandName}</span>
          {tagline && <span>. {tagline}</span>}
        </footer>
      )}
    </div>
  )
}
