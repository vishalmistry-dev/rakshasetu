"use client"

import { useState } from "react"
import { TwoFactorDisabled } from "./components/TwoFactorDisabled"
import { TwoFactorEnabled } from "./components/TwoFactorEnabled"
import { TwoFactorSetup } from "./components/TwoFactorSetup"
import { TwoFactorSidebar } from "./components/TwoFactorSidebar"
import { TwoFactorStatusBanner } from "./components/TwoFactorStatusBanner"

type TwoFactorStep = "disabled" | "setup" | "verify" | "enabled"

export default function TwoFactorAuth() {
  const [step, setStep] = useState<TwoFactorStep>("disabled")
  const [isEnabled, setIsEnabled] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secretKey, setSecretKey] = useState("JBSWY3DPEHPK3PXP")

  const handleSetup = () => {
    setStep("setup")
    // API call to generate QR code
    setQrCode("/api/placeholder-qr")
  }

  const handleVerifySuccess = () => {
    setIsEnabled(true)
    setStep("enabled")
  }

  const handleDisable = () => {
    setIsEnabled(false)
    setStep("disabled")
  }

  const handleRegenerate = () => {
    setStep("setup")
    // API call to regenerate
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Two-Factor Authentication</h1>
        <p className="text-gray-600 mt-2">
          Add an extra layer of security to your merchant account
        </p>
      </div>

      {/* Status Banner */}
      <TwoFactorStatusBanner isEnabled={isEnabled} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === "disabled" && (
            <TwoFactorDisabled onSetup={handleSetup} />
          )}

          {(step === "setup" || step === "verify") && (
            <TwoFactorSetup
              qrCode={qrCode}
              secretKey={secretKey}
              onVerifySuccess={handleVerifySuccess}
              onCancel={() => setStep("disabled")}
            />
          )}

          {step === "enabled" && (
            <TwoFactorEnabled
              qrCode={qrCode}
              secretKey={secretKey}
              onDisable={handleDisable}
              onRegenerate={handleRegenerate}
            />
          )}
        </div>

        {/* Sidebar */}
        <TwoFactorSidebar />
      </div>
    </div>
  )
}
