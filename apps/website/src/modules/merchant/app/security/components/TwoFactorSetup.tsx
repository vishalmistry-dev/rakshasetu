import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Smartphone } from "lucide-react"
import { useState } from "react"
import { QRCodeDisplay } from "./QRCodeDisplay"
import { SecretKeyDisplay } from "./SecretKeyDisplay"

interface TwoFactorSetupProps {
  qrCode: string | null
  secretKey: string
  onVerifySuccess: () => void
  onCancel: () => void
}

export function TwoFactorSetup({ qrCode, secretKey, onVerifySuccess, onCancel }: TwoFactorSetupProps) {
  const [otp, setOtp] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleVerify = async () => {
    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      if (otp === "123456") {
        onVerifySuccess()
      }
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader
        title="Authentication Setup"
        description="Follow the steps below to complete setup"
      />
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <Smartphone className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">
                Scan QR Code with Authenticator App
              </h4>
              <p className="text-sm text-purple-700">
                Open Google Authenticator and scan the QR code below, or manually enter the secret key.
              </p>
            </div>
          </div>

          <QRCodeDisplay qrCode={qrCode} />

          <SecretKeyDisplay secretKey={secretKey} />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Enter Verification Code
            </label>
            <Input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className="text-center text-2xl tracking-widest font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerify}
              disabled={otp.length !== 6 || isProcessing}
              className="flex-1"
            >
              {isProcessing ? "Verifying..." : "Verify & Enable"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
