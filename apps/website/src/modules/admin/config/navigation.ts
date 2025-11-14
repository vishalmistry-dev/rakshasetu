import type { SidebarLink } from '@/shared/components/layout/DashboardLayout'
import {
  AlertCircle,
  AlertTriangle,
  Banknote,
  BarChart,
  Boxes,
  ClipboardList,
  FileText,
  Flag,
  Home,
  Landmark,
  List,
  Map,
  MapPin,
  Package,
  PackageSearch,
  Percent,
  Plug,
  Receipt,
  RefreshCcw,
  Repeat,
  Scale,
  Settings,
  ShieldCheck,
  Store,
  Tag,
  Truck,
  UserPlus,
  Users,
} from 'lucide-react'

// Topbar tabs
export const adminTopbarTabs = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'RSmart', href: '/rsmart', icon: Store },
  { label: 'Logistics', href: '/logistics', icon: Truck },
  { label: 'Marketplace', href: '/marketplace', icon: Store },
]

// Sidebar links by section
export const adminSidebarLinks: Record<string, SidebarLink[]> = {
  // Dashboard section
  default: [
    { title: 'Overview', url: '/', icon: Home, group: 'Dashboard' },
    { title: 'Reports', url: '/reports', icon: FileText, group: 'Dashboard' },
  ],

  // RSmart section
  rsmart: [
    { title: 'Overview', url: '/rsmart', icon: Home, group: 'Overview' },
    { title: 'User Accounts', url: '/rsmart/users', icon: Users, group: 'Users' },
    { title: 'Connections', url: '/rsmart/connections', icon: UserPlus, group: 'Users' },
    { title: 'Listings', url: '/rsmart/listings', icon: List, group: 'Marketplace' },
    {
      title: 'Orders',
      url: '/rsmart/orders',
      icon: Package,
      group: 'Orders',
      children: [
        { title: 'All Orders', url: '/rsmart/orders', icon: Package },
        { title: 'Release Requests', url: '/rsmart/orders/releases', icon: Banknote },
        { title: 'Disputes', url: '/rsmart/orders/disputes', icon: AlertCircle },
        { title: 'Refunds', url: '/rsmart/orders/refunds', icon: Repeat },
        { title: 'Cancellations', url: '/rsmart/orders/cancellations', icon: AlertCircle },
      ],
    },
    { title: 'Platform Fees', url: '/rsmart/platform-fees', icon: Percent, group: 'Finance' },
  ],

  // Logistics section
  logistics: [
    { title: 'Overview', url: '/logistics', icon: Home, group: 'Dashboard' },
    {
      title: 'Shipments',
      url: '/logistics/shipments',
      icon: Truck,
      group: 'Shipments',
      children: [
        { title: 'All Shipments', url: '/logistics/shipments', icon: PackageSearch },
        { title: 'Tracking Issues', url: '/logistics/shipments/issues', icon: AlertCircle },
        { title: 'Delivery Performance', url: '/logistics/shipments/performance', icon: BarChart },
      ],
    },
    {
      title: 'Billing & Reconciliation',
      url: '/logistics/billing',
      icon: Receipt,
      group: 'Finance',
      children: [
        { title: 'Shipping Charges', url: '/logistics/billing/shipping', icon: Truck },
        { title: 'Weight Discrepancies', url: '/logistics/billing/weight', icon: Scale },
        { title: 'Invoice Disputes', url: '/logistics/billing/disputes', icon: AlertCircle },
        { title: 'COD Reconciliation', url: '/logistics/billing/cod', icon: Banknote },
      ],
    },
    {
      title: 'Returns & NDR',
      url: '/logistics/returns-ndr',
      icon: Repeat,
      group: 'Returns',
      children: [
        { title: 'Return Shipments', url: '/logistics/returns-ndr/returns', icon: Repeat },
        { title: 'NDR Cases', url: '/logistics/returns-ndr/ndr', icon: AlertTriangle },
        { title: 'RTO Monitoring', url: '/logistics/returns-ndr/rto', icon: Repeat },
        { title: 'Return Analytics', url: '/logistics/returns-ndr/trends', icon: BarChart },
      ],
    },
    {
      title: 'Courier Management',
      url: '/logistics/couriers',
      icon: Landmark,
      group: 'Configuration',
      children: [
        { title: 'Courier Partners', url: '/logistics/couriers', icon: Landmark },
        { title: 'Courier Zones', url: '/logistics/zones', icon: MapPin },
        { title: 'Zone & Rate Mapping', url: '/logistics/zones-rates', icon: Map },
        { title: 'API Credentials', url: '/logistics/couriers/api-keys', icon: Settings },
      ],
    },
    {
      title: 'Analytics & Reports',
      url: '/logistics/reports',
      icon: BarChart,
      group: 'Reports',
      children: [
        { title: 'Shipment Insights', url: '/logistics/reports/shipments', icon: FileText },
        { title: 'Billing Summary', url: '/logistics/reports/billing', icon: Receipt },
        { title: 'Performance Dashboard', url: '/logistics/reports/performance', icon: BarChart },
      ],
    },
  ],

  // Marketplace section
  marketplace: [
    { title: 'Overview', url: '/marketplace', icon: Home, group: 'Dashboard' },
    {
      title: 'Stores',
      url: '/marketplace/stores',
      icon: Store,
      group: 'Stores',
      children: [
        { title: 'All Stores', url: '/marketplace/stores', icon: Store },
        { title: 'Connected Merchants', url: '/marketplace/stores/merchants', icon: Users },
        { title: 'Integration Settings', url: '/marketplace/stores/integrations', icon: Plug },
        { title: 'Sync Logs', url: '/marketplace/stores/sync-logs', icon: RefreshCcw },
      ],
    },
    {
      title: 'Products',
      url: '/marketplace/products',
      icon: Boxes,
      group: 'Products',
      children: [
        { title: 'All Products', url: '/marketplace/products', icon: Boxes },
        { title: 'Product Flags', url: '/marketplace/products/flags', icon: Flag },
        { title: 'Price & Inventory', url: '/marketplace/products/pricing', icon: Tag },
        { title: 'Sync Status', url: '/marketplace/products/sync-status', icon: RefreshCcw },
      ],
    },
    {
      title: 'Orders',
      url: '/marketplace/orders',
      icon: Package,
      group: 'Orders',
      children: [
        { title: 'All Orders', url: '/marketplace/orders', icon: Package },
        {
          title: 'Fulfillment Status',
          url: '/marketplace/orders/fulfillment',
          icon: ClipboardList,
        },
        { title: 'Payment Status', url: '/marketplace/orders/payments', icon: FileText },
        { title: 'Returns & Refunds', url: '/marketplace/orders/returns', icon: AlertTriangle },
      ],
    },
    {
      title: 'Reports & Analytics',
      url: '/marketplace/reports',
      icon: BarChart,
      group: 'Reports',
      children: [
        { title: 'Sales Overview', url: '/marketplace/reports/sales', icon: BarChart },
        { title: 'Merchant Performance', url: '/marketplace/reports/merchants', icon: Users },
        { title: 'Product Trends', url: '/marketplace/reports/products', icon: Boxes },
        { title: 'Integration Health', url: '/marketplace/reports/integrations', icon: Settings },
      ],
    },
  ],
}

// Global account links
export const adminGlobalLinks: SidebarLink[] = [
  { title: '2FA Security', url: '/2fa', icon: ShieldCheck },
  { title: 'Settings', url: '/settings', icon: Settings },
]

// Search index
export const adminSearchIndex = [
  { title: 'User Accounts', source: 'RSmart', href: '/rsmart/users' },
  { title: 'All Orders', source: 'RSmart', href: '/rsmart/orders' },
  { title: 'Shipments', source: 'Logistics', href: '/logistics/shipments' },
  { title: 'Courier Partners', source: 'Logistics', href: '/logistics/couriers' },
  { title: 'All Stores', source: 'Marketplace', href: '/marketplace/stores' },
  { title: 'All Products', source: 'Marketplace', href: '/marketplace/products' },
]
