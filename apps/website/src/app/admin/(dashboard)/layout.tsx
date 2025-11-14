import { AdminDashboardLayoutWrapper } from "@/modules/admin/components/layout"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminDashboardLayoutWrapper>
      {children}
    </AdminDashboardLayoutWrapper>
  )
}
