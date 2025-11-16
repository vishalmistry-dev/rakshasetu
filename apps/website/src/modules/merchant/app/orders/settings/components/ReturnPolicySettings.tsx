"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import { Textarea } from "@/shared/components/form/Textarea"
import {
  Plus,
  Save,
  Trash2
} from "lucide-react"
import { useState } from "react"

type ReturnReason = {
  id: string
  label: string
  enabled: boolean
}

const returnWindowOptions = [
  { value: "7", label: "7 Days" },
  { value: "14", label: "14 Days" },
  { value: "30", label: "30 Days" },
  { value: "60", label: "60 Days" },
  { value: "90", label: "90 Days" },
]

const refundMethodOptions = [
  { value: "original", label: "Original Payment Method" },
  { value: "wallet", label: "RakshaSetu Wallet" },
  { value: "bank", label: "Bank Transfer" },
]

export function ReturnPolicySettings() {
  const [returnsEnabled, setReturnsEnabled] = useState(true)
  const [returnWindow, setReturnWindow] = useState("14")
  const [autoApprove, setAutoApprove] = useState(false)
  const [requireImages, setRequireImages] = useState(true)
  const [refundMethod, setRefundMethod] = useState("original")
  const [restockingFee, setRestockingFee] = useState("0")
  const [policyText, setPolicyText] = useState(
    "We accept returns within 14 days of delivery. Items must be unused and in original packaging."
  )

  const [returnReasons, setReturnReasons] = useState<ReturnReason[]>([
    { id: "1", label: "Defective product", enabled: true },
    { id: "2", label: "Wrong item received", enabled: true },
    { id: "3", label: "Changed mind", enabled: true },
    { id: "4", label: "Product not as described", enabled: true },
    { id: "5", label: "Size/fit issues", enabled: true },
  ])

  const addReason = () => {
    setReturnReasons([
      ...returnReasons,
      {
        id: Date.now().toString(),
        label: "",
        enabled: true,
      },
    ])
  }

  const removeReason = (id: string) => {
    setReturnReasons(returnReasons.filter(r => r.id !== id))
  }

  const updateReason = (id: string, label: string) => {
    setReturnReasons(returnReasons.map(r => r.id === id ? { ...r, label } : r))
  }

  const toggleReason = (id: string) => {
    setReturnReasons(returnReasons.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Return Policies</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure return and refund policies for your orders
          </p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Enable Returns */}
      <Card>
        <CardHeader title="Return Settings" />
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
            <div>
              <p className="font-medium text-gray-900">Enable Returns</p>
              <p className="text-sm text-gray-500">Allow customers to request returns</p>
            </div>
            <Switch
              checked={returnsEnabled}
              onCheckedChange={setReturnsEnabled}
            />
          </div>

          {returnsEnabled && (
            <div className="space-y-4">
              <Select
                label="Return Window"
                options={returnWindowOptions}
                value={returnWindow}
                onChange={(e) => setReturnWindow(e.target.value)}
                helperText="Number of days after delivery to accept returns"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Auto-Approve Returns</p>
                    <p className="text-xs text-gray-500">Automatically approve all return requests</p>
                  </div>
                  <Switch
                    checked={autoApprove}
                    onCheckedChange={setAutoApprove}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Require Photos</p>
                    <p className="text-xs text-gray-500">Customer must upload product images</p>
                  </div>
                  <Switch
                    checked={requireImages}
                    onCheckedChange={setRequireImages}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Return Reasons */}
      {returnsEnabled && (
        <Card>
          <CardHeader
            title="Return Reasons"
            description="Manage available reasons for returns"
            action={
              <Button size="sm" onClick={addReason}>
                <Plus className="h-4 w-4 mr-1" />
                Add Reason
              </Button>
            }
          />
          <CardContent>
            <div className="space-y-2">
              {returnReasons.map((reason) => (
                <div key={reason.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <Switch
                    checked={reason.enabled}
                    onCheckedChange={() => toggleReason(reason.id)}
                  />
                  <Input
                    value={reason.label}
                    onChange={(e) => updateReason(reason.id, e.target.value)}
                    placeholder="Enter return reason"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReason(reason.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Refund Settings */}
      {returnsEnabled && (
        <Card>
          <CardHeader title="Refund Settings" />
          <CardContent>
            <div className="space-y-4">
              <Select
                label="Default Refund Method"
                options={refundMethodOptions}
                value={refundMethod}
                onChange={(e) => setRefundMethod(e.target.value)}
                helperText="How refunds should be processed by default"
              />

              <Input
                label="Restocking Fee (%)"
                type="number"
                value={restockingFee}
                onChange={(e) => setRestockingFee(e.target.value)}
                placeholder="0"
                helperText="Percentage deducted from refund for restocking (0 for no fee)"
              />

              <InfoBanner
                type="info"
                title="Refund Processing Time"
                description="Refunds typically take 5-7 business days to process. Bank transfers may take an additional 2-3 days."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Return Policy Text */}
      {returnsEnabled && (
        <Card>
          <CardHeader
            title="Return Policy Statement"
            description="This will be displayed to customers"
          />
          <CardContent>
            <Textarea
              label="Policy Text"
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              rows={6}
              helperText="Describe your return policy clearly for customers"
            />
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      {returnsEnabled && (
        <Card>
          <CardHeader title="Policy Preview" />
          <CardContent>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Returns Enabled
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {returnWindow} Days Window
                </Badge>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{policyText}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
