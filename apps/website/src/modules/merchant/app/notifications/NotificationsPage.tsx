"use client"

import { Card, CardContent } from "@/shared/components/common/Card"
import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle,
  DollarSign,
  Package,
  Trash2
} from "lucide-react"
import { useState } from "react"

type Notification = {
  id: string
  type: "order" | "payment" | "alert" | "info"
  title: string
  message: string
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-12345 placed by Rajesh Kumar for ₹3,499",
    timestamp: "2 mins ago",
    read: false,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "Payment of ₹15,999 received for Order #ORD-12346",
    timestamp: "15 mins ago",
    read: false,
  },
  {
    id: "3",
    type: "alert",
    title: "Delivery Failed - NDR",
    message: "Order #ORD-12340 delivery failed. Customer not available.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "info",
    title: "Payout Processed",
    message: "Weekly payout of ₹45,680 has been processed to your account",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "order",
    title: "Order Delivered",
    message: "Order #ORD-12338 successfully delivered to customer",
    timestamp: "3 hours ago",
    read: true,
  },
]

const typeConfig = {
  order: { icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
  payment: { icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
  alert: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
  info: { icon: CheckCircle, color: "text-gray-600", bg: "bg-gray-100" },
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState(mockNotifications)

  const tabs: Tab[] = [
    { label: "All", value: "all", badge: notifications.length },
    { label: "Unread", value: "unread", badge: notifications.filter(n => !n.read).length },
    { label: "Orders", value: "order" },
    { label: "Payments", value: "payment" },
    { label: "Alerts", value: "alert" },
  ]

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !n.read
    return n.type === activeTab
  })

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="underline" />

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => {
                const config = typeConfig[notification.type]
                const Icon = config.icon

                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.timestamp}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
