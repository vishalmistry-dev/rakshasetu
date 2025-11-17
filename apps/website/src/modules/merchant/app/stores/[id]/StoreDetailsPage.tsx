"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Tabs } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import {
  ArrowLeft,
  DollarSign,
  ExternalLink,
  Package,
  RefreshCw,
  Settings,
  Store,
  TrendingUp,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const storeData = {
  id: "1",
  name: "Fashion Junction",
  platform: "Shopify",
  url: "fashionjunction.myshopify.com",
  status: "active",
  connectedAt: "2024-10-15",
  lastSync: "2 mins ago",

  stats: {
    totalOrders: 245,
    revenue: 456789,
    activeProducts: 156,
    customers: 892,
  },

  recentOrders: [
    { id: "ORD-001", customer: "Rajesh Kumar", amount: 3499, status: "new" },
    { id: "ORD-002", customer: "Priya Sharma", amount: 15999, status: "processing" },
    { id: "ORD-003", customer: "Amit Patel", amount: 2199, status: "shipped" },
  ],
}

export default function StoreDetailsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Orders", value: "orders" },
    { label: "Products", value: "products" },
    { label: "Settings", value: "settings" },
  ]

  const handleSync = () => {
    console.log("Syncing store...")
  }

  // Stats - UPDATED
  const stats = [
    {
      label: "Total Orders",
      value: storeData.stats.totalOrders.toString(),
      icon: Package,
    },
    {
      label: "Revenue",
      value: `₹${(storeData.stats.revenue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      change: { value: 12.5, trend: "up" as const },
    },
    {
      label: "Active Products",
      value: storeData.stats.activeProducts.toString(),
      icon: TrendingUp,
    },
    {
      label: "Customers",
      value: storeData.stats.customers.toString(),
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{storeData.name}</h1>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {storeData.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Store className="h-4 w-4" />
                {storeData.platform}
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                Last synced {storeData.lastSync}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSync}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Store
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats - UPDATED */}
      <StatsGrid stats={stats} columns={4} />

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader title="Recent Orders" />
            <CardContent>
              <div className="space-y-3">
                {storeData.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ₹{order.amount.toLocaleString()}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Store Info */}
          <Card>
            <CardHeader title="Store Information" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Store URL</p>
                  <p className="text-sm font-medium text-gray-900">{storeData.url}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Platform</p>
                  <p className="text-sm font-medium text-gray-900">{storeData.platform}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Connected On</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(storeData.connectedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active & Syncing
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Store Orders
            </h3>
            <p className="text-gray-600 mb-4">
              View and manage all orders from this store
            </p>
            <Button onClick={() => router.push("/merchant/orders")}>
              View All Orders
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <Card>
          <CardContent className="p-12 text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Product Catalog
            </h3>
            <p className="text-gray-600 mb-4">
              {storeData.stats.activeProducts} products synced from {storeData.name}
            </p>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Products
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <Card>
          <CardContent className="p-12 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Store Settings
            </h3>
            <p className="text-gray-600 mb-4">
              Configure shipping preferences, webhooks, and notifications
            </p>
            <Button onClick={() => router.push("/merchant/stores/settings/shipping")}>
              <Settings className="h-4 w-4 mr-2" />
              Manage Settings
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
