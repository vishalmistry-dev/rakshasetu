"use client"

import { Tabs, type Tab } from "@/shared/components/common/Tabs"
import { Button } from "@/shared/components/form/Button"
import { Globe, Package, Scale, Truck } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CourierPreferences } from "./components/CourierPreferences"
import { PackagingConfig } from "./components/PackagingConfig"
import { ShippingZones } from "./components/ShippingZones"
import { WeightRules } from "./components/WeightRules"

const tabs: Tab[] = [
  { label: "Courier Preferences", value: "preferences", icon: Truck },
  { label: "Packaging Config", value: "packaging", icon: Package },
  { label: "Weight Rules", value: "weight", icon: Scale },
  { label: "Shipping Zones", value: "zones", icon: Globe },
]

export default function ShippingSettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabParam = searchParams.get('tab')

  const [activeTab, setActiveTab] = useState(tabParam || "preferences")

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
          <h1 className="text-2xl font-bold text-gray-900">Shipping Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure shipping preferences and rules
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={activeTab} onChange={handleTabChange} variant="underline" />

      {/* Tab Content */}
      {activeTab === "preferences" && <CourierPreferences />}
      {activeTab === "packaging" && <PackagingConfig />}
      {activeTab === "weight" && <WeightRules />}
      {activeTab === "zones" && <ShippingZones />}
    </div>
  )
}
