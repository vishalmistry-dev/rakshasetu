"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import {
  Building2,
  Calendar,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Download,
  FileText,
  Info,
  Shield
} from "lucide-react"
import { useState } from "react"
import { AadhaarVerification } from "./components/AadhaarVerification"
import { BankVerification } from "./components/BankVerification"
import { GSTVerification } from "./components/GSTVerification"
import { PANVerification } from "./components/PANVerification"

type VerificationStep = "pan" | "aadhaar" | "bank" | "gst"
type StepStatus = "pending" | "current" | "completed" | "skipped"

const verificationSteps = [
  {
    id: "pan",
    title: "PAN Verification",
    description: "Verify your Permanent Account Number",
    icon: FileText,
    required: true,
  },
  {
    id: "aadhaar",
    title: "Aadhaar KYC",
    description: "Complete identity verification",
    icon: Shield,
    required: true,
  },
  {
    id: "bank",
    title: "Bank Account",
    description: "Add account for settlements",
    icon: CreditCard,
    required: true,
  },
  {
    id: "gst",
    title: "GST Registration",
    description: "Verify your business GST number (Optional)",
    icon: Building2,
    required: false,
  },
]

// Demo: Set this to true to see the "Already Verified" state
const DEMO_ALREADY_VERIFIED = false

