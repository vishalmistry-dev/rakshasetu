"use client"

import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Mail, MessageSquare } from "lucide-react"
import { useState } from "react"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    orderPlaced: true,
    orderShipped: true,
    orderDelivered: true,
    paymentReceived: true,
    lowStock: false,
  })

  const [smsNotifications, setSmsNotifications] = useState({
    orderPlaced: true,
    orderShipped: true,
    orderDelivered: true,
    ndrAlert: true,
  })

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader
          title="Email Notifications"
          description="Manage email alerts for store activities"
        />
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Placed</p>
                  <p className="text-xs text-gray-500">Get notified when new order is placed</p>
                </div>
              </div>
              <Switch
                checked={emailNotifications.orderPlaced}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, orderPlaced: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Shipped</p>
                  <p className="text-xs text-gray-500">Get notified when order is shipped</p>
                </div>
              </div>
              <Switch
                checked={emailNotifications.orderShipped}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, orderShipped: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                  <p className="text-xs text-gray-500">Get notified when order is delivered</p>
                </div>
              </div>
              <Switch
                checked={emailNotifications.orderDelivered}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, orderDelivered: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Payment Received</p>
                  <p className="text-xs text-gray-500">Get notified when payment is received</p>
                </div>
              </div>
              <Switch
                checked={emailNotifications.paymentReceived}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, paymentReceived: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                  <p className="text-xs text-gray-500">Get notified when products are low on stock</p>
                </div>
              </div>
              <Switch
                checked={emailNotifications.lowStock}
                onCheckedChange={(checked) =>
                  setEmailNotifications({ ...emailNotifications, lowStock: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader
          title="SMS Notifications"
          description="Manage SMS alerts for critical events"
        />
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Placed</p>
                  <p className="text-xs text-gray-500">SMS alert for new orders</p>
                </div>
              </div>
              <Switch
                checked={smsNotifications.orderPlaced}
                onCheckedChange={(checked) =>
                  setSmsNotifications({ ...smsNotifications, orderPlaced: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Shipped</p>
                  <p className="text-xs text-gray-500">SMS alert when order ships</p>
                </div>
              </div>
              <Switch
                checked={smsNotifications.orderShipped}
                onCheckedChange={(checked) =>
                  setSmsNotifications({ ...smsNotifications, orderShipped: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                  <p className="text-xs text-gray-500">SMS alert on successful delivery</p>
                </div>
              </div>
              <Switch
                checked={smsNotifications.orderDelivered}
                onCheckedChange={(checked) =>
                  setSmsNotifications({ ...smsNotifications, orderDelivered: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">NDR Alert</p>
                  <p className="text-xs text-gray-500">SMS alert for failed deliveries</p>
                </div>
              </div>
              <Switch
                checked={smsNotifications.ndrAlert}
                onCheckedChange={(checked) =>
                  setSmsNotifications({ ...smsNotifications, ndrAlert: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
