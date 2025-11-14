"use client"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, Info } from "lucide-react"
import * as React from "react"

// ==========================================
// FORMFIELD VARIANTS
// ==========================================

const formFieldVariants = cva("space-y-2", {
  variants: {
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row items-start gap-4",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

const labelVariants = cva("font-medium", {
  variants: {
    size: {
      sm: "text-xs",
      base: "text-sm",
      lg: "text-base",
    },
    required: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    size: "base",
    required: false,
  },
})

// ==========================================
// FORMFIELD PROPS
// ==========================================

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof formFieldVariants> {
  // Label
  label?: string
  labelClassName?: string
  required?: boolean
  optional?: boolean
  htmlFor?: string

  // Description
  description?: string
  descriptionClassName?: string

  // Error
  error?: string | string[]
  errorClassName?: string

  // Info/Hint
  hint?: string
  hintClassName?: string

  // Input wrapper
  children: React.ReactNode
  inputWrapperClassName?: string

  // Layout
  labelWidth?: string // for horizontal layout

  // Behavior
  showErrorIcon?: boolean
  showHintIcon?: boolean
}

// ==========================================
// COMPONENT
// ==========================================

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      // Label
      label,
      labelClassName,
      required = false,
      optional = false,
      htmlFor,

      // Description
      description,
      descriptionClassName,

      // Error
      error,
      errorClassName,

      // Hint
      hint,
      hintClassName,

      // Children
      children,
      inputWrapperClassName,

      // Layout
      orientation = "vertical",
      labelWidth,

      // Behavior
      showErrorIcon = true,
      showHintIcon = false,

      // HTML
      className,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error)
    const errorArray = Array.isArray(error) ? error : error ? [error] : []

    // Generate ID if not provided
    const generatedId = React.useId()
    const fieldId = htmlFor || generatedId

    return (
      <div
        ref={ref}
        className={cn(
          formFieldVariants({ orientation }),
          orientation === "horizontal" && "items-start",
          className
        )}
        {...props}
      >
        {/* Label Section */}
        {label && (
          <div
            className={cn(
              orientation === "horizontal" && "flex-shrink-0",
              orientation === "horizontal" && labelWidth
            )}
            style={
              orientation === "horizontal" && labelWidth
                ? { width: labelWidth }
                : undefined
            }
          >
            <Label
              htmlFor={fieldId}
              className={cn(
                labelVariants({ required }),
                hasError && "text-destructive",
                labelClassName
              )}
            >
              {label}
              {required && <span className="text-destructive ml-0.5">*</span>}
              {optional && (
                <span className="text-muted-foreground font-normal ml-1.5 text-xs">
                  (optional)
                </span>
              )}
            </Label>

            {/* Description under label (only in vertical) */}
            {description && orientation === "vertical" && (
              <p
                className={cn(
                  "text-xs text-muted-foreground mt-0.5",
                  descriptionClassName
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Input Section */}
        <div
          className={cn(
            "flex-1 space-y-1.5",
            orientation === "horizontal" && "w-full",
            inputWrapperClassName
          )}
        >
          {/* Description above input (only in horizontal) */}
          {description && orientation === "horizontal" && (
            <p
              className={cn(
                "text-xs text-muted-foreground",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}

          {/* Input/Children */}
          <div className="w-full">{children}</div>

          {/* Hint */}
          {hint && !hasError && (
            <div
              className={cn(
                "flex items-start gap-1.5 text-xs text-muted-foreground",
                hintClassName
              )}
            >
              {showHintIcon && <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />}
              <span>{hint}</span>
            </div>
          )}

          {/* Error Messages */}
          {hasError && (
            <div className="space-y-1">
              {errorArray.map((err, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-1.5 text-xs font-medium text-destructive",
                    errorClassName
                  )}
                >
                  {showErrorIcon && (
                    <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{err}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)

FormField.displayName = "FormField"

// ==========================================
// FORMFIELD GROUP (for grouping fields)
// ==========================================

export interface FormFieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children: React.ReactNode
  titleClassName?: string
  descriptionClassName?: string
}

export const FormFieldGroup = React.forwardRef<HTMLDivElement, FormFieldGroupProps>(
  (
    {
      title,
      description,
      children,
      className,
      titleClassName,
      descriptionClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className={cn("text-base font-semibold", titleClassName)}>
                {title}
              </h3>
            )}
            {description && (
              <p className={cn("text-sm text-muted-foreground", descriptionClassName)}>
                {description}
              </p>
            )}
          </div>
        )}
        <div className="space-y-4">{children}</div>
      </div>
    )
  }
)

FormFieldGroup.displayName = "FormFieldGroup"