// Mock verified data
const mockVerifiedData = {
  pan: {
    number: "ABCDE1234F",
    name: "ABC Industries Pvt Ltd",
    category: "Company",
    verifiedAt: "2024-11-15T10:30:00Z",
  },
  aadhaar: {
    maskedNumber: "XXXX-XXXX-1234",
    name: "Vishal Mistry",
    dob: "15/03/1995",
    method: "DigiLocker",
    verifiedAt: "2024-11-15T10:35:00Z",
  },
  bank: {
    maskedAccount: "******4567",
    ifsc: "SBIN0001234",
    bankName: "State Bank of India",
    branch: "Mumbai Main Branch",
    accountHolder: "ABC Industries Pvt Ltd",
    verifiedAt: "2024-11-15T10:40:00Z",
  },
  gst: {
    gstin: "27ABCDE1234F1Z5",
    legalName: "ABC Industries Private Limited",
    tradeName: "ABC Industries",
    state: "Maharashtra",
    verifiedAt: "2024-11-15T10:45:00Z",
  },
  completedAt: "2024-11-15T10:45:00Z",
  gstSkipped: false,
}

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>("pan")
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({
    pan: "current",
    aadhaar: "pending",
    bank: "pending",
    gst: "pending",
  })
  const [isComplete, setIsComplete] = useState(DEMO_ALREADY_VERIFIED)
  const [isAddingGST, setIsAddingGST] = useState(false)

  const handleStepComplete = (step: VerificationStep) => {
    const newStatuses = { ...stepStatuses, [step]: "completed" as StepStatus }

    // Move to next step
    const currentIndex = verificationSteps.findIndex(s => s.id === step)
    if (currentIndex < verificationSteps.length - 1) {
      const nextStep = verificationSteps[currentIndex + 1].id as VerificationStep
      newStatuses[nextStep] = "current"
      setCurrentStep(nextStep)
    } else {
      setIsComplete(true)
    }

    setStepStatuses(newStatuses)
  }

  const handleSkipGST = () => {
    setStepStatuses({ ...stepStatuses, gst: "skipped" })
    setIsComplete(true)
  }

  const handleAddGSTLater = () => {
    setIsAddingGST(true)
    setCurrentStep("gst")
    setStepStatuses({ ...stepStatuses, gst: "current" })
  }

  const handleGSTComplete = () => {
    setStepStatuses({ ...stepStatuses, gst: "completed" })
    setIsAddingGST(false)
    // Refresh the page to show updated verified state
    window.location.reload()
  }

  const handleCancelAddGST = () => {
    setIsAddingGST(false)
    setStepStatuses({ ...stepStatuses, gst: "skipped" })
  }

  // Calculate progress (GST is optional, so only count required steps)
  const requiredSteps = verificationSteps.filter(s => s.required)
  const completedRequiredSteps = requiredSteps.filter(s => stepStatuses[s.id] === "completed").length
  const progress = (completedRequiredSteps / requiredSteps.length) * 100

  // If adding GST later
  if (isAddingGST) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add GST Verification</h1>
            <p className="text-gray-600 mt-2">
              Complete your GST verification to enable GST invoicing
            </p>
          </div>
          <Button variant="outline" onClick={handleCancelAddGST}>
            Cancel
          </Button>
        </div>

        {/* Info Banner */}
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              Your KYC is Already Complete
            </h4>
            <p className="text-sm text-blue-700">
              Adding GST is optional. Your merchant account is already active. GST verification will enable you to generate GST-compliant invoices.
            </p>
          </div>
        </div>

        {/* GST Verification Component */}
        <GSTVerification
          onComplete={handleGSTComplete}
          onSkip={handleCancelAddGST}
        />
      </div>
    )
  }

  // Already Verified State
  if (isComplete) {
    const hasGST = stepStatuses.gst === "completed"

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
            <p className="text-gray-600 mt-2">
              Your account is fully verified and active
            </p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            <span className="font-semibold">Fully Verified</span>
          </Badge>
        </div>

        {/* Success Banner */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Your KYC is Complete! 🎉
                </h2>
                <p className="text-gray-600 mb-4">
                  All required verification steps have been completed successfully. Your merchant account is now fully active and ready to accept payments.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Verified on {new Date(mockVerifiedData.completedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Optional GST Banner - Show if GST not added */}
        {!hasGST && (
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add GST for Better Experience
                    </h3>
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                      Optional
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Adding your GST details will enable you to generate GST-compliant invoices and streamline your business operations.
                  </p>
                  <div className="flex items-center gap-3">
                    <Button onClick={handleAddGSTLater}>
                      <Building2 className="h-4 w-4 mr-2" />
                      Add GST Details Now
                    </Button>
                    <Button variant="ghost" className="text-gray-600">
                      Maybe Later
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Verification Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PAN Card */}
          <Card>
            <CardHeader
              title="PAN Verification"
              action={
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              }
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">PAN Number</p>
                    <p className="font-semibold text-gray-900">{mockVerifiedData.pan.number}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Name</span>
                    <span className="text-gray-900 font-medium">{mockVerifiedData.pan.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Category</span>
                    <span className="text-gray-900 font-medium">{mockVerifiedData.pan.category}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Verified on</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(mockVerifiedData.pan.verifiedAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aadhaar Card */}
          <Card>
            <CardHeader
              title="Aadhaar KYC"
              action={
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              }
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aadhaar Number</p>
                    <p className="font-semibold text-gray-900">{mockVerifiedData.aadhaar.maskedNumber}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Name</span>
                    <span className="text-gray-900 font-medium">{mockVerifiedData.aadhaar.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Method</span>
                    <span className="text-gray-900 font-medium">{mockVerifiedData.aadhaar.method}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Verified on</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(mockVerifiedData.aadhaar.verifiedAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Card */}
          <Card>
            <CardHeader
              title="Bank Account"
              action={
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              }
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="font-semibold text-gray-900">{mockVerifiedData.bank.maskedAccount}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bank</span>
                    <span className="text-gray-900 font-medium text-right">{mockVerifiedData.bank.bankName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">IFSC</span>
                    <span className="text-gray-900 font-medium">{mockVerifiedData.bank.ifsc}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Verified on</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(mockVerifiedData.bank.verifiedAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GST Card */}
          {hasGST ? (
            <Card>
              <CardHeader
                title="GST Registration"
                action={
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                }
              />
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GSTIN</p>
                      <p className="font-semibold text-gray-900">{mockVerifiedData.gst.gstin}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Legal Name</span>
                      <span className="text-gray-900 font-medium text-right">{mockVerifiedData.gst.legalName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">State</span>
                      <span className="text-gray-900 font-medium">{mockVerifiedData.gst.state}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Verified on</span>
                      <span className="text-gray-900 font-medium">
                        {new Date(mockVerifiedData.gst.verifiedAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-gray-200">
              <CardHeader
                title="GST Registration"
                action={
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                    Optional - Not Added
                  </Badge>
                }
              />
              <CardContent>
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Building2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    GST Not Added
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Add GST to enable compliant invoicing
                  </p>
                  <Button variant="outline" size="sm" onClick={handleAddGSTLater}>
                    <Building2 className="h-4 w-4 mr-2" />
                    Add GST Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Need to update your KYC details?</h3>
                <p className="text-sm text-gray-600">
                  Contact our support team for assistance with KYC modifications
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download KYC Certificate
                </Button>
                <Button variant="outline">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              Annual KYC Review
            </h4>
            <p className="text-sm text-blue-700">
              As per RBI guidelines, your KYC details will be reviewed annually. We'll notify you when it's time for renewal.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=" space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Complete Your KYC</h1>
        <p className="text-gray-600 mt-2">
          Verify your identity and business details to start accepting payments
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Verification Progress
              </h2>
              <p className="text-sm text-gray-600">
                {completedRequiredSteps} of {requiredSteps.length} required steps completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-orange-600">
                {Math.round(progress)}%
              </div>
              <p className="text-xs text-gray-500 mt-1">Essential KYC</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar - Steps */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader
              title="Verification Steps"
              description="Complete required steps to activate"
            />
            <CardContent>
              <div className="space-y-2">
                {verificationSteps.map((step, index) => {
                  const Icon = step.icon
                  const status = stepStatuses[step.id]
                  const isCompleted = status === "completed"
                  const isCurrent = status === "current"
                  const isSkipped = status === "skipped"

                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        if (isCompleted) {
                          setCurrentStep(step.id as VerificationStep)
                        }
                      }}
                      disabled={status === "pending"}
                      className={`w-full flex items-start gap-3 p-4 rounded-lg transition-all text-left ${isCurrent
                        ? "bg-orange-50 border-2 border-orange-500 shadow-sm"
                        : isCompleted
                          ? "bg-green-50 border-2 border-green-500 hover:shadow-sm cursor-pointer"
                          : isSkipped
                            ? "bg-gray-50 border-2 border-gray-300"
                            : "bg-gray-50 border-2 border-gray-200 opacity-60 cursor-not-allowed"
                        }`}
                    >
                      {/* Step Number / Status Icon */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                          ? "bg-orange-500 text-white"
                          : isSkipped
                            ? "bg-gray-400 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`h-4 w-4 flex-shrink-0 ${isCompleted ? "text-green-600" : isCurrent ? "text-orange-600" : "text-gray-400"
                            }`} />
                          <h3 className={`font-semibold text-sm ${isCompleted ? "text-green-900" : isCurrent ? "text-orange-900" : "text-gray-600"
                            }`}>
                            {step.title}
                          </h3>
                          {!step.required && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300 text-xs">
                              Optional
                            </Badge>
                          )}
                        </div>
                        <p className={`text-xs ${isCompleted ? "text-green-600" : isCurrent ? "text-orange-600" : "text-gray-500"
                          }`}>
                          {isCompleted ? "Completed" : isSkipped ? "Skipped" : isCurrent ? "In Progress" : "Pending"}
                        </p>
                      </div>

                      {isCurrent && (
                        <ChevronRight className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Help Card */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">
                      Need Help?
                    </h4>
                    <p className="text-xs text-blue-700 mb-2">
                      Our support team is here to assist you with the verification process.
                    </p>
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Current Step */}
        <div className="lg:col-span-2">
          {currentStep === "pan" && <PANVerification onComplete={() => handleStepComplete("pan")} />}
          {currentStep === "aadhaar" && <AadhaarVerification onComplete={() => handleStepComplete("aadhaar")} />}
          {currentStep === "bank" && <BankVerification onComplete={() => handleStepComplete("bank")} />}
          {currentStep === "gst" && <GSTVerification onComplete={() => handleStepComplete("gst")} onSkip={handleSkipGST} />}
        </div>
      </div>
    </div>
  )
}
