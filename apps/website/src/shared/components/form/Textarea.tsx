"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define variants for the textarea
const textareaVariants = cva(
    "flex w-full rounded-md border bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y",
    {
        variants: {
            size: {
                sm: "min-h-[80px] text-xs",
                base: "min-h-[100px] text-sm",
                lg: "min-h-[120px] text-base",
            },
            error: {
                true: "border-red-500 focus-visible:ring-red-500",
                false: "border-input focus-visible:ring-ring",
            },
        },
        defaultVariants: {
            size: "base",
            error: false,
        },
    },
)

// 2. Textarea Props
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    VariantProps<typeof textareaVariants> & {
        label?: string
        error?: boolean
        helperText?: string
        showCount?: boolean
        wrapperClassName?: string
    }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            label,
            error = false,
            helperText,
            showCount = false,
            size = "base",
            disabled,
            id,
            maxLength,
            value,
            wrapperClassName,
            ...props
        },
        ref,
    ) => {
        // Generate a unique ID if not provided
        const generatedId = React.useId()
        const textareaId = id || generatedId

        // Calculate current character count
        const currentLength = value?.toString().length || 0
        const showCounter = showCount && maxLength

        return (
            <div className={cn("w-full", wrapperClassName)}>
                {/* --- Label --- */}
                {label && (
                    <label
                        htmlFor={textareaId}
                        className={cn(
                            "mb-1.5 block text-sm font-medium",
                            error ? "text-red-500" : "text-foreground",
                            disabled && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {label}
                    </label>
                )}

                <div className="relative w-full">
                    {/* --- Textarea --- */}
                    <textarea
                        id={textareaId}
                        className={cn(
                            textareaVariants({ size, error }),
                            showCounter && "pb-8", // Extra padding for counter
                            className,
                        )}
                        disabled={disabled}
                        maxLength={maxLength}
                        value={value}
                        aria-invalid={error}
                        aria-describedby={helperText ? `${textareaId}-helper` : undefined}
                        ref={ref}
                        {...props}
                    />

                    {/* --- Character Counter --- */}
                    {showCounter && (
                        <div
                            className={cn(
                                "absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-sm border",
                                currentLength === maxLength
                                    ? "text-red-500 border-red-300"
                                    : "text-muted-foreground border-border"
                            )}
                        >
                            {currentLength}/{maxLength}
                        </div>
                    )}
                </div>

                {/* --- Helper Text / Error Message --- */}
                {helperText && (
                    <p
                        id={`${textareaId}-helper`}
                        className={cn(
                            "mt-1.5 text-xs",
                            error ? "text-red-500" : "text-muted-foreground"
                        )}
                    >
                        {error && <AlertCircle className="inline h-3 w-3 mr-1" />}
                        {helperText}
                    </p>
                )}
            </div>
        )
    },
)
Textarea.displayName = "Textarea"

export { Textarea }