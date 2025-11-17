"use client"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { Tabs } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  Ban,
  Download,
  Eye,
  Filter,
  MoreVertical,
  Package,
  Pencil,
  Truck
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

// Mock data
const mockOrders = [
  {
    id: "ORD-12345",
    customer: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    address: "123, MG Road, Bangalore, Karnataka - 560001",
    channel: "Shopify",
    store: "Fashion Junction",
    amount: 3499,
    items: 3,
    dimensions: "30x20x15",
    weight: "2.5",
    date: "2024-11-06",
    status: "new"
  },
  {
    id: "ORD-12346",
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43211",
    address: "456, Nehru Place, New Delhi - 110019",
    channel: "Rakshasetu",
    store: "Tech World",
    amount: 15999,
    items: 1,
    dimensions: "45x35x10",
    weight: "3.8",
    date: "2024-11-06",
    status: "new"
  },
  {
    id: "ORD-12347",
    customer: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 98765 43212",
    address: "789, FC Road, Pune, Maharashtra - 411004",
    channel: "Shopify",
    store: "Home Decor",
    amount: 2199,
    items: 5,
    dimensions: "25x25x20",
    weight: "1.2",
    date: "2024-11-05",
    status: "processing"
  },
  {
    id: "ORD-12348",
    customer: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 98765 43213",
    address: "321, Banjara Hills, Hyderabad, Telangana - 500034",
    channel: "Shopify",
    store: "Fashion Junction",
    amount: 5299,
    items: 2,
    dimensions: "35x25x12",
    weight: "1.8",
    date: "2024-11-05",
    status: "processing"
  },
  {
    id: "ORD-12349",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 98765 43214",
    address: "654, Park Street, Kolkata, West Bengal - 700016",
    channel: "Rakshasetu",
    store: "Electronics Hub",
    amount: 24999,
    items: 1,
    dimensions: "50x40x15",
    weight: "5.0",
    date: "2024-11-04",
    status: "shipped"
  },
]

