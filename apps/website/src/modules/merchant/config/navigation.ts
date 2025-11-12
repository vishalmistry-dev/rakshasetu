import type { SidebarLink } from '@/shared/components/layout/DashboardLayout'
import {
  AlertTriangle,
  BarChart,
  Boxes,
  ChevronRight,
  Clock,
  FileCheck,
  FileText,
  FileX,
  Home,
  Landmark,
  ListChecks,
  Package,
  Receipt,
  RotateCcw,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Truck,
} from 'lucide-react'

// Topbar tabs
export const merchantTopbarTabs = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Marketplace', href: '/marketplace', icon: Store },
]

// Sidebar links
export const merchantSidebarLinks: Record<string, SidebarLink[]> = {
  // Dashboard section (merchant.localhost:3000/)
  default: [
    { title: 'Overview', url: '/', icon: Home, group: 'Dashboard' },
    { title: 'Analytics', url: '/analytics', icon: BarChart, group: 'Dashboard' },
    { title: 'Reports', url: '/reports', icon: FileText, group: 'Dashboard' },
  ],

  // Marketplace section
  marketplace: [
    // Shop
    { title: 'Overview', url: '/marketplace', icon: Home, group: 'Shop' },
    { title: 'My Stores', url: '/marketplace/stores', icon: Store, group: 'Shop' },
    { title: 'My Products', url: '/marketplace/products', icon: Boxes, group: 'Shop' },

    // Orders
    {
      title: 'Orders',
      url: '/marketplace/orders',
      icon: Package,
      group: 'Logistics',
      children: [
        { title: 'All Orders', url: '/marketplace/orders/all', icon: ListChecks },
        { title: 'Unfulfilled', url: '/marketplace/orders/unfulfilled', icon: FileText },
        { title: 'SLA Breached', url: '/marketplace/orders/sla', icon: Clock },
        { title: 'RTO Triggered', url: '/marketplace/orders/rto', icon: RotateCcw },
      ],
    },

    // Track
    {
      title: 'Track',
      url: '/marketplace/track',
      icon: Search,
      group: 'Logistics',
      children: [
        { title: 'By Order ID', url: '/marketplace/track/order', icon: ChevronRight },
        { title: 'By Parcel Code', url: '/marketplace/track/parcel', icon: Search },
      ],
    },

    // NDR
    {
      title: 'NDR',
      url: '/marketplace/ndr',
      icon: AlertTriangle,
      group: 'Logistics',
      children: [
        { title: 'Failed Deliveries', url: '/marketplace/ndr/failed', icon: AlertTriangle },
        { title: 'Action Required', url: '/marketplace/ndr/action', icon: Clock },
        { title: 'RTO Cases', url: '/marketplace/ndr/rto', icon: RotateCcw },
      ],
    },

    // Billing
    {
      title: 'Billing',
      url: '/marketplace/billing',
      icon: Receipt,
      group: 'Logistics',
      children: [
        { title: 'Shipping Charges', url: '/marketplace/billing/shipping', icon: Truck },
        { title: 'Weight Reconciliation', url: '/marketplace/billing/weight', icon: Scale },
        { title: 'Invoices', url: '/marketplace/billing/invoices', icon: Receipt },
      ],
    },

    // Logistics
    {
      title: 'Logistics',
      url: '/marketplace/logistics',
      icon: Truck,
      group: 'Logistics',
      children: [
        { title: 'Courier Assignment', url: '/marketplace/logistics/courier', icon: Truck },
        { title: 'Parcel Creation', url: '/marketplace/logistics/create', icon: Package },
        { title: 'Shipment History', url: '/marketplace/logistics/history', icon: FileText },
      ],
    },

    // Returns
    {
      title: 'Returns',
      url: '/marketplace/returns',
      icon: RotateCcw,
      group: 'Logistics',
      children: [
        { title: 'Requested Returns', url: '/marketplace/returns/requested', icon: Clock },
        { title: 'Approved Returns', url: '/marketplace/returns/approved', icon: FileCheck },
        { title: 'Rejected Returns', url: '/marketplace/returns/rejected', icon: FileX },
      ],
    },
  ],
}

// Global links
export const merchantGlobalLinks: SidebarLink[] = [
  { title: '2FA Security', url: '/2fa', icon: ShieldCheck },
  { title: 'KYC Verification', url: '/kyc', icon: FileText },
  { title: 'Bank & GST Details', url: '/bank', icon: Landmark },
  { title: 'Settings', url: '/settings', icon: Settings },
]

// Search index
export const merchantSearchIndex = [
  { title: 'Pending Orders', source: 'Orders', href: '/marketplace/orders/unfulfilled' },
  { title: 'All Stores', source: 'Shop', href: '/marketplace/stores' },
  { title: 'Track Shipment', source: 'Logistics', href: '/marketplace/track' },
  { title: 'Shipping Charges', source: 'Billing', href: '/marketplace/billing/shipping' },
  { title: 'My Products', source: 'Shop', href: '/marketplace/products' },
  { title: 'Analytics', source: 'Dashboard', href: '/analytics' },
]
