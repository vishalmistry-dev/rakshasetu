"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Modal } from "@/shared/components/common/Modal"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import {
  Edit,
  Plus,
  Trash2,
  Zap
} from "lucide-react"
import { useState } from "react"

type Rule = {
  id: string
  name: string
  priority: number
  conditions: {
    pincodeRange?: string
    orderValue?: { min?: number; max?: number }
    productCategory?: string
  }
  action: {
    courier: string
    serviceType: string
  }
  enabled: boolean
}

const mockRules: Rule[] = [
  {
    id: "1",
    name: "Express Delivery - High Value",
    priority: 1,
    conditions: {
      orderValue: { min: 10000 },
    },
    action: {
      courier: "BlueDart",
      serviceType: "Express",
    },
    enabled: true,
  },
  {
    id: "2",
    name: "Local Zone - Standard",
    priority: 2,
    conditions: {
      pincodeRange: "380001-380015",
    },
    action: {
      courier: "Delhivery",
      serviceType: "Surface",
    },
    enabled: true,
  },
]

const courierOptions = [
  { value: "bluedart", label: "BlueDart" },
  { value: "delhivery", label: "Delhivery" },
  { value: "dtdc", label: "DTDC" },
]

const serviceTypeOptions = [
  { value: "express", label: "Express" },
  { value: "surface", label: "Surface" },
  { value: "economy", label: "Economy" },
]

export function AutoAssignSettings() {
  const [rules, setRules] = useState(mockRules)
  const [ruleModal, setRuleModal] = useState({
    open: false,
    mode: "add" as "add" | "edit",
    rule: null as Rule | null,
  })

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))
  }

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Info */}
      <InfoBanner
        type="info"
        title="How Auto-Assignment Works"
        description="Rules are evaluated in priority order. The first matching rule will be applied to assign a courier automatically when an order is placed."
      />

      {/* Add Rule Button */}
      <div className="flex justify-end">
        <Button onClick={() => setRuleModal({ open: true, mode: "add", rule: null })}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Priority Badge */}
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold">
                    {rule.priority}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                      <Badge variant="outline" className={rule.enabled ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}>
                        {rule.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    {/* Conditions */}
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Conditions: </span>
                        {rule.conditions.pincodeRange && (
                          <span className="text-gray-900">Pincode {rule.conditions.pincodeRange}</span>
                        )}
                        {rule.conditions.orderValue && (
                          <span className="text-gray-900">
                            Order value {rule.conditions.orderValue.min ? `≥ ₹${rule.conditions.orderValue.min}` : ""}
                            {rule.conditions.orderValue.max ? ` and ≤ ₹${rule.conditions.orderValue.max}` : ""}
                          </span>
                        )}
                        {rule.conditions.productCategory && (
                          <span className="text-gray-900">Category: {rule.conditions.productCategory}</span>
                        )}
                      </div>

                      <div>
                        <span className="text-gray-500">Action: </span>
                        <span className="text-gray-900">
                          Assign to <strong>{rule.action.courier}</strong> ({rule.action.serviceType})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRuleModal({ open: true, mode: "edit", rule })}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRule(rule.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {rules.length === 0 && (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <Zap className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No auto-assignment rules configured</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setRuleModal({ open: true, mode: "add", rule: null })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Rule Modal */}
      <Modal
        open={ruleModal.open}
        onOpenChange={(open) => setRuleModal({ ...ruleModal, open })}
        title={ruleModal.mode === "add" ? "Add Auto-Assignment Rule" : "Edit Rule"}
        description="Configure conditions and courier assignment"
        size="lg"
        showCancel
        showConfirm
        confirmLabel={ruleModal.mode === "add" ? "Create Rule" : "Save Changes"}
        onConfirm={() => {
          console.log("Saving rule:", ruleModal)
          setRuleModal({ open: false, mode: "add", rule: null })
        }}
      >
        <div className="space-y-4">
          <Input
            label="Rule Name"
            placeholder="e.g., Express for High Value Orders"
          />

          <Input
            label="Priority"
            type="number"
            placeholder="1"
            helperText="Lower number = higher priority"
          />

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Conditions</h4>
            <div className="space-y-3">
              <Input
                label="Pincode Range (Optional)"
                placeholder="e.g., 380001-380015"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Min Order Value (Optional)"
                  type="number"
                  placeholder="1000"
                />
                <Input
                  label="Max Order Value (Optional)"
                  type="number"
                  placeholder="50000"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Action</h4>
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Courier"
                options={courierOptions}
                placeholder="Select courier"
              />
              <Select
                label="Service Type"
                options={serviceTypeOptions}
                placeholder="Select service"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
