import type { SidebarLink } from '@/shared/components/layout/DashboardLayout'
import {
  AlertTriangle,
  BarChart,
  Bell,
  Building,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  FileCheck,
  FileText,
  FileX,
  Globe,
  Home,
  Landmark,
  Layers,
  ListChecks,
  Package,
  Receipt,
  ReceiptIndianRupee,
  RotateCcw,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Store,
  TrendingUp,
  Truck,
  User2,
  Zap,
} from 'lucide-react'

// ================================
// TOPBAR TABS (Main Navigation)
// ================================
export const merchantTopbarTabs = [
  { label: 'Dashboard', href: '/merchant/dashboard', icon: Home },
  { label: 'Stores', href: '/merchant/stores', icon: Store },
  { label: 'Orders', href: '/merchant/orders', icon: Package },
  { label: 'Shipments', href: '/merchant/shipments', icon: Truck },
  { label: 'Payouts', href: '/merchant/payouts', icon: ReceiptIndianRupee },
]

// ================================
// GLOBAL LINKS (Accessible from all sections)
// ================================
export const merchantGlobalLinks: SidebarLink[] = [
  { title: 'Profile', url: '/merchant/profile', icon: User2 },
  { title: '2FA Security', url: '/merchant/2fa', icon: ShieldCheck },
  { title: 'KYC Verification', url: '/merchant/kyc', icon: FileText },
  { title: 'Bank & GST Details', url: '/merchant/bank', icon: Landmark },
  { title: 'Account Settings', url: '/merchant/settings', icon: Settings },
]

// ================================
// SEARCH INDEX
// ================================
export const merchantSearchIndex = [
  // Dashboard
  { title: 'Dashboard Overview', source: 'Dashboard', href: '/merchant' },
  { title: 'Analytics', source: 'Dashboard', href: '/merchant/analytics' },

  // Stores
  { title: 'My Stores', source: 'Stores', href: '/merchant/stores' },
  { title: 'Connect Store', source: 'Stores', href: '/merchant/stores/connect' },
  { title: 'Store Analytics', source: 'Stores', href: '/merchant/stores/analytics' },

  // Orders
  { title: 'All Orders', source: 'Orders', href: '/merchant/orders' },
  { title: 'New Orders', source: 'Orders', href: '/merchant/orders?status=new' },
  { title: 'Ready to Ship', source: 'Orders', href: '/merchant/orders?status=ready' },
  { title: 'Shipped Orders', source: 'Orders', href: '/merchant/orders?status=shipped' },
  { title: 'Disputes', source: 'Orders', href: '/merchant/orders/disputes' },
  { title: 'Return Requests', source: 'Orders', href: '/merchant/orders/returns' },
  { title: 'Bulk Operations', source: 'Orders', href: '/merchant/orders/bulk' },

  // Shipments
  { title: 'All Shipments', source: 'Shipments', href: '/merchant/shipments' },
  { title: 'Track Shipment', source: 'Shipments', href: '/merchant/shipments/track' },
  { title: 'NDR Management', source: 'Shipments', href: '/merchant/shipments/ndr' },
  { title: 'Generate Labels', source: 'Shipments', href: '/merchant/shipments/labels' },
  { title: 'Create Manifest', source: 'Shipments', href: '/merchant/shipments/manifest' },
  { title: 'Courier Partners', source: 'Shipments', href: '/merchant/shipments/couriers' },
  { title: 'Schedule Pickup', source: 'Shipments', href: '/merchant/shipments/pickups/schedule' },

  // Payouts
  { title: 'Settlements', source: 'Payouts', href: '/merchant/payouts/settlements' },
  { title: 'Transaction History', source: 'Payouts', href: '/merchant/payouts/transactions' },

  // Settings
  { title: 'Profile Settings', source: 'Settings', href: '/merchant/profile' },
  { title: 'KYC Verification', source: 'Settings', href: '/merchant/kyc' },
  { title: 'Bank Details', source: 'Settings', href: '/merchant/bank' },
  { title: 'Account Settings', source: 'Settings', href: '/merchant/settings' },
]

