"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/shared/components/form/Button"
import { formatDistanceToNow } from "date-fns"
import { Bell, X } from "lucide-react"
import Link from "next/link"

export interface Notification {
  id: string
  type: string
  title: string
  createdAt: Date
  read: boolean
  priority: 0 | 1 | 2
  href: string
}

interface NotificationsDropdownProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
  onClearAll: () => void
  iconMap: Record<string, React.ComponentType<{ className?: string }>>
}

export function NotificationsDropdown({
  notifications,
  onDismiss,
  onClearAll,
  iconMap,
}: NotificationsDropdownProps) {
  const unreadCount = notifications.filter(n => !n.read).length
  const newNotifications = notifications.filter(n => !n.read)
  const earlierNotifications = notifications.filter(n => n.read)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0 bg-white">
        {/* Header */}
        <div className="px-3 py-2 border-b flex items-center justify-between">
          <h3 className="text-xs font-semibold text-gray-900">Notifications</h3>
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-[10px] text-gray-500 hover:text-gray-900"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Content */}
        <div className="max-h-[350px] overflow-y-auto p-2">
          {notifications.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="space-y-3">
              {/* New */}
              {newNotifications.length > 0 && (
                <div className="space-y-1">
                  <p className="px-2 text-[10px] font-medium text-gray-400 uppercase tracking-wide">New</p>
                  <div className="space-y-1">
                    {newNotifications.map(({ id, type, title, createdAt, priority, href }) => {
                      const Icon = iconMap[type]
                      return (
                        <NotificationItem
                          key={id}
                          id={id}
                          title={title}
                          createdAt={createdAt}
                          priority={priority}
                          href={href}
                          Icon={Icon}
                          onDismiss={onDismiss}
                        />
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Earlier */}
              {earlierNotifications.length > 0 && (
                <div className="space-y-1">
                  <p className="px-2 text-[10px] font-medium text-gray-400 uppercase tracking-wide">Earlier</p>
                  <div className="space-y-1">
                    {earlierNotifications.map(({ id, type, title, createdAt, priority, href }) => {
                      const Icon = iconMap[type]
                      return (
                        <NotificationItem
                          key={id}
                          id={id}
                          title={title}
                          createdAt={createdAt}
                          priority={priority}
                          href={href}
                          Icon={Icon}
                          onDismiss={onDismiss}
                        />
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function NotificationItem({
  id,
  title,
  createdAt,
  priority,
  href,
  Icon,
  onDismiss,
}: {
  id: string
  title: string
  createdAt: Date
  priority: 0 | 1 | 2
  href: string
  Icon?: React.ComponentType<{ className?: string }>
  onDismiss: (id: string) => void
}) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "group relative rounded-md p-2.5 transition-all",
          priority === 2 && "bg-red-50/30 hover:bg-red-50/50",
          priority === 1 && "bg-yellow-50/30 hover:bg-yellow-50/50",
          priority === 0 && "hover:bg-gray-50"
        )}
      >
        <div className="flex items-start gap-2.5">
          {Icon && (
            <div className={cn(
              "shrink-0 mt-0.5 p-1.5 rounded-md",
              priority === 2 && "bg-red-100",
              priority === 1 && "bg-yellow-100",
              priority === 0 && "bg-gray-100"
            )}>
              <Icon className="h-3 w-3 text-gray-600" />
            </div>
          )}
          <div className="flex-1 min-w-0 pr-5">
            <p className="text-xs text-gray-900 font-medium leading-snug">{title}</p>
            <p className="text-[10px] text-gray-500 mt-1">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDismiss(id)
          }}
          className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all"
        >
          <X className="h-2.5 w-2.5 text-gray-500" />
        </button>
      </div>
    </Link>
  )
}
