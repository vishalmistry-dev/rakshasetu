"use client"

import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import {
  Plus,
  Scale,
  Trash2
} from "lucide-react"
import { useState } from "react"

type WeightRule = {
  id: string
  minWeight: string
  maxWeight: string
  ratePerKg: string
  enabled: boolean
}

export function WeightRules() {
  const [enableVolumetric, setEnableVolumetric] = useState(true)
  const [volumetricDivisor, setVolumetricDivisor] = useState("5000")
  const [defaultWeight, setDefaultWeight] = useState("0.5")

  const [weightSlabs, setWeightSlabs] = useState<WeightRule[]>([
    { id: "1", minWeight: "0", maxWeight: "0.5", ratePerKg: "50", enabled: true },
    { id: "2", minWeight: "0.5", maxWeight: "1", ratePerKg: "45", enabled: true },
    { id: "3", minWeight: "1", maxWeight: "5", ratePerKg: "40", enabled: true },
    { id: "4", minWeight: "5", maxWeight: "10", ratePerKg: "35", enabled: true },
  ])

  const addSlab = () => {
    setWeightSlabs([
      ...weightSlabs,
      {
        id: Date.now().toString(),
        minWeight: "",
        maxWeight: "",
        ratePerKg: "",
        enabled: true,
      },
    ])
  }

  const removeSlab = (id: string) => {
    setWeightSlabs(weightSlabs.filter(s => s.id !== id))
  }

  const updateSlab = (id: string, field: keyof WeightRule, value: string | boolean) => {
    setWeightSlabs(weightSlabs.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  return (
    <div className="space-y-6">
      <InfoBanner
        type="info"
        title="Weight-based Pricing"
        description="Configure weight slabs and volumetric weight calculations for accurate shipping charges."
      />

      {/* Volumetric Weight */}
      <Card>
        <CardHeader
          title="Volumetric Weight"
          description="Calculate shipping charges based on package volume"
        />
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Enable Volumetric Weight</p>
                <p className="text-xs text-gray-500">Use dimensional weight for large packages</p>
              </div>
              <Switch
                checked={enableVolumetric}
                onCheckedChange={setEnableVolumetric}
              />
            </div>

            {enableVolumetric && (
              <Input
                label="Volumetric Divisor"
                type="number"
                value={volumetricDivisor}
                onChange={(e) => setVolumetricDivisor(e.target.value)}
                helperText="Formula: (L × W × H) ÷ Divisor"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Default Weight */}
      <Card>
        <CardHeader
          title="Default Weight"
          description="Fallback weight when not specified"
        />
        <CardContent>
          <Input
            label="Default Weight (kg)"
            type="number"
            value={defaultWeight}
            onChange={(e) => setDefaultWeight(e.target.value)}
            helperText="Applied when product weight is not available"
          />
        </CardContent>
      </Card>

      {/* Weight Slabs */}
      <Card>
        <CardHeader
          title="Weight Slabs"
          description="Define pricing tiers based on weight ranges"
          action={
            <Button size="sm" onClick={addSlab}>
              <Plus className="h-4 w-4 mr-1" />
              Add Slab
            </Button>
          }
        />
        <CardContent>
          <div className="space-y-3">
            {weightSlabs.map((slab, index) => (
              <div key={slab.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Slab {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={slab.enabled}
                      onCheckedChange={(checked) => updateSlab(slab.id, "enabled", checked)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSlab(slab.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label="Min Weight (kg)"
                    type="number"
                    placeholder="0"
                    value={slab.minWeight}
                    onChange={(e) => updateSlab(slab.id, "minWeight", e.target.value)}
                  />
                  <Input
                    label="Max Weight (kg)"
                    type="number"
                    placeholder="0.5"
                    value={slab.maxWeight}
                    onChange={(e) => updateSlab(slab.id, "maxWeight", e.target.value)}
                  />
                  <Input
                    label="Rate per kg (₹)"
                    type="number"
                    placeholder="50"
                    value={slab.ratePerKg}
                    onChange={(e) => updateSlab(slab.id, "ratePerKg", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
