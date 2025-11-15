"use client"

import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Modal } from "@/shared/components/common/Modal"
import { StatsGrid } from "@/shared/components/common/StatsGrid"
import { Tabs } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Textarea } from "@/shared/components/form/Textarea"
import {
  AlertTriangle,
  CheckCircle,
  MapPin,
  Phone,
  RotateCcw,
  XCircle,
} from "lucide-react"
import { useState } from "react"

const ndrOrders = [
  {
    id: "ORD-12345",
    awb: "BD123456789",
    customer: "Rajesh Kumar",
    phone: "+91 98765 43210",
    address: "123, MG Road, Mumbai",
    reason: "Customer not available",
    attempts: 2,
    lastAttempt: "2024-11-15 03:30 PM",
    status: "pending",
    courier: "BlueDart",
  },
  {
    id: "ORD-12346",
    awb: "DLV987654321",
    customer: "Priya Sharma",
    phone: "+91 98765 43211",
    address: "456, Park Street, Delhi",
    reason: "Address incomplete",
    attempts: 1,
    lastAttempt: "2024-11-15 02:15 PM",
    status: "pending",
    courier: "Delhivery",
  },
  {
    id: "ORD-12347",
    awb: "DTDC456789123",
    customer: "Amit Patel",
    phone: "+91 98765 43212",
    address: "789, FC Road, Pune",
    reason: "Refused by customer",
    attempts: 3,
    lastAttempt: "2024-11-14 05:45 PM",
    status: "rto_initiated",
    courier: "DTDC",
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

export default function NDRManagementPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [selected, setSelected] = useState(new Set<string>())
  const [actionModal, setActionModal] = useState<{
    open: boolean
    action: "reattempt" | "rto" | "update" | null
    order: any
  }>({
    open: false,
    action: null,
    order: null,
  })
  const [formData, setFormData] = useState({
    newPhone: "",
    newAddress: "",
    reattemptDate: "",
    remarks: "",
  })

  const handleAction = (action: "reattempt" | "rto" | "update", order: any) => {
    setActionModal({ open: true, action, order })
  }

  const handleSubmitAction = () => {
    console.log("Action:", actionModal.action, formData)
    setActionModal({ open: false, action: null, order: null })
    setFormData({ newPhone: "", newAddress: "", reattemptDate: "", remarks: "" })
  }

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Order ID",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.id}</p>
          <p className="text-xs text-gray-500">{row.awb}</p>
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
          <p className="text-xs text-gray-500">{row.phone}</p>
        </div>
      ),
    },
    {
      key: "address",
      header: "Address",
      render: (row) => (
        <div className="flex items-start gap-1 max-w-xs">
          <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-2">{row.address}</p>
        </div>
      ),
    },
    {
      key: "reason",
      header: "NDR Reason",
      render: (row) => (
        <div className="flex items-start gap-1">
          <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-900">{row.reason}</span>
        </div>
      ),
    },
    {
      key: "attempts",
      header: "Attempts",
      align: "center",
      render: (row) => (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          {row.attempts}/3
        </Badge>
      ),
    },
    {
      key: "lastAttempt",
      header: "Last Attempt",
      sortable: true,
      render: (row) => (
        <span className="text-sm text-gray-600">{row.lastAttempt}</span>
      ),
    },
    {
      key: "courier",
      header: "Courier",
      render: (row) => (
        <span className="text-sm text-gray-900">{row.courier}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "200px",
      render: (row) => (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleAction("reattempt", row)
            }}
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Retry
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleAction("update", row)
            }}
          >
            Update
          </Button>
        </div>
      ),
    },
  ]

  const tabs = [
    { label: "Pending", value: "pending", badge: 5 },
    { label: "Reattempt Scheduled", value: "reattempt", badge: 3 },
    { label: "RTO Initiated", value: "rto", badge: 2 },
    { label: "Resolved", value: "resolved", badge: 12 },
  ]

  // Stats - UPDATED
  const stats = [
    {
      label: "Total NDR",
      value: "22",
      icon: AlertTriangle,
    },
    {
      label: "Pending Action",
      value: "5",
      icon: XCircle,
    },
    {
      label: "Resolved",
      value: "12",
      icon: CheckCircle,
    },
    {
      label: "RTO Initiated",
      value: "2",
      icon: RotateCcw,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">NDR Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage failed delivery attempts and schedule reattempts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Bulk Contact
          </Button>
        </div>
      </div>

      {/* Stats Cards - UPDATED */}
      <StatsGrid stats={stats} columns={4} />

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {/* Table */}
      <DataTable
        data={ndrOrders}
        columns={columns}
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
        searchable
        clientSort
        clientSearch
        clientPagination
        pageSize={10}
        searchPlaceholder="Search by order ID, customer, phone..."
        actions={
          selected.size > 0 ? (
            <div className="flex items-center gap-2">
              <Button variant="default">
                Schedule Reattempt ({selected.size})
              </Button>
              <Button variant="outline">
                Initiate RTO ({selected.size})
              </Button>
            </div>
          ) : null
        }
      />

      {/* Reattempt Modal - UPDATED */}
      <Modal
        open={actionModal.open && actionModal.action === "reattempt"}
        onOpenChange={(open) => setActionModal({ ...actionModal, open })}
        title="Schedule Reattempt"
        description={`Order: ${actionModal.order?.id}`}
        size="md"
        showCancel
        showConfirm
        confirmLabel="Schedule Reattempt"
        onConfirm={handleSubmitAction}
      >
        <div className="space-y-4">
          <Input
            label="Reattempt Date"
            type="date"
            value={formData.reattemptDate}
            onChange={(e) => setFormData({ ...formData, reattemptDate: e.target.value })}
          />
          <Textarea
            label="Remarks (Optional)"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            placeholder="Add any special instructions..."
          />
        </div>
      </Modal>

      {/* Update Details Modal - UPDATED */}
      <Modal
        open={actionModal.open && actionModal.action === "update"}
        onOpenChange={(open) => setActionModal({ ...actionModal, open })}
        title="Update Delivery Details"
        description={`Order: ${actionModal.order?.id}`}
        size="md"
        showCancel
        showConfirm
        confirmLabel="Update Details"
        onConfirm={handleSubmitAction}
      >
        <div className="space-y-4">
          <Input
            label="Updated Phone Number"
            value={formData.newPhone}
            onChange={(e) => setFormData({ ...formData, newPhone: e.target.value })}
            placeholder="+91 98765 43210"
          />
          <Textarea
            label="Updated Address"
            value={formData.newAddress}
            onChange={(e) => setFormData({ ...formData, newAddress: e.target.value })}
            placeholder="Enter complete address..."
          />
          <Textarea
            label="Remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            placeholder="Reason for update..."
          />
        </div>
      </Modal>

      {/* RTO Confirmation Modal - UPDATED */}
      <Modal
        open={actionModal.open && actionModal.action === "rto"}
        onOpenChange={(open) => setActionModal({ ...actionModal, open })}
        title="Confirm RTO"
        description={`Order: ${actionModal.order?.id}`}
        size="md"
        showCancel
        showConfirm
        confirmLabel="Confirm RTO"
        confirmVariant="destructive"
        onConfirm={handleSubmitAction}
      >
        <InfoBanner
          type="warning"
          title="This action cannot be undone"
          description="This will initiate return to origin. The package will be sent back to your warehouse."
        />
      </Modal>
    </div>
  )
}
