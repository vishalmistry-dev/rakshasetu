"use client"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import {
  AlertCircle,
  Ban,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  RefreshCw,
  TrendingUp,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react"
import * as React from "react"

// ==========================================
// BADGE VARIANTS
// ==========================================

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
        error: "bg-destructive/10 text-destructive border border-destructive/20",
        info: "bg-info/10 text-info border border-info/20",
        neutral: "bg-muted text-muted-foreground border border-border",
        // Solid variants
        solidDefault: "bg-primary text-primary-foreground",
        solidSuccess: "bg-success text-success-foreground",
        solidWarning: "bg-warning text-warning-foreground",
        solidError: "bg-destructive text-destructive-foreground",
        solidInfo: "bg-info text-info-foreground",
        solidNeutral: "bg-muted-foreground text-background",
      },
      size: {
        xs: "px-1.5 py-0.5 text-[10px]",
        sm: "px-2 py-0.5 text-xs",
        base: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  }
)

const iconVariants = cva("", {
  variants: {
    size: {
      xs: "h-2.5 w-2.5",
      sm: "h-3 w-3",
      base: "h-3.5 w-3.5",
      lg: "h-4 w-4",
    },
  },
  defaultVariants: {
    size: "base",
  },
})

// ==========================================
// PREDEFINED STATUS CONFIGS
// ==========================================

type StatusType =
  // Order statuses
  | "CREATED"
  | "PAYMENT_PENDING"
  | "PAYMENT_RECEIVED"
  | "CONFIRMED"
  | "PROCESSING"
  | "READY_FOR_PICKUP"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED"
  | "FAILED_DELIVERY"
  | "RETURN_REQUESTED"
  | "RETURN_IN_TRANSIT"
  | "RETURNED"
  | "REFUNDED"
  | "DISPUTED"
  | "DISPUTE_OPEN"
  | "DISPUTE_RESOLVED"
  // Payment statuses
  | "PAID"
  | "UNPAID"
  | "PENDING"
  | "AUTHORIZED"
  | "CAPTURED"
  | "REFUND_PENDING"
  | "REFUND_PROCESSED"
  // Shipment statuses
  | "MANIFEST_CREATED"
  | "SHIPMENT_CREATED"
  | "PICKUP_SCHEDULED"
  | "PICKUP_COMPLETED"
  | "IN_WAREHOUSE"
  | "LOST"
  | "DAMAGED"
  // Fulfillment statuses
  | "UNFULFILLED"
  | "PARTIALLY_FULFILLED"
  | "FULFILLED"
  // Store statuses
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  // Generic
  | "SUCCESS"
  | "ERROR"
  | "WARNING"
  | "INFO"

interface StatusConfig {
  label: string
  variant: NonNullable<VariantProps<typeof badgeVariants>["variant"]>
  icon?: LucideIcon
}

