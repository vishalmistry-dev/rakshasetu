"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useMerchantLogin } from "@/modules/merchant/hooks/auth/useMerchantLogin"
import { MerchantLoginInput, MerchantLoginSchema } from "@/modules/merchant/validators/auth.validators"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyRound, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function MerchantLoginForm() {

  const loginMutation = useMerchantLogin()

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [requires2FA, setRequires2FA] = useState(false)
  const [otp, setOtp] = useState("")
  const [merchantId, setMerchantId] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MerchantLoginInput>({
    resolver: zodResolver(MerchantLoginSchema),
  })

  const onSubmit = async (data: MerchantLoginInput) => {
    loginMutation.mutate(data)
  }

  const handleOtpVerify = async () => {
    setLoading(true)
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

          <Button type="submit" className="w-full" loading={loginMutation.isPending}>
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
