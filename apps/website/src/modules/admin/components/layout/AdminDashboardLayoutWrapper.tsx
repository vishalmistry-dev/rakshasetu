"use client"

import { DashboardLayout } from "@/shared/components/layout/DashboardLayout"
import { Megaphone, Package } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  adminGlobalLinks,
  adminSearchIndex,
  adminSidebarLinks,
  adminTopbarTabs,
} from "../../config/navigation"

export function AdminDashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const getCurrentSection = () => {
    if (pathname.startsWith("/admin/rsmart")) return "rsmart"
    if (pathname.startsWith("/admin/logistics")) return "logistics"
    if (pathname.startsWith("/admin/marketplace")) return "marketplace"
    return "default"
  }

  const sidebarLinks = adminSidebarLinks[getCurrentSection()]

  const admin = {
    firstName: "Admin",
    lastName: "User",
    image: null,
  }

  const handleLogout = () => {
    console.log("Logout")
  }

  const handleNotificationDismiss = (id: string) => {
    console.log("Dismiss notification:", id)
  }

  const handleNotificationsClearAll = () => {
    console.log("Clear all notifications")
  }

  return (
    <DashboardLayout
      sidebarLinks={sidebarLinks}
      globalLinks={adminGlobalLinks}
      topbarTabs={adminTopbarTabs}
      searchIndex={adminSearchIndex}
      user={admin}
      tenant="admin"
      onLogout={handleLogout}
      onNotificationDismiss={handleNotificationDismiss}
      onNotificationsClearAll={handleNotificationsClearAll}
      notifications={[]}
      notificationIconMap={{ order: Package, admin: Megaphone }}
    >
      {children}
    </DashboardLayout>
  )
}
