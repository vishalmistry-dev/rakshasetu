import { AuthSideContent } from "@/shared/components/layout/AuthLayout"
import {
  HandCoins,
  Lock,
  MailCheck,
  Store,
} from "lucide-react"

export type MerchantAuthRoute =
  | "/login"
  | "/register"
  | "/forgot-password"
  | "/reset-password"

interface MerchantAuthConfig {
  side: AuthSideContent
  header: {
    title: string
    linkHref: string
    linkLabel: string
  }
}

export const merchantAuthContent: Record<MerchantAuthRoute, MerchantAuthConfig> = {
  "/login": {
    side: {
      icon: <Store className="h-8 w-8 text-accent-hover" />,
      title: "Welcome Back, Merchant",
      description: "Log in to manage your connected store, track escrow-protected orders, and access RakshaSetu's merchant dashboard.",
      bullets: [
        "Shopify & WooCommerce integration",
        "Protected & secured order management",
        "Real-time payout tracking",
      ],
    },
    header: {
      title: "New to RakshaSetu?",
      linkHref: "/register",
      linkLabel: "Sign up",
    },
  },
  "/register": {
    side: {
      icon: <HandCoins className="h-8 w-8 text-accent-hover" />,
      title: "Join RakshaSetu as a Merchant",
      description: "Connect your store and start accepting secure, escrow-protected payments. Built for Indian commerce.",
      bullets: [
        "Easy onboarding with KYC",
        "Plugin-ready for Shopify & WooCommerce",
        "Dashboard for orders, disputes, and payouts",
      ],
    },
    header: {
      title: "Already have an account?",
      linkHref: "/login",
      linkLabel: "Login",
    },
  },
  "/forgot-password": {
    side: {
      icon: <MailCheck className="h-8 w-8 text-accent-hover" />,
      title: "Reset Merchant Access",
      description: "We'll send you a secure link to reset your merchant dashboard password. Your store remains protected.",
      bullets: [
        "Secure one-time reset link",
        "No data loss during recovery",
        "Support available if needed",
      ],
    },
    header: {
      title: "Remember your password?",
      linkHref: "/login",
      linkLabel: "Login",
    },
  },
  "/reset-password": {
    side: {
      icon: <Lock className="h-8 w-8 text-accent-hover" />,
      title: "Reset Your Merchant Password",
      description: "Create a new password to continue securely. This reset link is valid for one-time use only.",
      bullets: [
        "Minimum 8 characters required",
        "Use a mix of letters & numbers",
        "Your store access stays protected",
      ],
    },
    header: {
      title: "",
      linkHref: "/forgot-password",
      linkLabel: "Go Back",
    },
  },
}
