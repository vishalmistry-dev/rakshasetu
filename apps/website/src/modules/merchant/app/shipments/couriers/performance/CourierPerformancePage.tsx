"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import {
  CheckCircle,
  Clock,
  Package,
  TrendingDown,
  TrendingUp,
  XCircle
} from "lucide-react"

type CourierMetrics = {
  courier: string
  totalShipments: number
  delivered: number
  inTransit: number
  failed: number
  onTimeDelivery: number
  avgTransitTime: string
  ndrRate: number
  rtoRate: number
}

const mockMetrics: CourierMetrics[] = [
  {
    courier: "BlueDart",
    totalShipments: 1245,
    delivered: 1180,
    inTransit: 45,
    failed: 20,
    onTimeDelivery: 95,
    avgTransitTime: "2.3 days",
    ndrRate: 3.2,
    rtoRate: 1.6,
  },
  {
    courier: "Delhivery",
    totalShipments: 980,
    delivered: 895,
    inTransit: 62,
    failed: 23,
    onTimeDelivery: 91,
    avgTransitTime: "2.8 days",
    ndrRate: 4.5,
    rtoRate: 2.3,
  },
  {
    courier: "DTDC",
    totalShipments: 567,
    delivered: 498,
    inTransit: 48,
    failed: 21,
    onTimeDelivery: 88,
    avgTransitTime: "3.1 days",
    ndrRate: 5.8,
    rtoRate: 3.7,
  },
]

export default function CourierPerformancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courier Performance</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and compare courier partner performance metrics
          </p>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="space-y-4">
        {mockMetrics.map((metrics) => {
          const deliveryRate = ((metrics.delivered / metrics.totalShipments) * 100).toFixed(1)

          return (
            <Card key={metrics.courier}>
              <CardHeader
                title={metrics.courier}
                action={
                  <Badge variant="outline" className={
                    metrics.onTimeDelivery >= 95 ? "bg-green-50 text-green-700 border-green-200" :
                      metrics.onTimeDelivery >= 90 ? "bg-blue-50 text-blue-700 border-blue-200" :
                        "bg-orange-50 text-orange-700 border-orange-200"
                  }>
                    {metrics.onTimeDelivery}% On-time
                  </Badge>
                }
              />
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="h-4 w-4 text-gray-500" />
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{metrics.totalShipments}</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="text-xs text-green-600">Delivered</p>
                    </div>
                    <p className="text-xl font-bold text-green-700">{metrics.delivered}</p>
                    <p className="text-xs text-green-600">{deliveryRate}%</p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <p className="text-xs text-blue-600">In Transit</p>
                    </div>
                    <p className="text-xl font-bold text-blue-700">{metrics.inTransit}</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <p className="text-xs text-red-600">Failed</p>
                    </div>
                    <p className="text-xl font-bold text-red-700">{metrics.failed}</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <p className="text-xs text-purple-600">Avg Transit</p>
                    </div>
                    <p className="text-xl font-bold text-purple-700">{metrics.avgTransitTime}</p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="h-4 w-4 text-orange-600" />
                      <p className="text-xs text-orange-600">NDR Rate</p>
                    </div>
                    <p className="text-xl font-bold text-orange-700">{metrics.ndrRate}%</p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-yellow-600" />
                      <p className="text-xs text-yellow-600">RTO Rate</p>
                    </div>
                    <p className="text-xl font-bold text-yellow-700">{metrics.rtoRate}%</p>
                  </div>

                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-indigo-600" />
                      <p className="text-xs text-indigo-600">Success Rate</p>
                    </div>
                    <p className="text-xl font-bold text-indigo-700">{deliveryRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