// Status badge
const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { class: string; label: string }> = {
    new: { class: "bg-blue-100 text-blue-700 border-blue-200", label: "New" },
    processing: { class: "bg-yellow-100 text-yellow-700 border-yellow-200", label: "Processing" },
    shipped: { class: "bg-purple-100 text-purple-700 border-purple-200", label: "Shipped" },
    delivered: { class: "bg-green-100 text-green-700 border-green-200", label: "Delivered" },
  }

  const { class: className, label } = config[status] || config.new

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const statusParam = searchParams.get('status')

  const [selected, setSelected] = useState(new Set<string>())
  const [orders, setOrders] = useState(mockOrders)

  // Default to "all" if no status param
  const [activeTab, setActiveTab] = useState(statusParam || "all")

  useEffect(() => {
    // If there's a status param, use it
    if (statusParam) {
      if (statusParam !== activeTab) {
        setActiveTab(statusParam)
      }
    } else {
      // If no status param, default to "all"
      setActiveTab("all")
    }
  }, [statusParam])

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    const params = new URLSearchParams(searchParams.toString())

    if (newTab === "all") {
      // Remove status param for "all" tab
      params.delete('status')
    } else {
      // Set status param for other tabs
      params.set('status', newTab)
    }

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : window.location.pathname, { scroll: false })
  }

  // Edit modals
  const [editAddressModal, setEditAddressModal] = useState<{ open: boolean, orderId: string, value: string }>({
    open: false, orderId: "", value: ""
  })
  const [editDimensionsModal, setEditDimensionsModal] = useState<{ open: boolean, orderId: string, dimensions: string, weight: string }>({
    open: false, orderId: "", dimensions: "", weight: ""
  })

  // Open modals
  const openEditAddress = (order: any) => {
    setEditAddressModal({ open: true, orderId: order.id, value: order.address })
  }

  const openEditDimensions = (order: any) => {
    setEditDimensionsModal({
      open: true,
      orderId: order.id,
      dimensions: order.dimensions,
      weight: order.weight
    })
  }

  // Save handlers
  const saveAddress = () => {
    setOrders(prev => prev.map(order =>
      order.id === editAddressModal.orderId
        ? { ...order, address: editAddressModal.value }
        : order
    ))
    setEditAddressModal({ open: false, orderId: "", value: "" })
  }

  const saveDimensions = () => {
    setOrders(prev => prev.map(order =>
      order.id === editDimensionsModal.orderId
        ? { ...order, dimensions: editDimensionsModal.dimensions, weight: editDimensionsModal.weight }
        : order
    ))
    setEditDimensionsModal({ open: false, orderId: "", dimensions: "", weight: "" })
  }

  const columns: DataTableColumn[] = [
    {
      key: "id",
      header: "Order ID",
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.id}</div>
          <div className="text-xs text-gray-500">{row.items} items</div>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer Info.",
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.customer}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
          <div className="text-xs text-gray-500">{row.phone}</div>
        </div>
      ),
    },
    {
      key: "address",
      header: "Delivery Address",
      render: (row) => (
        <div className="relative pr-7">
          <p className="text-sm text-gray-900 line-clamp-2 pr-1">
            {row.address}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              openEditAddress(row)
            }}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-gray-100 rounded"
          >
            <Pencil className="h-3 w-3 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      ),
    },
    {
      key: "channel",
      header: "Channel",
      render: (row) => (
        <Badge
          variant="outline"
          className={row.channel === "Shopify"
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-orange-50 text-orange-700 border-orange-200"
          }
        >
          {row.channel}
        </Badge>
      ),
    },
    {
      key: "store",
      header: "Store",
      sortable: true,
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      align: "right",
      render: (row) => (
        <span className="font-medium">₹{row.amount.toLocaleString()}</span>
      ),
    },
    {
      key: "dimensions",
      header: "Dim. & Wt.",
      render: (row) => (
        <div className="relative pr-7">
          <div className="text-sm">
            <div className="text-gray-900">{row.dimensions} cm</div>
            <div className="text-gray-500">{row.weight} kg</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              openEditDimensions(row)
            }}
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-gray-100 rounded"
          >
            <Pencil className="h-3 w-3 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      render: (row) => (
        <span className="text-sm">
          {new Date(row.date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "80px",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            {row.status === "new" && (
              <DropdownMenuItem>
                <Truck className="h-4 w-4 mr-2" />
                Assign Courier
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Package className="h-4 w-4 mr-2" />
              Track Order
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Ban className="h-4 w-4 mr-2" />
              Cancel Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const tabs = [
    { label: "New Orders", value: "new", badge: 23 },
    { label: "Processing", value: "processing", badge: 15 },
    { label: "In Transit", value: "transit", badge: 45 },
    { label: "Delivered", value: "delivered", badge: 120 },
    { label: "Returns & RTO", value: "returns", badge: 8 },
    { label: "Cancelled", value: "cancelled" },
    { label: "Disputed", value: "disputed", badge: 3 },
    { label: "All Orders", value: "all", badge: 214 },
  ]

  const filteredOrders = orders.filter(order =>
    activeTab === "all" ? true : order.status === activeTab
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all your orders
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
      <Tabs tabs={tabs} value={activeTab} onChange={handleTabChange} />

      {/* Table */}
      <DataTable
        data={filteredOrders}
        columns={columns}
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
        searchable
        clientSort
        clientSearch
        clientPagination
        pageSize={10}
        searchPlaceholder="Search by order ID, customer name, email..."
        actions={
          selected.size > 0 ? (
            <div className="flex items-center gap-2">
              <Button variant="default">
                <Truck className="h-4 w-4 mr-2" />
                Assign Courier ({selected.size})
              </Button>
              <Button variant="outline" onClick={() => setSelected(new Set())}>
                Clear Selection
              </Button>
            </div>
          ) : null
        }
      />

      {/* Edit Address Modal */}
      <Dialog open={editAddressModal.open} onOpenChange={(open) =>
        setEditAddressModal(prev => ({ ...prev, open }))
      }>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Delivery Address</DialogTitle>
            <DialogDescription>
              Update the delivery address for order {editAddressModal.orderId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              label="Delivery Address"
              value={editAddressModal.value}
              onChange={(e) => setEditAddressModal(prev => ({ ...prev, value: e.target.value }))}
              placeholder="Enter complete address"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditAddressModal({ open: false, orderId: "", value: "" })}
            >
              Cancel
            </Button>
            <Button onClick={saveAddress}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dimensions Modal */}
      <Dialog open={editDimensionsModal.open} onOpenChange={(open) =>
        setEditDimensionsModal(prev => ({ ...prev, open }))
      }>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Package Details</DialogTitle>
            <DialogDescription>
              Update dimensions and weight for order {editDimensionsModal.orderId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              label="Dimensions (cm)"
              value={editDimensionsModal.dimensions}
              onChange={(e) => setEditDimensionsModal(prev => ({ ...prev, dimensions: e.target.value }))}
              placeholder="e.g., 30x20x15"
              helperText="Format: Length x Width x Height"
            />
            <Input
              label="Weight (kg)"
              value={editDimensionsModal.weight}
              onChange={(e) => setEditDimensionsModal(prev => ({ ...prev, weight: e.target.value }))}
              placeholder="e.g., 2.5"
              helperText="Enter weight in kilograms"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDimensionsModal({ open: false, orderId: "", dimensions: "", weight: "" })}
            >
              Cancel
            </Button>
            <Button onClick={saveDimensions}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
