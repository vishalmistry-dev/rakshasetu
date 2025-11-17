"use client"

import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Bell, RotateCcw, Zap } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AutoAssignSettings } from "./components/AutoAssignSettings"
import { NotificationSettings } from "./components/NotificationSettings"
import { ReturnPolicySettings } from "./components/ReturnPolicySettings"

const tabs: Tab[] = [
  { label: "Auto-Assignment", value: "auto-assign", icon: Zap },
  { label: "Notifications", value: "notifications", icon: Bell },
  { label: "Return Policies", value: "returns", icon: RotateCcw },
]

export default function OrderSettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState(tabParam || "auto-assign")

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
          <h1 className="text-2xl font-bold text-gray-900">Order Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure order processing and notification preferences
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={handleTabChange} variant="underline" />

      {/* Tab Content */}
      {activeTab === "auto-assign" && <AutoAssignSettings />}
      {activeTab === "notifications" && <NotificationSettings />}
      {activeTab === "returns" && <ReturnPolicySettings />}
    </div>
  )
}
