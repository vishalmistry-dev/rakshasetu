import { cn } from "@/lib/utils"

interface AuthFooterProps {
  brandName?: string
  tagline?: string
  year?: number
  className?: string
  showOnDesktop?: boolean
}

export default function AuthFooter({
  brandName = "RakshaSetu",
  tagline = "Built with trust in India",
  year = new Date().getFullYear(),
  showOnDesktop = false,
  className
}: AuthFooterProps) {
  return (
    <footer className={cn(
      "text-xs text-muted-foreground text-center p-4 fixed bottom-0 w-full bg-white border-t border-gray-100",
      !showOnDesktop && "lg:hidden",
      className
    )}>
      &copy; {year}{" "}
      <span className="text-accent-hover font-semibold">{brandName}</span>
      {tagline && <span>. {tagline}</span>}
    </footer>
  )
}
