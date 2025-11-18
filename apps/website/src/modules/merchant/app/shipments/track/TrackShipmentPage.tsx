"use client"

import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Timeline } from "@/shared/components/common/Timeline"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  Clock,
  Download,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
} from "lucide-react"
import { useState } from "react"

const trackingData = {
  awb: "BD123456789",
  orderId: "ORD-12345",
  status: "in_transit",
  courier: "BlueDart",

  customer: {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh@example.com",
  },

  origin: {
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
  },

  destination: {
    address: "123, MG Road, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400053",
  },

  packageDetails: {
    weight: "0.8 kg",
    dimensions: "30x20x10 cm",
    items: 2,
  },

  expectedDelivery: "2024-11-17",

  timeline: [
    {
      status: "Order Placed",
      location: "Bangalore, KA",
      timestamp: "2024-11-15 10:30 AM",
      description: "Order received and confirmed",
      completed: true,
    },
    {
      status: "Picked Up",
      location: "Bangalore Hub",
      timestamp: "2024-11-15 02:45 PM",
      description: "Package picked up from merchant",
      completed: true,
    },
    {
      status: "In Transit",
      location: "Bangalore Hub",
      timestamp: "2024-11-15 06:20 PM",
      description: "Package departed from facility",
      completed: true,
    },
    {
      status: "In Transit",
      location: "Mumbai Hub",
      timestamp: "2024-11-16 08:15 AM",
      description: "Package arrived at destination city",
      completed: true,
    },
    {
      status: "Out for Delivery",
      location: "Andheri West",
      timestamp: "",
      description: "Package will be delivered today",
      completed: false,
    },
    {
      status: "Delivered",
      location: "Mumbai, MH",
      timestamp: "",
      description: "Package delivered successfully",
      completed: false,
    },
  ],
}

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: "Pending", class: "bg-gray-50 text-gray-700 border-gray-200" },
  in_transit: { label: "In Transit", class: "bg-purple-50 text-purple-700 border-purple-200" },
  out_for_delivery: { label: "Out for Delivery", class: "bg-blue-50 text-blue-700 border-blue-200" },
  delivered: { label: "Delivered", class: "bg-green-50 text-green-700 border-green-200" },
  ndr: { label: "Failed Delivery", class: "bg-red-50 text-red-700 border-red-200" },
}

export default function TrackShipmentPage() {
  const [awbInput, setAwbInput] = useState("")
  const [showTracking, setShowTracking] = useState(true)

  const handleTrack = () => {
    setShowTracking(true)
  }

  // Stats for overview - UPDATED
  const overviewStats = [
    {
      label: "AWB Number",
      value: trackingData.awb,
      icon: Package,
    },
    {
      label: "Current Status",
      value: statusConfig[trackingData.status].label,
      icon: MapPin,
    },
    {
      label: "Expected Delivery",
      value: new Date(trackingData.expectedDelivery).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Track Shipment</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your shipment using AWB number
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                placeholder="Enter AWB number or Order ID"
                value={awbInput}
                onChange={(e) => setAwbInput(e.target.value)}
              />
            </div>
            <Button onClick={handleTrack}>
              <Search className="h-4 w-4 mr-2" />
              Track
            </Button>
          </div>
        </CardContent>
      </Card>

      {showTracking && (
        <>
          {/* Shipment Overview - UPDATED */}
          <StatsGrid stats={overviewStats} columns={3} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline - UPDATED */}
            <Card className="lg:col-span-2">
              <CardHeader
                title="Tracking Timeline"
                action={
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download POD
                  </Button>
                }
              />
              <CardContent>
                <Timeline events={trackingData.timeline} />
              </CardContent>
            </Card>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Customer Info */}
              <Card>
                <CardHeader title="Customer Details" />
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900">{trackingData.customer.name}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{trackingData.customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{trackingData.customer.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader title="Delivery Address" />
                <CardContent>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{trackingData.destination.address}</p>
                      <p>{trackingData.destination.city}, {trackingData.destination.state}</p>
                      <p>{trackingData.destination.pincode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Package Details */}
              <Card>
                <CardHeader title="Package Details" />
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium text-gray-900">{trackingData.packageDetails.weight}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Dimensions</span>
                      <span className="font-medium text-gray-900">{trackingData.packageDetails.dimensions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Items</span>
                      <span className="font-medium text-gray-900">{trackingData.packageDetails.items}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
