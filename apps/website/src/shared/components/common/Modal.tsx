"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

// ==========================================
// MODAL VARIANTS
// ==========================================

const overlayVariants = cva(
  "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      blur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
      },
    },
    defaultVariants: {
      blur: "sm",
    },
  }
)

const contentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        full: "max-w-[calc(100vw-2rem)]",
      },
      position: {
        center: "",
        top: "top-[10%] translate-y-0",
        bottom: "top-auto bottom-[10%] translate-y-0",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "md",
      position: "center",
      rounded: "lg",
    },
  }
)

// ==========================================
// MODAL PROPS
// ==========================================

export interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, "modal">,
  VariantProps<typeof contentVariants>,
  VariantProps<typeof overlayVariants> {
  // Trigger
  trigger?: React.ReactNode
  triggerAsChild?: boolean

  // Content
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode

  // Actions (built-in footer buttons)
  showCancel?: boolean
  showConfirm?: boolean
  cancelLabel?: string
  confirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void | Promise<void>
  confirmLoading?: boolean
  confirmDisabled?: boolean
  cancelDisabled?: boolean

  // Styling
  overlayClassName?: string
  contentClassName?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  titleClassName?: string
  descriptionClassName?: string

  // Behavior
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  closeButtonClassName?: string
  preventClose?: boolean // Prevent closing from X button

  // Variants for confirm button
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  cancelVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

  // Size control
  fullScreen?: boolean
  maxHeight?: string
}

// ==========================================
// MODAL COMPONENT
// ==========================================

export const Modal = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalProps
>(
  (
    {
      // Trigger
      trigger,
      triggerAsChild = false,

      // Content
      title,
      description,
      children,
      footer,

      // Actions
      showCancel = false,
      showConfirm = false,
      cancelLabel = "Cancel",
      confirmLabel = "Confirm",
      onCancel,
      onConfirm,
      confirmLoading = false,
      confirmDisabled = false,
      cancelDisabled = false,

      // Styling
      overlayClassName,
      contentClassName,
      headerClassName,
      bodyClassName,
      footerClassName,
      titleClassName,
      descriptionClassName,
      closeButtonClassName,

      // Behavior
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      preventClose = false,

      // Variants
      size = "md",
      position = "center",
      rounded = "lg",
      blur = "sm",
      confirmVariant = "default",
      cancelVariant = "outline",

      // Size control
      fullScreen = false,
      maxHeight,

      // Dialog props
      open,
      onOpenChange,
      defaultOpen,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = React.useState(false)

    const handleConfirm = async () => {
      if (!onConfirm) return

      setLoading(true)
      try {
        await onConfirm()
      } finally {
        setLoading(false)
      }
    }

    const handleCancel = () => {
      onCancel?.()
      onOpenChange?.(false)
    }

    const handleOpenChange = (isOpen: boolean) => {
      if (!isOpen && preventClose) return
      onOpenChange?.(isOpen)
    }

    // Has built-in footer buttons
    const hasBuiltInFooter = showCancel || showConfirm

    return (
      <DialogPrimitive.Root
        open={open}
        onOpenChange={handleOpenChange}
        defaultOpen={defaultOpen}
        {...props}
      >
        {/* Trigger */}
        {trigger && (
          <DialogPrimitive.Trigger asChild={triggerAsChild}>
            {trigger}
          </DialogPrimitive.Trigger>
        )}

        <DialogPrimitive.Portal>
          {/* Overlay */}
          <DialogPrimitive.Overlay
            className={cn(overlayVariants({ blur }), overlayClassName)}
          />

          {/* Content */}
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              contentVariants({ size, position, rounded }),
              fullScreen && "max-w-none w-screen h-screen rounded-none",
              maxHeight && `max-h-[${maxHeight}]`,
              contentClassName
            )}
            onPointerDownOutside={(e) => {
              if (!closeOnOverlayClick) e.preventDefault()
            }}
            onEscapeKeyDown={(e) => {
              if (!closeOnEscape) e.preventDefault()
            }}
          >
            {/* Header */}
            {(title || description || showCloseButton) && (
              <div className={cn("flex flex-col space-y-1.5 px-6 pt-6", headerClassName)}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-1">
                    {title && (
                      <DialogPrimitive.Title
                        className={cn(
                          "text-lg font-semibold leading-none tracking-tight",
                          titleClassName
                        )}
                      >
                        {title}
                      </DialogPrimitive.Title>
                    )}
                    {description && (
                      <DialogPrimitive.Description
                        className={cn("text-sm text-muted-foreground", descriptionClassName)}
                      >
                        {description}
                      </DialogPrimitive.Description>
                    )}
                  </div>

                  {/* Close Button */}
                  {showCloseButton && !preventClose && (
                    <DialogPrimitive.Close
                      className={cn(
                        "rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground ml-4",
                        closeButtonClassName
                      )}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                  )}
                </div>
              </div>
            )}

            {/* Body */}
            {children && (
              <div
                className={cn(
                  "px-6 py-4 overflow-y-auto",
                  !title && !description && "pt-6",
                  bodyClassName
                )}
              >
                {children}
              </div>
            )}

            {/* Footer */}
            {(footer || hasBuiltInFooter) && (
              <div
                className={cn(
                  "flex items-center justify-end gap-3 px-6 pb-6",
                  footerClassName
                )}
              >
                {/* Custom Footer */}
                {footer && <div className="flex-1">{footer}</div>}

                {/* Built-in Actions */}
                {hasBuiltInFooter && (
                  <div className="flex items-center gap-3">
                    {showCancel && (
                      <Button
                        type="button"
                        variant={cancelVariant}
                        onClick={handleCancel}
                        disabled={cancelDisabled || loading || confirmLoading}
                      >
                        {cancelLabel}
                      </Button>
                    )}
                    {showConfirm && (
                      <Button
                        type="button"
                        variant={confirmVariant}
                        onClick={handleConfirm}
                        disabled={confirmDisabled || loading || confirmLoading}
                      >
                        {confirmLabel}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }
)

Modal.displayName = "Modal"

// ==========================================
// USAGE EXAMPLES
// ==========================================

/*
// 1. SIMPLE CONFIRMATION MODAL
<Modal
  trigger={<Button>Delete</Button>}
  title="Are you sure?"
  description="This action cannot be undone."
  showCancel
  showConfirm
  confirmLabel="Delete"
  confirmVariant="destructive"
  onConfirm={handleDelete}
/>

// 2. FORM MODAL
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Create Product"
  size="lg"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={handleSubmit}>Save</Button>
    </>
  }
>
  <ProductForm />
</Modal>

// 3. FULL CUSTOM MODAL
<Modal
  open={isOpen}
  onOpenChange={setIsOpen}
  size="2xl"
  position="top"
  blur="lg"
  closeOnOverlayClick={false}
  contentClassName="p-0"
>
  <CustomContent />
</Modal>

// 4. CONTROLLED WITH LOADING
const [open, setOpen] = useState(false)
const [loading, setLoading] = useState(false)

<Modal
  open={open}
  onOpenChange={setOpen}
  title="Update Order"
  showCancel
  showConfirm
  confirmLoading={loading}
  onConfirm={async () => {
    setLoading(true)
    await updateOrder()
    setLoading(false)
    setOpen(false)
  }}
>
  <OrderForm />
</Modal>
*/
