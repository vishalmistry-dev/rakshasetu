"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import {
  ArrowLeft,
  Banknote,
  Bell,
  CheckCircle,
  CreditCard,
  DollarSign,
  Edit,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Plus,
  ShieldCheck,
  Trash,
  Trash2,
  Truck,
  Webhook,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

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

type WebhookData = {
  id: string
  url: string
  events: string
  status: "active" | "inactive"
  lastTriggered: string
}

// Mock store data
const mockStores: Record<string, any> = {
  "1": { id: "1", name: "Fashion Junction", platform: "Shopify" },
  "2": { id: "2", name: "Tech World", platform: "WooCommerce" },
}

export default function StoreSettingsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const storeId = params.id as string
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState(tabParam || "shipping")
  const store = mockStores[storeId] || { id: storeId, name: "Unknown Store", platform: "Unknown" }

  // Sync URL with tab
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam)
    }
  }, [tabParam, activeTab])

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', newTab)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  // Shipping states
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

  // Payment states
  const [codEnabled, setCodEnabled] = useState(true)
  const [prepaidEnabled, setPrepaidEnabled] = useState(true)
  const [codCharges, setCodCharges] = useState("50")
  const [codChargesType, setCodChargesType] = useState<"fixed" | "percentage">("fixed")
  const [minOrderValue, setMinOrderValue] = useState("100")
  const [maxCodAmount, setMaxCodAmount] = useState("50000")

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState({
    orderPlaced: true,
    orderShipped: true,
    orderDelivered: true,
    paymentReceived: true,
    lowStock: false,
  })

  const [smsNotifications, setSmsNotifications] = useState({
    orderPlaced: true,
    orderShipped: true,
    orderDelivered: true,
    ndrAlert: true,
  })

  // Webhook states
  const [webhooks] = useState<WebhookData[]>([
    {
      id: "1",
      url: "https://example.com/webhook",
      events: "order.created, order.shipped",
      status: "active",
      lastTriggered: "2 hours ago"
    },
  ])

  const tabs: Tab[] = [
    { label: "Shipping", value: "shipping", icon: Truck },
    { label: "Payment", value: "payment", icon: DollarSign },
    { label: "Notifications", value: "notifications", icon: Bell },
    { label: "Webhooks", value: "webhooks", icon: Webhook },
  ]

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

  const webhookColumns: DataTableColumn[] = [
    {
      key: "url",
      header: "Webhook URL",
      sortable: true,
      render: (row: WebhookData) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{row.url}</p>
          <p className="text-xs text-gray-500">Last triggered: {row.lastTriggered}</p>
        </div>
      ),
    },
    {
      key: "events",
      header: "Events",
      render: (row: WebhookData) => (
        <span className="text-sm text-gray-600">{row.events}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: WebhookData) => (
        <Badge
          variant="outline"
          className={
            row.status === "active"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {row.status === "active" ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 mr-1" />
          )}
          {row.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link href={`/merchant/stores/${storeId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            </Link>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {store.platform}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{store.name} - Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage settings for this store
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={handleTabChange} variant="underline" />

      {/* Shipping Tab */}
      {activeTab === "shipping" && (
        <div className="space-y-6">
          {/* Courier Selection */}
          <Card>
            <CardHeader
              title="Courier Partners"
              description="Select couriers for this store"
            />
            <CardContent>
              <InfoBanner
                type="info"
                title="Store-specific Couriers"
                description="These settings override your global courier preferences for this store only."
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
              description="Define shipping rates for this store"
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
              description="Default units for this store"
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
      )}

      {/* Payment Tab */}
      {activeTab === "payment" && (
        <div className="space-y-6">
          {/* Payment Methods */}
          <Card>
            <CardHeader
              title="Payment Methods"
              description="Enable payment options for this store"
            />
            <CardContent>
              <div className="space-y-4">
                {/* COD */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Banknote className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-xs text-gray-500">
                        Customers pay when they receive the order
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={codEnabled}
                    onCheckedChange={setCodEnabled}
                  />
                </div>

                {/* Prepaid */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Prepaid (Online Payment)
                      </p>
                      <p className="text-xs text-gray-500">
                        UPI, Cards, Wallets via Razorpay
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </div>
                  <Switch
                    checked={prepaidEnabled}
                    onCheckedChange={setPrepaidEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* COD Settings */}
          {codEnabled && (
            <Card>
              <CardHeader
                title="COD Settings"
                description="Configure Cash on Delivery for this store"
              />
              <CardContent>
                <div className="space-y-4">
                  <InfoBanner
                    type="info"
                    title="Store-specific COD Settings"
                    description="These settings apply only to this store and override global defaults."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        COD Charge Type
                      </label>
                      <div className="flex gap-2">
                        <Button
                          variant={codChargesType === "fixed" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCodChargesType("fixed")}
                          className="flex-1"
                        >
                          Fixed Amount
                        </Button>
                        <Button
                          variant={codChargesType === "percentage" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCodChargesType("percentage")}
                          className="flex-1"
                        >
                          Percentage
                        </Button>
                      </div>
                    </div>

                    <Input
                      label={codChargesType === "fixed" ? "COD Charges (₹)" : "COD Charges (%)"}
                      type="number"
                      placeholder="50"
                      value={codCharges}
                      onChange={(e) => setCodCharges(e.target.value)}
                      helperText={
                        codChargesType === "fixed"
                          ? "Flat fee for COD orders"
                          : "Percentage of order value"
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Minimum Order Value (₹)"
                      type="number"
                      placeholder="100"
                      value={minOrderValue}
                      onChange={(e) => setMinOrderValue(e.target.value)}
                      helperText="Minimum amount required for COD"
                    />

                    <Input
                      label="Maximum COD Amount (₹)"
                      type="number"
                      placeholder="50000"
                      value={maxCodAmount}
                      onChange={(e) => setMaxCodAmount(e.target.value)}
                      helperText="Maximum order value allowed for COD"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Razorpay Integration */}
          <Card>
            <CardHeader
              title="Payment Gateway"
              description="Uses your global Razorpay integration"
            />
            <CardContent>
              <InfoBanner
                type="success"
                title="Razorpay Connected"
                description="This store uses your main Razorpay account configured in your merchant settings."
              />

              <div className="mt-4 flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Razorpay Account
                    </p>
                    <p className="text-xs text-gray-500">
                      merchant@example.com
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader
              title="Email Notifications"
              description="Manage email alerts for this store"
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Placed</p>
                      <p className="text-xs text-gray-500">Get notified when new order is placed</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications.orderPlaced}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, orderPlaced: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Shipped</p>
                      <p className="text-xs text-gray-500">Get notified when order is shipped</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications.orderShipped}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, orderShipped: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                      <p className="text-xs text-gray-500">Get notified when order is delivered</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications.orderDelivered}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, orderDelivered: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Received</p>
                      <p className="text-xs text-gray-500">Get notified when payment is received</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications.paymentReceived}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, paymentReceived: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                      <p className="text-xs text-gray-500">Get notified when products are low on stock</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications.lowStock}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, lowStock: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SMS Notifications */}
          <Card>
            <CardHeader
              title="SMS Notifications"
              description="Manage SMS alerts for this store"
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Placed</p>
                      <p className="text-xs text-gray-500">SMS alert for new orders</p>
                    </div>
                  </div>
                  <Switch
                    checked={smsNotifications.orderPlaced}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, orderPlaced: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Shipped</p>
                      <p className="text-xs text-gray-500">SMS alert when order ships</p>
                    </div>
                  </div>
                  <Switch
                    checked={smsNotifications.orderShipped}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, orderShipped: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                      <p className="text-xs text-gray-500">SMS alert on successful delivery</p>
                    </div>
                  </div>
                  <Switch
                    checked={smsNotifications.orderDelivered}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, orderDelivered: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">NDR Alert</p>
                      <p className="text-xs text-gray-500">SMS alert for failed deliveries</p>
                    </div>
                  </div>
                  <Switch
                    checked={smsNotifications.ndrAlert}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, ndrAlert: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === "webhooks" && (
        <Card>
          <CardHeader
            title="Webhook Endpoints"
            description="Store-specific webhook configurations"
            action={
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Webhook
              </Button>
            }
          />
          <CardContent>
            <InfoBanner
              type="info"
              title="Store-specific Webhooks"
              description="These webhooks will only trigger for events from this store."
            />

            <div className="mt-4">
              <DataTable
                data={webhooks}
                columns={webhookColumns}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
