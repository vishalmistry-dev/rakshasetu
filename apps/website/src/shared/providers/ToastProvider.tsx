"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      closeButton={false} // We use custom close button
      toastOptions={{
        unstyled: true, // Remove default styles
        className: "", // Custom class if needed
      }}
    />
  )
}
