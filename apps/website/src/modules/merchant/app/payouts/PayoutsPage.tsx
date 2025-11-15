"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Button } from "@/shared/components/form/Button"
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
} from "lucide-react"
import Link from "next/link"

const recentSettlements = [
  {
    id: "PAY-001",
    date: "2024-11-14",
    amount: 156780,
    orders: 45,
    status: "completed",
    utr: "SBIN24111412345",
  },
  {
    id: "PAY-002",
    date: "2024-11-11",
    amount: 234560,
    orders: 67,
    status: "completed",
    utr: "SBIN24111112346",
  },
  {
    id: "PAY-003",
    date: "2024-11-08",
    amount: 189450,
    orders: 52,
    status: "completed",
    utr: "SBIN24110812347",
  },
  {
    id: "PAY-004",
    date: "2024-11-05",
    amount: 198230,
    orders: 58,
    status: "completed",
    utr: "SBIN24110512348",
  },
]

const pendingOrders = [
  { orderId: "ORD-12345", amount: 3499, date: "2024-11-15", settlementDate: "2024-11-18" },
  { orderId: "ORD-12346", amount: 15999, date: "2024-11-15", settlementDate: "2024-11-18" },
  { orderId: "ORD-12347", amount: 2199, date: "2024-11-14", settlementDate: "2024-11-18" },
  { orderId: "ORD-12348", amount: 5299, date: "2024-11-14", settlementDate: "2024-11-18" },
]

export default function PayoutsPage() {
  // Stats - UPDATED
  const stats = [
    {
      label: "Available Balance",
      value: "₹1,24,567",
      icon: DollarSign,
    },
    {
      label: "Pending Settlement",
      value: "₹45,230",
      change: { value: 12, trend: "up" as const },
      icon: Clock,
    },
    {
      label: "Total Settled (MTD)",
      value: "₹8,92,340",
      change: { value: 18, trend: "up" as const },
      icon: CheckCircle,
    },
    {
      label: "Next Payout",
      value: "Nov 18",
      icon: Calendar,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your settlements and payouts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats - UPDATED */}
      <StatsGrid stats={stats} columns={4} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Settlements */}
        <Card noPadding className="lg:col-span-2">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Settlements</h3>
            <Link href="/merchant/payouts/settlements">
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Settlement ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">UTR</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentSettlements.map((settlement) => (
                  <tr key={settlement.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">{settlement.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {new Date(settlement.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        ₹{settlement.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-gray-600">{settlement.orders}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500 font-mono">{settlement.utr}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {settlement.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader title="Pending Settlement" />
          <CardContent>
            <div className="space-y-3">
              {pendingOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.orderId}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{order.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(order.settlementDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Pending</span>
                <span className="text-lg font-semibold text-gray-900">
                  ₹{pendingOrders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
