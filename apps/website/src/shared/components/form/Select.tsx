"use client"

import * as React from "react"
import { AlertCircle, Check, ChevronDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Define variants for the trigger button
const selectTriggerVariants = cva(
    "flex w-full items-center justify-between rounded-md border bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
    {
        variants: {
            size: {
                sm: "h-9 px-2 py-1 text-xs",
                base: "h-10 px-3 py-2 text-sm",
                lg: "h-11 px-4 py-2 text-base",
            },
            error: {
                true: "border-red-500 focus:ring-red-500",
                false: "border-input focus:ring-ring",
            },
        },
        defaultVariants: {
            size: "base",
            error: false,
        },
    },
)

// 2. Icon variants
const iconVariants = cva("transition-transform", {
    variants: {
        size: {
            sm: "h-3.5 w-3.5",
            base: "h-4 w-4",
            lg: "h-5 w-5",
        },
    },
    defaultVariants: {
        size: "base",
    },
})

// 3. Select Option Type
export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

// 4. Select Props
export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> &
    VariantProps<typeof selectTriggerVariants> & {
        label?: string
        error?: boolean
        helperText?: string
        options: SelectOption[]
        placeholder?: string
        wrapperClassName?: string
    }

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            label,
            error = false,
            helperText,
            options,
            placeholder = "Select an option",
            size = "base",
            disabled,
            id,
            wrapperClassName,
            value,
            onChange,
            ...props
        },
        ref,
    ) => {
        const [isOpen, setIsOpen] = React.useState(false)
        const [internalValue, setInternalValue] = React.useState(value || "")
        const [dropdownPosition, setDropdownPosition] = React.useState<'bottom' | 'top'>('bottom')
        const containerRef = React.useRef<HTMLDivElement>(null)
        const dropdownRef = React.useRef<HTMLDivElement>(null)
        const triggerRef = React.useRef<HTMLButtonElement>(null)

        // Generate a unique ID if not provided
        const generatedId = React.useId()
        const selectId = id || generatedId

        // Get the selected option label
        const selectedOption = options.find(opt => opt.value === internalValue)
        const displayValue = selectedOption ? selectedOption.label : placeholder

        // Calculate dropdown position based on available space
        React.useEffect(() => {
            if (isOpen && triggerRef.current) {
                const triggerRect = triggerRef.current.getBoundingClientRect()
                const dropdownHeight = 300 // max-h-[300px]
                const spaceBelow = window.innerHeight - triggerRect.bottom
                const spaceAbove = triggerRect.top

                // If not enough space below but more space above, show on top
                if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                    setDropdownPosition('top')
                } else {
                    setDropdownPosition('bottom')
                }
            }
        }, [isOpen])

        // Close dropdown when clicking outside
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false)
                }
            }

            if (isOpen) {
                document.addEventListener("mousedown", handleClickOutside)
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [isOpen])

        // Handle keyboard navigation
        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (disabled) return

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setIsOpen(!isOpen)
            } else if (event.key === "Escape") {
                setIsOpen(false)
            } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault()
                if (!isOpen) {
                    setIsOpen(true)
                }
            }
        }

        const handleOptionClick = (optionValue: string, optionDisabled?: boolean) => {
            if (optionDisabled || disabled) return

            setInternalValue(optionValue)
            setIsOpen(false)

            // Trigger onChange event
            if (onChange) {
                const syntheticEvent = {
                    target: { value: optionValue },
                    currentTarget: { value: optionValue },
                } as React.ChangeEvent<HTMLSelectElement>
                onChange(syntheticEvent)
            }
        }

        // Sync internal value with prop value
        React.useEffect(() => {
            if (value !== undefined) {
                setInternalValue(value)
            }
        }, [value])

        return (
            <div className={cn("w-full", wrapperClassName)}>
                {/* Hidden select for form compatibility */}
                <select
                    ref={ref}
                    id={selectId}
                    value={internalValue}
                    onChange={(e) => {
                        setInternalValue(e.target.value)
                        onChange?.(e)
                    }}
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Label */}
                {label && (
                    <label
                        htmlFor={selectId}
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
                    {/* Custom Trigger Button */}
                    <button
                        ref={triggerRef}
                        type="button"
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        className={cn(
                            selectTriggerVariants({ size, error }),
                            !selectedOption && "text-muted-foreground",
                            className
                        )}
                        aria-haspopup="listbox"
                        aria-expanded={isOpen}
                        aria-labelledby={label ? `${selectId}-label` : undefined}
                        aria-describedby={helperText ? `${selectId}-helper` : undefined}
                    >
                        <span className="truncate">{displayValue}</span>
                        <ChevronDown
                            className={cn(
                                iconVariants({ size }),
                                "ml-2 shrink-0 text-muted-foreground",
                                isOpen && "rotate-180"
                            )}
                        />
                    </button>

                    {/* Custom Dropdown */}
                    {isOpen && (
                        <div
                            ref={dropdownRef}
                            className={cn(
                                "absolute z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
                                "max-h-[300px] overflow-auto",
                                dropdownPosition === 'top'
                                    ? "bottom-full mb-1"
                                    : "top-full mt-1"
                            )}
                            role="listbox"
                        >
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleOptionClick(option.value, option.disabled)}
                                    className={cn(
                                        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        "focus:bg-accent focus:text-accent-foreground",
                                        option.disabled && "pointer-events-none opacity-50",
                                        internalValue === option.value && "bg-accent"
                                    )}
                                    role="option"
                                    aria-selected={internalValue === option.value}
                                    aria-disabled={option.disabled}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {internalValue === option.value && (
                                        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                                            <Check className="h-4 w-4" />
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Helper Text / Error Message */}
                {helperText && (
                    <p
                        id={`${selectId}-helper`}
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
Select.displayName = "Select"

export { Select }