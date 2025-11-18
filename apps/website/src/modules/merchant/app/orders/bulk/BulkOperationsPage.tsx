"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/shared/components/common/Card"
import { InfoBanner } from "@/shared/components/common/InfoBanner"
import { Button } from "@/shared/components/form/Button"
import { Select } from "@/shared/components/form/Select"
import {
  CheckCircle,
  Clock,
  Download,
  FileSpreadsheet,
  Play,
  Trash2,
  Upload,
  XCircle
} from "lucide-react"
import { useState } from "react"

type BulkJob = {
  id: string
  type: string
  fileName: string
  totalRecords: number
  processed: number
  success: number
  failed: number
  status: "pending" | "processing" | "completed" | "failed"
  createdAt: string
}

const mockJobs: BulkJob[] = [
  {
    id: "BULK-001",
    type: "Update Status",
    fileName: "order_status_update.csv",
    totalRecords: 150,
    processed: 150,
    success: 148,
    failed: 2,
    status: "completed",
    createdAt: "2024-11-16 10:30",
  },
  {
    id: "BULK-002",
    type: "Assign Courier",
    fileName: "courier_assignment.csv",
    totalRecords: 200,
    processed: 120,
    success: 120,
    failed: 0,
    status: "processing",
    createdAt: "2024-11-16 14:15",
  },
  {
    id: "BULK-003",
    type: "Cancel Orders",
    fileName: "cancel_orders.csv",
    totalRecords: 50,
    processed: 0,
    success: 0,
    failed: 0,
    status: "pending",
    createdAt: "2024-11-16 15:00",
  },
]

const operationOptions = [
  { value: "update_status", label: "Update Order Status" },
  { value: "assign_courier", label: "Assign Courier" },
  { value: "cancel_orders", label: "Cancel Orders" },
  { value: "update_tracking", label: "Update Tracking Info" },
  { value: "generate_labels", label: "Generate Shipping Labels" },
]

const statusConfig = {
  pending: { label: "Pending", class: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Clock },
  processing: { label: "Processing", class: "bg-blue-50 text-blue-700 border-blue-200", icon: Clock },
  completed: { label: "Completed", class: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle },
  failed: { label: "Failed", class: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
}

export default function BulkOperationsPage() {
  const [selectedOperation, setSelectedOperation] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [jobs] = useState(mockJobs)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleProcessBulk = () => {
    console.log("Processing bulk operation:", { selectedOperation, uploadedFile })
    // Process logic here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Operations</h1>
          <p className="text-sm text-gray-500 mt-1">
            Perform bulk actions on multiple orders at once
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <InfoBanner
        type="info"
        title="How Bulk Operations Work"
        description="Upload a CSV file with order IDs and operation details. Download the template for each operation type to ensure proper formatting."
      />

      {/* Upload Section */}
      <Card>
        <CardHeader title="New Bulk Operation" />
        <CardContent>
          <div className="space-y-4">
            <Select
              label="Operation Type"
              options={operationOptions}
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value)}
              placeholder="Select operation type"
            />

            {selectedOperation && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Upload CSV File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {uploadedFile ? uploadedFile.name : "Click to upload CSV"}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        CSV file up to 10MB
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Download CSV Template</p>
                      <p className="text-xs text-gray-500">Use this template for {operationOptions.find(o => o.value === selectedOperation)?.label}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedOperation("")
                      setUploadedFile(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleProcessBulk}
                    disabled={!uploadedFile}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Processing
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Jobs */}
      <Card>
        <CardHeader title="Recent Bulk Jobs" />
        <CardContent>
          <div className="space-y-3">
            {jobs.map((job) => {
              const config = statusConfig[job.status]
              const Icon = config.icon
              const progress = job.totalRecords > 0 ? (job.processed / job.totalRecords) * 100 : 0

              return (
                <div key={job.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{job.type}</h4>
                        <Badge variant="outline" className={config.class}>
                          <Icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{job.fileName}</p>
                      <p className="text-xs text-gray-400 mt-1">{job.createdAt}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  {job.status === "processing" && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-sm font-semibold text-gray-900">{job.totalRecords}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Processed</p>
                      <p className="text-sm font-semibold text-gray-900">{job.processed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Success</p>
                      <p className="text-sm font-semibold text-green-600">{job.success}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Failed</p>
                      <p className="text-sm font-semibold text-red-600">{job.failed}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {job.status === "completed" && job.failed > 0 && (
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Error Report
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
