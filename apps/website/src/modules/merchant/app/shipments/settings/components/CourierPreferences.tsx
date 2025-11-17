"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import {
  Package,
  Star,
  TrendingUp,
  Truck
} from "lucide-react"
import { useState } from "react"

const courierOptions = [
  { value: "bluedart", label: "BlueDart" },
  { value: "delhivery", label: "Delhivery" },
  { value: "dtdc", label: "DTDC" },
  { value: "ecom", label: "Ecom Express" },
]

const priorityOptions = [
  { value: "cost", label: "Lowest Cost" },
  { value: "speed", label: "Fastest Delivery" },
  { value: "reliability", label: "Best Reliability" },
  { value: "balanced", label: "Balanced" },
]

export function CourierPreferences() {
  const [couriers, setCouriers] = useState([
    { id: "bluedart", name: "BlueDart", enabled: true, priority: 1, performance: 95 },
    { id: "delhivery", name: "Delhivery", enabled: true, priority: 2, performance: 92 },
    { id: "dtdc", name: "DTDC", enabled: false, priority: 3, performance: 88 },
    { id: "ecom", name: "Ecom Express", enabled: false, priority: 4, performance: 85 },
  ])

  const [selectionCriteria, setSelectionCriteria] = useState("balanced")
  const [autoSwitch, setAutoSwitch] = useState(true)
  const [performanceThreshold, setPerformanceThreshold] = useState("90")

  const toggleCourier = (id: string) => {
    setCouriers(couriers.map(c =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ))
  }

  return (
    <div className="space-y-6">
      <InfoBanner
        type="info"
        title="Courier Selection"
        description="Configure how RakshaSetu automatically selects courier partners for your shipments."
      />

      {/* Selection Criteria */}
      <Card>
        <CardHeader
          title="Selection Criteria"
          description="Define how couriers are selected for shipments"
        />
        <CardContent>
          <div className="space-y-4">
            <Select
              label="Primary Selection Criteria"
              options={priorityOptions}
              value={selectionCriteria}
              onChange={(e) => setSelectionCriteria(e.target.value)}
              helperText="How RakshaSetu chooses courier partners"
            />

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-Switch on Poor Performance</p>
                <p className="text-xs text-gray-500">Switch to better courier if performance drops</p>
              </div>
              <Switch
                checked={autoSwitch}
                onCheckedChange={setAutoSwitch}
              />
            </div>

            {autoSwitch && (
              <Input
                label="Performance Threshold (%)"
                type="number"
                value={performanceThreshold}
                onChange={(e) => setPerformanceThreshold(e.target.value)}
                helperText="Switch courier if performance drops below this %"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Courier Partners */}
      <Card>
        <CardHeader
          title="Courier Partners"
          description="Enable and prioritize your courier partners"
        />
        <CardContent>
          <div className="space-y-3">
            {couriers.map((courier, index) => (
              <div
                key={courier.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>

                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{courier.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={courier.enabled ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}>
                          {courier.enabled ? "Active" : "Inactive"}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <TrendingUp className="h-3 w-3" />
                          <span>{courier.performance}% Performance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Switch
                  checked={courier.enabled}
                  onCheckedChange={() => toggleCourier(courier.id)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Level Preferences */}
      <Card>
        <CardHeader
          title="Service Level Preferences"
          description="Default service levels for different order types"
        />
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-orange-500" />
                  <p className="text-sm font-medium text-gray-900">High Value Orders (₹10,000+)</p>
                </div>
                <Select
                  options={[
                    { value: "express", label: "Express Delivery" },
                    { value: "standard", label: "Standard" },
                  ]}
                  value="express"
                  onChange={() => { }}
                />
              </div>

              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium text-gray-900">Standard Orders</p>
                </div>
                <Select
                  options={[
                    { value: "standard", label: "Standard" },
                    { value: "economy", label: "Economy" },
                  ]}
                  value="standard"
                  onChange={() => { }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
