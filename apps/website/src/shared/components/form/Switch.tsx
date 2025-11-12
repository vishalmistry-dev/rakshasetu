"use client"

import * as React from "react"
import { AlertCircle, Check, X, Minus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define variants for the switch
const switchVariants = cva(
    "relative inline-flex items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            size: {
                sm: "h-5 w-9",
                base: "h-6 w-11",
                lg: "h-7 w-14",
            },
            state: {
                off: "bg-input",
                partial: "bg-primary/60",
                on: "bg-primary",
            },
            error: {
                true: "ring-2 ring-destructive ring-offset-2",
                false: "",
            },
        },
        defaultVariants: {
            size: "base",
            state: "off",
            error: false,
        },
    },
)

// 2. Thumb variants
const thumbVariants = cva(
    "inline-block transform rounded-full bg-background shadow-lg transition-transform duration-200",
    {
        variants: {
            size: {
                sm: "h-4 w-4",
                base: "h-5 w-5",
                lg: "h-6 w-6",
            },
        },
        defaultVariants: {
            size: "base",
        },
    },
)

// 3. Variants for the ICON inside the thumb
const thumbIconVariants = cva(
    "transition-colors", // For color transition
    {
        variants: {
            size: {
                sm: "h-2.5 w-2.5",
                base: "h-3 w-3",
                lg: "h-4 w-4",
            },
            state: {
                on: "text-primary",
                off: "text-muted-foreground",
                partial: "text-primary",
            },
        },
        defaultVariants: {
            size: "base",
            state: "off",
        },
    },
)

// 4. Three-state type
export type SwitchState = "off" | "partial" | "on" | null

// 5. Switch Props
export type SwitchProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onChange"
> &
    VariantProps<typeof switchVariants> & {
        label?: string
        helperText?: string
        checked?: boolean
        onCheckedChange?: (checked: boolean) => void
        threeState?: boolean
        onStateChange?: (state: SwitchState) => void
        wrapperClassName?: string
        labelPosition?: "left" | "right"
        showStateLabel?: boolean
        // ---
        // NEW PROPS FOR OVERRIDING COLORS
        // ---
        onClassName?: string
        onIconClassName?: string
        partialClassName?: string
        partialIconClassName?: string
    }

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    (
        {
            className,
            label,
            helperText,
            error = false,
            checked = false,
            onCheckedChange,
            threeState = false,
            state = "off",
            onStateChange,
            size = "base",
            disabled,
            id,
            wrapperClassName,
            labelPosition = "right",
            showStateLabel = false,
            // ---
            // Get the new props
            // ---
            onClassName,
            onIconClassName,
            partialClassName,
            partialIconClassName,
            ...props
        },
        ref,
    ) => {
        // Generate a unique ID if not provided
        const generatedId = React.useId()
        const switchId = id || generatedId

        // Determine current state
        const currentState: SwitchState = threeState
            ? state
            : checked
                ? "on"
                : "off"

        // Calculate thumb position
        const getThumbPosition = () => {
            switch (size) {
                case "sm": // w-9 (36px), thumb w-4 (16px), padding 2px (0.5)
                    if (currentState === "off") return "translate-x-[2px]"
                    if (currentState === "partial") return "translate-x-[10px]"
                    if (currentState === "on") return "translate-x-[18px]"
                    return ""
                case "lg": // w-14 (56px), thumb w-6 (24px), padding 2px (0.5)
                    if (currentState === "off") return "translate-x-[2px]"
                    if (currentState === "partial") return "translate-x-[16px]"
                    if (currentState === "on") return "translate-x-[30px]"
                    return ""
                case "base": // w-11 (44px), thumb w-5 (20px), padding 2px (0.5)
                default:
                    if (currentState === "off") return "translate-x-[2px]"
                    if (currentState === "partial") return "translate-x-[12px]"
                    if (currentState === "on") return "translate-x-[22px]"
                    return ""
            }
        }

        // Handle click
        const handleClick = () => {
            if (disabled) return

            if (threeState && onStateChange) {
                const nextState: SwitchState =
                    currentState === "off"
                        ? "partial"
                        : currentState === "partial"
                            ? "on"
                            : "off"
                onStateChange(nextState)
            } else if (onCheckedChange) {
                onCheckedChange(!checked)
            }
        }

        // Handle keyboard interaction
        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (disabled) return

            if (e.key === " " || e.key === "Enter") {
                e.preventDefault()
                handleClick()
            }
        }

        const switchElement = (
            <button
                ref={ref}
                type="button"
                role="switch"
                id={switchId}
                aria-checked={threeState ? currentState === "on" : checked}
                aria-label={label || "Toggle switch"}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className={cn(
                    switchVariants({ size, state: currentState, error }),
                    // ---
                    // APPLY OVERRIDES HERE
                    // ---
                    currentState === "on" && onClassName,
                    currentState === "partial" && partialClassName,
                    className,
                )}
                aria-describedby={helperText ? `${switchId}-helper` : undefined}
                {...props}
            >
                <span
                    className={cn(
                        thumbVariants({ size }),
                        getThumbPosition(),
                        "flex items-center justify-center",
                    )}
                >
                    {showStateLabel && (
                        <>
                            {currentState === "on" && (
                                <Check
                                    className={cn(
                                        thumbIconVariants({ size, state: "on" }),
                                        // APPLY ICON OVERRIDE
                                        onIconClassName,
                                    )}
                                />
                            )}
                            {currentState === "off" && (
                                <X
                                    className={cn(thumbIconVariants({ size, state: "off" }))}
                                />
                            )}
                            {currentState === "partial" && (
                                <Minus
                                    className={cn(
                                        thumbIconVariants({ size, state: "partial" }),
                                        // APPLY ICON OVERRIDE
                                        partialIconClassName,
                                    )}
                                />
                            )}
                        </>
                    )}
                </span>
            </button>
        )

        return (
            <div className={cn("w-full", wrapperClassName)}>
                <div
                    className={cn(
                        "flex items-center gap-3",
                        labelPosition === "left" && "flex-row-reverse justify-end",
                    )}
                >
                    {switchElement}

                    {label && (
                        <label
                            htmlFor={switchId}
                            className={cn(
                                "text-sm font-medium cursor-pointer select-none",
                                error ? "text-destructive" : "text-foreground",
                                disabled && "opacity-50 cursor-not-allowed",
                            )}
                        >
                            {label}
                        </label>
                    )}
                </div>

                {/* Helper Text / Error Message */}
                {helperText && (
                    <p
                        id={`${switchId}-helper`}
                        className={cn(
                            "mt-1.5 text-xs",
                            labelPosition === "right" ? "ml-14" : "mr-14",
                            error ? "text-destructive" : "text-muted-foreground",
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
Switch.displayName = "Switch"

export { Switch }