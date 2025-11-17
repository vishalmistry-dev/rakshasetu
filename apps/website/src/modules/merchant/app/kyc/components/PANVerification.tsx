"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { CheckCircle, ChevronRight, ExternalLink, FileText, Info, Loader2, Shield } from "lucide-react"
import { useState } from "react"

interface PANVerificationProps {
  onComplete: () => void
}

export function PANVerification({ onComplete }: PANVerificationProps) {
  const [method, setMethod] = useState<"digilocker" | "manual" | null>(null)
  const [pan, setPan] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleDigiLocker = () => {
    setIsVerifying(true)

    // Demo: Simulate DigiLocker verification
    setTimeout(() => {
      setResult({
        pan: "ABCDE1234F",
        name: "ABC Industries Pvt Ltd",
        category: "Company",
        status: "Valid",
        method: "DigiLocker",
      })
      setVerified(true)
      setIsVerifying(false)
    }, 2000)
  }

  const handleManualVerify = async () => {
    setIsVerifying(true)

    // Demo: Simulate API call
    setTimeout(() => {
      setResult({
        pan: pan.toUpperCase(),
        name: "ABC Industries Pvt Ltd",
        category: "Company",
        status: "Valid",
        method: "Manual Verification",
      })
      setVerified(true)
      setIsVerifying(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="PAN Verification"
          description="Verify your Permanent Account Number with the Income Tax Department"
        />
        <CardContent>
          {!verified ? (
            <div className="space-y-6">
              {/* Info Banner */}
              <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Why do we need your PAN?
                  </h4>
                  <p className="text-sm text-blue-700">
                    PAN verification is mandatory as per RBI guidelines for all payment service providers. This is a one-time verification that cannot be changed later.
                  </p>
                </div>
              </div>

              {/* Method Selection */}
              {!method && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Choose Verification Method</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* DigiLocker */}
                    <button
                      onClick={() => setMethod("digilocker")}
                      className="p-6 border-2 border-purple-500 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all text-left group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
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
                          <span>Fastest method (1 minute)</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>Government verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>Most secure option</span>
                        </div>
                      </div>
                    </button>

                    {/* Manual */}
                    <button
                      onClick={() => setMethod("manual")}
                      className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50/50 transition-all text-left group"
                    >
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Manual Entry</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Enter PAN details manually
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>Simple process</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>Verified with IT Dept</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>Takes 2-3 minutes</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* DigiLocker Flow */}
              {method === "digilocker" && (
                <div className="space-y-4">
                  <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
                    <div className="flex items-start gap-3 mb-4">
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
                            <span>Login with your Aadhaar or mobile number</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="font-semibold">3.</span>
                            <span>Grant permission to access your PAN</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="font-semibold">4.</span>
                            <span>You'll be redirected back automatically</span>
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setMethod(null)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleDigiLocker}
                        disabled={isVerifying}
                        className="flex-1"
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Continue with DigiLocker
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Manual Form */}
              {method === "manual" && (
                <div className="space-y-4">
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        PAN Number
                      </label>
                      <Input
                        placeholder="ABCDE1234F"
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        maxLength={10}
                        disabled={isVerifying}
                        className="text-base"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setMethod(null)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleManualVerify}
                        disabled={pan.length !== 10 || isVerifying}
                        className="flex-1"
                      >
                        {isVerifying ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 mr-2" />
                            Verify PAN
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Features - Only show when no method selected */}
              {!method && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Instant</h4>
                      <p className="text-xs text-gray-600">Verified in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Secure</h4>
                      <p className="text-xs text-gray-600">Government verified</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">One-time</h4>
                      <p className="text-xs text-gray-600">Verify once only</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="flex items-start gap-4 p-6 bg-green-50 border-2 border-green-500 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    PAN Verified Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your PAN details have been verified with the Income Tax Department via {result.method}
                  </p>
                </div>
              </div>

              {/* Verified Details */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Verified Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">PAN Number</span>
                      <span className="text-sm font-semibold text-gray-900">{result.pan}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Name as per PAN</span>
                      <span className="text-sm font-semibold text-gray-900">{result.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Category</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {result.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Warning */}
              <div className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                    Important Notice
                  </h4>
                  <p className="text-sm text-yellow-700">
                    This PAN cannot be changed once you proceed to the next step. Please ensure the details are correct.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Button onClick={onComplete} size="lg" className="w-full">
                Continue to Aadhaar Verification
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
