"use client"

import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Button } from "@/shared/components/form/Button"
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  DollarSign,
  Download,
  FileText,
  Package,
  Truck,
} from "lucide-react"
import Link from "next/link"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Mock data
const stats = [
  {
    label: "Total Orders",
    value: "1,284",
    change: { value: 12.5, trend: "up" as const },
    icon: Package,
  },
  {
    label: "Revenue",
    value: "₹4,52,890",
    change: { value: 8.2, trend: "up" as const },
    icon: DollarSign,
  },
  {
    label: "Active Shipments",
    value: "156",
    change: { value: 3.1, trend: "down" as const },
    icon: Truck,
  },
  {
    label: "Pending Issues",
    value: "23",
    change: { value: 5, trend: "up" as const },
    icon: AlertTriangle,
  },
]

const recentOrders = [
  {
    id: "ORD-12345",
    customer: "Rajesh Kumar",
    email: "rajesh@example.com",
    amount: 3499,
    items: 3,
    status: "new",
    time: "2 mins ago",
  },
  {
    id: "ORD-12346",
    customer: "Priya Sharma",
    email: "priya@example.com",
    amount: 15999,
    items: 1,
    status: "processing",
    time: "15 mins ago",
  },
  {
    id: "ORD-12347",
    customer: "Amit Patel",
    email: "amit@example.com",
    amount: 2199,
    items: 5,
    status: "shipped",
    time: "1 hour ago",
  },
  {
    id: "ORD-12348",
    customer: "Sneha Reddy",
    email: "sneha@example.com",
    amount: 5299,
    items: 2,
    status: "delivered",
    time: "2 hours ago",
  },
  {
    id: "ORD-12349",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    amount: 24999,
    items: 1,
    status: "shipped",
    time: "3 hours ago",
  },
]

const orderStatus = [
  { label: "New", count: 23, color: "#3b82f6" },
  { label: "Processing", count: 15, color: "#eab308" },
  { label: "Shipped", count: 45, color: "#a855f7" },
  { label: "Delivered", count: 120, color: "#22c55e" },
  { label: "Issues", count: 11, color: "#ef4444" },
]

const quickActions = [
  { label: "Schedule Pickup", icon: Calendar },
  { label: "Generate Labels", icon: FileText },
  { label: "Track Shipment", icon: Truck },
  { label: "Download Reports", icon: Download },
]

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
}

const revenueData = [
  { day: "Mon", amount: 45000 },
  { day: "Tue", amount: 52000 },
  { day: "Wed", amount: 48000 },
  { day: "Thu", amount: 61000 },
  { day: "Fri", amount: 55000 },
  { day: "Sat", amount: 67000 },
  { day: "Sun", amount: 58000 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <StatsGrid stats={stats} columns={4} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Revenue Overview"
            action={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">7 Days</Button>
                <Button variant="outline" size="sm">30 Days</Button>
              </div>
            }
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  cursor={{ fill: 'rgba(251, 146, 60, 0.1)' }}
                />
                <Bar
                  dataKey="amount"
                  fill="#f97316"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Revenue (7 days)</span>
              <span className="font-semibold text-gray-900">
                ₹{revenueData.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Chart */}
        <Card>
          <CardHeader title="Order Status" />
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={orderStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="label"
                >
                  {orderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              {orderStatus.map((status) => (
                <div key={status.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    <span className="text-sm text-gray-700">{status.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {status.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <Card noPadding className="lg:col-span-2">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/merchant/orders">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Items</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{order.items}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        ₹{order.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${statusColors[order.status]
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader title="Quick Actions" />
          <CardContent>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2 text-gray-600" />
                    {action.label}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
