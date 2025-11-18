"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Button } from "@/shared/components/form/Button"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Receipt
} from "lucide-react"
import { useState } from "react"

type Invoice = {
  id: string
  courier: string
  period: string
  totalShipments: number
  amount: number
  status: "pending" | "paid" | "overdue"
  dueDate: string
  paidDate?: string
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    courier: "BlueDart",
    period: "Nov 1-15, 2024",
    totalShipments: 145,
    amount: 25680,
    status: "paid",
    dueDate: "2024-11-20",
    paidDate: "2024-11-18",
  },
  {
    id: "INV-002",
    courier: "Delhivery",
    period: "Nov 1-15, 2024",
    totalShipments: 98,
    amount: 18490,
    status: "pending",
    dueDate: "2024-11-25",
  },
  {
    id: "INV-003",
    courier: "DTDC",
    period: "Oct 16-31, 2024",
    totalShipments: 67,
    amount: 12340,
    status: "overdue",
    dueDate: "2024-11-10",
  },
]

const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Clock },
  paid: { label: "Paid", class: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  overdue: { label: "Overdue", class: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle },
}

export default function ShippingInvoicesPage() {
  const [selected, setSelected] = useState(new Set<string>())

  const stats = [
    {
      label: "Total Invoices",
      value: "18",
      icon: Receipt,
    },
    {
      label: "Pending Payment",
      value: "₹32,490",
      icon: Clock,
    },
    {
      label: "Paid This Month",
      value: "₹1,45,680",
      icon: CheckCircle,
    },
    {
      label: "Overdue",
      value: "₹12,340",
      icon: AlertTriangle,
    },
  ]

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Invoice ID",
      sortable: true,
      render: (row: Invoice) => (
        <div>
          <p className="font-medium text-gray-900">{row.id}</p>
          <p className="text-xs text-gray-500">{row.courier}</p>
        </div>
      ),
    },
    {
      key: "period",
      header: "Billing Period",
      sortable: true,
    },
    {
      key: "totalShipments",
      header: "Shipments",
      align: "center",
      render: (row: Invoice) => (
        <span className="text-sm text-gray-900">{row.totalShipments}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      align: "right",
      render: (row: Invoice) => (
        <span className="font-medium text-gray-900">₹{row.amount.toLocaleString()}</span>
      ),
    },
    {
      key: "dueDate",
      header: "Due Date",
      sortable: true,
      render: (row: Invoice) => (
        <div>
          <p className="text-sm text-gray-900">{row.dueDate}</p>
          {row.paidDate && (
            <p className="text-xs text-gray-500">Paid: {row.paidDate}</p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Invoice) => {
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
      render: (row: Invoice) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          {row.status === "pending" && (
            <Button size="sm">
              Pay Now
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipping Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage courier invoices
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} columns={4} />

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={mockInvoices}
            columns={columns}
            selectable
            selectedRows={selected}
            onSelectionChange={setSelected}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={10}
            searchPlaceholder="Search by invoice ID, courier..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
