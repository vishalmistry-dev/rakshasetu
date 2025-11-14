import { MerchantDashboardLayoutWrapper } from "@/modules/merchant/components/layout"
import { AuthGuard } from "@/shared/lib/auth/auth-guard"
import { MerchantUser } from "@/shared/types/auth.types"
import React from "react"


export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const merchant = await AuthGuard.requireAuth<MerchantUser>("merchant")

  return (
    <MerchantDashboardLayoutWrapper initialMerchant={merchant}>
      {children}
    </MerchantDashboardLayoutWrapper>
  )
}
