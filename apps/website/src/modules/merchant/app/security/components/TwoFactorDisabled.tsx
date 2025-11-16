import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Info, Shield } from "lucide-react"

interface TwoFactorDisabledProps {
  onSetup: () => void
}

export function TwoFactorDisabled({ onSetup }: TwoFactorDisabledProps) {
  return (
    <Card>
      <CardHeader
        title="Authentication Setup"
        description="Set up two-factor authentication to secure your account"
      />
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Why Enable 2FA?
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Protects against unauthorized access</li>
                <li>• Adds an extra verification step during login</li>
                <li>• Recommended for all payment accounts</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Download App", desc: "Install Google Authenticator" },
              { step: "2", title: "Scan QR Code", desc: "Link your account" },
              { step: "3", title: "Verify OTP", desc: "Complete setup" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-orange-600">{item.step}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={onSetup} size="lg" className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Enable Two-Factor Authentication
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
