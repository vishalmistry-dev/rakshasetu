"use client"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Banknote, CreditCard, ShieldCheck } from "lucide-react"
import { useState } from "react"

export function PaymentSettings() {
  const [codEnabled, setCodEnabled] = useState(true)
  const [prepaidEnabled, setPrepaidEnabled] = useState(true)
  const [codCharges, setCodCharges] = useState("50")
  const [codChargesType, setCodChargesType] = useState<"fixed" | "percentage">("fixed")
  const [minOrderValue, setMinOrderValue] = useState("100")
  const [maxCodAmount, setMaxCodAmount] = useState("50000")

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader
          title="Payment Methods"
          description="Enable payment options for your customers"
        />
        <CardContent>
          <div className="space-y-4">
            {/* COD */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Banknote className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-xs text-gray-500">
                    Customers pay when they receive the order
                  </p>
                </div>
              </div>
              <Switch
                checked={codEnabled}
                onCheckedChange={setCodEnabled}
              />
            </div>

            {/* Prepaid */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Prepaid (Online Payment)
                  </p>
                  <p className="text-xs text-gray-500">
                    UPI, Cards, Wallets via Razorpay
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              </div>
              <Switch
                checked={prepaidEnabled}
                onCheckedChange={setPrepaidEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* COD Settings */}
      {codEnabled && (
        <Card>
          <CardHeader
            title="COD Settings"
            description="Configure Cash on Delivery options"
          />
          <CardContent>
            <div className="space-y-4">
              <InfoBanner
                type="info"
                title="COD Charges"
                description="Additional charges for COD orders to cover collection costs"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    COD Charge Type
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={codChargesType === "fixed" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCodChargesType("fixed")}
                      className="flex-1"
                    >
                      Fixed Amount
                    </Button>
                    <Button
                      variant={codChargesType === "percentage" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCodChargesType("percentage")}
                      className="flex-1"
                    >
                      Percentage
                    </Button>
                  </div>
                </div>

                <Input
                  label={codChargesType === "fixed" ? "COD Charges (₹)" : "COD Charges (%)"}
                  type="number"
                  placeholder="50"
                  value={codCharges}
                  onChange={(e) => setCodCharges(e.target.value)}
                  helperText={
                    codChargesType === "fixed"
                      ? "Flat fee for COD orders"
                      : "Percentage of order value"
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Minimum Order Value (₹)"
                  type="number"
                  placeholder="100"
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(e.target.value)}
                  helperText="Minimum amount required for COD"
                />

                <Input
                  label="Maximum COD Amount (₹)"
                  type="number"
                  placeholder="50000"
                  value={maxCodAmount}
                  onChange={(e) => setMaxCodAmount(e.target.value)}
                  helperText="Maximum order value allowed for COD"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Razorpay Integration */}
      <Card>
        <CardHeader
          title="Payment Gateway"
          description="Razorpay integration for online payments"
        />
        <CardContent>
          <div className="space-y-4">
            <InfoBanner
              type="success"
              title="Razorpay Connected"
              description="Your Razorpay account is successfully integrated"
            />

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Razorpay Account
                  </p>
                  <p className="text-xs text-gray-500">
                    merchant@example.com
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Connected
                </Badge>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Transaction Fee</p>
                <p className="text-lg font-semibold text-gray-900">2% + ₹3</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Settlement Time</p>
                <p className="text-lg font-semibold text-gray-900">T+3 Days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Security */}
      <Card>
        <CardHeader
          title="Security Settings"
          description="Additional security options for payments"
        />
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Require OTP Verification
                </p>
                <p className="text-xs text-gray-500">
                  Verify customer phone before COD orders
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Address Verification
                </p>
                <p className="text-xs text-gray-500">
                  Validate shipping address before payment
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
