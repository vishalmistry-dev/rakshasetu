"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { DataTable, type DataTableColumn } from "@/shared/components/common/DataTable"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  Bell,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  Key,
  Plus,
  Settings,
  Trash,
  Webhook,
  XCircle
} from "lucide-react"
import { useState } from "react"

type ApiKey = {
  id: string
  name: string
  key: string
  lastUsed: string
  status: "active" | "inactive"
}

type WebhookData = {
  id: string
  url: string
  events: string
  status: "active" | "inactive"
  lastTriggered: string
}

export default function MerchantSettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({})

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState({
    newOrder: true,
    lowBalance: true,
    payoutProcessed: true,
    weeklyReport: false,
  })

  const [smsNotifications, setSmsNotifications] = useState({
    criticalAlerts: true,
    dailySummary: false,
  })

  // API Keys
  const [apiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API Key",
      key: "rks_live_abc123xyz789",
      lastUsed: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "rks_test_dev456test789",
      lastUsed: "1 day ago",
      status: "active",
    },
  ])

  // Webhooks
  const [webhooks] = useState<WebhookData[]>([
    {
      id: "1",
      url: "https://api.myapp.com/webhooks/rakshasetu",
      events: "order.*, payment.*",
      status: "active",
      lastTriggered: "5 mins ago",
    },
  ])

  const tabs: Tab[] = [
    { label: "Notifications", value: "notifications", icon: Bell },
    { label: "API Keys", value: "api", icon: Key },
    { label: "Webhooks", value: "webhooks", icon: Webhook },
    { label: "Preferences", value: "preferences", icon: Settings },
  ]

  const apiKeyColumns: DataTableColumn[] = [
    {
      key: "name",
      header: "Key Name",
      sortable: true,
      render: (row: ApiKey) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">Last used: {row.lastUsed}</p>
        </div>
      ),
    },
    {
      key: "key",
      header: "API Key",
      render: (row: ApiKey) => (
        <div className="flex items-center gap-2">
          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
            {showApiKey[row.id] ? row.key : "••••••••••••••••"}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiKey({ ...showApiKey, [row.id]: !showApiKey[row.id] })}
          >
            {showApiKey[row.id] ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigator.clipboard.writeText(row.key)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: ApiKey) => (
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
        <Button variant="ghost" size="sm">
          <Trash className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ]

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
        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{row.events}</code>
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
        <Button variant="ghost" size="sm">
          <Trash className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your platform preferences and integrations
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="underline" />

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Email Notifications"
              description="Choose what email notifications you want to receive"
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Order Notifications</p>
                    <p className="text-xs text-gray-500">Get notified when a new order arrives</p>
                  </div>
                  <Switch
                    checked={emailNotifications.newOrder}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, newOrder: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Low Balance Alerts</p>
                    <p className="text-xs text-gray-500">Alert when your wallet balance is low</p>
                  </div>
                  <Switch
                    checked={emailNotifications.lowBalance}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, lowBalance: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payout Processed</p>
                    <p className="text-xs text-gray-500">Notification when payout is processed</p>
                  </div>
                  <Switch
                    checked={emailNotifications.payoutProcessed}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, payoutProcessed: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Weekly Reports</p>
                    <p className="text-xs text-gray-500">Receive weekly performance summary</p>
                  </div>
                  <Switch
                    checked={emailNotifications.weeklyReport}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, weeklyReport: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="SMS Notifications"
              description="Critical alerts via SMS"
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Critical Alerts</p>
                    <p className="text-xs text-gray-500">Important notifications via SMS</p>
                  </div>
                  <Switch
                    checked={smsNotifications.criticalAlerts}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, criticalAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Daily Summary</p>
                    <p className="text-xs text-gray-500">Daily order summary via SMS</p>
                  </div>
                  <Switch
                    checked={smsNotifications.dailySummary}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, dailySummary: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === "api" && (
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="API Keys"
              description="Manage your API keys for programmatic access"
              action={
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Generate New Key
                </Button>
              }
            />
            <CardContent>
              <InfoBanner
                type="warning"
                title="Keep your API keys secure"
                description="Never share your API keys publicly. Anyone with access to your keys can perform actions on your behalf."
              />

              <div className="mt-4">
                <DataTable data={apiKeys} columns={apiKeyColumns} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="API Documentation" />
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-900 mb-2">
                  Base URL: <code className="bg-white px-2 py-1 rounded text-xs">https://api.rakshasetu.com/v1</code>
                </p>
                <p className="text-sm text-gray-600">
                  Visit our{" "}
                  <a href="#" className="text-orange-600 hover:underline">
                    API documentation
                  </a>{" "}
                  to learn how to integrate with RakshaSetu.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === "webhooks" && (
        <Card>
          <CardHeader
            title="Webhook Endpoints"
            description="Configure webhooks to receive real-time events"
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
              description="Webhooks allow your application to receive real-time notifications when events occur on your account (e.g., new order, payment received)."
            />

            <div className="mt-4">
              <DataTable data={webhooks} columns={webhookColumns} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preferences Tab */}
      {activeTab === "preferences" && (
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Default Configurations"
              description="Set defaults that apply to all your stores"
            />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Default Currency"
                  value="INR"
                  disabled
                  helperText="Currency cannot be changed"
                />
                <Input
                  label="Default Timezone"
                  value="Asia/Kolkata (IST)"
                  disabled
                  helperText="Based on your location"
                />
                <Input
                  label="Default Weight Unit"
                  value="kg"
                />
                <Input
                  label="Default Dimension Unit"
                  value="cm"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Security" />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Session Timeout</p>
                    <p className="text-xs text-gray-500">Auto logout after inactivity</p>
                  </div>
                  <Input
                    value="30 minutes"
                    className="w-32"
                    size="sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
