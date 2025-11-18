"use client"

import { useMerchantForgotPassword } from "@/modules/merchant/hooks/auth/useMerchantForgotPassword"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
})

type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordForm() {
  const [successEmail, setSuccessEmail] = useState<string | null>(null)
  const forgotPasswordMutation = useMerchantForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => setSuccessEmail(data.email),
    })
  }

  if (successEmail) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Check Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a password reset link to <strong>{successEmail}</strong>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Forgot Password?</h1>
        <p className="text-muted-foreground">
          No worries, we'll send you reset instructions
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="merchant@example.com"
          leftIcon={<Mail />}
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" className="w-full" loading={forgotPasswordMutation.isPending}>
          {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  )
}
