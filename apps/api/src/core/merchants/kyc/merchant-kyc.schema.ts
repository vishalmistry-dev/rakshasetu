// src/core/merchants/kyc/merchant-kyc.schema.ts

import { z } from 'zod'

export const InitiateDigiLockerSchema = z.object({
  body: z.object({
    documents: z.array(z.enum(['AADHAAR', 'PAN', 'DRIVING_LICENSE', 'VEHICLE_RC'])).min(1),
    purpose: z.string().optional().default('Merchant KYC Verification'),
  }),
})

export const VerifyPANSchema = z.object({
  body: z.object({
    pan: z
      .string()
      .length(10)
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
  }),
})

export const SearchGSTINSchema = z.object({
  body: z.object({
    pan: z
      .string()
      .length(10)
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
    state_code: z.string().length(2).optional(),
  }),
})

export const VerifyGSTINSchema = z.object({
  body: z.object({
    gstin: z
      .string()
      .length(15)
      .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
  }),
})

export const VerifyBankAccountSchema = z.object({
  body: z.object({
    account_number: z.string(),
    ifsc: z
      .string()
      .length(11)
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/),
    name: z.string().optional(),
  }),
})
