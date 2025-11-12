"use client"

import React, { forwardRef, useId } from "react" // Removed useState, useEffect
import { UploadCloud, File, X, AlertCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// --- CVA Variants ---
const dropzoneVariants = cva(
    "relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200",
    {
        variants: { size: { base: "p-6", sm: "p-4" } },
        defaultVariants: { size: "base" },
    },
)

const dropzoneIconVariants = cva("mx-auto mb-3 text-muted-foreground", {
    variants: { size: { base: "h-10 w-10", sm: "h-8 w-8" } },
    defaultVariants: { size: "base" },
})

const labelTextVariants = cva("font-medium", {
    variants: { size: { base: "text-sm", sm: "text-xs" } },
    defaultVariants: { size: "base" },
})

const descriptionTextVariants = cva("font-normal text-muted-foreground", {
    variants: { size: { base: "text-xs", sm: "text-[10px]" } },
    defaultVariants: { size: "base" },
})

// --- Component Props ---
interface FileInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value">,
    VariantProps<typeof dropzoneVariants> {
    label?: string
    description?: string
    error?: string
    required?: boolean
    maxSize?: number // in MB
    onChange?: (files: File[]) => void
    value?: File[] // This is now our *only* source of truth
    wrapperClassName?: string
    // NEW: Color customization props
    activeClassName?: string
    errorClassName?: string
    errorTextClassName?: string
    accentClassName?: string
}

// --- FileInput Component ---
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    (
        {
            label,
            description,
            error,
            required,
            accept,
            multiple,
            maxSize,
            onChange,
            value = [], // Default to an empty array
            disabled,
            wrapperClassName,
            id,
            name,
            size = "base",
            // NEW: Destructure color props
            activeClassName,
            errorClassName,
            errorTextClassName,
            accentClassName,
            ...props
        },
        ref,
    ) => {
        const generatedId = useId()
        const inputId = id || generatedId

        const [dragActive, setDragActive] = React.useState(false)
        const [sizeError, setSizeError] = React.useState<string>("")

        const handleFiles = (newFiles: FileList | null) => {
            if (!newFiles) return

            const filesArray = Array.from(newFiles)
            const invalidFiles: string[] = []

            const validFiles = filesArray.filter((file) => {
                if (maxSize && file.size > maxSize * 1024 * 1024) {
                    invalidFiles.push(file.name)
                    return false
                }
                return true
            })

            if (invalidFiles.length > 0) {
                setSizeError(
                    `Files too large: ${invalidFiles.join(", ")} (Max ${maxSize}MB)`,
                )
            } else {
                setSizeError("")
            }

            // FIX: We read from the `value` prop and only call `onChange`
            const updatedFiles = multiple ? [...value, ...validFiles] : validFiles
            onChange?.(updatedFiles)
        }

        const removeFile = (index: number) => {
            // FIX: We filter the `value` prop and only call `onChange`
            const newFiles = value.filter((_, i) => i !== index)
            onChange?.(newFiles)
            setSizeError("")
        }

        const handleDrag = (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (e.type === "dragenter" || e.type === "dragover") {
                setDragActive(true)
            } else if (e.type === "dragleave") {
                setDragActive(false)
            }
        }

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setDragActive(false)
            if (!disabled) {
                handleFiles(e.dataTransfer.files)
            }
        }

        const formatFileSize = (bytes: number): string => {
            if (bytes < 1024) return bytes + " B"
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
            return (bytes / (1024 * 1024)).toFixed(2) + " MB"
        }

        const displayError = error || sizeError

        return (
            <div className={cn("w-full", wrapperClassName)}>
                {/* 1. Inbuilt Label */}
                {label && (
                    <Label
                        htmlFor={inputId}
                        className={cn("mb-1.5 block", labelTextVariants({ size }))}
                    >
                        {label}
                        {required && <span className="text-destructive"> *</span>}
                        {description && (
                            <span
                                className={cn("ml-2", descriptionTextVariants({ size }))}
                            >
                                ({description})
                            </span>
                        )}
                    </Label>
                )}

                {/* 2. The Dropzone with Color Overrides */}
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        dropzoneVariants({ size }),
                        "border-input",
                        dragActive
                            ? cn("border-primary bg-primary/10", activeClassName) // <-- OVERRIDE
                            : displayError
                                ? cn("border-destructive", errorClassName) // <-- OVERRIDE
                                : "hover:border-muted-foreground",
                        disabled && "opacity-50 cursor-not-allowed",
                        !disabled && "cursor-pointer",
                    )}
                >
                    <input
                        ref={ref}
                        type="file"
                        id={inputId}
                        name={name}
                        accept={accept}
                        multiple={multiple}
                        onChange={(e) => handleFiles(e.target.files)}
                        disabled={disabled}
                        className="sr-only"
                        {...props}
                    />
                    <label
                        htmlFor={inputId}
                        className={cn("flex flex-col items-center", !disabled && "cursor-pointer")}
                    >
                        <UploadCloud className={cn(dropzoneIconVariants({ size }))} />
                        <p
                            className={cn(
                                "text-muted-foreground",
                                size === "sm" ? "text-xs" : "text-sm",
                            )}
                        >
                            <span className={cn("font-medium text-primary", accentClassName)}> {/* <-- OVERRIDE */}
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p
                            className={cn(
                                "text-muted-foreground",
                                size === "sm" ? "text-[10px]" : "text-xs",
                            )}
                        >
                            {accept || "Any file type"}
                            {maxSize && ` (Max ${maxSize}MB)`}
                        </p>
                    </label>
                </div>

                {/* 3. The File List (using `value` prop) */}
                {value.length > 0 && (
                    <div className="mt-3 space-y-2">
                        {value.map((file, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-center justify-between rounded-lg border border-border bg-muted",
                                    size === "sm" ? "p-1.5 pl-2.5" : "p-2 pl-3",
                                )}
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <File
                                        className={cn(
                                            "flex-shrink-0 text-muted-foreground",
                                            size === "sm" ? "h-4 w-4" : "h-5 w-5",
                                        )}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={cn(
                                                "font-medium text-foreground truncate",
                                                size === "sm" ? "text-xs" : "text-sm",
                                            )}
                                        >
                                            {file.name}
                                        </p>
                                        <p
                                            className={cn(
                                                "text-muted-foreground",
                                                size === "sm" ? "text-[10px]" : "text-xs",
                                            )}
                                        >
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFile(index)}
                                    className={cn(
                                        "flex-shrink-0 text-muted-foreground hover:text-destructive",
                                        size === "sm" ? "h-6 w-6" : "h-7 w-7",
                                    )}
                                    disabled={disabled}
                                >
                                    <X className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* 4. Inbuilt Error Message with Color Override */}
                {displayError && (
                    <div className={cn(
                        "mt-1.5 flex items-center gap-1.5 text-sm font-medium text-destructive",
                        errorTextClassName // <-- OVERRIDE
                    )}>
                        <AlertCircle className="h-4 w-4" />
                        <span>{displayError}</span>
                    </div>
                )}
            </div>
        )
    },
)
FileInput.displayName = "FileInput"

export default FileInput 