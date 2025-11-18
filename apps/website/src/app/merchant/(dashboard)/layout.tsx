import { MerchantDashboardLayoutWrapper } from "@/modules/merchant/components/layout"
import { AuthGuard } from "@/shared/lib/auth/auth-guard"
import { Merchant } from "@rakshasetu/database"
import React from "react"


export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const merchant = await AuthGuard.requireAuth<Merchant>("merchant")
  return (
    <MerchantDashboardLayoutWrapper initialMerchant={merchant}>
      {children}
    </MerchantDashboardLayoutWrapper>
  )
}
