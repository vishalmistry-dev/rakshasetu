"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { toast } from "sonner"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

export function showToast(type: ToastType, options: ToastOptions) {
  const Icon =
    type === "success" ? CheckCircle2 :
      type === "error" ? XCircle :
        type === "warning" ? AlertTriangle :
          Info

  const colorMap = {
    success: {
      border: "border-l-green-500",
      icon: "text-green-600",
      title: "text-green-800",
    },
    error: {
      border: "border-l-red-500",
      icon: "text-red-600",
      title: "text-red-800",
    },
    warning: {
      border: "border-l-yellow-500",
      icon: "text-yellow-600",
      title: "text-yellow-800",
    },
    info: {
      border: "border-l-blue-500",
      icon: "text-blue-600",
      title: "text-blue-800",
    },
  }

  const { border, icon, title } = colorMap[type]

  toast.custom((t) => (
    <div className="w-[360px] bg-white shadow-lg rounded-lg border border-gray-200 p-4">
      <div className={cn("relative flex items-center gap-3 border-l-4 pl-3", border)}>
        {/* Icon */}
        <div className="flex-shrink-0 pt-0.5">
          <Icon className={cn("h-8 w-8", icon)} />
        </div>

        {/* Content */}
        <div className="flex-1 pr-6">
          {options.title && (
            <p className={cn("text-sm font-semibold leading-tight mb-1", title)}>
              {options.title}
            </p>
          )}
          {options.description && (
            <p className="text-xs leading-snug text-gray-600">
              {options.description}
            </p>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => toast.dismiss(t)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  ), {
    duration: options.duration ?? 3000,
  })
}
