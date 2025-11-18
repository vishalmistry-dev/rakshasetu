// src/integrations/sandbox/sandbox.types.ts

export interface SandboxAuthResponse {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
}

export interface SandboxError {
  error: string
  error_description?: string
  status_code: number
}

// DigiLocker Types
export interface DigiLockerInitRequest {
  redirect_url: string
  purpose: string
  documents: ('AADHAAR' | 'PAN' | 'DRIVING_LICENSE' | 'VEHICLE_RC')[]
}

export interface DigiLockerInitResponse {
  request_id: string
  consent_url: string
  expires_at: string
}

export interface DigiLockerStatusRequest {
  request_id: string
}

export interface DigiLockerStatusResponse {
  request_id: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED'
  documents_received?: string[]
}

export interface DigiLockerDocument {
  document_type: string
  document_data: {
    name?: string
    dob?: string
    aadhaar_number?: string
    pan_number?: string
    dl_number?: string
    address?: string
    photo?: string
    [key: string]: any
  }
  fetched_at: string
}

export interface DigiLockerFetchResponse {
  request_id: string
  documents: DigiLockerDocument[]
}

// PAN Verification Types
export interface PANVerifyRequest {
  pan: string
  consent: 'Y'
  reason: string
}

export interface PANVerifyResponse {
  pan: string
  name: string
  status: 'VALID' | 'INVALID'
  category: 'Individual' | 'Company' | 'Firm' | 'HUF' | 'AOP' | 'Trust' | 'Government'
  aadhaar_seeding_status?: boolean
  verification_date: string
}

// GSTIN Types
export interface GSTINSearchRequest {
  pan: string
  state_code?: string
}

export interface GSTINSearchResponse {
  pan: string
  gstins: Array<{
    gstin: string
    business_name: string
    state: string
    status: 'Active' | 'Cancelled' | 'Suspended'
    registration_date: string
  }>
}

export interface GSTINVerifyRequest {
  gstin: string
  consent: 'Y'
  reason: string
}

export interface GSTINVerifyResponse {
  gstin: string
  legal_name: string
  trade_name?: string
  status: 'Active' | 'Cancelled' | 'Suspended'
  registration_date: string
  constitution_of_business: string
  taxpayer_type: string
  address: {
    building: string
    street: string
    city: string
    state: string
    pincode: string
  }
  principal_business_activities: string[]
  hsn_info?: Array<{
    hsn_code: string
    description: string
  }>
}

// Bank Account Verification Types
export interface BankVerifyRequest {
  account_number: string
  ifsc: string
  name?: string
  consent: 'Y'
  reason: string
}

export interface BankVerifyResponse {
  verification_id: string
  status: 'INITIATED' | 'PENDING'
  message: string
}

export interface BankStatusRequest {
  verification_id: string
}

export interface BankStatusResponse {
  verification_id: string
  status: 'SUCCESS' | 'FAILED' | 'PENDING'
  account_number: string
  ifsc: string
  name_match?: boolean
  account_holder_name?: string
  bank_name?: string
  branch?: string
  verified_at?: string
  failure_reason?: string
}

// Webhook Types
export interface SandboxWebhookPayload {
  event_type: 'digilocker.completed' | 'bank.verified' | 'verification.failed'
  data: any
  timestamp: string
  signature: string
}
