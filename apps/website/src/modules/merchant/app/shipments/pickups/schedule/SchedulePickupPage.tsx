"use client"

import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import { Textarea } from "@/shared/components/form/Textarea"
import {
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

export default function SchedulePickupPage() {
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupTime: "",
    courier: "",
    packageCount: "",
    totalWeight: "",
    pickupAddress: "",
    contactPerson: "",
    contactPhone: "",
    instructions: "",
  })

  const [step, setStep] = useState(1)

  const courierOptions = [
    { value: "bluedart", label: "BlueDart" },
    { value: "delhivery", label: "Delhivery" },
    { value: "dtdc", label: "DTDC" },
    { value: "ecom", label: "Ecom Express" },
  ]

  const timeSlots = [
    { value: "9-12", label: "9:00 AM - 12:00 PM" },
    { value: "12-3", label: "12:00 PM - 3:00 PM" },
    { value: "3-6", label: "3:00 PM - 6:00 PM" },
    { value: "6-9", label: "6:00 PM - 9:00 PM" },
  ]

  const handleSubmit = () => {
    console.log("Scheduling pickup...", formData)
    setStep(3)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Schedule Pickup</h1>
        <p className="text-sm text-gray-500 mt-1">
          Schedule a pickup for your ready-to-ship orders
        </p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
              >
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Pickup Details</p>
                <p className="text-xs text-gray-500">Date, time & courier</p>
              </div>
            </div>
            <div className="h-0.5 w-20 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
              >
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Package Info</p>
                <p className="text-xs text-gray-500">Weight & quantity</p>
              </div>
            </div>
            <div className="h-0.5 w-20 bg-gray-200" />
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
              >
                {step >= 3 ? <CheckCircle className="h-5 w-5" /> : "3"}
              </div>
              <div>
                <p className="font-medium text-gray-900">Confirmation</p>
                <p className="text-xs text-gray-500">Review & confirm</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Pickup Details */}
      {step === 1 && (
        <Card>
          <CardHeader title="Pickup Details" />
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Pickup Date"
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  helperText="Select a date for pickup"
                />
                <Select
                  label="Pickup Time Slot"
                  options={timeSlots}
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                />
              </div>

              <Select
                label="Select Courier Partner"
                options={courierOptions}
                value={formData.courier}
                onChange={(e) => setFormData({ ...formData, courier: e.target.value })}
                helperText="Choose your preferred courier partner"
              />

              {/* Guidelines - UPDATED */}
              <InfoBanner
                type="info"
                title="Pickup Guidelines"
              >
                <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>Ensure all packages are properly packed and labeled</li>
                  <li>Keep invoices ready for COD shipments</li>
                  <li>Courier will arrive during the selected time slot</li>
                </ul>
              </InfoBanner>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)}>
                  Next: Package Info
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Package Info */}
      {step === 2 && (
        <Card>
          <CardHeader title="Package Information" />
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Number of Packages"
                  type="number"
                  value={formData.packageCount}
                  onChange={(e) => setFormData({ ...formData, packageCount: e.target.value })}
                  placeholder="e.g., 5"
                />
                <Input
                  label="Total Weight (kg)"
                  type="number"
                  value={formData.totalWeight}
                  onChange={(e) => setFormData({ ...formData, totalWeight: e.target.value })}
                  placeholder="e.g., 12.5"
                />
              </div>

              <Textarea
                label="Pickup Address"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                placeholder="Enter complete pickup address with landmark"
                helperText="Courier will pickup from this address"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Contact Person"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Name of contact person"
                />
                <Input
                  label="Contact Phone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </div>

              <Textarea
                label="Special Instructions (Optional)"
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Any special instructions for the courier..."
              />

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>
                  Schedule Pickup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Pickup Scheduled Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your pickup has been scheduled for {formData.pickupDate} during {formData.pickupTime}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Pickup Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pickup ID</span>
                  <span className="font-medium text-gray-900">PKP-001234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Date & Time</span>
                  <span className="font-medium text-gray-900">
                    {formData.pickupDate} | {formData.pickupTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Courier</span>
                  <span className="font-medium text-gray-900">{formData.courier}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Packages</span>
                  <span className="font-medium text-gray-900">
                    {formData.packageCount} packages ({formData.totalWeight} kg)
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Contact</span>
                  <span className="font-medium text-gray-900">
                    {formData.contactPerson} | {formData.contactPhone}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                Schedule Another Pickup
              </Button>
              <Button onClick={() => window.location.href = "/merchant/shipments"}>
                View Shipments
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
