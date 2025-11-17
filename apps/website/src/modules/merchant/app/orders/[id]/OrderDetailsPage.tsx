"use client"

import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Timeline } from "@/shared/components/common/Timeline"
import { Button } from "@/shared/components/form/Button"
import {
  AlertCircle,
  ArrowLeft,
  Download,
  Mail,
  MapPin,
  MoreVertical,
  Package,
  Phone,
  Printer,
  Truck,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock order data
const order = {
  id: "ORD-12345",
  status: "processing",
  createdAt: "2024-11-15T10:30:00",
  channel: "Shopify",
  store: "Fashion Junction",

  customer: {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
  },

  shippingAddress: {
    street: "123, MG Road, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    country: "India",
  },

  items: [
    { id: "1", name: "Cotton T-Shirt", sku: "TSH-001", qty: 2, price: 599, image: "" },
    { id: "2", name: "Denim Jeans", sku: "JNS-002", qty: 1, price: 1299, image: "" },
  ],

  pricing: {
    subtotal: 2497,
    shipping: 100,
    tax: 449,
    total: 3046,
  },

  shipment: {
    courier: "BlueDart",
    awb: "BD123456789",
    weight: "0.8 kg",
    dimensions: "30x20x10 cm",
  },

  timeline: [
    { status: "Order Placed", time: "2024-11-15 10:30 AM", completed: true },
    { status: "Payment Confirmed", time: "2024-11-15 10:32 AM", completed: true },
    { status: "Processing", time: "2024-11-15 11:00 AM", completed: true },
    { status: "Shipped", time: "", completed: false },
    { status: "Delivered", time: "", completed: false },
  ],
}

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
}

export default function OrderDetailsPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={statusColors[order.status]}>
            {order.status}
          </Badge>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Truck className="h-4 w-4 mr-2" />
                Assign Courier
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <AlertCircle className="h-4 w-4 mr-2" />
                Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader title="Order Items" />
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ₹{item.price} × {item.qty}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price * item.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{order.pricing.subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">₹{order.pricing.shipping}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹{order.pricing.tax}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{order.pricing.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline - UPDATED */}
          <Card>
            <CardHeader title="Order Timeline" />
            <CardContent>
              <Timeline events={order.timeline} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader title="Customer" />
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{order.customer.name}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{order.customer.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader title="Shipping Address" />
            <CardContent>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p>{order.shippingAddress.pincode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipment Details */}
          <Card>
            <CardHeader title="Shipment" />
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Courier</span>
                  <span className="font-medium text-gray-900">{order.shipment.courier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">AWB</span>
                  <span className="font-medium text-gray-900">{order.shipment.awb}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span className="text-gray-900">{order.shipment.weight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="text-gray-900">{order.shipment.dimensions}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Source */}
          <Card>
            <CardHeader title="Order Source" />
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Channel</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {order.channel}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Store</span>
                  <span className="font-medium text-gray-900">{order.store}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
