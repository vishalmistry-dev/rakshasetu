"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import {
  BarChart,
  ExternalLink,
  Plus,
  RefreshCw,
  Settings,
  Store,
} from "lucide-react"
import Link from "next/link"

const stores = [
  {
    id: "1",
    name: "Fashion Junction",
    platform: "Shopify",
    url: "fashionjunction.myshopify.com",
    status: "active",
    orders: 245,
    revenue: 456789,
    lastSync: "2 mins ago",
  },
  {
    id: "2",
    name: "Tech World",
    platform: "Shopify",
    url: "techworld.myshopify.com",
    status: "active",
    orders: 189,
    revenue: 892340,
    lastSync: "5 mins ago",
  },
  {
    id: "3",
    name: "Home Decor",
    platform: "Shopify",
    url: "homedecor.myshopify.com",
    status: "inactive",
    orders: 67,
    revenue: 123450,
    lastSync: "2 days ago",
  },
]

export default function StoresPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stores</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your connected stores
          </p>
        </div>
        <Link href="/merchant/stores/connect">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Connect Store
          </Button>
        </Link>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Store className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{store.name}</h3>
                  <p className="text-sm text-gray-500">{store.platform}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  store.status === "active"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }
              >
                {store.status}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ExternalLink className="h-4 w-4" />
                <span className="truncate">{store.url}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Orders</p>
                  <p className="text-lg font-semibold text-gray-900">{store.orders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{(store.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <RefreshCw className="h-3 w-3" />
                <span>Last synced {store.lastSync}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/merchant/stores/${store.id}/settings?tab=shipping`} className="flex-1 text-inherit">
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Link href={`/merchant/stores/analytics?store=${store.id}`} className="flex-1 text-inherit">
                <Button variant="outline" size="sm" className="w-full">
                  <BarChart className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
