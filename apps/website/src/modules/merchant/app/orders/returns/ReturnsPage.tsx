"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Modal } from "@/shared/components/common/Modal"
import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Textarea } from "@/shared/components/form/Textarea"
import {
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  Package,
  XCircle
} from "lucide-react"
import { useState } from "react"

type Return = {
  id: string
  orderId: string
  customer: string
  items: string
  reason: string
  amount: number
  status: "requested" | "approved" | "rejected" | "received" | "completed"
  requestedAt: string
}

const mockReturns: Return[] = [
  {
    id: "RET-001",
    orderId: "ORD-12345",
    customer: "Rajesh Kumar",
    items: "Wireless Headphones (1)",
    reason: "Defective product",
    amount: 3499,
    status: "requested",
    requestedAt: "2024-11-16",
  },
  {
    id: "RET-002",
    orderId: "ORD-12346",
    customer: "Priya Sharma",
    items: "Smart Watch (1)",
    reason: "Changed mind",
    amount: 15999,
    status: "approved",
    requestedAt: "2024-11-15",
  },
  {
    id: "RET-003",
    orderId: "ORD-12340",
    customer: "Amit Patel",
    items: "Laptop Stand (2)",
    reason: "Wrong item received",
    amount: 2199,
    status: "completed",
    requestedAt: "2024-11-14",
  },
]

const statusConfig = {
  requested: { label: "Requested", class: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Clock },
  approved: { label: "Approved", class: "bg-blue-50 text-blue-700 border-blue-200", icon: CheckCircle },
  rejected: { label: "Rejected", class: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
  received: { label: "Received", class: "bg-purple-50 text-purple-700 border-purple-200", icon: Package },
  completed: { label: "Completed", class: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
}

const actionOptions = [
  { value: "approve", label: "Approve Return" },
  { value: "reject", label: "Reject Return" },
]

export default function ReturnsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selected, setSelected] = useState(new Set<string>())
  const [returns] = useState(mockReturns)
  const [actionModal, setActionModal] = useState({
    open: false,
    returnId: "",
    action: "",
    reason: ""
  })

  const tabs: Tab[] = [
    { label: "All", value: "all", badge: returns.length },
    { label: "Requested", value: "requested", badge: returns.filter(r => r.status === "requested").length },
    { label: "Approved", value: "approved", badge: returns.filter(r => r.status === "approved").length },
    { label: "Received", value: "received", badge: returns.filter(r => r.status === "received").length },
    { label: "Completed", value: "completed", badge: returns.filter(r => r.status === "completed").length },
  ]

  const filteredReturns = returns.filter(r =>
    activeTab === "all" ? true : r.status === activeTab
  )

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Return ID",
      sortable: true,
      render: (row: Return) => (
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
      key: "items",
      header: "Items",
      render: (row: Return) => (
        <p className="text-sm text-gray-900">{row.items}</p>
      ),
    },
    {
      key: "reason",
      header: "Return Reason",
      render: (row: Return) => (
        <p className="text-sm text-gray-600">{row.reason}</p>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      align: "right",
      render: (row: Return) => (
        <span className="font-medium text-gray-900">₹{row.amount.toLocaleString()}</span>
      ),
    },
    {
      key: "requestedAt",
      header: "Requested At",
      sortable: true,
      render: (row: Return) => (
        <span className="text-sm text-gray-600">{row.requestedAt}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Return) => {
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
      render: (row: Return) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          {row.status === "requested" && (
            <>
              <Button
                size="sm"
                onClick={() => setActionModal({
                  open: true,
                  returnId: row.id,
                  action: "approve",
                  reason: ""
                })}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActionModal({
                  open: true,
                  returnId: row.id,
                  action: "reject",
                  reason: ""
                })}
              >
                Reject
              </Button>
            </>
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
          <h1 className="text-2xl font-bold text-gray-900">Return Requests</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer return requests
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

      {/* Info Banner */}
      <InfoBanner
        type="info"
        title="Return Policy"
        description="Review return requests within 24 hours. Approved returns must be received within 7 days for refund processing."
      />

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="underline" />

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={filteredReturns}
            columns={columns}
            selectable
            selectedRows={selected}
            onSelectionChange={setSelected}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={10}
            searchPlaceholder="Search by return ID, order ID, customer..."
          />
        </CardContent>
      </Card>

      {/* Action Modal */}
      <Modal
        open={actionModal.open}
        onOpenChange={(open) => setActionModal({ ...actionModal, open })}
        title={actionModal.action === "approve" ? "Approve Return" : "Reject Return"}
        description={`Provide details for ${actionModal.action === "approve" ? "approving" : "rejecting"} this return request`}
        showCancel
        showConfirm
        confirmLabel={actionModal.action === "approve" ? "Approve" : "Reject"}
        confirmVariant={actionModal.action === "reject" ? "destructive" : "default"}
        onConfirm={() => {
          console.log("Processing return action:", actionModal)
          setActionModal({ open: false, returnId: "", action: "", reason: "" })
        }}
      >
        <Textarea
          label="Reason/Notes"
          placeholder={`Explain why this return is being ${actionModal.action === "approve" ? "approved" : "rejected"}...`}
          value={actionModal.reason}
          onChange={(e) => setActionModal({ ...actionModal, reason: e.target.value })}
          rows={4}
        />
      </Modal>
    </div>
  )
}
