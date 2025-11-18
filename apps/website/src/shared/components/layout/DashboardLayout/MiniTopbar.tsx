"use client"

import { format } from "date-fns"
import { useEffect, useState } from "react"

interface MiniTopbarProps {
  userName?: string
}

export function MiniTopbar({ userName }: MiniTopbarProps) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const tick = () => {
      const current = new Date()
      const currentMinute = current.getMinutes()
      const lastMinute = now.getMinutes()

      if (currentMinute !== lastMinute) {
        setNow(current)
      }
    }

    const interval = setInterval(tick, 10000)
    return () => clearInterval(interval)
  }, [now])

  const timeString = format(now, "EEEE, dd MMM yyyy · hh:mm a")
  const greeting =
    now.getHours() < 12
      ? "Good morning"
      : now.getHours() < 18
        ? "Good afternoon"
        : "Good evening"

  const emoji = now.getHours() < 12 ? "☀️" : now.getHours() < 18 ? "🌤️" : "🌙"

  return (
    <div className="h-8 px-4 flex items-center justify-between bg-gray-50 text-xs text-gray-600 border-b">
      <div className="flex items-center gap-2">
        <span>{timeString}</span>
        <span className="hidden sm:inline">
          | {emoji} {greeting}
        </span>
      </div>
      {userName && (
        <span className="hidden sm:inline">
          Welcome back, <b className="text-orange-600">{userName}</b>
        </span>
      )}
    </div>
  )
}
