"use client"

import * as React from "react"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { Input as ShadcnInput } from "@/components/ui/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define comprehensive variants for the input field
const inputVariants = cva(
    "flex w-full rounded-md border bg-background ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
    {
        variants: {
            size: {
                sm: "h-9 px-2 py-1 text-xs",
                base: "h-10 px-3 py-2 text-sm",
                lg: "h-11 px-4 py-2 text-base",
            },
            error: {
                true: "border-red-500 focus-visible:ring-red-500",
                false: "border-input focus-visible:ring-ring",
            },
            hasLeftIcon: {
                true: "",
                false: "",
            },
            hasRightIcon: {
                true: "",
                false: "",
            },
        },
        compoundVariants: [
            // Left icon padding
            { size: "sm", hasLeftIcon: true, class: "pl-8" },
            { size: "base", hasLeftIcon: true, class: "pl-10" },
            { size: "lg", hasLeftIcon: true, class: "pl-12" },
            // Right icon padding
            { size: "sm", hasRightIcon: true, class: "pr-8" },
            { size: "base", hasRightIcon: true, class: "pr-10" },
            { size: "lg", hasRightIcon: true, class: "pr-12" },
        ],
        defaultVariants: {
            size: "base",
            error: false,
            hasLeftIcon: false,
            hasRightIcon: false,
        },
    },
)

// 2. Define variants for the icons
const iconVariants = cva("transition-colors", {
    variants: {
        size: {
            sm: "h-3.5 w-3.5",
            base: "h-4 w-4",
            lg: "h-5 w-5",
        },
        state: {
            default: "text-muted-foreground",
            error: "text-red-500",
            disabled: "text-muted-foreground/50",
        },
    },
    defaultVariants: {
        size: "base",
        state: "default",
    },
})

// 3. Icon wrapper positioning
const iconWrapperVariants = cva("absolute inset-y-0 flex items-center", {
    variants: {
        position: {
            left: "left-0",
            right: "right-0",
        },
        size: {
            sm: "",
            base: "",
            lg: "",
        },
    },
    compoundVariants: [
        { position: "left", size: "sm", class: "pl-2" },
        { position: "left", size: "base", class: "pl-3" },
        { position: "left", size: "lg", class: "pl-3.5" },
        { position: "right", size: "sm", class: "pr-2" },
        { position: "right", size: "base", class: "pr-3" },
        { position: "right", size: "lg", class: "pr-3.5" },
    ],
    defaultVariants: {
        size: "base",
    },
})

// 4. Omit the conflicting "size" prop from HTML
export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
    VariantProps<typeof inputVariants> & {
        leftIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>
        rightIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>
        error?: boolean
        helperText?: string
        label?: string
    }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            leftIcon,
            rightIcon,
            size = "base",
            error = false,
            helperText,
            label,
            disabled,
            id,
            ...props
        },
        ref,
    ) => {
        // Generate a unique ID if not provided (for label association)
        const generatedId = React.useId()
        const inputId = id || generatedId

        // --- Password Logic ---
        const [showPassword, setShowPassword] = React.useState(false)
        const isPassword = type === "password"
        const inputType = isPassword && showPassword ? "text" : type

        // Determine icon state
        const iconState = disabled ? "disabled" : error ? "error" : "default"

        // Check if we have any right-side content
        const hasRightContent = isPassword || rightIcon

        return (
            <div className="w-full">
                {/* --- Label --- */}
                {label && (
                    <label
                        htmlFor={inputId}
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
                    {/* --- Left Icon --- */}
                    {leftIcon && (
                        <div
                            className={cn(
                                iconWrapperVariants({ position: "left", size }),
                                "pointer-events-none"
                            )}
                        >
                            {React.cloneElement(leftIcon, {
                                className: cn(
                                    iconVariants({ size, state: iconState }),
                                    leftIcon.props.className
                                ),
                            })}
                        </div>
                    )}

                    {/* --- The Input Atom --- */}
                    <ShadcnInput
                        id={inputId}
                        type={inputType}
                        className={cn(
                            inputVariants({
                                size,
                                error,
                                hasLeftIcon: leftIcon ? true : false,
                                hasRightIcon: hasRightContent ? true : false,
                            }),
                            className,
                        )}
                        disabled={disabled}
                        aria-invalid={error}
                        aria-describedby={helperText ? `${inputId}-helper` : undefined}
                        ref={ref}
                        {...props}
                    />

                    {/* --- Right Icon / Password Toggle / Error Icon --- */}
                    {hasRightContent && (
                        <div
                            className={cn(
                                iconWrapperVariants({ position: "right", size }),
                                !isPassword && "pointer-events-none"
                            )}
                        >
                            {isPassword ? (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={disabled}
                                    className={cn(
                                        "text-muted-foreground hover:text-foreground focus:outline-none focus:text-foreground transition-colors",
                                        disabled && "cursor-not-allowed opacity-50"
                                    )}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className={iconVariants({ size, state: iconState })} />
                                    ) : (
                                        <Eye className={iconVariants({ size, state: iconState })} />
                                    )}
                                </button>
                            ) : rightIcon ? (
                                React.cloneElement(rightIcon, {
                                    className: cn(
                                        iconVariants({ size, state: iconState }),
                                        rightIcon.props.className
                                    ),
                                })
                            ) : null}
                        </div>
                    )}
                </div>

                {/* --- Helper Text / Error Message --- */}
                {helperText && (
                    <p
                        id={`${inputId}-helper`}
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
Input.displayName = "Input"

export { Input }