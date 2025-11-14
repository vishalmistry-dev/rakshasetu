"use client"

import { MerchantUser } from "@/shared/types/auth.types"
import React, { createContext, useContext } from "react"

const MerchantContext = createContext<MerchantUser | null>(null)

export function useMerchant() {
  const context = useContext(MerchantContext)
  if (!context) {
    throw new Error("useMerchant must be used within MerchantProvider")
  }
  return context
}

interface Props {
  children: React.ReactNode
  initialMerchant: MerchantUser
}

export function MerchantProvider({ children, initialMerchant }: Props) {
  return (
    <MerchantContext.Provider value={initialMerchant}>
      {children}
    </MerchantContext.Provider>
  )
}
