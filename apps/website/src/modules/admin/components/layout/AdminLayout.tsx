"use client"

import { DashboardLayout } from "@/shared/components/layout/DashboardLayout"
import {
  ArrowRight,
  CreditCard,
  Megaphone,
  MessageSquare,
  Package,
  UserPlus,
} from "lucide-react"
import { usePathname } from "next/navigation"
import {
  adminGlobalLinks,
  adminSearchIndex,
  adminSidebarLinks,
  adminTopbarTabs,
} from "../../config/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
  admin: any
  isAuth: boolean
  onLogout: () => void
}

// Notification icon map
const notificationIconMap = {
  order: Package,
  payment: CreditCard,
  release: ArrowRight,
  connect: UserPlus,
  message: MessageSquare,
  admin: Megaphone,
}

// Mock notifications
const mockNotifications = [
  {
    id: "1",
    type: "admin",
    title: "New merchant registration pending approval",
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    priority: 2 as const,
    href: "/marketplace/stores/merchants",
  },
  {
    id: "2",
    type: "order",
    title: "Dispute raised on order #5678",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    priority: 2 as const,
    href: "/rsmart/orders/disputes",
  },
]

export function AdminLayout({
  children,
  admin,
  isAuth,
  onLogout,
}: AdminLayoutProps) {
  const pathname = usePathname()

  // Determine current section from pathname
  const getCurrentSection = () => {
    if (pathname.startsWith("/rsmart")) return "rsmart"
    if (pathname.startsWith("/logistics")) return "logistics"
    if (pathname.startsWith("/marketplace")) return "marketplace"
    return "default"
  }

  const currentSection = getCurrentSection()
  const sidebarLinks = adminSidebarLinks[currentSection] || adminSidebarLinks.default

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
      user={admin}
      tenant="admin"
      searchIndex={adminSearchIndex}
      notifications={mockNotifications}
      notificationIconMap={notificationIconMap}
      onNotificationDismiss={handleNotificationDismiss}
      onNotificationsClearAll={handleNotificationsClearAll}
      onLogout={onLogout}
      showRoleSwitch={false}
    >
      {children}
    </DashboardLayout>
  )
}
