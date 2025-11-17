"use client"

import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Bell, DollarSign, Truck, Webhook } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { NotificationSettings } from "./components/NotificationSettings"
import { PaymentSettings } from "./components/PaymentSettings"
import { ShippingSettings } from "./components/ShippingSettings"
import { WebhookSettings } from "./components/WebhookSettings"

const tabs: Tab[] = [
  { label: "Shipping", value: "shipping", icon: Truck },
  { label: "Payment", value: "payment", icon: DollarSign },
  { label: "Notifications", value: "notifications", icon: Bell },
  { label: "Webhooks", value: "webhooks", icon: Webhook },
]

export default function StoreSettingsPage() {

  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState(tabParam || "shipping")

  // Sync URL with tab
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam)
    }
  }, [tabParam, activeTab])

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', newTab)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your store preferences and configurations
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={handleTabChange} variant="underline" />

      {/* Tab Content */}
      {activeTab === "shipping" && <ShippingSettings />}
      {activeTab === "payment" && <PaymentSettings />}
      {activeTab === "notifications" && <NotificationSettings />}
      {activeTab === "webhooks" && <WebhookSettings />}
    </div>
  )
}
