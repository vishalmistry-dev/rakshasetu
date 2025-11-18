"use client"

import { useMerchantResetPassword } from "@/modules/merchant/hooks/auth/useMerchantResetPassword"
import { MerchantPasswordResetSchema, MerchantResetPasswordInput } from "@/modules/merchant/validators/auth.validators"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function ResetPasswordForm() {
  const router = useRouter()
  const { token } = useParams()
  const resetPasswordMutation = useMerchantResetPassword(token as string)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MerchantResetPasswordInput>({
    resolver: zodResolver(MerchantPasswordResetSchema),
  })

  const onSubmit = (data: MerchantResetPasswordInput) => {
    resetPasswordMutation.mutate(data)
  }


  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
        <p className="text-muted-foreground">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          error={errors.newPassword?.message}
          {...register("newPassword")}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" className="w-full" loading={resetPasswordMutation.isPending}>
          Reset Password
        </Button>
      </form>
    </div>
  )
}
