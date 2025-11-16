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
  MessageSquare,
  XCircle
} from "lucide-react"
import { useState } from "react"

type Dispute = {
  id: string
  orderId: string
  customer: string
  reason: string
  amount: number
  status: "pending" | "under_review" | "resolved" | "rejected"
  createdAt: string
  lastUpdate: string
}

const mockDisputes: Dispute[] = [
  {
    id: "DSP-001",
    orderId: "ORD-12345",
    customer: "Rajesh Kumar",
    reason: "Product not as described",
    amount: 3499,
    status: "pending",
    createdAt: "2024-11-16",
    lastUpdate: "2 hours ago",
  },
  {
    id: "DSP-002",
    orderId: "ORD-12346",
    customer: "Priya Sharma",
    reason: "Damaged product received",
    amount: 15999,
    status: "under_review",
    createdAt: "2024-11-15",
    lastUpdate: "1 day ago",
  },
  {
    id: "DSP-003",
    orderId: "ORD-12340",
    customer: "Amit Patel",
    reason: "Wrong item delivered",
    amount: 2199,
    status: "resolved",
    createdAt: "2024-11-14",
    lastUpdate: "2 days ago",
  },
]

const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Clock },
  under_review: { label: "Under Review", class: "bg-blue-50 text-blue-700 border-blue-200", icon: MessageSquare },
  resolved: { label: "Resolved", class: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  rejected: { label: "Rejected", class: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
}

export default function DisputesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selected, setSelected] = useState(new Set<string>())
  const [disputes] = useState(mockDisputes)
  const [resolveModal, setResolveModal] = useState({ open: false, disputeId: "", resolution: "" })

  const tabs: Tab[] = [
    { label: "All", value: "all", badge: disputes.length },
    { label: "Pending", value: "pending", badge: disputes.filter(d => d.status === "pending").length },
    { label: "Under Review", value: "under_review", badge: disputes.filter(d => d.status === "under_review").length },
    { label: "Resolved", value: "resolved", badge: disputes.filter(d => d.status === "resolved").length },
  ]

  const filteredDisputes = disputes.filter(d =>
    activeTab === "all" ? true : d.status === activeTab
  )

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Dispute ID",
      sortable: true,
      render: (row: Dispute) => (
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
      key: "reason",
      header: "Dispute Reason",
      render: (row: Dispute) => (
        <p className="text-sm text-gray-900">{row.reason}</p>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      align: "right",
      render: (row: Dispute) => (
        <span className="font-medium text-gray-900">₹{row.amount.toLocaleString()}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (row: Dispute) => (
        <div>
          <p className="text-sm text-gray-900">{row.createdAt}</p>
          <p className="text-xs text-gray-500">{row.lastUpdate}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: Dispute) => {
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
      render: (row: Dispute) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          {row.status === "pending" && (
            <Button
              size="sm"
              onClick={() => setResolveModal({ open: true, disputeId: row.id, resolution: "" })}
            >
              Resolve
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
          <h1 className="text-2xl font-bold text-gray-900">Disputes</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer disputes and claims
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
        title="Dispute Resolution"
        description="Respond to disputes within 48 hours to maintain good customer relationships. Resolved disputes can help improve your seller rating."
      />

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="underline" />

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={filteredDisputes}
            columns={columns}
            selectable
            selectedRows={selected}
            onSelectionChange={setSelected}
            searchable
            clientSort
            clientSearch
            clientPagination
            pageSize={10}
            searchPlaceholder="Search by dispute ID, order ID, customer..."
          />
        </CardContent>
      </Card>

      {/* Resolve Modal */}
      <Modal
        open={resolveModal.open}
        onOpenChange={(open) => setResolveModal({ ...resolveModal, open })}
        title="Resolve Dispute"
        description="Provide resolution details for this dispute"
        showCancel
        showConfirm
        confirmLabel="Mark as Resolved"
        onConfirm={() => {
          console.log("Resolving dispute:", resolveModal)
          setResolveModal({ open: false, disputeId: "", resolution: "" })
        }}
      >
        <Textarea
          label="Resolution Details"
          placeholder="Describe how the dispute was resolved..."
          value={resolveModal.resolution}
          onChange={(e) => setResolveModal({ ...resolveModal, resolution: e.target.value })}
          rows={4}
        />
      </Modal>
    </div>
  )
}
