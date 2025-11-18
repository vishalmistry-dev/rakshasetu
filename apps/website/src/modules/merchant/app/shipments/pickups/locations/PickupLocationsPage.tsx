"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/shared/components/common/Card"
import { Modal } from "@/shared/components/common/Modal"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Textarea } from "@/shared/components/form/Textarea"
import {
  Building,
  Edit,
  MapPin,
  Plus,
  Trash2
} from "lucide-react"
import { useState } from "react"

type Location = {
  id: string
  name: string
  address: string
  city: string
  pincode: string
  contactPerson: string
  phone: string
  isDefault: boolean
  enabled: boolean
}

const mockLocations: Location[] = [
  {
    id: "1",
    name: "Main Warehouse",
    address: "Plot 123, Sector 5, Industrial Area",
    city: "Ahmedabad",
    pincode: "380001",
    contactPerson: "Rajesh Kumar",
    phone: "+91 98765 43210",
    isDefault: true,
    enabled: true,
  },
  {
    id: "2",
    name: "Secondary Warehouse",
    address: "Unit 45, Zone B, GIDC Estate",
    city: "Gandhinagar",
    pincode: "382010",
    contactPerson: "Priya Sharma",
    phone: "+91 98765 43211",
    isDefault: false,
    enabled: true,
  },
]

export default function PickupLocationsPage() {
  const [locations, setLocations] = useState(mockLocations)
  const [locationModal, setLocationModal] = useState<{
    open: boolean
    mode: "add" | "edit"
    location: Location | null
  }>({ open: false, mode: "add", location: null })

  const toggleLocation = (id: string) => {
    setLocations(locations.map(l =>
      l.id === id ? { ...l, enabled: !l.enabled } : l
    ))
  }

  const setDefault = (id: string) => {
    setLocations(locations.map(l => ({
      ...l,
      isDefault: l.id === id,
    })))
  }

  const deleteLocation = (id: string) => {
    setLocations(locations.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pickup Locations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage warehouse and pickup addresses
          </p>
        </div>
        <Button onClick={() => setLocationModal({ open: true, mode: "add", location: null })}>
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      {/* Locations List */}
      <div className="grid grid-cols-1 gap-4">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-orange-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                      {location.isDefault && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Default
                        </Badge>
                      )}
                      <Badge variant="outline" className={location.enabled ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}>
                        {location.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-gray-900">{location.address}</p>
                          <p className="text-gray-500">{location.city}, {location.pincode}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-gray-600">
                        <span>Contact: {location.contactPerson}</span>
                        <span>Phone: {location.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!location.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefault(location.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocationModal({ open: true, mode: "edit", location })}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={location.enabled}
                    onCheckedChange={() => toggleLocation(location.id)}
                  />
                  {!location.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteLocation(location.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Location Modal */}
      <Modal
        open={locationModal.open}
        onOpenChange={(open) => setLocationModal({ ...locationModal, open })}
        title={locationModal.mode === "add" ? "Add Pickup Location" : "Edit Location"}
        description="Configure warehouse or pickup address"
        size="lg"
        showCancel
        showConfirm
        confirmLabel={locationModal.mode === "add" ? "Add Location" : "Save Changes"}
        onConfirm={() => {
          console.log("Saving location:", locationModal)
          setLocationModal({ open: false, mode: "add", location: null })
        }}
      >
        <div className="space-y-4">
          <Input
            label="Location Name"
            placeholder="e.g., Main Warehouse"
          />

          <Textarea
            label="Address"
            placeholder="Enter complete address"
            rows={2}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              placeholder="Ahmedabad"
            />
            <Input
              label="Pincode"
              placeholder="380001"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Person"
              placeholder="Name"
            />
            <Input
              label="Phone Number"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Set as Default Location</p>
              <p className="text-xs text-gray-500">Use this for all pickups by default</p>
            </div>
            <Switch />
          </div>
        </div>
      </Modal>
    </div>
  )
}
