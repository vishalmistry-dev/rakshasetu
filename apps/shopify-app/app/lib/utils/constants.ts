export const APP_CONFIG = {
  API_URL: process.env.API_URL || 'http://localhost:4000',
  DASHBOARD_URL: process.env.DASHBOARD_URL || 'http://localhost:3001',
  CHECKOUT_URL: process.env.CHECKOUT_URL || 'http://localhost:3002',
}

export const BUSINESS_TYPES = [
  { label: 'Proprietorship', value: 'PROPRIETORSHIP' },
  { label: 'Partnership', value: 'PARTNERSHIP' },
  { label: 'LLP', value: 'LLP' },
  { label: 'Private Limited', value: 'PRIVATE_LIMITED' },
] as const

export const COURIER_PARTNERS = [
  { label: 'BlueDart', value: 'BLUEDART' },
  { label: 'Delhivery', value: 'DELHIVERY' },
] as const

export const PRICING_PLANS = [
  { label: 'Pay Per Order', value: 'PER_ORDER' },
  { label: 'Monthly Subscription', value: 'SUBSCRIPTION' },
] as const

export const RETURN_CONDITIONS = [
  'Product must be unused',
  'Original tags must be attached',
  'Original packaging required',
  'No signs of wear or damage',
]

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Puducherry',
]
