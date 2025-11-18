"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Textarea } from "@/shared/components/form/Textarea"
import {
  Globe,
  MapPin,
  Plus,
  Trash2
} from "lucide-react"
import { useState } from "react"

type Zone = {
  id: string
  name: string
  pincodes: string
  deliveryTime: string
  enabled: boolean
}

export function ShippingZones() {
  const [zones, setZones] = useState<Zone[]>([
    {
      id: "1",
      name: "Local Zone",
      pincodes: "380001-380015, 380020-380025",
      deliveryTime: "1-2 days",
      enabled: true
    },
    {
      id: "2",
      name: "Regional Zone",
      pincodes: "380016-390099",
      deliveryTime: "2-3 days",
      enabled: true
    },
    {
      id: "3",
      name: "National Zone",
      pincodes: "All India",
      deliveryTime: "4-7 days",
      enabled: true
    },
  ])

  const addZone = () => {
    setZones([
      ...zones,
      {
        id: Date.now().toString(),
        name: "",
        pincodes: "",
        deliveryTime: "",
        enabled: true,
      },
    ])
  }

  const removeZone = (id: string) => {
    setZones(zones.filter(z => z.id !== id))
  }

  const updateZone = (id: string, field: keyof Zone, value: string | boolean) => {
    setZones(zones.map(z =>
      z.id === id ? { ...z, [field]: value } : z
    ))
  }

  return (
    <div className="space-y-6">
      {/* Zones */}
      <Card>
        <CardHeader
          title="Shipping Zones"
          description="Define delivery zones and estimated delivery times"
          action={
            <Button size="sm" onClick={addZone}>
              <Plus className="h-4 w-4 mr-1" />
              Add Zone
            </Button>
          }
        />
        <CardContent>
          <div className="space-y-3">
            {zones.map((zone, index) => (
              <div key={zone.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {zone.name || `Zone ${index + 1}`}
                      </p>
                      <Badge variant="outline" className={zone.enabled ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}>
                        {zone.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={zone.enabled}
                      onCheckedChange={(checked) => updateZone(zone.id, "enabled", checked)}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Zone Name"
                    placeholder="e.g., Local Zone"
                    value={zone.name}
                    onChange={(e) => updateZone(zone.id, "name", e.target.value)}
                  />
                  <Input
                    label="Delivery Time"
                    placeholder="e.g., 1-2 days"
                    value={zone.deliveryTime}
                    onChange={(e) => updateZone(zone.id, "deliveryTime", e.target.value)}
                  />
                </div>

                <Textarea
                  label="Pincodes"
                  placeholder="e.g., 380001-380015, 380020-380025"
                  value={zone.pincodes}
                  onChange={(e) => updateZone(zone.id, "pincodes", e.target.value)}
                  helperText="Enter pincode ranges or comma-separated pincodes"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* International Shipping */}
      <Card>
        <CardHeader
          title="International Shipping"
          description="Enable shipping to international destinations"
        />
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Enable International Shipping</p>
                <p className="text-sm text-gray-500">Allow shipments outside India</p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
