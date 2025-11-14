"use client"

import { QueryClientFactory } from "@/shared/lib/query/query-client-factory"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React, { useState } from "react"

interface Props {
  children: React.ReactNode
}

export function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => QueryClientFactory.createClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