// ================================
// SIDEBAR LINKS (Based on active tab)
// ================================
export const merchantSidebarLinks: Record<string, SidebarLink[]> = {
  // ================================
  // 1️⃣ DASHBOARD SECTION
  // ================================
  default: [
    // Overview
    { title: 'Overview', url: '/merchant', icon: Home, group: 'Dashboard' },
    { title: 'Analytics', url: '/merchant/analytics', icon: BarChart, group: 'Dashboard' },

    // Quick Stats - Open by default
    {
      title: 'Quick Stats',
      url: '/merchant/stats',
      icon: TrendingUp,
      group: 'Dashboard',
      defaultOpen: true, // ← Open by default
      children: [
        { title: 'Revenue', url: '/merchant/stats/revenue', icon: DollarSign },
        { title: 'Order Summary', url: '/merchant/stats/orders', icon: Package },
        { title: 'Shipment Status', url: '/merchant/stats/shipments', icon: Truck },
      ],
    },

    // Activity
    { title: 'Notifications', url: '/merchant/notifications', icon: Bell, group: 'Activity' },
    { title: 'Activity Log', url: '/merchant/activity', icon: Clock, group: 'Activity' },
  ],

  // ================================
  // 2️⃣ STORES SECTION
  // ================================
  stores: [
    // Store management
    {
      title: 'All Stores',
      url: '/merchant/stores',
      icon: Store,
      group: 'Stores',
    },
    {
      title: 'Connect New Store',
      url: '/merchant/stores/connect',
      icon: Globe,
      group: 'Stores',
    },

    // Store settings - Closed by default
    {
      title: 'Store Settings',
      url: '/merchant/stores/settings',
      icon: Settings,
      group: 'Settings',
      defaultOpen: false,
      children: [
        { title: 'Shipping Preferences', url: '/merchant/stores/settings/shipping', icon: Truck },
        { title: 'Payment Methods', url: '/merchant/stores/settings/payment', icon: CreditCard },
        { title: 'Notifications', url: '/merchant/stores/settings/notifications', icon: Bell },
        { title: 'Webhooks', url: '/merchant/stores/settings/webhooks', icon: Zap },
      ],
    },

    // Analytics per store
    {
      title: 'Store Analytics',
      url: '/merchant/stores/analytics',
      icon: BarChart,
      group: 'Analytics',
    },
  ],

  // ================================
  // 3️⃣ ORDERS SECTION
  // ================================
  orders: [
    // Main view
    {
      title: 'All Orders',
      url: '/merchant/orders',
      icon: ListChecks,
      group: 'Orders',
    },

    // Quick filters - Open by default (most used)
    {
      title: 'Order Status',
      url: '/merchant/orders/status',
      icon: Package,
      group: 'Filters',
      defaultOpen: true, // ← Open by default
      children: [
        { title: 'New Orders', url: '/merchant/orders?status=new', icon: Clock },
        { title: 'Ready to Ship', url: '/merchant/orders?status=ready', icon: Package },
        { title: 'Shipped', url: '/merchant/orders?status=shipped', icon: Truck },
        { title: 'Delivered', url: '/merchant/orders?status=delivered', icon: FileCheck },
        { title: 'Cancelled', url: '/merchant/orders?status=cancelled', icon: FileX },
      ],
    },

    // Problems - Closed by default
    {
      title: 'Issues',
      url: '/merchant/orders/issues',
      icon: AlertTriangle,
      group: 'Issues',
      defaultOpen: false,
      children: [
        { title: 'Disputes', url: '/merchant/orders/disputes', icon: AlertTriangle },
        { title: 'Return Requests', url: '/merchant/orders/returns', icon: RotateCcw },
        { title: 'Refunds', url: '/merchant/orders/refunds', icon: Receipt },
      ],
    },

    // Bulk actions
    {
      title: 'Bulk Operations',
      url: '/merchant/orders/bulk',
      icon: Layers,
      group: 'Tools',
    },

    // Order settings - Closed by default
    {
      title: 'Order Settings',
      url: '/merchant/orders/settings',
      icon: Settings,
      group: 'Settings',
      defaultOpen: false,
      children: [
        { title: 'Auto-Assignment Rules', url: '/merchant/orders/settings/auto-assign', icon: Zap },
        {
          title: 'Order Notifications',
          url: '/merchant/orders/settings/notifications',
          icon: Bell,
        },
        { title: 'Return Policies', url: '/merchant/orders/settings/returns', icon: RotateCcw },
      ],
    },
  ],

  // ================================
  // 4️⃣ SHIPMENTS SECTION
  // ================================
  shipments: [
    // Main view
    {
      title: 'All Shipments',
      url: '/merchant/shipments',
      icon: Package,
      group: 'Shipments',
    },
    {
      title: 'Track Shipment',
      url: '/merchant/shipments/track',
      icon: Search,
      group: 'Shipments',
    },

    // Delivery issues - Open by default (important alerts)
    {
      title: 'Delivery Issues',
      url: '/merchant/shipments/issues',
      icon: AlertTriangle,
      group: 'Issues',
      defaultOpen: true, // ← Open by default
      children: [
        { title: 'NDR (Failed Delivery)', url: '/merchant/shipments/ndr', icon: AlertTriangle },
        { title: 'RTO (Return to Origin)', url: '/merchant/shipments/rto', icon: RotateCcw },
        { title: 'Delayed Shipments', url: '/merchant/shipments/delayed', icon: Clock },
      ],
    },

    // Documents - Closed by default
    {
      title: 'Documents',
      url: '/merchant/shipments/documents',
      icon: FileText,
      group: 'Documents',
      defaultOpen: false,
      children: [
        { title: 'Generate Labels', url: '/merchant/shipments/labels', icon: FileText },
        { title: 'Create Manifest', url: '/merchant/shipments/manifest', icon: Layers },
        { title: 'Invoices', url: '/merchant/shipments/invoices', icon: Receipt },
        { title: 'Shipping Reports', url: '/merchant/shipments/reports', icon: Download },
      ],
    },

    // Couriers - Closed by default
    {
      title: 'Couriers',
      url: '/merchant/shipments/couriers',
      icon: Truck,
      group: 'Couriers',
      defaultOpen: false,
      children: [
        { title: 'Courier Partners', url: '/merchant/shipments/couriers/partners', icon: Truck },
        { title: 'Rate Comparison', url: '/merchant/shipments/couriers/rates', icon: DollarSign },
        { title: 'Performance', url: '/merchant/shipments/couriers/performance', icon: BarChart },
      ],
    },

    // Pickups - Closed by default
    {
      title: 'Pickups',
      url: '/merchant/shipments/pickups',
      icon: Calendar,
      group: 'Pickups',
      defaultOpen: false,
      children: [
        { title: 'Schedule Pickup', url: '/merchant/shipments/pickups/schedule', icon: Calendar },
        { title: 'Pickup History', url: '/merchant/shipments/pickups/history', icon: Clock },
        { title: 'Pickup Locations', url: '/merchant/shipments/pickups/locations', icon: Building },
      ],
    },

    // Shipment settings - Closed by default
    {
      title: 'Shipping Settings',
      url: '/merchant/shipments/settings',
      icon: Settings,
      group: 'Settings',
      defaultOpen: false,
      children: [
        {
          title: 'Courier Preferences',
          url: '/merchant/shipments/settings/preferences',
          icon: Truck,
        },
        { title: 'Packaging Config', url: '/merchant/shipments/settings/packaging', icon: Package },
        { title: 'Weight Rules', url: '/merchant/shipments/settings/weight', icon: Scale },
        { title: 'Shipping Zones', url: '/merchant/shipments/settings/zones', icon: Globe },
      ],
    },
  ],

  // ================================
  // 5️⃣ PAYOUTS SECTION
  // ================================
  payouts: [
    // Overview
    {
      title: 'Overview',
      url: '/merchant/payouts',
      icon: Home,
      group: 'Payouts',
    },
    {
      title: 'Settlements',
      url: '/merchant/payouts/settlements',
      icon: DollarSign,
      group: 'Payouts',
    },
    {
      title: 'Transaction History',
      url: '/merchant/payouts/transactions',
      icon: Receipt,
      group: 'Payouts',
    },

    // Payout settings - Closed by default
    {
      title: 'Payout Settings',
      url: '/merchant/payouts/settings',
      icon: Settings,
      group: 'Settings',
      defaultOpen: false,
      children: [
        { title: 'Bank Details', url: '/merchant/payouts/settings/bank', icon: Landmark },
        { title: 'GST Details', url: '/merchant/payouts/settings/gst', icon: FileText },
        { title: 'KYC Verification', url: '/merchant/payouts/settings/kyc', icon: ShieldCheck },
        { title: 'Payout Schedule', url: '/merchant/payouts/settings/schedule', icon: Calendar },
      ],
    },
  ],
}
