"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Button } from "@/shared/components/form/Button"
import {
  AlertTriangle,
  Clock,
  Eye,
  MapPin,
  Phone
} from "lucide-react"
import { useState } from "react"

type DelayedShipment = {
  id: string
  orderId: string
  awb: string
  customer: string
  destination: string
  courier: string
  expectedDate: string
  delayedBy: string
  currentStatus: string
  lastUpdate: string
}

const mockDelayed: DelayedShipment[] = [
  {
    id: "DEL-001",
    orderId: "ORD-12345",
    awb: "BD123456789",
    customer: "Rajesh Kumar",
    destination: "Mumbai, MH",
    courier: "BlueDart",
    expectedDate: "2024-11-14",
    delayedBy: "3 days",
    currentStatus: "In transit - Delayed due to weather",
    lastUpdate: "2024-11-16 10:30 AM",
  },
  {
    id: "DEL-002",
    orderId: "ORD-12346",
    awb: "DLV987654321",
    customer: "Priya Sharma",
    destination: "Delhi, DL",
    courier: "Delhivery",
    expectedDate: "2024-11-15",
    delayedBy: "2 days",
    currentStatus: "At sorting facility",
    lastUpdate: "2024-11-16 02:15 PM",
  },
  {
    id: "DEL-003",
    orderId: "ORD-12340",
    awb: "DTDC456789123",
    customer: "Amit Patel",
    destination: "Pune, MH",
    courier: "DTDC",
    expectedDate: "2024-11-13",
    delayedBy: "5 days",
    currentStatus: "Vehicle breakdown - New carrier assigned",
    lastUpdate: "2024-11-15 05:45 PM",
  },
]

export function DelayedIssues() {
  const [selected, setSelected] = useState(new Set<string>())

  const stats = [
    {
      label: "Total Delayed",
      value: "24",
      icon: Clock,
    },
    {
      label: "1-2 Days",
      value: "12",
      icon: Clock,
    },
    {
      label: "3-5 Days",
      value: "8",
      icon: AlertTriangle,
    },
    {
      label: "5+ Days",
      value: "4",
      icon: AlertTriangle,
    },
  ]

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Tracking ID",
      sortable: true,
      render: (row: DelayedShipment) => (
        <div>
          <p className="font-medium text-gray-900">{row.orderId}</p>
          <p className="text-xs text-gray-500">{row.awb}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      sortable: true,
      render: (row: DelayedShipment) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{row.customer}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            {row.destination}
          </div>
        </div>
      ),
    },
    {
      key: "courier",
      header: "Courier",
    },
    {
      key: "expectedDate",
      header: "Expected Date",
      sortable: true,
      render: (row: DelayedShipment) => (
        <div>
          <p className="text-sm text-gray-900">{row.expectedDate}</p>
          <p className="text-xs text-red-600">Delayed by {row.delayedBy}</p>
        </div>
      ),
    },
    {
      key: "currentStatus",
      header: "Current Status",
      render: (row: DelayedShipment) => (
        <div>
          <p className="text-sm text-gray-900">{row.currentStatus}</p>
          <p className="text-xs text-gray-500">{row.lastUpdate}</p>
        </div>
      ),
    },
    {
      key: "delay",
      header: "Delay",
      align: "center",
      render: (row: DelayedShipment) => {
        const days = parseInt(row.delayedBy)
        const color = days >= 5 ? "bg-red-50 text-red-700 border-red-200" :
          days >= 3 ? "bg-orange-50 text-orange-700 border-orange-200" :
            "bg-yellow-50 text-yellow-700 border-yellow-200"
        return (
          <Badge variant="outline" className={color}>
            {row.delayedBy}
          </Badge>
        )
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
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
            data={mockDelayed}
            columns={columns}
            selectable
            selectedRows={selected}
            onSelectionChange={setSelected}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={10}
            searchPlaceholder="Search by order ID, AWB, customer..."
            actions={
              selected.size > 0 ? (
                <Button variant="default">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Customers ({selected.size})
                </Button>
              ) : null
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
