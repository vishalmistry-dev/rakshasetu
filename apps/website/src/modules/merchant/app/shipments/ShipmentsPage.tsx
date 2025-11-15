"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { Tabs } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Download, Filter, MapPin, Package } from "lucide-react"
import { useState } from "react"

const shipments = [
  {
    id: "SHP-001",
    orderId: "ORD-12345",
    customer: "Rajesh Kumar",
    courier: "BlueDart",
    awb: "BD123456789",
    status: "in_transit",
    origin: "Bangalore",
    destination: "Mumbai",
    expectedDelivery: "2024-11-17",
  },
  {
    id: "SHP-002",
    orderId: "ORD-12346",
    customer: "Priya Sharma",
    courier: "Delhivery",
    awb: "DLV987654321",
    status: "out_for_delivery",
    origin: "Delhi",
    destination: "Jaipur",
    expectedDelivery: "2024-11-16",
  },
  {
    id: "SHP-003",
    orderId: "ORD-12347",
    customer: "Amit Patel",
    courier: "DTDC",
    awb: "DTDC456789123",
    status: "delivered",
    origin: "Pune",
    destination: "Ahmedabad",
    expectedDelivery: "2024-11-15",
  },
]

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: "Pending", class: "bg-gray-50 text-gray-700 border-gray-200" },
  in_transit: { label: "In Transit", class: "bg-purple-50 text-purple-700 border-purple-200" },
  out_for_delivery: { label: "Out for Delivery", class: "bg-blue-50 text-blue-700 border-blue-200" },
  delivered: { label: "Delivered", class: "bg-green-50 text-green-700 border-green-200" },
  ndr: { label: "NDR", class: "bg-red-50 text-red-700 border-red-200" },
  rto: { label: "RTO", class: "bg-orange-50 text-orange-700 border-orange-200" },
}

export default function ShipmentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selected, setSelected] = useState(new Set<string>())

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Shipment ID",
      sortable: true,
      render: (row) => (
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
      key: "courier",
      header: "Courier",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.courier}</p>
          <p className="text-xs text-gray-500">{row.awb}</p>
        </div>
      ),
    },
    {
      key: "route",
      header: "Route",
      render: (row) => (
        <div className="flex items-center gap-1 text-sm">
          <span className="text-gray-900">{row.origin}</span>
          <span className="text-gray-400">→</span>
          <span className="text-gray-900">{row.destination}</span>
        </div>
      ),
    },
    {
      key: "expectedDelivery",
      header: "Expected Delivery",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-900">
          {new Date(row.expectedDelivery).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const config = statusConfig[row.status]
        return (
          <Badge variant="outline" className={config.class}>
            {config.label}
          </Badge>
        )
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "100px",
      render: () => (
        <Button variant="ghost" size="sm">
          <MapPin className="h-4 w-4 mr-2" />
          Track
        </Button>
      ),
    },
  ]

  const tabs = [
    { label: "All", value: "all", badge: 156 },
    { label: "In Transit", value: "in_transit", badge: 89 },
    { label: "Out for Delivery", value: "out_for_delivery", badge: 34 },
    { label: "Delivered", value: "delivered", badge: 120 },
    { label: "NDR", value: "ndr", badge: 8 },
    { label: "RTO", value: "rto", badge: 5 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage all your shipments
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

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {/* Table */}
      <DataTable
        data={shipments}
        columns={columns}
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
        searchable
        clientSort
        clientSearch
        clientPagination
        pageSize={10}
        searchPlaceholder="Search by shipment ID, AWB, customer..."
        actions={
          selected.size > 0 ? (
            <Button variant="default">
              <Package className="h-4 w-4 mr-2" />
              Generate Manifest ({selected.size})
            </Button>
          ) : null
        }
      />
    </div>
  )
}
