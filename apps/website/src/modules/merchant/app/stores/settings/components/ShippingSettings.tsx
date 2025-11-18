"use client"

import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import { MapPin, Package, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

const courierOptions = [
  { value: "bluedart", label: "BlueDart" },
  { value: "delhivery", label: "Delhivery" },
  { value: "dtdc", label: "DTDC" },
  { value: "ecom", label: "Ecom Express" },
]

const weightUnitOptions = [
  { value: "kg", label: "Kilograms (kg)" },
  { value: "g", label: "Grams (g)" },
]

const dimensionUnitOptions = [
  { value: "cm", label: "Centimeters (cm)" },
  { value: "in", label: "Inches (in)" },
]

type ShippingZone = {
  id: string
  name: string
  pincodes: string
  rate: string
  enabled: boolean
}

export function ShippingSettings() {
  const [enabledCouriers, setEnabledCouriers] = useState({
    bluedart: true,
    delhivery: false,
    dtdc: false,
    ecom: false,
  })

  const [zones, setZones] = useState<ShippingZone[]>([
    { id: "1", name: "Local Zone", pincodes: "380001-380015", rate: "50", enabled: true },
    { id: "2", name: "Regional Zone", pincodes: "380016-390099", rate: "80", enabled: true },
  ])

  const [weightUnit, setWeightUnit] = useState("kg")
  const [dimensionUnit, setDimensionUnit] = useState("cm")
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("999")

  const addZone = () => {
    setZones([
      ...zones,
      {
        id: Date.now().toString(),
        name: "",
        pincodes: "",
        rate: "",
        enabled: true,
      },
    ])
  }

  const removeZone = (id: string) => {
    setZones(zones.filter((zone) => zone.id !== id))
  }

  const updateZone = (id: string, field: keyof ShippingZone, value: string | boolean) => {
    setZones(
      zones.map((zone) =>
        zone.id === id ? { ...zone, [field]: value } : zone
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Courier Selection */}
      <Card>
        <CardHeader
          title="Courier Partners"
          description="Select and manage your preferred courier services"
        />
        <CardContent>
          <InfoBanner
            type="info"
            title="Courier Integration"
            description="Enable courier partners to offer shipping options to your customers. You can enable multiple couriers."
          />

          <div className="mt-4 space-y-3">
            {courierOptions.map((courier) => (
              <div
                key={courier.value}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {courier.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {enabledCouriers[courier.value as keyof typeof enabledCouriers]
                        ? "Active"
                        : "Inactive"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={enabledCouriers[courier.value as keyof typeof enabledCouriers]}
                  onCheckedChange={(checked) =>
                    setEnabledCouriers({
                      ...enabledCouriers,
                      [courier.value]: checked,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Zones */}
      <Card>
        <CardHeader
          title="Shipping Zones"
          description="Define shipping rates based on pincode zones"
          action={
            <Button size="sm" onClick={addZone}>
              <Plus className="h-4 w-4 mr-1" />
              Add Zone
            </Button>
          }
        />
        <CardContent>
          <div className="space-y-4">
            {zones.map((zone, index) => (
              <div
                key={zone.id}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      Zone {index + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={zone.enabled}
                      onCheckedChange={(checked) =>
                        updateZone(zone.id, "enabled", checked)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeZone(zone.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    label="Zone Name"
                    placeholder="e.g., Local Zone"
                    value={zone.name}
                    onChange={(e) => updateZone(zone.id, "name", e.target.value)}
                  />
                  <Input
                    label="Pincode Range"
                    placeholder="e.g., 380001-380015"
                    value={zone.pincodes}
                    onChange={(e) => updateZone(zone.id, "pincodes", e.target.value)}
                  />
                  <Input
                    label="Shipping Rate (₹)"
                    type="number"
                    placeholder="50"
                    value={zone.rate}
                    onChange={(e) => updateZone(zone.id, "rate", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Package Settings */}
      <Card>
        <CardHeader
          title="Package Settings"
          description="Set default units for weight and dimensions"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Weight Unit"
              options={weightUnitOptions}
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
            />
            <Select
              label="Dimension Unit"
              options={dimensionUnitOptions}
              value={dimensionUnit}
              onChange={(e) => setDimensionUnit(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Free Shipping */}
      <Card>
        <CardHeader
          title="Free Shipping"
          description="Offer free shipping above a certain order value"
        />
        <CardContent>
          <Input
            label="Free Shipping Threshold (₹)"
            type="number"
            placeholder="999"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(e.target.value)}
            helperText="Orders above this amount will get free shipping"
          />
        </CardContent>
      </Card>
    </div>
  )
}
