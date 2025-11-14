import { merchantAuthContent } from "@/modules/merchant/config/authContent"
import { AuthLayoutWrapper } from "@/shared/components/layout/AuthLayout"

export default function MerchantAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthLayoutWrapper
      authContent={merchantAuthContent}
      baseRoute="/merchant"
      defaultRoute="/login"
      brandName="RakshaSetu"
      tagline="Secure Merchant Portal"
    >
      {children}
    </AuthLayoutWrapper>
  )
}
