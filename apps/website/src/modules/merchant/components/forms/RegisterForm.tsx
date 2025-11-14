"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { showToast } from "@/lib/toast"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Phone number must be at least 10 digits"),
  businessName: z.string().min(2, "Business name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

type RegisterForm = z.infer<typeof registerSchema>

export default function MerchantRegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terms: false,
    },
  })

  const termsAccepted = watch("terms")

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)

    try {
      // TODO: Replace with actual API call
      const res = await fetch("/api/merchant/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!result.success) {
        showToast("error", {
          title: "Registration failed",
          description: result.message || "Something went wrong",
        })
        return
      }

      // Encode email for verification page
      const token = btoa(data.email)

      showToast("success", {
        title: "Registration successful!",
        description: "Check your email to verify your account",
        duration: 5000,
      })

      router.push(`/verify?token=${token}`)
    } catch (error) {
      showToast("error", {
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Create Your Merchant Account
        </h1>
        <p className="text-muted-foreground">
          Connect your store and start accepting secure payments
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="merchant@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Phone & Business */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="9876543210"
            error={errors.mobile?.message}
            {...register("mobile")}
          />
          <Input
            label="Business Name"
            placeholder="Your Store Name"
            error={errors.businessName?.message}
            {...register("businessName")}
          />
        </div>

        {/* Password */}
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          helperText="Minimum 8 characters"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Terms & Conditions */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => {
              // Manual registration needed for controlled checkbox
              register("terms").onChange({
                target: { value: checked, name: "terms" },
              })
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-accent-hover hover:underline"
                target="_blank"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-accent-hover hover:underline"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-500">{errors.terms.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={!termsAccepted}
        >
          Create Account
        </Button>
      </form>
    </div>
  )
}
