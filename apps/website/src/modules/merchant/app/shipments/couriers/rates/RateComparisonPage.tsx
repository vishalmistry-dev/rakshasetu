"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import {
  Search,
  TrendingDown,
  Zap
} from "lucide-react"
import { useState } from "react"

const serviceTypeOptions = [
  { value: "express", label: "Express" },
  { value: "standard", label: "Standard" },
  { value: "economy", label: "Economy" },
]

export default function RateComparisonPage() {
  const [fromPincode, setFromPincode] = useState("")
  const [toPincode, setToPincode] = useState("")
  const [weight, setWeight] = useState("")
  const [serviceType, setServiceType] = useState("standard")
  const [showRates, setShowRates] = useState(false)

  const handleCompare = () => {
    setShowRates(true)
  }

  const mockRates = [
    { courier: "BlueDart", rate: 85, transit: "1-2 days", recommended: true },
    { courier: "Delhivery", rate: 78, transit: "2-3 days", recommended: false },
    { courier: "DTDC", rate: 92, transit: "2-4 days", recommended: false },
    { courier: "Ecom Express", rate: 82, transit: "2-3 days", recommended: false },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rate Comparison</h1>
          <p className="text-sm text-gray-500 mt-1">
            Compare shipping rates across courier partners
          </p>
        </div>
      </div>

      {/* Rate Calculator */}
      <Card>
        <CardHeader
          title="Calculate Rates"
          description="Enter shipment details to compare rates"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              label="From Pincode"
              placeholder="380001"
              value={fromPincode}
              onChange={(e) => setFromPincode(e.target.value)}
            />
            <Input
              label="To Pincode"
              placeholder="110001"
              value={toPincode}
              onChange={(e) => setToPincode(e.target.value)}
            />
            <Input
              label="Weight (kg)"
              type="number"
              placeholder="1.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Select
              label="Service Type"
              options={serviceTypeOptions}
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            />
            <div className="flex items-end">
              <Button className="w-full" onClick={handleCompare}>
                <Search className="h-4 w-4 mr-2" />
                Compare Rates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Comparison Results */}
      {showRates && (
        <Card>
          <CardHeader title="Rate Comparison Results" />
          <CardContent>
            <div className="space-y-3">
              {mockRates
                .sort((a, b) => a.rate - b.rate)
                .map((rate, index) => (
                  <div
                    key={rate.courier}
                    className={`p-4 border-2 rounded-lg ${rate.recommended
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${index === 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                          }`}>
                          {index + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{rate.courier}</h3>
                            {rate.recommended && (
                              <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                                <Zap className="h-3 w-3 mr-1" />
                                Recommended
                              </Badge>
                            )}
                            {index === 0 && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                Lowest Rate
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">Delivery in {rate.transit}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{rate.rate}</p>
                        <p className="text-xs text-gray-500">+ GST</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
