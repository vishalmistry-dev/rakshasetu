"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { Button } from "@/shared/components/form/Button"
import { Select } from "@/shared/components/form/Select"
import {
  Download,
  Filter,
  LogIn,
  Package,
  Settings,
  ShoppingCart,
  Store,
  User
} from "lucide-react"
import { useState } from "react"

type Activity = {
  id: string
  action: string
  description: string
  type: "auth" | "order" | "settings" | "store" | "shipment"
  user: string
  timestamp: string
  ipAddress: string
  status: "success" | "failed"
}

const mockActivities: Activity[] = [
  {
    id: "1",
    action: "Order Created",
    description: "Created order #ORD-12345 for ₹3,499",
    type: "order",
    user: "System",
    timestamp: "2024-11-16 14:30:25",
    ipAddress: "103.45.67.89",
    status: "success",
  },
  {
    id: "2",
    action: "Settings Updated",
    description: "Updated shipping settings for Fashion Junction store",
    type: "settings",
    user: "Rajesh Kumar",
    timestamp: "2024-11-16 13:15:42",
    ipAddress: "103.45.67.89",
    status: "success",
  },
  {
    id: "3",
    action: "Login",
    description: "User logged in successfully",
    type: "auth",
    user: "Rajesh Kumar",
    timestamp: "2024-11-16 10:00:18",
    ipAddress: "103.45.67.89",
    status: "success",
  },
  {
    id: "4",
    action: "Shipment Created",
    description: "Created shipment for order #ORD-12340",
    type: "shipment",
    user: "System",
    timestamp: "2024-11-15 18:45:33",
    ipAddress: "103.45.67.89",
    status: "success",
  },
  {
    id: "5",
    action: "Store Connected",
    description: "Connected new Shopify store: Tech World",
    type: "store",
    user: "Rajesh Kumar",
    timestamp: "2024-11-15 16:20:10",
    ipAddress: "103.45.67.89",
    status: "success",
  },
  {
    id: "6",
    action: "Login Failed",
    description: "Failed login attempt - Invalid password",
    type: "auth",
    user: "Unknown",
    timestamp: "2024-11-15 09:12:45",
    ipAddress: "45.123.67.22",
    status: "failed",
  },
]

const typeOptions = [
  { value: "all", label: "All Activities" },
  { value: "auth", label: "Authentication" },
  { value: "order", label: "Orders" },
  { value: "settings", label: "Settings" },
  { value: "store", label: "Stores" },
  { value: "shipment", label: "Shipments" },
]

const dateRangeOptions = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
]

const typeConfig = {
  auth: { icon: LogIn, color: "text-blue-600", bg: "bg-blue-100" },
  order: { icon: ShoppingCart, color: "text-green-600", bg: "bg-green-100" },
  settings: { icon: Settings, color: "text-purple-600", bg: "bg-purple-100" },
  store: { icon: Store, color: "text-orange-600", bg: "bg-orange-100" },
  shipment: { icon: Package, color: "text-indigo-600", bg: "bg-indigo-100" },
}

export default function ActivityLogPage() {
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState("30d")
  const [activities] = useState(mockActivities)

  const filteredActivities = activities.filter(activity =>
    typeFilter === "all" ? true : activity.type === typeFilter
  )

  const columns: DataTableColumn[] = [
    {
      key: "action",
      header: "Activity",
      sortable: true,
      render: (row: Activity) => {
        const config = typeConfig[row.type]
        const Icon = config.icon

        return (
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
              <Icon className={`h-5 w-5 ${config.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{row.action}</p>
              <p className="text-xs text-gray-500">{row.description}</p>
            </div>
          </div>
        )
      },
    },
    {
      key: "user",
      header: "User",
      sortable: true,
      render: (row: Activity) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-900">{row.user}</span>
        </div>
      ),
    },
    {
      key: "timestamp",
      header: "Date & Time",
      sortable: true,
      render: (row: Activity) => (
        <span className="text-sm text-gray-600">{row.timestamp}</span>
      ),
    },
    {
      key: "ipAddress",
      header: "IP Address",
      render: (row: Activity) => (
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{row.ipAddress}</code>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Activity) => (
        <Badge
          variant="outline"
          className={
            row.status === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }
        >
          {row.status}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track all activities and changes in your account
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <Select
              options={typeOptions}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              placeholder="Filter by type"
            />
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              placeholder="Select date range"
            />
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={filteredActivities}
            columns={columns}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={15}
            searchPlaceholder="Search activities..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
