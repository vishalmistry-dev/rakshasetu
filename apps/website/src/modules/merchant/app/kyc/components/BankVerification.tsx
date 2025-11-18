"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  AlertCircle,
  Building,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Info,
  Loader2
} from "lucide-react"
import { useEffect, useState } from "react"

interface BankVerificationProps {
  onComplete: () => void
}

export function BankVerification({ onComplete }: BankVerificationProps) {
  const [step, setStep] = useState<"form" | "verifying" | "verified">("form")
  const [formData, setFormData] = useState({
    accountNumber: "",
    confirmAccount: "",
    ifsc: "",
    accountHolder: "",
  })
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (step === "verifying") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setResult({
              accountNumber: "******" + formData.accountNumber.slice(-4),
              ifsc: formData.ifsc,
              bankName: "State Bank of India",
              branch: "Mumbai Main Branch",
              accountHolder: "ABC Industries Pvt Ltd",
              nameMatch: true,
            })
            setStep("verified")
            return 100
          }
          return prev + 10
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [step])

  const handleVerify = () => {
    setStep("verifying")
  }

  const isValid =
    formData.accountNumber &&
    formData.accountNumber === formData.confirmAccount &&
    formData.ifsc.length === 11

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Bank Account Verification"
          description="Add your business bank account for receiving settlements"
        />
        <CardContent>
          {step === "form" && (
            <div className="space-y-6">
              {/* Info Banner */}
              <div className="flex gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <Info className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-orange-900 mb-1">
                    Penny Drop Verification
                  </h4>
                  <p className="text-sm text-orange-700">
                    We'll deposit ₹1 to verify your account. This amount will be refunded immediately. The process takes 10-30 seconds.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="max-w-md space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Bank Account Number
                  </label>
                  <Input
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, accountNumber: e.target.value })
                    }
                    className="text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Confirm Account Number
                  </label>
                  <Input
                    placeholder="Re-enter account number"
                    value={formData.confirmAccount}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmAccount: e.target.value })
                    }
                    className="text-base"
                  />
                  {formData.confirmAccount &&
                    formData.accountNumber !== formData.confirmAccount && (
                      <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Account numbers do not match
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    IFSC Code
                  </label>
                  <Input
                    placeholder="SBIN0001234"
                    value={formData.ifsc}
                    onChange={(e) =>
                      setFormData({ ...formData, ifsc: e.target.value.toUpperCase() })
                    }
                    maxLength={11}
                    className="text-base uppercase"
                  />
                  {formData.ifsc.length === 11 && (
                    <div className="mt-2 flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                      <Building className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-blue-700">
                        <p className="font-medium">State Bank of India</p>
                        <p>Mumbai Main Branch</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Account Holder Name (Optional)
                  </label>
                  <Input
                    placeholder="As per bank records"
                    value={formData.accountHolder}
                    onChange={(e) =>
                      setFormData({ ...formData, accountHolder: e.target.value })
                    }
                    className="text-base"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Helps in faster name matching verification
                  </p>
                </div>

                <Button
                  onClick={handleVerify}
                  disabled={!isValid}
                  size="lg"
                  className="w-full"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Verify Bank Account
                </Button>
              </div>

              {/* Security Note */}
              <div className="pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Bank Grade Security</h4>
                      <p className="text-xs text-gray-600">256-bit SSL encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">RBI Compliant</h4>
                      <p className="text-xs text-gray-600">Secure verification process</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "verifying" && (
            <div className="py-12">
              <div className="max-w-md mx-auto text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-4">
                  <Loader2 className="h-10 w-10 text-orange-600 animate-spin" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Verifying Your Bank Account
                  </h3>
                  <p className="text-sm text-gray-600">
                    Please wait while we process the penny drop verification
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    {progress}% Complete - This usually takes 10-30 seconds
                  </p>
                </div>

                {/* Status Steps */}
                <div className="text-left space-y-3 pt-4">
                  <div className="flex items-center gap-3">
                    {progress >= 30 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                    )}
                    <span className={`text-sm ${progress >= 30 ? "text-gray-900" : "text-gray-500"}`}>
                      Initiating penny drop...
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {progress >= 60 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                    )}
                    <span className={`text-sm ${progress >= 60 ? "text-gray-900" : "text-gray-500"}`}>
                      Verifying with bank...
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {progress >= 100 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                    )}
                    <span className={`text-sm ${progress >= 100 ? "text-gray-900" : "text-gray-500"}`}>
                      Completing verification...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "verified" && result && (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="flex items-start gap-4 p-6 bg-green-50 border-2 border-green-500 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    Bank Account Verified!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your bank account has been successfully verified and is ready for settlements
                  </p>
                </div>
              </div>

              {/* Verified Details */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Account Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Account Number</span>
                      <span className="text-sm font-semibold text-gray-900">{result.accountNumber}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">IFSC Code</span>
                      <span className="text-sm font-semibold text-gray-900">{result.ifsc}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Bank Name</span>
                      <span className="text-sm font-semibold text-gray-900">{result.bankName}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Branch</span>
                      <span className="text-sm font-semibold text-gray-900">{result.branch}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Account Holder</span>
                      <span className="text-sm font-semibold text-gray-900">{result.accountHolder}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Name Match</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Warning */}
              <div className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                    Important Notice
                  </h4>
                  <p className="text-sm text-yellow-700">
                    This bank account will be used for all settlements. It cannot be changed for security reasons.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Button onClick={onComplete} size="lg" className="w-full">
                Complete KYC Verification
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
