"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import {
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  XCircle
} from "lucide-react"
import { useState } from "react"

type Refund = {
  id: string
  orderId: string
  customer: string
  amount: number
  method: "original" | "wallet" | "bank"
  reason: string
  status: "pending" | "processing" | "completed" | "failed"
  requestedAt: string
  processedAt?: string
}

const mockRefunds: Refund[] = [
  {
    id: "REF-001",
    orderId: "ORD-12345",
    customer: "Rajesh Kumar",
    amount: 3499,
    method: "original",
    reason: "Product return",
    status: "pending",
    requestedAt: "2024-11-16 14:30",
  },
  {
    id: "REF-002",
    orderId: "ORD-12346",
    customer: "Priya Sharma",
    amount: 15999,
    method: "bank",
    reason: "Cancelled order",
    status: "processing",
    requestedAt: "2024-11-15 10:20",
  },
  {
    id: "REF-003",
    orderId: "ORD-12340",
    customer: "Amit Patel",
    amount: 2199,
    method: "wallet",
    reason: "Defective product",
    status: "completed",
    requestedAt: "2024-11-14 16:45",
    processedAt: "2024-11-15 09:30",
  },
  {
    id: "REF-004",
    orderId: "ORD-12338",
    customer: "Sneha Reddy",
    amount: 5299,
    method: "original",
    reason: "Dispute resolution",
    status: "failed",
    requestedAt: "2024-11-13 11:15",
  },
]

const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Clock },
  processing: { label: "Processing", class: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  completed: { label: "Completed", class: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  failed: { label: "Failed", class: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
}

const methodConfig = {
  original: { label: "Original Payment Method", class: "bg-gray-50 text-gray-700 border-gray-200" },
  wallet: { label: "RakshaSetu Wallet", class: "bg-orange-50 text-orange-700 border-orange-200" },
  bank: { label: "Bank Transfer", class: "bg-blue-50 text-blue-700 border-blue-200" },
}

export default function RefundsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selected, setSelected] = useState(new Set<string>())
  const [refunds] = useState(mockRefunds)

  const tabs: Tab[] = [
    { label: "All", value: "all", badge: refunds.length },
    { label: "Pending", value: "pending", badge: refunds.filter(r => r.status === "pending").length },
    { label: "Processing", value: "processing", badge: refunds.filter(r => r.status === "processing").length },
    { label: "Completed", value: "completed", badge: refunds.filter(r => r.status === "completed").length },
    { label: "Failed", value: "failed", badge: refunds.filter(r => r.status === "failed").length },
  ]

  const filteredRefunds = refunds.filter(r =>
    activeTab === "all" ? true : r.status === activeTab
  )

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Refund ID",
      sortable: true,
      render: (row: Refund) => (
        <div>
          <p className="font-medium text-gray-900">{row.id}</p>
          <p className="text-xs text-gray-500">{row.orderId}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      sortable: true,
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      align: "right",
      render: (row: Refund) => (
        <span className="font-medium text-gray-900">₹{row.amount.toLocaleString()}</span>
      ),
    },
    {
      key: "method",
      header: "Refund Method",
      render: (row: Refund) => {
        const config = methodConfig[row.method]
        return (
          <Badge variant="outline" className={config.class}>
            {config.label}
          </Badge>
        )
      },
    },
    {
      key: "reason",
      header: "Reason",
      render: (row: Refund) => (
        <p className="text-sm text-gray-600">{row.reason}</p>
      ),
    },
    {
      key: "requestedAt",
      header: "Requested",
      sortable: true,
      render: (row: Refund) => (
        <div>
          <p className="text-sm text-gray-900">{row.requestedAt}</p>
          {row.processedAt && (
            <p className="text-xs text-gray-500">Processed: {row.processedAt}</p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Refund) => {
        const config = statusConfig[row.status]
        const Icon = config.icon
        return (
          <Badge variant="outline" className={config.class}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        )
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (row: Refund) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          {row.status === "pending" && (
            <Button size="sm">
              Process
            </Button>
          )}
          {row.status === "failed" && (
            <Button size="sm" variant="outline">
              Retry
            </Button>
          )}
        </div>
      ),
    },
  ]

  const totalRefunded = refunds
    .filter(r => r.status === "completed")
    .reduce((sum, r) => sum + r.amount, 0)

  const totalPending = refunds
    .filter(r => r.status === "pending" || r.status === "processing")
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Refunds</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all refund requests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-500">Total Refunded</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalRefunded.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">
              {refunds.filter(r => r.status === "completed").length} completed refunds
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-500">Pending Refunds</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalPending.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">
              {refunds.filter(r => r.status === "pending" || r.status === "processing").length} pending
            </p>
          </div>
        </Card>
      </div>

      {/* Info Banner */}
      <InfoBanner
        type="info"
        title="Refund Processing"
        description="Refunds are typically processed within 5-7 business days. Bank transfers may take additional 2-3 days to reflect in customer accounts."
      />

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="underline" />

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={filteredRefunds}
            columns={columns}
            selectable
            selectedRows={selected}
            onSelectionChange={setSelected}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={10}
            searchPlaceholder="Search by refund ID, order ID, customer..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
