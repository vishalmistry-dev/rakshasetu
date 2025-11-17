"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  AlertCircle,
  Building2,
  CheckCircle,
  ChevronRight,
  Info,
  Loader2,
  MapPin,
  Search,
  X
} from "lucide-react"
import { useState } from "react"

interface GSTVerificationProps {
  onComplete: () => void
  onSkip: () => void
}

const mockGSTResults = [
  {
    gstin: "27ABCDE1234F1Z5",
    legalName: "ABC Industries Private Limited",
    tradeName: "ABC Industries",
    state: "Maharashtra",
    status: "Active",
    registrationDate: "15/01/2020",
    address: "Plot 123, Sector 5, Industrial Area, Andheri East, Mumbai - 400069",
  },
  {
    gstin: "09ABCDE1234F1Z5",
    legalName: "ABC Trading Company",
    tradeName: "ABC Trading Co",
    state: "Delhi",
    status: "Active",
    registrationDate: "20/03/2021",
    address: "Unit 45, Okhla Phase 2, New Delhi - 110020",
  },
]

export function GSTVerification({ onComplete, onSkip }: GSTVerificationProps) {
  const [step, setStep] = useState<"search" | "select" | "verified">("search")
  const [pan, setPan] = useState("ABCDE1234F")
  const [results, setResults] = useState<any[]>([])
  const [selectedGSTIN, setSelectedGSTIN] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setResults(mockGSTResults)
      setStep("select")
      setIsSearching(false)
    }, 1500)
  }

  const handleSelect = (gst: any) => {
    setSelectedGSTIN(gst)
    setStep("verified")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="GST Verification (Optional)"
          description="Verify your business GST registration number"
          action={
            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-300">
              Optional
            </Badge>
          }
        />
        <CardContent>
          {step === "search" && (
            <div className="space-y-6">
              {/* Info Banner */}
              <div className="flex gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-purple-900 mb-1">
                    GST is Optional
                  </h4>
                  <p className="text-sm text-purple-700">
                    You can skip GST verification if you don't have GST registration. You can add it later from your account settings.
                  </p>
                </div>
              </div>

              {/* Optional Notice */}
              <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    Multiple GST Registrations?
                  </h4>
                  <p className="text-sm text-blue-700">
                    We'll fetch all GST registrations linked to your PAN. You can select the one you want to use for this merchant account.
                  </p>
                </div>
              </div>

              {/* Search Form */}
              <div className="max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Search by PAN Number
                  </label>
                  <Input
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    disabled={isSearching}
                    className="text-base"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the PAN linked to your GST registration
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onSkip}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Skip for Now
                  </Button>
                  <Button
                    onClick={handleSearch}
                    disabled={pan.length !== 10 || isSearching}
                    className="flex-1"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search GST
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* What happens next */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">What happens next?</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-orange-600">
                      1
                    </div>
                    <p className="text-sm text-gray-600 pt-0.5">
                      We'll fetch all GST numbers linked to your PAN
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-orange-600">
                      2
                    </div>
                    <p className="text-sm text-gray-600 pt-0.5">
                      Select the GST number you want to use
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-orange-600">
                      3
                    </div>
                    <p className="text-sm text-gray-600 pt-0.5">
                      We'll verify the details with GSTN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "select" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">
                    Found {results.length} GST Registration(s)
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("search")}
                  className="text-blue-700 border-blue-300"
                >
                  Search Again
                </Button>
              </div>

              {/* GST Options */}
              <div className="space-y-4">
                {results.map((gst) => (
                  <button
                    key={gst.gstin}
                    onClick={() => handleSelect(gst)}
                    className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all text-left group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <Building2 className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-base">
                              {gst.legalName}
                            </h3>
                            <p className="text-sm text-gray-600">{gst.tradeName}</p>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">GSTIN</p>
                        <p className="text-sm font-medium text-gray-900">{gst.gstin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Registration Date</p>
                        <p className="text-sm font-medium text-gray-900">{gst.registrationDate}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{gst.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {gst.state}
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {gst.status}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>

              {/* Skip Option */}
              <div className="flex items-center justify-center pt-4 border-t">
                <Button variant="ghost" onClick={onSkip}>
                  Skip GST Verification
                </Button>
              </div>
            </div>
          )}

          {step === "verified" && selectedGSTIN && (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="flex items-start gap-4 p-6 bg-green-50 border-2 border-green-500 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-1">
                    GST Verified Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your GST registration has been verified with the GSTN portal
                  </p>
                </div>
              </div>

              {/* Verified Details */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Business Details</h4>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Legal Name</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedGSTIN.legalName}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Trade Name</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedGSTIN.tradeName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">GSTIN</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedGSTIN.gstin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">State</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedGSTIN.state}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Registration Date</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedGSTIN.registrationDate}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-2">Business Address</p>
                      <div className="flex gap-2 p-3 bg-white border border-gray-200 rounded-lg">
                        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{selectedGSTIN.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {selectedGSTIN.status}
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
                    This GSTIN will be used for all invoices and compliance. It cannot be changed later.
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
