"use client"

import { MerchantProvider } from "@/modules/merchant/providers/MerchantProvider"
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout"
import { MerchantUser } from "@/shared/types/auth.types"
import { CreditCard, Package } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  merchantGlobalLinks,
  merchantSearchIndex,
  merchantSidebarLinks,
  merchantTopbarTabs,
} from "../../config/navigation"

export function MerchantDashboardLayoutWrapper({
  children,
  initialMerchant
}: {
  children: React.ReactNode
  initialMerchant: MerchantUser
}) {
  const pathname = usePathname()

  const getCurrentSection = () => {
    if (pathname.startsWith("/merchant/stores")) return "stores"
    if (pathname.startsWith("/merchant/orders")) return "orders"
    return "default"
  }

  const sidebarLinks = merchantSidebarLinks[getCurrentSection()]

  const merchant = {
    firstName: "Vishal",
    lastName: "Mistry",
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
    <MerchantProvider initialMerchant={initialMerchant}>
      <DashboardLayout
        sidebarLinks={sidebarLinks}
        globalLinks={merchantGlobalLinks}
        topbarTabs={merchantTopbarTabs}
        searchIndex={merchantSearchIndex}
        user={merchant}
        tenant="merchant"
        onLogout={handleLogout}
        onNotificationDismiss={handleNotificationDismiss}
        onNotificationsClearAll={handleNotificationsClearAll}
        notifications={[]}
        notificationIconMap={{ order: Package, payment: CreditCard }}
      >
        {children}
      </DashboardLayout>
    </MerchantProvider>
  )
}
