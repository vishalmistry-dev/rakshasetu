"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  CheckCircle,
  ChevronRight,
  Clock,
  ExternalLink,
  Info,
  Key,
  Loader2,
  Shield
} from "lucide-react"
import { useState } from "react"

interface AadhaarVerificationProps {
  onComplete: () => void
}

export function AadhaarVerification({ onComplete }: AadhaarVerificationProps) {
  const [method, setMethod] = useState<"digilocker" | "otp" | null>(null)
  const [step, setStep] = useState<"select" | "otp" | "verified">("select")
  const [aadhaar, setAadhaar] = useState("")
  const [otp, setOtp] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [verified, setVerified] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleDigiLocker = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setResult({
        name: "Vishal Mistry",
        maskedAadhaar: "XXXX-XXXX-1234",
        dob: "15/03/1995",
        method: "DigiLocker",
      })
      setVerified(true)
      setStep("verified")
      setIsProcessing(false)
    }, 2000)
  }

  const handleSendOTP = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setStep("otp")
      setIsProcessing(false)
    }, 1500)
  }

  const handleVerifyOTP = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setResult({
        name: "Vishal Mistry",
        maskedAadhaar: "XXXX-XXXX-" + aadhaar.slice(-4),
        dob: "15/03/1995",
        method: "OTP Verification",
      })
      setVerified(true)
      setStep("verified")
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Aadhaar Verification"
          description="Verify your identity with Aadhaar for KYC compliance"
        />
        <CardContent>
          {step === "select" && (
            <div className="space-y-6">
              {/* Info Banner */}
              <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Secure Identity Verification
                  </h4>
                  <p className="text-sm text-blue-700">
                    Aadhaar verification is required as per RBI's KYC norms for payment service providers. Your data is encrypted and secure.
                  </p>
                </div>
              </div>

              {/* Method Selection */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Choose Verification Method</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* DigiLocker */}
                  <button
                    onClick={() => setMethod("digilocker")}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${method === "digilocker"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                      }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Recommended
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">DigiLocker</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Instant verification via government portal
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Fastest method (2 minutes)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Government verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>No data entry required</span>
                      </div>
                    </div>
                  </button>

                  {/* OTP */}
                  <button
                    onClick={() => setMethod("otp")}
                    className={`p-6 border-2 rounded-xl text-left transition-all ${method === "otp"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/50"
                      }`}
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <Key className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">OTP Verification</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Verify using Aadhaar-linked mobile number
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Manual verification</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>OTP to registered mobile</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="h-3 w-3 text-orange-600" />
                        <span>Takes 5-10 minutes</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* DigiLocker Flow */}
              {method === "digilocker" && (
                <div className="space-y-4 p-6 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-purple-900 mb-2">
                        What happens next?
                      </h4>
                      <ol className="space-y-2 text-sm text-purple-700">
                        <li className="flex gap-2">
                          <span className="font-semibold">1.</span>
                          <span>You'll be redirected to DigiLocker website</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold">2.</span>
                          <span>Login with your Aadhaar number</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold">3.</span>
                          <span>Grant permission to access your Aadhaar</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-semibold">4.</span>
                          <span>You'll be redirected back automatically</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                  <Button
                    onClick={handleDigiLocker}
                    disabled={isProcessing}
                    size="lg"
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Connecting to DigiLocker...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Continue with DigiLocker
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* OTP Flow - Step 1 */}
              {method === "otp" && (
                <div className="space-y-4">
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Aadhaar Number
                      </label>
                      <Input
                        placeholder="XXXX XXXX XXXX"
                        value={aadhaar}
                        onChange={(e) => setAadhaar(e.target.value.replace(/\s/g, ""))}
                        maxLength={12}
                        disabled={isProcessing}
                        className="text-base"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        OTP will be sent to your Aadhaar-linked mobile number
                      </p>
                    </div>

                    <Button
                      onClick={handleSendOTP}
                      disabled={aadhaar.length !== 12 || isProcessing}
                      size="lg"
                      className="w-full"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <Key className="h-4 w-4 mr-2" />
                          Send OTP
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OTP Step 2 */}
          {step === "otp" && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-green-900 mb-1">
                    OTP Sent Successfully
                  </h4>
                  <p className="text-sm text-green-700">
                    Please check your Aadhaar-linked mobile number
                  </p>
                </div>
              </div>

              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Enter OTP
                  </label>
                  <Input
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    disabled={isProcessing}
                    className="text-base text-center tracking-widest"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      Valid for 10 minutes
                    </p>
                    <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">
                      Resend OTP
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || isProcessing}
                  size="lg"
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying OTP...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Verified State */}
          {step === "verified" && verified && (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="flex items-start gap-4 p-6 bg-green-50 border-2 border-green-500 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    Aadhaar Verified Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your identity has been verified via {result.method}
                  </p>
                </div>
              </div>

              {/* Verified Details */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Verified Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Name as per Aadhaar</span>
                      <span className="text-sm font-semibold text-gray-900">{result.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Aadhaar Number</span>
                      <span className="text-sm font-semibold text-gray-900">{result.maskedAadhaar}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Date of Birth</span>
                      <span className="text-sm font-semibold text-gray-900">{result.dob}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Verification Method</span>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {result.method}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button onClick={onComplete} size="lg" className="w-full">
                Continue to Bank Verification
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
