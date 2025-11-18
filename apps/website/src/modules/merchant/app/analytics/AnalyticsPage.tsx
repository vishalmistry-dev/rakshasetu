"use client"

import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Button } from "@/shared/components/form/Button"
import { Select } from "@/shared/components/form/Select"
import {
  DollarSign,
  Download,
  Package,
  ShoppingCart,
  Store,
  TrendingUp
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

const dateRangeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "12m", label: "Last 12 Months" },
]

// Mock data
const mockData = {
  stats: [
    {
      label: "Total Revenue",
      value: "₹12,45,680",
      icon: DollarSign,
      change: { value: 18.5, trend: "up" as const },
    },
    {
      label: "Total Orders",
      value: "5,284",
      icon: Package,
      change: { value: 12.3, trend: "up" as const },
    },
    {
      label: "Active Stores",
      value: "8",
      icon: Store,
      change: { value: 2, trend: "up" as const },
    },
    {
      label: "Avg Order Value",
      value: "₹2,356",
      icon: ShoppingCart,
      change: { value: 5.2, trend: "up" as const },
    },
  ],
  revenueData: [
    { month: "Jan", revenue: 145000, orders: 420, customers: 280 },
    { month: "Feb", revenue: 182000, orders: 485, customers: 320 },
    { month: "Mar", revenue: 168000, orders: 456, customers: 305 },
    { month: "Apr", revenue: 221000, orders: 568, customers: 390 },
    { month: "May", revenue: 205000, orders: 531, customers: 365 },
    { month: "Jun", revenue: 267000, orders: 689, customers: 445 },
  ],
  ordersByChannel: [
    { name: "Shopify", value: 2840, color: "#16a34a" },
    { name: "RakshaSetu Direct", value: 1650, color: "#ea580c" },
    { name: "WooCommerce", value: 580, color: "#9333ea" },
    { name: "Magento", value: 214, color: "#0284c7" },
  ],
  topStores: [
    { id: 1, name: "Fashion Junction", orders: 1284, revenue: "₹4,56,780", growth: 24.5 },
    { id: 2, name: "Tech World", orders: 956, revenue: "₹3,89,650", growth: 18.2 },
    { id: 3, name: "Home Decor", orders: 742, revenue: "₹2,12,340", growth: 15.8 },
    { id: 4, name: "Electronics Hub", orders: 684, revenue: "₹1,87,230", growth: 12.3 },
    { id: 5, name: "Sports Arena", orders: 518, revenue: "₹1,45,680", growth: 8.7 },
  ],
  orderStatus: [
    { status: "Delivered", count: 3420, color: "#16a34a" },
    { status: "In Transit", count: 980, color: "#9333ea" },
    { status: "Processing", count: 456, color: "#eab308" },
    { status: "Pending", count: 284, color: "#3b82f6" },
    { status: "Cancelled", count: 144, color: "#ef4444" },
  ],
}

export default function AnalyticsPage() {
  const searchParams = useSearchParams()
  const view = searchParams.get('view')

  const [dateRange, setDateRange] = useState("30d")

  useEffect(() => {
    if (view === 'revenue') {
      const revenueSection = document.getElementById('revenue-section')
      if (revenueSection) {
        revenueSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [view])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your overall business performance across all stores
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={mockData.stats} columns={4} />

      {/* Revenue & Orders Trend */}
      <div id="revenue-section">
        <Card>
          <CardHeader
            title="Revenue & Orders Trend"
            action={
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-600 rounded-full" />
                  <span className="text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  <span className="text-gray-600">Orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full" />
                  <span className="text-gray-600">Customers</span>
                </div>
              </div>
            }
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={mockData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ea580c"
                  strokeWidth={2}
                  dot={{ fill: "#ea580c", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: "#2563eb", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ fill: "#16a34a", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Channel */}
        <Card>
          <CardHeader title="Orders by Channel" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.ordersByChannel}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockData.ordersByChannel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {mockData.ordersByChannel.map((channel) => (
                <div key={channel.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                    <span className="text-gray-600">{channel.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{channel.value.toLocaleString()} orders</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader title="Order Status Distribution" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.orderStatus} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" style={{ fontSize: 12 }} />
                <YAxis dataKey="status" type="category" stroke="#9ca3af" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {mockData.orderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Stores */}
      <Card>
        <CardHeader
          title="Top Performing Stores"
          action={<Button variant="ghost" size="sm">View All Stores</Button>}
        />
        <CardContent>
          <div className="space-y-3">
            {mockData.topStores.map((store, index) => (
              <div
                key={store.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-semibold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{store.name}</p>
                    <p className="text-xs text-gray-500">{store.orders} orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{store.revenue}</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+{store.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
