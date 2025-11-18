"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/shared/components/common/Card"
import { Modal } from "@/shared/components/common/Modal"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  Key,
  MapPin,
  Plus,
  Settings,
  TrendingUp,
  Truck
} from "lucide-react"
import { useState } from "react"

type Courier = {
  id: string
  name: string
  enabled: boolean
  apiKey: string
  coverage: string
  activeShipments: number
  onTimeDelivery: number
  avgTransitTime: string
}

const mockCouriers: Courier[] = [
  {
    id: "bluedart",
    name: "BlueDart",
    enabled: true,
    apiKey: "BD_***********4567",
    coverage: "Pan India + International",
    activeShipments: 145,
    onTimeDelivery: 95,
    avgTransitTime: "2.3 days",
  },
  {
    id: "delhivery",
    name: "Delhivery",
    enabled: true,
    apiKey: "DLV_**********8901",
    coverage: "Pan India",
    activeShipments: 98,
    onTimeDelivery: 92,
    avgTransitTime: "2.8 days",
  },
  {
    id: "dtdc",
    name: "DTDC",
    enabled: false,
    apiKey: "Not configured",
    coverage: "Pan India",
    activeShipments: 0,
    onTimeDelivery: 0,
    avgTransitTime: "N/A",
  },
]

export default function CourierPartnersPage() {
  const [couriers, setCouriers] = useState(mockCouriers)
  const [configModal, setConfigModal] = useState<{
    open: boolean
    courier: Courier | null
  }>({ open: false, courier: null })

  const toggleCourier = (id: string) => {
    setCouriers(couriers.map(c =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courier Partners</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your courier integrations and API configurations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Courier
        </Button>
      </div>

      {/* Couriers List */}
      <div className="grid grid-cols-1 gap-4">
        {couriers.map((courier) => (
          <Card key={courier.id}>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Truck className="h-8 w-8 text-gray-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{courier.name}</h3>
                      <Badge variant="outline" className={courier.enabled ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}>
                        {courier.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{courier.coverage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Key className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{courier.apiKey}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{courier.onTimeDelivery}% On-time</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Avg: {courier.avgTransitTime}
                      </div>
                    </div>

                    {courier.enabled && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                          {courier.activeShipments} Active Shipments
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfigModal({ open: true, courier })}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Switch
                    checked={courier.enabled}
                    onCheckedChange={() => toggleCourier(courier.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Config Modal */}
      <Modal
        open={configModal.open}
        onOpenChange={(open) => setConfigModal({ ...configModal, open })}
        title={`Configure ${configModal.courier?.name}`}
        description="Update API credentials and settings"
        size="md"
        showCancel
        showConfirm
        confirmLabel="Save Configuration"
        onConfirm={() => {
          console.log("Saving config:", configModal.courier)
          setConfigModal({ open: false, courier: null })
        }}
      >
        <div className="space-y-4">
          <Input
            label="API Key"
            placeholder="Enter API key"
            type="password"
          />
          <Input
            label="API Secret"
            placeholder="Enter API secret"
            type="password"
          />
          <Input
            label="Webhook URL"
            placeholder="https://yoursite.com/webhook"
          />
        </div>
      </Modal>
    </div>
  )
}
