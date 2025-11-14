"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { showToast } from "@/lib/toast"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginForm = z.infer<typeof loginSchema>

export default function MerchantLoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [requires2FA, setRequires2FA] = useState(false)
  const [otp, setOtp] = useState("")
  const [merchantId, setMerchantId] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      const res = await fetch("/api/merchant/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!result.success) {
        showToast("error", {
          title: "Login failed",
          description: result.message || "Invalid credentials",
        })
        return
      }

      // Check if 2FA required
      if (result.data?.requires2FA) {
        setRequires2FA(true)
        setMerchantId(result.data.merchantId)
        showToast("info", {
          title: "OTP Required",
          description: "Enter the code from your authenticator app",
        })
        return
      }

      // Success - redirect to dashboard
      showToast("success", {
        title: "Welcome back!",
        description: "Redirecting to your dashboard...",
      })
      router.push("/dashboard")
    } catch (error) {
      showToast("error", {
        title: "Login error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOtpVerify = async () => {
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      const res = await fetch("/api/merchant/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchantId, otp }),
      })

      const result = await res.json()

      if (!result.success) {
        showToast("error", {
          title: "Invalid OTP",
          description: "Please check your code and try again",
        })
        return
      }

      showToast("success", {
        title: "Verified!",
        description: "Redirecting to dashboard...",
      })
      router.push("/")
    } catch (error) {
      showToast("error", {
        title: "Verification error",
        description: "Something went wrong",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your merchant dashboard
        </p>
      </div>

      {/* Login Form */}
      {!requires2FA ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            leftIcon={<Mail />}
            placeholder="merchant@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            leftIcon={<KeyRound />}
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-normal cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-accent-hover hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" loading={loading}>
            Sign In
          </Button>
        </form>
      ) : (
        // OTP Form
        <div className="space-y-4">
          <Input
            label="Enter OTP"
            type="text"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
          />

          <Button
            type="button"
            onClick={handleOtpVerify}
            className="w-full"
            loading={loading}
            disabled={otp.length !== 6}
          >
            Verify OTP
          </Button>

          <button
            type="button"
            onClick={() => setRequires2FA(false)}
            className="text-sm text-accent-hover hover:underline w-full text-center"
          >
            ← Back to login
          </button>
        </div>
      )}
    </div>
  )
}
