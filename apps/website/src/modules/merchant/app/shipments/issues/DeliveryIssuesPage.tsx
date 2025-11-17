"use client"

import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { AlertTriangle, Clock, RotateCcw } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DelayedIssues } from "./components/DelayedIssues"
import { NDRIssues } from "./components/NDRIssues"
import { RTOIssues } from "./components/RTOIssues"

const tabs: Tab[] = [
  { label: "NDR (Failed Delivery)", value: "ndr", icon: AlertTriangle },
  { label: "RTO (Return to Origin)", value: "rto", icon: RotateCcw },
  { label: "Delayed Shipments", value: "delayed", icon: Clock },
]

export default function DeliveryIssuesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState(tabParam || "ndr")

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
          <h1 className="text-2xl font-bold text-gray-900">Delivery Issues</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage failed deliveries, returns, and delays
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={handleTabChange} variant="underline" />

      {/* Tab Content */}
      {activeTab === "ndr" && <NDRIssues />}
      {activeTab === "rto" && <RTOIssues />}
      {activeTab === "delayed" && <DelayedIssues />}
    </div>
  )
}
