"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Tabs } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import {
  CheckCircle,
  Download,
  FileText,
  Package,
  Printer,
  Upload,
} from "lucide-react"
import { useState } from "react"

const readyOrders = [
  {
    id: "ORD-12345",
    customer: "Rajesh Kumar",
    address: "Mumbai, MH",
    items: 3,
    weight: "2.5 kg",
    dimensions: "30x20x15",
    cod: true,
    amount: 3499,
    labelGenerated: false,
  },
  {
    id: "ORD-12346",
    customer: "Priya Sharma",
    address: "Delhi, DL",
    items: 1,
    weight: "3.8 kg",
    dimensions: "45x35x10",
    cod: false,
    amount: 15999,
    labelGenerated: false,
  },
  {
    id: "ORD-12347",
    customer: "Amit Patel",
    address: "Pune, MH",
    items: 5,
    weight: "1.2 kg",
    dimensions: "25x25x20",
    cod: true,
    amount: 2199,
    labelGenerated: true,
  },
]

export default function GenerateLabelsPage() {
  const [activeTab, setActiveTab] = useState("ready")
  const [selected, setSelected] = useState(new Set<string>())

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Order ID",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.id}</p>
          <p className="text-xs text-gray-500">{row.items} items</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.customer}</p>
          <p className="text-xs text-gray-500">{row.address}</p>
        </div>
      ),
    },
    {
      key: "dimensions",
      header: "Package Details",
      render: (row) => (
        <div className="text-sm">
          <p className="text-gray-900">{row.dimensions} cm</p>
          <p className="text-gray-500">{row.weight}</p>
        </div>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      render: (row) => (
        <div>
          <Badge
            variant="outline"
            className={
              row.cod
                ? "bg-orange-50 text-orange-700 border-orange-200"
                : "bg-green-50 text-green-700 border-green-200"
            }
          >
            {row.cod ? "COD" : "Prepaid"}
          </Badge>
          {row.cod && (
            <p className="text-xs text-gray-500 mt-1">₹{row.amount.toLocaleString()}</p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Label Status",
      align: "center",
      render: (row) => (
        row.labelGenerated ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Generated
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Pending
          </Badge>
        )
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "150px",
      render: (row) => (
        <div className="flex items-center gap-1">
          {row.labelGenerated ? (
            <>
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm">
              <FileText className="h-3 w-3 mr-1" />
              Generate
            </Button>
          )}
        </div>
      ),
    },
  ]

  const tabs = [
    { label: "Ready to Ship", value: "ready", badge: 23 },
    { label: "Label Generated", value: "generated", badge: 45 },
    { label: "All Orders", value: "all", badge: 68 },
  ]

  // Stats - UPDATED
  const stats = [
    {
      label: "Ready to Ship",
      value: "23",
      icon: Package,
    },
    {
      label: "Labels Generated",
      value: "45",
      icon: CheckCircle,
    },
    {
      label: "COD Orders",
      value: "12",
      icon: FileText,
    },
    {
      label: "Prepaid Orders",
      value: "11",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate Shipping Labels</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and download shipping labels for your orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </div>

      {/* Instructions - UPDATED */}
      <InfoBanner
        type="info"
        title="Quick Guide"
      >
        <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
          <li>Select orders from the list below</li>
          <li>Click "Generate Labels" to create shipping labels</li>
          <li>Download labels individually or in bulk</li>
          <li>Print labels on A4 or thermal paper (4x6 inches)</li>
        </ul>
      </InfoBanner>

      {/* Stats - UPDATED */}
      <StatsGrid stats={stats} columns={4} />

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {/* Table */}
      <DataTable
        data={readyOrders}
        columns={columns}
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
        searchable
        clientSort
        clientSearch
        clientPagination
        pageSize={10}
        searchPlaceholder="Search by order ID, customer..."
        actions={
          selected.size > 0 ? (
            <div className="flex items-center gap-2">
              <Button variant="default">
                <FileText className="h-4 w-4 mr-2" />
                Generate Labels ({selected.size})
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print All
              </Button>
            </div>
          ) : null
        }
      />
    </div>
  )
}
