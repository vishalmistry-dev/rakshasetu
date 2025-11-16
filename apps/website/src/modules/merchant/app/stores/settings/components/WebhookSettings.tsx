"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import { CheckCircle, Edit, Plus, Trash, XCircle } from "lucide-react"
import { useState } from "react"

type WebhookData = {
  id: string
  url: string
  events: string
  status: "active" | "inactive"
  lastTriggered: string
}

export function WebhookSettings() {
  const [webhooks] = useState<WebhookData[]>([
    {
      id: "1",
      url: "https://example.com/webhook",
      events: "order.created, order.shipped",
      status: "active",
      lastTriggered: "2 hours ago"
    },
  ])

  const webhookColumns: DataTableColumn[] = [
    {
      key: "url",
      header: "Webhook URL",
      sortable: true,
      render: (row: WebhookData) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{row.url}</p>
          <p className="text-xs text-gray-500">Last triggered: {row.lastTriggered}</p>
        </div>
      ),
    },
    {
      key: "events",
      header: "Events",
      render: (row: WebhookData) => (
        <span className="text-sm text-gray-600">{row.events}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: WebhookData) => (
        <Badge
          variant="outline"
          className={
            row.status === "active"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-gray-50 text-gray-700 border-gray-200"
          }
        >
          {row.status === "active" ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 mr-1" />
          )}
          {row.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Webhook Endpoints"
          description="Configure webhooks to receive real-time event notifications"
          action={
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Webhook
            </Button>
          }
        />
        <CardContent>
          <InfoBanner
            type="info"
            title="What are webhooks?"
            description="Webhooks allow your application to receive real-time notifications when events occur in your store (e.g., order created, shipment updated)."
          />

          <div className="mt-4">
            <DataTable
              data={webhooks}
              columns={webhookColumns}
            />
          </div>
        </CardContent>
      </Card>

      {/* Available Events */}
      <Card>
        <CardHeader
          title="Available Events"
          description="Events you can subscribe to via webhooks"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "order.created", desc: "Triggered when a new order is placed" },
              { name: "order.updated", desc: "Triggered when an order is updated" },
              { name: "order.shipped", desc: "Triggered when an order is shipped" },
              { name: "order.delivered", desc: "Triggered when an order is delivered" },
              { name: "payment.success", desc: "Triggered on successful payment" },
              { name: "payment.failed", desc: "Triggered when payment fails" },
              { name: "shipment.tracking", desc: "Triggered on tracking updates" },
              { name: "ndr.created", desc: "Triggered on failed delivery" },
            ].map((event) => (
              <div
                key={event.name}
                className="p-3 border border-gray-200 rounded-lg"
              >
                <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {event.name}
                </code>
                <p className="text-xs text-gray-500 mt-1">{event.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
