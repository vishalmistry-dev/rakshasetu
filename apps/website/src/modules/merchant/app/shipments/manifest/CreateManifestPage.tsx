"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import {
  CheckCircle,
  Clock,
  Download,
  FileText,
  Plus,
  Printer
} from "lucide-react"
import { useState } from "react"

type Manifest = {
  id: string
  date: string
  courier: string
  shipments: number
  status: "draft" | "submitted" | "confirmed"
  pickupDate: string
}

const mockManifests: Manifest[] = [
  {
    id: "MAN-001",
    date: "2024-11-16",
    courier: "BlueDart",
    shipments: 25,
    status: "confirmed",
    pickupDate: "2024-11-16 10:00 AM",
  },
  {
    id: "MAN-002",
    date: "2024-11-15",
    courier: "Delhivery",
    shipments: 18,
    status: "submitted",
    pickupDate: "2024-11-15 02:00 PM",
  },
  {
    id: "MAN-003",
    date: "2024-11-16",
    courier: "DTDC",
    shipments: 12,
    status: "draft",
    pickupDate: "2024-11-16 03:00 PM",
  },
]

const courierOptions = [
  { value: "bluedart", label: "BlueDart" },
  { value: "delhivery", label: "Delhivery" },
  { value: "dtdc", label: "DTDC" },
]

const statusConfig = {
  draft: { label: "Draft", class: "bg-gray-50 text-gray-700 border-gray-200", icon: Clock },
  submitted: { label: "Submitted", class: "bg-blue-50 text-blue-700 border-blue-200", icon: FileText },
  confirmed: { label: "Confirmed", class: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
}

export default function CreateManifestPage() {
  const [selected, setSelected] = useState(new Set<string>())
  const [courier, setCourier] = useState("")
  const [pickupDate, setPickupDate] = useState("")

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Manifest ID",
      sortable: true,
      render: (row: Manifest) => (
        <div>
          <p className="font-medium text-gray-900">{row.id}</p>
          <p className="text-xs text-gray-500">{row.date}</p>
        </div>
      ),
    },
    {
      key: "courier",
      header: "Courier",
      sortable: true,
    },
    {
      key: "shipments",
      header: "Shipments",
      align: "center",
      render: (row: Manifest) => (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          {row.shipments} packages
        </Badge>
      ),
    },
    {
      key: "pickupDate",
      header: "Pickup Date",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (row: Manifest) => {
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
      render: (row: Manifest) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Manifest</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate courier manifests for pickup requests
          </p>
        </div>
      </div>

      {/* Info */}
      <InfoBanner
        type="info"
        title="What is a Manifest?"
        description="A manifest is a list of all shipments being handed over to a courier partner. It's required for courier pickup and tracking."
      />

      {/* Create New Manifest */}
      <Card>
        <CardHeader
          title="New Manifest"
          description="Select courier and pickup date to create manifest"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Courier Partner"
              options={courierOptions}
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              placeholder="Select courier"
            />
            <Input
              label="Pickup Date"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
            <div className="flex items-end">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Manifest
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Manifests */}
      <Card>
        <CardHeader title="Recent Manifests" />
        <CardContent className="p-0">
          <DataTable
            data={mockManifests}
            columns={columns}
            selectable
            selectedRows={selected}
            onSelectionChange={setSelected}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={10}
            searchPlaceholder="Search by manifest ID, courier..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
