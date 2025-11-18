import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { AlertCircle, CheckCircle, Download, RefreshCw } from "lucide-react"
import Image from "next/image"
import { SecretKeyDisplay } from "./SecretKeyDisplay"

interface TwoFactorEnabledProps {
  qrCode: string | null
  secretKey: string
  onDisable: () => void
  onRegenerate: () => void
}

export function TwoFactorEnabled({ qrCode, secretKey, onDisable, onRegenerate }: TwoFactorEnabledProps) {
  return (
    <Card>
      <CardHeader
        title="Authentication Setup"
        description="Manage your two-factor authentication settings"
      />
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-green-900 mb-1">
                Two-Factor Authentication is Active
              </h4>
              <p className="text-sm text-green-700">
                Your account is now protected. Keep your authenticator app accessible for login.
              </p>
            </div>
          </div>

          {/* Current Setup Info */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Current Setup</h4>

              {/* QR Code (smaller) */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  {qrCode && (
                    <Image
                      src={qrCode}
                      alt="2FA QR Code"
                      width={96}
                      height={96}
                      className="rounded-lg"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">
                    Scan this QR code on another device to set up 2FA there as well.
                  </p>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              </div>

              {/* Secret Key */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Secret Key
                </label>
                <SecretKeyDisplay secretKey={secretKey} showLabel={false} />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={onRegenerate}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Secret Key
            </Button>

            <Button
              variant="outline"
              onClick={onDisable}
              className="w-full text-red-600 border-red-300 hover:bg-red-50"
            >
              Disable Two-Factor Authentication
            </Button>
          </div>

          <div className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                Keep Your Authenticator App Safe
              </h4>
              <p className="text-sm text-yellow-700">
                If you lose access to your authenticator app, contact support to regain access to your account.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
