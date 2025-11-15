"use client"

import { useMerchantLogout } from "@/modules/merchant/hooks/auth/useMerchantLogout"
import { MerchantProvider } from "@/modules/merchant/providers/MerchantProvider"
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout"
import { Merchant } from "@rakshasetu/database"
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
  initialMerchant: Merchant
}) {

  const LogoutMutation = useMerchantLogout()
  const pathname = usePathname()

  const getCurrentSection = () => {
    if (pathname.startsWith("/merchant/shop")) return "shop"
    if (pathname.startsWith("/merchant/logistics")) return "logistics"
    return "default"
  }

  const sidebarLinks = merchantSidebarLinks[getCurrentSection()]


  const handleLogout = () => {
    LogoutMutation.mutate()
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
        user={initialMerchant}
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
