"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Button } from "@/shared/components/form/Button"
import {
  CheckCircle,
  Clock,
  Eye,
  Package,
  RotateCcw
} from "lucide-react"
import { useState } from "react"

type RTOShipment = {
  id: string
  orderId: string
  awb: string
  customer: string
  courier: string
  reason: string
  status: "initiated" | "in_transit" | "received" | "refunded"
  initiatedDate: string
  expectedReturn: string
  refundAmount: number
}

const mockRTO: RTOShipment[] = [
  {
    id: "RTO-001",
    orderId: "ORD-12345",
    awb: "BD123456789",
    customer: "Rajesh Kumar",
    courier: "BlueDart",
    reason: "Customer refused",
    status: "initiated",
    initiatedDate: "2024-11-15",
    expectedReturn: "2024-11-20",
    refundAmount: 3499,
  },
  {
    id: "RTO-002",
    orderId: "ORD-12346",
    awb: "DLV987654321",
    customer: "Priya Sharma",
    courier: "Delhivery",
    reason: "Multiple failed attempts",
    status: "in_transit",
    initiatedDate: "2024-11-14",
    expectedReturn: "2024-11-19",
    refundAmount: 15999,
  },
  {
    id: "RTO-003",
    orderId: "ORD-12340",
    awb: "DTDC456789123",
    customer: "Amit Patel",
    courier: "DTDC",
    reason: "Address incorrect",
    status: "received",
    initiatedDate: "2024-11-10",
    expectedReturn: "2024-11-15",
    refundAmount: 2199,
  },
]

const statusConfig = {
  initiated: { label: "Initiated", class: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Clock },
  in_transit: { label: "In Transit", class: "bg-blue-50 text-blue-700 border-blue-200", icon: Package },
  received: { label: "Received", class: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  refunded: { label: "Refunded", class: "bg-purple-50 text-purple-700 border-purple-200", icon: CheckCircle },
}

export function RTOIssues() {
  const [selected, setSelected] = useState(new Set<string>())

  const stats = [
    {
      label: "Total RTO",
      value: "18",
      icon: RotateCcw,
    },
    {
      label: "In Transit",
      value: "5",
      icon: Package,
    },
    {
      label: "Received",
      value: "8",
      icon: CheckCircle,
    },
    {
      label: "Pending Refund",
      value: "3",
      icon: Clock,
    },
  ]

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "RTO ID",
      sortable: true,
      render: (row: RTOShipment) => (
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
      key: "awb",
      header: "AWB Number",
      render: (row: RTOShipment) => (
        <div>
          <p className="text-sm text-gray-900">{row.awb}</p>
          <p className="text-xs text-gray-500">{row.courier}</p>
        </div>
      ),
    },
    {
      key: "reason",
      header: "RTO Reason",
      render: (row: RTOShipment) => (
        <span className="text-sm text-gray-600">{row.reason}</span>
      ),
    },
    {
      key: "dates",
      header: "Dates",
      render: (row: RTOShipment) => (
        <div className="text-xs">
          <p className="text-gray-900">Initiated: {row.initiatedDate}</p>
          <p className="text-gray-500">Expected: {row.expectedReturn}</p>
        </div>
      ),
    },
    {
      key: "refundAmount",
      header: "Refund Amount",
      align: "right",
      render: (row: RTOShipment) => (
        <span className="font-medium text-gray-900">₹{row.refundAmount.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: RTOShipment) => {
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
      render: () => (
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsGrid stats={stats} columns={4} />

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={mockRTO}
            columns={columns}
            selectable
            selectedRows={selected}
            onSelectionChange={setSelected}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={10}
            searchPlaceholder="Search by RTO ID, order ID, AWB..."
            actions={
              selected.size > 0 ? (
                <Button variant="default">
                  Process Refund ({selected.size})
                </Button>
              ) : null
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
