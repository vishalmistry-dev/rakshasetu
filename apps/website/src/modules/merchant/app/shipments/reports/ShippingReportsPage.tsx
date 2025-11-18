"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { Button } from "@/shared/components/form/Button"
import { Input } from "@/shared/components/form/Input"
import { Select } from "@/shared/components/form/Select"
import {
  DollarSign,
  Download,
  FileText,
  Package,
  TrendingUp
} from "lucide-react"
import { useState } from "react"

const reportTypes = [
  {
    id: "shipment-summary",
    name: "Shipment Summary",
    description: "Overview of all shipments with status breakdown",
    icon: Package,
    badge: "Popular",
  },
  {
    id: "courier-performance",
    name: "Courier Performance",
    description: "Delivery success rates and transit times by courier",
    icon: TrendingUp,
    badge: null,
  },
  {
    id: "cost-analysis",
    name: "Cost Analysis",
    description: "Shipping costs breakdown by courier and zone",
    icon: DollarSign,
    badge: null,
  },
  {
    id: "ndr-report",
    name: "NDR Report",
    description: "Failed delivery attempts and reasons",
    icon: FileText,
    badge: null,
  },
  {
    id: "rto-report",
    name: "RTO Report",
    description: "Return to origin shipments analysis",
    icon: FileText,
    badge: null,
  },
  {
    id: "zone-wise",
    name: "Zone-wise Report",
    description: "Shipments grouped by delivery zones",
    icon: FileText,
    badge: null,
  },
]

const dateRangeOptions = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last7days", label: "Last 7 Days" },
  { value: "last30days", label: "Last 30 Days" },
  { value: "thisMonth", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
  { value: "custom", label: "Custom Range" },
]

const formatOptions = [
  { value: "pdf", label: "PDF" },
  { value: "excel", label: "Excel" },
  { value: "csv", label: "CSV" },
]

export default function ShippingReportsPage() {
  const [selectedReport, setSelectedReport] = useState("")
  const [dateRange, setDateRange] = useState("last30days")
  const [format, setFormat] = useState("pdf")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleGenerate = () => {
    console.log("Generating report:", { selectedReport, dateRange, format, startDate, endDate })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shipping Reports</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate comprehensive shipping analytics reports
          </p>
        </div>
      </div>

      {/* Report Types */}
      <Card>
        <CardHeader
          title="Select Report Type"
          description="Choose the type of report you want to generate"
        />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon
              const isSelected = selectedReport === report.id

              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${isSelected
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon className={`h-5 w-5 ${isSelected ? "text-orange-600" : "text-gray-400"}`} />
                    {report.badge && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {report.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-xs text-gray-500">{report.description}</p>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Report Configuration */}
      {selectedReport && (
        <Card>
          <CardHeader
            title="Report Configuration"
            description="Configure date range and export format"
          />
          <CardContent>
            <div className="space-y-4">
              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />

              {dateRange === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              )}

              <Select
                label="Export Format"
                options={formatOptions}
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              />

              <div className="flex justify-end pt-4">
                <Button onClick={handleGenerate}>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Reports */}
      <Card>
        <CardHeader
          title="Recent Reports"
          description="Previously generated reports"
        />
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Shipment Summary - Nov 2024", date: "2024-11-16", size: "2.4 MB" },
              { name: "Courier Performance - Oct 2024", date: "2024-11-01", size: "1.8 MB" },
              { name: "Cost Analysis - Q3 2024", date: "2024-10-15", size: "3.1 MB" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-500">Generated on {report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
