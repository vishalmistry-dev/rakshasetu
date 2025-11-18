import { cn } from "@/lib/utils"
import { CheckCircle, Circle } from "lucide-react"

export interface TimelineEvent {
  status: string
  location?: string
  timestamp?: string
  description?: string
  completed: boolean
}

interface TimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {events.map((event, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                event.completed
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              {event.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </div>
            {index < events.length - 1 && (
              <div
                className={cn(
                  "w-0.5 h-16",
                  event.completed ? "bg-green-200" : "bg-gray-200"
                )}
              />
            )}
          </div>
          <div className="flex-1 pb-6">
            <div className="flex items-start justify-between mb-1">
              <p className="font-medium text-gray-900">{event.status}</p>
              {event.timestamp && (
                <span className="text-sm text-gray-500">{event.timestamp}</span>
              )}
            </div>
            {event.description && (
              <p className="text-sm text-gray-600 mb-1">{event.description}</p>
            )}
            {event.location && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                📍 {event.location}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
