"use client"

import React from "react"
import { QueryProvider } from "./QueryProvider"
import { ToastProvider } from "./ToastProvider"

interface Props {
  children: React.ReactNode
}

export function RootProvider({ children }: Props) {
  return (
    <QueryProvider>
      {children}
      <ToastProvider />
    </QueryProvider>
  )
}
