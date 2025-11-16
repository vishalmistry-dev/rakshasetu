import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { CheckCircle, ExternalLink, Info } from "lucide-react"
import Image from "next/image"

export function TwoFactorSidebar() {
  return (
    <div className="space-y-6">
      {/* Google Authenticator Card */}
      <Card>
        <CardHeader title="Google Authenticator" />
        <CardContent>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
              <Image
                src="/assets/logo/google-authenticator.svg"
                alt="Google Authenticator"
                width={60}
                height={60}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Free app that generates secure verification codes
          </p>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open("https://apps.apple.com/app/google-authenticator/id388497605", "_blank")}
            >
              <Image
                src="/assets/content-images/app-store.png"
                alt="App Store"
                width={16}
                height={16}
                className="mr-2"
              />
              Download for iOS
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2", "_blank")}
            >
              <Image
                src="/assets/content-images/playstore.png"
                alt="Play Store"
                width={16}
                height={16}
                className="mr-2"
              />
              Download for Android
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card>
        <CardHeader title="Security Tips" />
        <CardContent>
          <div className="space-y-3 text-sm">
            {[
              "Save your secret key in a secure location",
              "Set up 2FA on multiple devices as backup",
              "Never share your verification codes",
              "Contact support if you lose access",
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent>
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Need Help?
              </h4>
              <p className="text-xs text-blue-700 mb-3">
                Having trouble setting up 2FA? Our support team is here to help.
              </p>
              <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
