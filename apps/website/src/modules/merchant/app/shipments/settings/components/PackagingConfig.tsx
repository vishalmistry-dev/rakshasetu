"use client"

import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import {
  Package,
  Plus,
  Trash2
} from "lucide-react"
import { useState } from "react"

type PackageType = {
  id: string
  name: string
  length: string
  width: string
  height: string
  maxWeight: string
}

const dimensionUnitOptions = [
  { value: "cm", label: "Centimeters (cm)" },
  { value: "in", label: "Inches (in)" },
]

const weightUnitOptions = [
  { value: "kg", label: "Kilograms (kg)" },
  { value: "g", label: "Grams (g)" },
]

export function PackagingConfig() {
  const [dimensionUnit, setDimensionUnit] = useState("cm")
  const [weightUnit, setWeightUnit] = useState("kg")

  const [packages, setPackages] = useState<PackageType[]>([
    { id: "1", name: "Small Box", length: "20", width: "15", height: "10", maxWeight: "2" },
    { id: "2", name: "Medium Box", length: "30", width: "25", height: "15", maxWeight: "5" },
    { id: "3", name: "Large Box", length: "40", width: "35", height: "25", maxWeight: "10" },
  ])

  const addPackage = () => {
    setPackages([
      ...packages,
      {
        id: Date.now().toString(),
        name: "",
        length: "",
        width: "",
        height: "",
        maxWeight: "",
      },
    ])
  }

  const removePackage = (id: string) => {
    setPackages(packages.filter(p => p.id !== id))
  }

  const updatePackage = (id: string, field: keyof PackageType, value: string) => {
    setPackages(packages.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  return (
    <div className="space-y-6">
      {/* Units */}
      <Card>
        <CardHeader
          title="Default Units"
          description="Set default measurement units"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Dimension Unit"
              options={dimensionUnitOptions}
              value={dimensionUnit}
              onChange={(e) => setDimensionUnit(e.target.value)}
            />
            <Select
              label="Weight Unit"
              options={weightUnitOptions}
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Package Types */}
      <Card>
        <CardHeader
          title="Package Types"
          description="Define standard package sizes"
          action={
            <Button size="sm" onClick={addPackage}>
              <Plus className="h-4 w-4 mr-1" />
              Add Package
            </Button>
          }
        />
        <CardContent>
          <div className="space-y-4">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Package {index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePackage(pkg.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Package Name"
                    placeholder="e.g., Small Box"
                    value={pkg.name}
                    onChange={(e) => updatePackage(pkg.id, "name", e.target.value)}
                  />
                  <Input
                    label={`Max Weight (${weightUnit})`}
                    type="number"
                    placeholder="5"
                    value={pkg.maxWeight}
                    onChange={(e) => updatePackage(pkg.id, "maxWeight", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Input
                    label={`Length (${dimensionUnit})`}
                    type="number"
                    placeholder="30"
                    value={pkg.length}
                    onChange={(e) => updatePackage(pkg.id, "length", e.target.value)}
                  />
                  <Input
                    label={`Width (${dimensionUnit})`}
                    type="number"
                    placeholder="20"
                    value={pkg.width}
                    onChange={(e) => updatePackage(pkg.id, "width", e.target.value)}
                  />
                  <Input
                    label={`Height (${dimensionUnit})`}
                    type="number"
                    placeholder="15"
                    value={pkg.height}
                    onChange={(e) => updatePackage(pkg.id, "height", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Packaging Materials */}
      <Card>
        <CardHeader
          title="Packaging Materials"
          description="Track packaging material costs"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Box Cost (₹)"
              type="number"
              placeholder="10"
              helperText="Average cost per box"
            />
            <Input
              label="Bubble Wrap (₹/m)"
              type="number"
              placeholder="5"
              helperText="Cost per meter"
            />
            <Input
              label="Tape Cost (₹/roll)"
              type="number"
              placeholder="20"
              helperText="Cost per tape roll"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