const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  // Order statuses
  CREATED: {
    label: "Created",
    variant: "info",
    icon: Package,
  },
  PAYMENT_PENDING: {
    label: "Payment Pending",
    variant: "warning",
    icon: Clock,
  },
  PAYMENT_RECEIVED: {
    label: "Payment Received",
    variant: "success",
    icon: DollarSign,
  },
  CONFIRMED: {
    label: "Confirmed",
    variant: "success",
    icon: CheckCircle,
  },
  PROCESSING: {
    label: "Processing",
    variant: "info",
    icon: RefreshCw,
  },
  READY_FOR_PICKUP: {
    label: "Ready for Pickup",
    variant: "info",
    icon: Package,
  },
  PICKED_UP: {
    label: "Picked Up",
    variant: "success",
    icon: TrendingUp,
  },
  IN_TRANSIT: {
    label: "In Transit",
    variant: "info",
    icon: Truck,
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    variant: "info",
    icon: Truck,
  },
  DELIVERED: {
    label: "Delivered",
    variant: "success",
    icon: CheckCircle,
  },
  COMPLETED: {
    label: "Completed",
    variant: "success",
    icon: CheckCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "neutral",
    icon: Ban,
  },
  FAILED: {
    label: "Failed",
    variant: "error",
    icon: XCircle,
  },
  FAILED_DELIVERY: {
    label: "Failed Delivery",
    variant: "error",
    icon: XCircle,
  },
  RETURN_REQUESTED: {
    label: "Return Requested",
    variant: "warning",
    icon: RefreshCw,
  },
  RETURN_IN_TRANSIT: {
    label: "Return in Transit",
    variant: "warning",
    icon: Truck,
  },
  RETURNED: {
    label: "Returned",
    variant: "neutral",
    icon: RefreshCw,
  },
  REFUNDED: {
    label: "Refunded",
    variant: "success",
    icon: DollarSign,
  },
  DISPUTED: {
    label: "Disputed",
    variant: "error",
    icon: AlertCircle,
  },
  DISPUTE_OPEN: {
    label: "Dispute Open",
    variant: "error",
    icon: AlertCircle,
  },
  DISPUTE_RESOLVED: {
    label: "Dispute Resolved",
    variant: "success",
    icon: CheckCircle,
  },
  // Payment statuses
  PAID: {
    label: "Paid",
    variant: "success",
    icon: CheckCircle,
  },
  UNPAID: {
    label: "Unpaid",
    variant: "error",
    icon: XCircle,
  },
  PENDING: {
    label: "Pending",
    variant: "warning",
    icon: Clock,
  },
  AUTHORIZED: {
    label: "Authorized",
    variant: "info",
    icon: CheckCircle,
  },
  CAPTURED: {
    label: "Captured",
    variant: "success",
    icon: DollarSign,
  },
  REFUND_PENDING: {
    label: "Refund Pending",
    variant: "warning",
    icon: Clock,
  },
  REFUND_PROCESSED: {
    label: "Refund Processed",
    variant: "success",
    icon: CheckCircle,
  },
  // Shipment statuses
  MANIFEST_CREATED: {
    label: "Manifest Created",
    variant: "info",
    icon: Package,
  },
  SHIPMENT_CREATED: {
    label: "Shipment Created",
    variant: "info",
    icon: Package,
  },
  PICKUP_SCHEDULED: {
    label: "Pickup Scheduled",
    variant: "info",
    icon: Clock,
  },
  PICKUP_COMPLETED: {
    label: "Pickup Completed",
    variant: "success",
    icon: CheckCircle,
  },
  IN_WAREHOUSE: {
    label: "In Warehouse",
    variant: "info",
    icon: Package,
  },
  LOST: {
    label: "Lost",
    variant: "error",
    icon: XCircle,
  },
  DAMAGED: {
    label: "Damaged",
    variant: "error",
    icon: AlertCircle,
  },
  // Fulfillment statuses
  UNFULFILLED: {
    label: "Unfulfilled",
    variant: "warning",
    icon: Clock,
  },
  PARTIALLY_FULFILLED: {
    label: "Partially Fulfilled",
    variant: "info",
    icon: RefreshCw,
  },
  FULFILLED: {
    label: "Fulfilled",
    variant: "success",
    icon: CheckCircle,
  },
  // Store statuses
  ACTIVE: {
    label: "Active",
    variant: "success",
    icon: CheckCircle,
  },
  INACTIVE: {
    label: "Inactive",
    variant: "neutral",
    icon: Ban,
  },
  SUSPENDED: {
    label: "Suspended",
    variant: "error",
    icon: XCircle,
  },
  // Generic
  SUCCESS: {
    label: "Success",
    variant: "success",
    icon: CheckCircle,
  },
  ERROR: {
    label: "Error",
    variant: "error",
    icon: XCircle,
  },
  WARNING: {
    label: "Warning",
    variant: "warning",
    icon: AlertCircle,
  },
  INFO: {
    label: "Info",
    variant: "info",
    icon: AlertCircle,
  },
}

// ==========================================
// COMPONENT PROPS
// ==========================================

export interface StatusBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
  VariantProps<typeof badgeVariants> {
  // Either use predefined status OR custom label
  status?: StatusType | string
  label?: string

  // Override defaults
  icon?: LucideIcon | React.ReactNode | false
  showIcon?: boolean

  // Animation
  pulse?: boolean

  // Dot indicator
  showDot?: boolean
  dotPosition?: "left" | "right"
}

