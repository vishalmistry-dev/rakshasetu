import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/shared/components/common/Card"
import { AlertCircle, CheckCircle, ShieldCheck } from "lucide-react"

interface TwoFactorStatusBannerProps {
  isEnabled: boolean
}

export function TwoFactorStatusBanner({ isEnabled }: TwoFactorStatusBannerProps) {
  if (isEnabled) {
    return (
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Two-Factor Authentication is Active
              </h3>
              <p className="text-sm text-gray-600">
                Your account is protected with 2FA. You'll need to enter a code from your authenticator app when signing in.
              </p>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
              <CheckCircle className="h-3 w-3 mr-1" />
              Enabled
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Enhance Your Account Security
            </h3>
            <p className="text-sm text-gray-600">
              Enable 2FA to add an extra layer of protection to your merchant account.
            </p>
          </div>
          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
            Optional
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
