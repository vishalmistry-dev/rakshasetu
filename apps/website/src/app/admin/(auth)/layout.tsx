import { adminAuthContent } from "@/modules/admin/config/authContent"
import { AuthLayoutWrapper } from "@/shared/components/layout/AuthLayout"

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthLayoutWrapper
      authContent={adminAuthContent}
      baseRoute="/admin"
      defaultRoute="/login"
      brandName="RakshaSetu"
      tagline="Admin Portal"
    >
      {children}
    </AuthLayoutWrapper>
  )
}