// ==========================================
// COMPONENT
// ==========================================

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      status,
      label,
      variant,
      size = "base",
      icon,
      showIcon = true,
      pulse = false,
      showDot = false,
      dotPosition = "left",
      className,
      ...props
    },
    ref
  ) => {
    // Get config for predefined status
    const config = status && status in STATUS_CONFIG
      ? STATUS_CONFIG[status as StatusType]
      : null

    // Determine what to display
    const displayLabel = label || config?.label || status || "Unknown"
    const displayVariant = variant || config?.variant || "neutral"
    const displayIcon = icon !== undefined ? icon : config?.icon

    // Icon component
    const IconComponent = displayIcon && typeof displayIcon === "function" ? displayIcon : null

    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant: displayVariant, size }),
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
        {/* Dot Indicator - Left */}
        {showDot && dotPosition === "left" && (
          <span
            className={cn(
              "rounded-full",
              size === "xs" && "h-1 w-1",
              size === "sm" && "h-1.5 w-1.5",
              size === "base" && "h-2 w-2",
              size === "lg" && "h-2.5 w-2.5",
              displayVariant === "success" && "bg-success",
              displayVariant === "warning" && "bg-warning",
              displayVariant === "error" && "bg-destructive",
              displayVariant === "info" && "bg-info",
              displayVariant === "neutral" && "bg-muted-foreground",
              displayVariant === "solidSuccess" && "bg-success-foreground",
              displayVariant === "solidWarning" && "bg-warning-foreground",
              displayVariant === "solidError" && "bg-destructive-foreground",
              displayVariant === "solidInfo" && "bg-info-foreground",
              displayVariant === "solidNeutral" && "bg-background"
            )}
          />
        )}

        {/* Icon */}
        {showIcon && IconComponent && (
          <IconComponent className={iconVariants({ size })} />
        )}

        {/* Custom React Node Icon */}
        {showIcon && displayIcon && typeof displayIcon !== "function" && displayIcon}

        {/* Label */}
        <span>{displayLabel}</span>

        {/* Dot Indicator - Right */}
        {showDot && dotPosition === "right" && (
          <span
            className={cn(
              "rounded-full",
              size === "xs" && "h-1 w-1",
              size === "sm" && "h-1.5 w-1.5",
              size === "base" && "h-2 w-2",
              size === "lg" && "h-2.5 w-2.5",
              displayVariant === "success" && "bg-success",
              displayVariant === "warning" && "bg-warning",
              displayVariant === "error" && "bg-destructive",
              displayVariant === "info" && "bg-info",
              displayVariant === "neutral" && "bg-muted-foreground"
            )}
          />
        )}
      </span>
    )
  }
)

StatusBadge.displayName = "StatusBadge"

// ==========================================
// USAGE EXAMPLES
// ==========================================

/*
// 1. PREDEFINED STATUS (Auto icon, label, color)
<StatusBadge status="DELIVERED" />
<StatusBadge status="PAYMENT_PENDING" />
<StatusBadge status="FAILED" />

// 2. CUSTOM LABEL
<StatusBadge label="Custom Status" variant="info" />

// 3. WITH SIZE
<StatusBadge status="COMPLETED" size="sm" />
<StatusBadge status="CANCELLED" size="lg" />

// 4. WITHOUT ICON
<StatusBadge status="DELIVERED" showIcon={false} />

// 5. CUSTOM ICON
<StatusBadge label="Urgent" variant="error" icon={AlertCircle} />

// 6. WITH DOT INDICATOR
<StatusBadge status="IN_TRANSIT" showDot dotPosition="left" />

// 7. PULSING (for live status)
<StatusBadge status="PROCESSING" pulse />

// 8. SOLID VARIANT
<StatusBadge status="COMPLETED" variant="solidSuccess" />

// 9. FULLY CUSTOM
<StatusBadge
  label="VIP Order"
  variant="solidDefault"
  size="lg"
  icon={TrendingUp}
  showDot
  className="font-bold"
/>

// 10. IN TABLE (from your old code)
{
  key: "status",
  header: "Status",
  render: (row) => <StatusBadge status={row.status} />
}
*/
