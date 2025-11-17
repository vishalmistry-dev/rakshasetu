"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect } from "react"
import { Notification } from "./NotificationsDropdown"
import { Sidebar, SidebarLink } from "./Sidebar"
import { Topbar } from "./Topbar"

interface TopbarTab {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface DashboardLayoutProps {
  // Navigation
  sidebarLinks: SidebarLink[]
  globalLinks: SidebarLink[]
  topbarTabs: TopbarTab[]

  // User data
  user: any
  tenant: "merchant" | "admin" | "user"

  // Search
  searchIndex: Array<{ title: string; source: string; href: string }>

  // Notifications
  notifications: Notification[]
  notificationIconMap: Record<string, React.ComponentType<{ className?: string }>>
  onNotificationDismiss: (id: string) => void
  onNotificationsClearAll: () => void

  // Auth
  onLogout: () => void

  // Role switching (optional - only for users)
  showRoleSwitch?: boolean
  currentRole?: string
  onRoleSwitch?: (role: string) => void
  roles?: Array<{
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
  }>
  loading?: boolean

  // Content
  children: React.ReactNode
}

export function DashboardLayout({
  sidebarLinks,
  globalLinks,
  topbarTabs,
  user,
  tenant,
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
  children,
}: DashboardLayoutProps) {
  // Apply overflow hidden only when dashboard is mounted
  useEffect(() => {
    const htmlElement = document.documentElement
    const bodyElement = document.body

    // Store original values
    const originalHtmlOverflow = htmlElement.style.overflow
    const originalBodyOverflow = bodyElement.style.overflow

    // Apply overflow hidden
    htmlElement.removeAttribute('scroll')
    htmlElement.style.overflow = 'hidden'
    bodyElement.style.overflow = 'hidden'

    // Cleanup - restore original values when component unmounts
    return () => {
      htmlElement.style.overflow = originalHtmlOverflow
      bodyElement.style.overflow = originalBodyOverflow
    }
  }, [])

  return (
    <SidebarProvider style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="flex h-full w-full overflow-hidden">
        <Sidebar links={sidebarLinks} globalLinks={globalLinks} tenant={tenant} />

        <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          <Topbar
            user={user}
            tenant={tenant}
            tabs={topbarTabs}
            searchIndex={searchIndex}
            notifications={notifications}
            notificationIconMap={notificationIconMap}
            onNotificationDismiss={onNotificationDismiss}
            onNotificationsClearAll={onNotificationsClearAll}
            onLogout={onLogout}
            showRoleSwitch={showRoleSwitch}
            currentRole={currentRole}
            onRoleSwitch={onRoleSwitch}
            roles={roles}
            loading={loading}
            showSidebarTrigger={true}
            sidebarTrigger={<SidebarTrigger />}
          />

          <div className="flex-1 overflow-y-auto bg-gray-50">
            <main className="p-5">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
