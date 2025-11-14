import { AuthSideContent } from "@/shared/components/layout/AuthLayout"
import {
    Lock,
    MailCheck,
    ShieldCheck,
} from "lucide-react"

export type AdminAuthRoute =
    | "/login"
    | "/forgot-password"
    | "/reset-password"

interface AdminAuthConfig {
    side: AuthSideContent
    header: {
        title: string
        linkHref: string
        linkLabel: string
    }
}

export const adminAuthContent: Record<AdminAuthRoute, AdminAuthConfig> = {
    "/login": {
        side: {
            icon: <ShieldCheck className="h-8 w-8 text-accent-hover" />,
            title: "Admin Portal Access",
            description: "Secure login to manage your RakshaSetu admin dashboard. Monitor platform activity and user management.",
            bullets: [
                "Complete platform oversight",
                "User and merchant management",
                "Advanced analytics and reporting",
            ],
        },
        header: {
            title: "Need help?",
            linkHref: "/forgot-password",
            linkLabel: "Reset Password",
        },
    },
    "/forgot-password": {
        side: {
            icon: <MailCheck className="h-8 w-8 text-accent-hover" />,
            title: "Reset Admin Access",
            description: "We'll send you a secure link to reset your admin password. Your access permissions remain unchanged.",
            bullets: [
                "Secure one-time reset link",
                "No system disruption",
                "24/7 support available",
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
            title: "Reset Admin Password",
            description: "Create a strong new password for your admin account. This link is valid for one-time use only.",
            bullets: [
                "Minimum 12 characters required",
                "Use special characters & numbers",
                "Your admin privileges stay intact",
            ],
        },
        header: {
            title: "",
            linkHref: "/login",
            linkLabel: "Back to Login",
        },
    },
}
