"use client"

import React, { forwardRef, useId } from "react"
import { AlertCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label" // Using the INBUILT shadcn Label

// --- CVA Variants ---

// 1. For the main label
const labelTextVariants = cva("font-medium", {
    variants: { size: { sm: "text-xs", base: "text-sm", lg: "text-base" } },
    defaultVariants: { size: "base" },
})

// 2. For the main description
const descriptionTextVariants = cva("font-normal text-muted-foreground", {
    variants: { size: { sm: "text-xs", base: "text-sm", lg: "text-sm" } },
    defaultVariants: { size: "base" },
})

// 3. For each radio item's wrapper
const radioItemVariants = cva("flex items-start gap-3", {
    variants: { size: { sm: "gap-2", base: "gap-3", lg: "gap-3" } },
    defaultVariants: { size: "base" },
})

// 4. For the radio circle
const radioCircleVariants = cva(
    "relative flex flex-shrink-0 items-center justify-center rounded-full transition-all",
    {
        variants: {
            size: {
                sm: "h-4 w-4",
                base: "h-5 w-5",
                lg: "h-6 w-6",
            },
        },
        defaultVariants: { size: "base" },
    },
)

// 5. For the inner thumb
const radioThumbVariants = cva("rounded-full", {
    variants: {
        size: {
            sm: "h-1.5 w-1.5",
            base: "h-2 w-2",
            lg: "h-2.5 w-2.5",
        },
    },
    defaultVariants: { size: "base" },
})

// 6. For the option's label text
const optionLabelVariants = cva("font-medium text-foreground", {
    variants: {
        size: { sm: "text-xs", base: "text-sm", lg: "text-base" },
    },
    defaultVariants: { size: "base" },
})

// 7. For the option's description text
const optionDescriptionVariants = cva("text-muted-foreground", {
    variants: {
        size: { sm: "text-[10px]", base: "text-xs", lg: "text-sm" },
    },
    defaultVariants: { size: "base" },
})

// --- Component Props ---

export interface RadioOption {
    value: string
    label: string
    description?: string
    disabled?: boolean
}

interface RadioGroupProps
    extends VariantProps<typeof labelTextVariants> {
    label?: string
    description?: string
    error?: string
    required?: boolean
    options: RadioOption[]
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
    wrapperClassName?: string
    orientation?: "vertical" | "horizontal"
    name: string
    // Customization props
    activeClassName?: string
    thumbClassName?: string
    errorClassName?: string
    errorRingClassName?: string // More specific override for the ring
}

// --- RadioGroup Component ---
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            label,
            description,
            error,
            required,
            options,
            value,
            onChange,
            disabled,
            wrapperClassName,
            orientation = "vertical",
            name,
            size = "base",
            activeClassName,
            thumbClassName,
            errorClassName,
            errorRingClassName,
        },
        ref,
    ) => {
        const generatedId = useId()

        return (
            <div ref={ref} className={cn("w-full", wrapperClassName)}>
                {/* 1. Inbuilt Main Label */}
                {label && (
                    <Label
                        htmlFor={`${name}-${options[0]?.value}`} // Point to the first option
                        className={cn("mb-1.5 block", labelTextVariants({ size }))}
                    >
                        {label}
                        {required && <span className="text-destructive"> *</span>}
                    </Label>
                )}
                {/* 2. Inbuilt Main Description */}
                {description && !error && (
                    <p
                        className={cn(
                            "mt-0.5",
                            descriptionTextVariants({ size }),
                        )}
                    >
                        {description}
                    </p>
                )}

                {/* 3. The Radio Group */}
                <div
                    className={cn(
                        "mt-3",
                        orientation === "vertical" && "space-y-3",
                        orientation === "horizontal" &&
                        "flex flex-wrap gap-x-4 gap-y-2",
                    )}
                >
                    {options.map((option) => {
                        const isChecked = value === option.value
                        const isDisabled = disabled || option.disabled
                        const radioId = `${name}-${option.value}-${generatedId}`

                        return (
                            <label
                                key={option.value}
                                htmlFor={radioId}
                                className={cn(
                                    radioItemVariants({ size }),
                                    isDisabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer",
                                )}
                            >
                                <input
                                    type="radio"
                                    id={radioId}
                                    name={name}
                                    value={option.value}
                                    checked={isChecked}
                                    onChange={(e) => !isDisabled && onChange?.(e.target.value)}
                                    disabled={isDisabled}
                                    className="sr-only"
                                />

                                {/* The styled radio "circle" */}
                                <div
                                    className={cn(
                                        // ---
                                        // THE BUG FIX IS HERE: Removed "mt-0.5"
                                        // ---
                                        radioCircleVariants({ size }),
                                        isChecked
                                            ? cn("bg-primary border-transparent", activeClassName)
                                            : "bg-input border-transparent",
                                        error &&
                                        cn(
                                            "ring-2 ring-destructive ring-offset-2 ring-offset-background",
                                            errorRingClassName,
                                        ),
                                    )}
                                >
                                    {/* The inner "thumb" */}
                                    {isChecked && (
                                        <div
                                            className={cn(
                                                "bg-background", // Default thumb is light
                                                radioThumbVariants({ size }),
                                                thumbClassName, // Override for custom color
                                            )}
                                        />
                                    )}
                                </div>

                                {/* The option label and description */}
                                <div className="flex-1">
                                    <div
                                        className={cn(optionLabelVariants({ size }))}
                                    >
                                        {option.label}
                                    </div>
                                    {option.description && (
                                        <div
                                            className={cn(
                                                "mt-0.5",
                                                optionDescriptionVariants({ size }),
                                            )}
                                        >
                                            {option.description}
                                        </div>
                                    )}
                                </div>
                            </label>
                        )
                    })}
                </div>

                {/* 4. Inbuilt Error Message */}
                {error && (
                    <div
                        className={cn(
                            "mt-1.5 flex items-center gap-1.5 text-sm font-medium text-destructive",
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
RadioGroup.displayName = "RadioGroup"