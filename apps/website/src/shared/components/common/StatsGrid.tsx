import { cn } from "@/lib/utils"
import { StatsCard, StatsCardProps } from "./StatsCard"

interface StatsGridProps {
  stats: StatsCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}

export function StatsGrid({ stats, columns = 4, className }: StatsGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid grid-cols-1 gap-6", gridCols[columns], className)}>
      {stats.map((stat) => (
        <StatsCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
