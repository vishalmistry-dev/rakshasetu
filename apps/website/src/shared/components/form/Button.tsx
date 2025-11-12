import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react" // Import the loader icon

import { cn } from "@/lib/utils"

// 1. This is our existing buttonVariants, no changes needed
const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

// 2. NEW: We add CVA variants for the icons
const iconVariants = cva("transition-all", {
    variants: {
        size: {
            default: "h-4 w-4",
            sm: "h-3.5 w-3.5",
            lg: "h-5 w-5",
            icon: "h-4 w-4",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

// 3. NEW: We extend the ButtonProps
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            loading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button"

        // Helper to get the icon class string
        const iconClass = cn(iconVariants({ size }))

        // Helper to render an icon
        const renderIcon = (icon: React.ReactNode) => {
            if (React.isValidElement(icon)) {
                return React.cloneElement(
                    icon as React.ReactElement<{ className: string }>,
                    {
                        className: iconClass,
                    },
                )
            }
            return null
        }

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {/*
          ---
          NEW RENDER LOGIC
          ---
        */}
                {loading && size !== "icon" && (
                    <Loader2 className={cn(iconClass, "mr-2 animate-spin")} />
                )}
                {!loading && leftIcon && size !== "icon" && (
                    <span className="mr-2">{renderIcon(leftIcon)}</span>
                )}

                {/* Handle "icon" size */}
                {loading && size === "icon" ? (
                    <Loader2 className={cn(iconClass, "animate-spin")} />
                ) : size === "icon" ? (
                    renderIcon(children)
                ) : (
                    // Default: render children
                    children
                )}

                {!loading && rightIcon && size !== "icon" && (
                    <span className="ml-2">{renderIcon(rightIcon)}</span>
                )}
            </Comp>
        )
    },
)
Button.displayName = "Button"

export { Button, buttonVariants }