"use client"

import { Merchant } from "@rakshasetu/database"
import React, { createContext, useContext } from "react"

const MerchantContext = createContext<Merchant | null>(null)

export function useMerchant() {
  const context = useContext(MerchantContext)
  if (!context) {
    throw new Error("useMerchant must be used within MerchantProvider")
  }
  return context
}

interface Props {
  children: React.ReactNode
  initialMerchant: Merchant
}

export function MerchantProvider({ children, initialMerchant }: Props) {
  return (
    <MerchantContext.Provider value={initialMerchant}>
      {children}
    </MerchantContext.Provider>
  )
}
