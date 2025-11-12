"use client"

import React, { forwardRef, useId } from "react"
import { AlertCircle, Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Label as ShadcnLabel } from "@/components/ui/label" // Use the 'atom'

// --- CVA Variants ---
const boxVariants = cva(
    "relative flex-shrink-0 rounded border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    {
        variants: {
            size: {
                sm: "h-3.5 w-3.5 rounded-sm",
                base: "h-4 w-4 rounded-sm",
                lg: "h-5 w-5 rounded",
            },
        },
        defaultVariants: { size: "base" },
    },
)

const iconVariants = cva("transition-all", {
    variants: {
        size: {
            sm: "h-2.5 w-2.5",
            base: "h-3 w-3",
            lg: "h-3.5 w-3.5",
        },
    },
    defaultVariants: { size: "base" },
})

const labelTextVariants = cva("font-medium text-foreground", {
    variants: {
        size: {
            sm: "text-xs",
            base: "text-sm",
            lg: "text-base",
        },
    },
    defaultVariants: { size: "base" },
})

const descriptionTextVariants = cva("text-muted-foreground", {
    variants: {
        size: {
            sm: "text-[10px]",
            base: "text-xs",
            lg: "text-sm",
        },
    },
    defaultVariants: { size: "base" },
})

// --- Component Props ---
interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof boxVariants> {
    label?: string
    description?: string
    error?: string
    required?: boolean
    wrapperClassName?: string
    // Customization
    activeClassName?: string
    iconClassName?: string
    errorClassName?: string
}

// --- Checkbox Component ---
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            className,
            label,
            description,
            error,
            required,
            wrapperClassName,
            disabled,
            checked,
            id,
            size = "base",
            activeClassName,
            iconClassName,
            errorClassName,
            ...props
        },
        ref,
    ) => {
        const generatedId = useId()
        const inputId = id || generatedId
        const errorId = error ? `${inputId}-error` : undefined
        const descriptionId = description ? `${inputId}-description` : undefined

        return (
            <div className={cn("w-full", wrapperClassName)}>
                <div className={cn("flex items-start", size === "sm" ? "gap-2" : "gap-3")}>

                    <div className="relative flex items-center justify-center">
                        <input
                            ref={ref}
                            type="checkbox"
                            id={inputId}
                            disabled={disabled}
                            checked={checked}
                            className="sr-only"
                            aria-describedby={`${descriptionId || ""} ${errorId || ""}`}
                            {...props}
                        />
                        {/* The visible box (is a label) */}
                        <label
                            htmlFor={inputId}
                            className={cn(
                                "flex items-center justify-center top-1",
                                boxVariants({ size }),
                                checked
                                    ? cn("border-primary bg-primary", activeClassName)
                                    : "border-input bg-background",
                                error && "border-destructive",
                                disabled
                                    ? "opacity-50"
                                    : "cursor-pointer hover:border-primary/70",
                                className,
                            )}
                        >
                            {checked && (
                                <Check
                                    className={cn(
                                        "text-primary-foreground", // Default white icon
                                        iconVariants({ size }),
                                        iconClassName,
                                    )}
                                    strokeWidth={3}
                                />
                            )}
                        </label>
                    </div>

                    {/* 2. Inbuilt Label & Description (wrapped in a label) */}
                    {label && (
                        <div className="flex-1">
                            <ShadcnLabel // Using the base atom
                                htmlFor={inputId}
                                className={cn(
                                    labelTextVariants({ size }),
                                    disabled ? "cursor-not-allowed" : "cursor-pointer",
                                )}
                            >
                                {label}
                                {required && <span className="text-destructive"> *</span>}
                            </ShadcnLabel>
                            {description && !error && (
                                <p
                                    id={descriptionId}
                                    className={cn(
                                        "mt-0.5",
                                        descriptionTextVariants({ size }),
                                    )}
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* 3. Inbuilt Error Message */}
                {error && (
                    <div
                        id={errorId}
                        className={cn(
                            "mt-1.5 flex items-center gap-1.5 text-sm font-medium text-destructive",
                            // This dynamically calculates the left padding
                            label && size === "sm" && "pl-[calc(0.5rem+0.875rem)]", // gap-2 + h-3.5
                            label && size === "base" && "pl-[calc(0.75rem+1rem)]", // gap-3 + h-4
                            label && size === "lg" && "pl-[calc(0.75rem+1.25rem)]", // gap-3 + h-5
                            errorClassName,
                        )}
                    >
                        <AlertCircle className="h-4 w-4" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        )
    },
)
Checkbox.displayName = "Checkbox"

export default Checkbox