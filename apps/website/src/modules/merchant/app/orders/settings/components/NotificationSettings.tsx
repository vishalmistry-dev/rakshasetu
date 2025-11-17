"use client"

import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Input } from "@/shared/components/form/Input"
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone
} from "lucide-react"
import { useState } from "react"

export function NotificationSettings() {
  const [activeTab, setActiveTab] = useState("email")

  // Email notifications
  const [emailNotifications, setEmailNotifications] = useState({
    newOrder: true,
    orderConfirmed: true,
    orderShipped: true,
    orderDelivered: true,
    orderCancelled: true,
    returnRequested: true,
    refundProcessed: true,
  })

  // SMS notifications
  const [smsNotifications, setSmsNotifications] = useState({
    newOrder: true,
    orderShipped: true,
    orderDelivered: true,
    returnRequested: false,
  })

  // Push notifications
  const [pushNotifications, setPushNotifications] = useState({
    newOrder: true,
    orderUpdates: true,
    lowStock: true,
    disputes: true,
  })

  const tabs: Tab[] = [
    { label: "Email", value: "email", icon: Mail },
    { label: "SMS", value: "sms", icon: MessageSquare },
    { label: "Push", value: "push", icon: Bell },
    { label: "Contacts", value: "contacts", icon: Smartphone },
  ]

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="pills" />

      {/* Email Tab */}
      {activeTab === "email" && (
        <Card>
          <CardHeader
            title="Email Notifications"
            description="Choose which order events trigger email notifications"
          />
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">New Order Placed</p>
                  <p className="text-xs text-gray-500">Get notified when a new order is placed</p>
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
                  <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
                  <p className="text-xs text-gray-500">Payment confirmed and ready for processing</p>
                </div>
                <Switch
                  checked={emailNotifications.orderConfirmed}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, orderConfirmed: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Shipped</p>
                  <p className="text-xs text-gray-500">Courier pickup completed</p>
                </div>
                <Switch
                  checked={emailNotifications.orderShipped}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, orderShipped: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                  <p className="text-xs text-gray-500">Successfully delivered to customer</p>
                </div>
                <Switch
                  checked={emailNotifications.orderDelivered}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, orderDelivered: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Cancelled</p>
                  <p className="text-xs text-gray-500">Order cancelled by customer or system</p>
                </div>
                <Switch
                  checked={emailNotifications.orderCancelled}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, orderCancelled: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Return Requested</p>
                  <p className="text-xs text-gray-500">Customer initiated a return</p>
                </div>
                <Switch
                  checked={emailNotifications.returnRequested}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, returnRequested: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Refund Processed</p>
                  <p className="text-xs text-gray-500">Refund completed</p>
                </div>
                <Switch
                  checked={emailNotifications.refundProcessed}
                  onCheckedChange={(checked) =>
                    setEmailNotifications({ ...emailNotifications, refundProcessed: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SMS Tab */}
      {activeTab === "sms" && (
        <div className="space-y-6">
          <InfoBanner
            type="info"
            title="SMS Notifications"
            description="SMS notifications are sent only for critical order events. Standard SMS charges apply."
          />

          <Card>
            <CardHeader
              title="SMS Alerts"
              description="Choose which critical events trigger SMS alerts"
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Order</p>
                    <p className="text-xs text-gray-500">Instant SMS for new orders</p>
                  </div>
                  <Switch
                    checked={smsNotifications.newOrder}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, newOrder: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order Shipped</p>
                    <p className="text-xs text-gray-500">SMS when order is shipped</p>
                  </div>
                  <Switch
                    checked={smsNotifications.orderShipped}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, orderShipped: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                    <p className="text-xs text-gray-500">Delivery confirmation SMS</p>
                  </div>
                  <Switch
                    checked={smsNotifications.orderDelivered}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, orderDelivered: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Return Requested</p>
                    <p className="text-xs text-gray-500">Alert for return requests</p>
                  </div>
                  <Switch
                    checked={smsNotifications.returnRequested}
                    onCheckedChange={(checked) =>
                      setSmsNotifications({ ...smsNotifications, returnRequested: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Push Tab */}
      {activeTab === "push" && (
        <Card>
          <CardHeader
            title="Push Notifications"
            description="Mobile and browser push notifications"
          />
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">New Orders</p>
                  <p className="text-xs text-gray-500">Real-time push for new orders</p>
                </div>
                <Switch
                  checked={pushNotifications.newOrder}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, newOrder: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Updates</p>
                  <p className="text-xs text-gray-500">Status changes and updates</p>
                </div>
                <Switch
                  checked={pushNotifications.orderUpdates}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, orderUpdates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Low Stock Alerts</p>
                  <p className="text-xs text-gray-500">Product inventory warnings</p>
                </div>
                <Switch
                  checked={pushNotifications.lowStock}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, lowStock: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Disputes & Issues</p>
                  <p className="text-xs text-gray-500">Customer disputes and problems</p>
                </div>
                <Switch
                  checked={pushNotifications.disputes}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, disputes: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contacts Tab */}
      {activeTab === "contacts" && (
        <Card>
          <CardHeader
            title="Notification Contacts"
            description="Manage email addresses and phone numbers for notifications"
          />
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Email Addresses</h4>
                <div className="space-y-2">
                  <Input
                    label="Primary Email"
                    type="email"
                    value="merchant@example.com"
                    helperText="All order notifications will be sent here"
                  />
                  <Input
                    label="Secondary Email (Optional)"
                    type="email"
                    placeholder="secondary@example.com"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Phone Numbers</h4>
                <div className="space-y-2">
                  <Input
                    label="Primary Phone"
                    type="tel"
                    value="+91 98765 43210"
                    helperText="For SMS notifications"
                  />
                  <Input
                    label="WhatsApp Number (Optional)"
                    type="tel"
                    placeholder="+91 98765 43211"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
