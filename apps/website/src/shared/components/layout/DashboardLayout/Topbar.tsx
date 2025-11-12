"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AccountDropdown } from "./AccountDropdown"
import { MiniTopbar } from "./MiniTopbar"
import { Notification, NotificationsDropdown } from "./NotificationsDropdown"
import { TopbarSearch } from "./TopbarSearch"

interface TopbarTab {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface TopbarProps {
  user: any
  tenant: "merchant" | "admin" | "user"
  tabs: TopbarTab[]
  searchIndex: Array<{ title: string; source: string; href: string }>
  notifications: Notification[]
  notificationIconMap: Record<string, React.ComponentType<{ className?: string }>>
  onNotificationDismiss: (id: string) => void
  onNotificationsClearAll: () => void
  onLogout: () => void
  showRoleSwitch?: boolean
  currentRole?: string
  onRoleSwitch?: (role: string) => void
  roles?: Array<{ label: string; value: string; icon: React.ComponentType<{ className?: string }> }>
  loading?: boolean
  showSidebarTrigger?: boolean
  sidebarTrigger?: React.ReactNode
}

export function Topbar({
  user,
  tenant,
  tabs,
  searchIndex,
  notifications,
  notificationIconMap,
  onNotificationDismiss,
  onNotificationsClearAll,
  onLogout,
  showRoleSwitch,
  currentRole,
  onRoleSwitch,
  roles,
  loading,
  showSidebarTrigger,
  sidebarTrigger,
}: TopbarProps) {
  const pathname = usePathname()

  const userName = user?.firstName || user?.lastName
    ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
    : undefined

  return (
    <>
      <MiniTopbar userName={userName} />

      <header className="h-14 border-b px-4 flex items-center justify-between bg-white relative z-10">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {showSidebarTrigger && sidebarTrigger}

          <nav className="flex items-center gap-1 text-sm font-medium">
            {tabs.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href)
              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1 rounded-full transition-colors",
                    isActive
                      ? "bg-gray-100 text-orange-600 font-medium"
                      : "text-gray-600 hover:text-orange-600"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <TopbarSearch searchIndex={searchIndex} placeholder="Search orders, payments, reports..." />

          <NotificationsDropdown
            notifications={notifications}
            onDismiss={onNotificationDismiss}
            onClearAll={onNotificationsClearAll}
            iconMap={notificationIconMap}
          />

          <AccountDropdown
            user={user}
            tenant={tenant}
            onLogout={onLogout}
            showRoleSwitch={showRoleSwitch}
            currentRole={currentRole}
            onRoleSwitch={onRoleSwitch}
            roles={roles}
            loading={loading}
          />
        </div>
      </header>
    </>
  )
}
