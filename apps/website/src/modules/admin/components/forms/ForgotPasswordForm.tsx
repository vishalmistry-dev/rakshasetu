"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import React, { useState } from "react"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // TODO: Implement your forgot password logic
    console.log({ email })

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1000)
  }

  if (success) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Check Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a password reset link to <strong>{email}</strong>
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@rakshasetu.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  )
}
