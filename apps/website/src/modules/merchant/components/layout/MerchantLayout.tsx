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
  merchantGlobalLinks,
  merchantSearchIndex,
  merchantSidebarLinks,
  merchantTopbarTabs,
} from "../../config/navigation"

interface MerchantLayoutProps {
  children: React.ReactNode
  // These will come from your stores
  merchant: any
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

// Mock notifications (replace with real data from your store)
const mockNotifications = [
  {
    id: "1",
    type: "order",
    title: "New order received",
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    read: false,
    priority: 2 as const,
    href: "/marketplace/orders/all",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment pending for order #1234",
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    read: true,
    priority: 1 as const,
    href: "/marketplace/billing",
  },
]

export function MerchantLayout({
  children,
  merchant,
  isAuth,
  onLogout,
}: MerchantLayoutProps) {
  const pathname = usePathname()

  // Determine current section from pathname
  const getCurrentSection = () => {
    if (pathname.startsWith("/marketplace")) return "marketplace"
    return "default"
  }

  const currentSection = getCurrentSection()
  const sidebarLinks = merchantSidebarLinks[currentSection] || merchantSidebarLinks.default

  const handleNotificationDismiss = (id: string) => {
    // Handle notification dismiss
    console.log("Dismiss notification:", id)
  }

  const handleNotificationsClearAll = () => {
    // Handle clear all notifications
    console.log("Clear all notifications")
  }

  return (
    <DashboardLayout
      sidebarLinks={sidebarLinks}
      globalLinks={merchantGlobalLinks}
      topbarTabs={merchantTopbarTabs}
      user={merchant}
      tenant="merchant"
      searchIndex={merchantSearchIndex}
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
