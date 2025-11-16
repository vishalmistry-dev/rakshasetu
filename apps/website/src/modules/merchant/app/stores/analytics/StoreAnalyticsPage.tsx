"use client"

import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Button } from "@/shared/components/form/Button"
import { Select } from "@/shared/components/form/Select"
import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

// Mock data
const mockData = {
  stats: [
    {
      label: "Total Revenue",
      value: "₹2,45,680",
      icon: DollarSign,
      change: { value: 15.3, trend: "up" as const },
    },
    {
      label: "Total Orders",
      value: "1,284",
      icon: Package,
      change: { value: 8.2, trend: "up" as const },
    },
    {
      label: "Average Order Value",
      value: "₹1,912",
      icon: ShoppingCart,
      change: { value: 3.1, trend: "down" as const },
    },
    {
      label: "Conversion Rate",
      value: "3.2%",
      icon: TrendingUp,
      change: { value: 0.5, trend: "up" as const },
    },
  ],
  revenueData: [
    { month: "Jan", revenue: 45000, orders: 120 },
    { month: "Feb", revenue: 52000, orders: 145 },
    { month: "Mar", revenue: 48000, orders: 132 },
    { month: "Apr", revenue: 61000, orders: 168 },
    { month: "May", revenue: 55000, orders: 151 },
    { month: "Jun", revenue: 67000, orders: 189 },
  ],
  productPerformance: [
    { name: "Product A", sales: 4500, revenue: 45000 },
    { name: "Product B", sales: 3800, revenue: 38000 },
    { name: "Product C", sales: 3200, revenue: 32000 },
    { name: "Product D", sales: 2800, revenue: 28000 },
    { name: "Product E", sales: 2100, revenue: 21000 },
  ],
  topProducts: [
    { id: 1, name: "Premium Wireless Headphones", sales: 234, revenue: "₹2,34,000" },
    { id: 2, name: "Smart Watch Series 5", sales: 189, revenue: "₹1,89,000" },
    { id: 3, name: "Laptop Stand Aluminum", sales: 156, revenue: "₹78,000" },
    { id: 4, name: "USB-C Hub 7-in-1", sales: 142, revenue: "₹71,000" },
    { id: 5, name: "Mechanical Keyboard RGB", sales: 128, revenue: "₹1,28,000" },
  ],
}

const storeOptions = [
  { value: "all", label: "All Stores" },
  { value: "store1", label: "My Shopify Store" },
  { value: "store2", label: "WooCommerce Store" },
]

const dateRangeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "12m", label: "Last 12 Months" },
]

export default function StoreAnalyticsPage() {

  const searchParams = useSearchParams()
  const storeParam = searchParams.get('store') // Gets ?store=1

  const [dateRange, setDateRange] = useState("30d")
  const [storeFilter, setStoreFilter] = useState("all")

  useEffect(() => {
    if (storeParam && storeParam !== storeFilter) {
      setStoreFilter(storeParam)
    }
  }, [storeParam, storeFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your store performance and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            options={storeOptions}
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
          />
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsGrid stats={mockData.stats} columns={4} />

      {/* Revenue & Orders Chart */}
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
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: "#2563eb", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <Card>
          <CardHeader title="Product Performance" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.productPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
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
                <Bar dataKey="revenue" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader
            title="Top Performing Products"
            action={<Button variant="ghost" size="sm">View All</Button>}
          />
          <CardContent>
            <div className="space-y-3">
              {mockData.topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {product.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
