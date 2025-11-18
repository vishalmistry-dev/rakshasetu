"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { Button } from "@/shared/components/form/Button"
import {
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  XCircle
} from "lucide-react"
import { useState } from "react"

type Pickup = {
  id: string
  date: string
  time: string
  courier: string
  location: string
  shipments: number
  status: "completed" | "cancelled" | "pending" | "missed"
  completedAt?: string
}

const mockPickups: Pickup[] = [
  {
    id: "PU-001",
    date: "2024-11-16",
    time: "10:00 AM",
    courier: "BlueDart",
    location: "Main Warehouse",
    shipments: 25,
    status: "completed",
    completedAt: "10:15 AM",
  },
  {
    id: "PU-002",
    date: "2024-11-15",
    time: "02:00 PM",
    courier: "Delhivery",
    location: "Main Warehouse",
    shipments: 18,
    status: "completed",
    completedAt: "02:20 PM",
  },
  {
    id: "PU-003",
    date: "2024-11-14",
    time: "11:00 AM",
    courier: "DTDC",
    location: "Secondary Warehouse",
    shipments: 12,
    status: "missed",
  },
]

const statusConfig = {
  completed: { label: "Completed", class: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  cancelled: { label: "Cancelled", class: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  pending: { label: "Pending", class: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Clock },
  missed: { label: "Missed", class: "bg-orange-50 text-orange-700 border-orange-200", icon: XCircle },
}

export default function PickupHistoryPage() {
  const [selected, setSelected] = useState(new Set<string>())

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Pickup ID",
      sortable: true,
      render: (row: Pickup) => (
        <div>
          <p className="font-medium text-gray-900">{row.id}</p>
          <p className="text-xs text-gray-500">{row.courier}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date & Time",
      sortable: true,
      render: (row: Pickup) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <div>
            <p className="text-sm text-gray-900">{row.date}</p>
            <p className="text-xs text-gray-500">{row.time}</p>
          </div>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (row: Pickup) => (
        <span className="text-sm text-gray-900">{row.location}</span>
      ),
    },
    {
      key: "shipments",
      header: "Shipments",
      align: "center",
      render: (row: Pickup) => (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          {row.shipments} packages
        </Badge>
      ),
    },
    {
      key: "completedAt",
      header: "Completed At",
      render: (row: Pickup) => (
        <span className="text-sm text-gray-600">{row.completedAt || "—"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Pickup) => {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pickup History</h1>
          <p className="text-sm text-gray-500 mt-1">
            View all scheduled and completed pickups
          </p>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={mockPickups}
            columns={columns}
            selectable
            selectedRows={selected}
            onSelectionChange={setSelected}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={10}
            searchPlaceholder="Search by pickup ID, courier, location..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
