import type { SidebarLink } from '@/shared/components/layout/DashboardLayout'
import {
  AlertTriangle,
  BarChart,
  Bell,
  Boxes,
  Building,
  Calendar,
  ChevronRight,
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
  Lock,
  Mail,
  Package,
  Palette,
  Receipt,
  RefreshCw,
  RotateCcw,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  Tag,
  TrendingUp,
  Truck,
  Upload,
  Users,
  Warehouse,
  Zap,
} from 'lucide-react'

// Topbar tabs
export const merchantTopbarTabs = [
  { label: 'Dashboard', href: '/merchant/dashboard', icon: Home },
  { label: 'Shop', href: '/merchant/shop', icon: Store },
  { label: 'Logistics', href: '/merchant/logistics', icon: Truck },
]

// ================================
// GLOBAL LINKS (Accessible from all sections)
// ================================
export const merchantGlobalLinks: SidebarLink[] = [
  { title: 'Profile', url: '/merchant/profile', icon: Users },
  { title: '2FA Security', url: '/merchant/2fa', icon: ShieldCheck },
  { title: 'KYC Verification', url: '/merchant/kyc', icon: FileText },
  { title: 'Bank & GST Details', url: '/merchant/bank', icon: Landmark },
  { title: 'API Keys', url: '/merchant/api-keys', icon: Lock },
  { title: 'Webhooks', url: '/merchant/webhooks', icon: Zap },
  { title: 'Account Settings', url: '/merchant/settings', icon: Settings },
]

// Search index
export const merchantSearchIndex = [
  // Dashboard
  { title: 'Dashboard Overview', source: 'Dashboard', href: '/merchant/dashboard' },
  { title: 'Analytics', source: 'Dashboard', href: '/merchant/analytics' },
  { title: 'Reports', source: 'Dashboard', href: '/merchant/reports' },
  { title: 'Revenue', source: 'Dashboard', href: '/merchant/financial/revenue' },

  // shop/Shop
  { title: 'My Shop', source: 'Shop', href: '/merchant/shop/shop' },
  { title: 'All Products', source: 'Shop', href: '/merchant/shop/products/all' },
  { title: 'Add Product', source: 'Shop', href: '/merchant/shop/products/add' },
  { title: 'Inventory', source: 'Shop', href: '/merchant/shop/inventory/stock' },
  { title: 'All Orders', source: 'Orders', href: '/merchant/shop/orders/all' },
  { title: 'Pending Orders', source: 'Orders', href: '/merchant/shop/orders/pending' },
  {
    title: 'Unfulfilled Orders',
    source: 'Orders',
    href: '/merchant/shop/orders/unfulfilled',
  },
  { title: 'Track Shipment', source: 'Logistics', href: '/merchant/shop/track/order' },
  { title: 'Customers', source: 'Shop', href: '/merchant/shop/customers/all' },
  { title: 'Shipping Charges', source: 'Billing', href: '/merchant/shop/billing/shipping' },

  // Logistics
  { title: 'All Shipments', source: 'Logistics', href: '/merchant/logistics/shipments/all' },
  { title: 'Create Shipment', source: 'Logistics', href: '/merchant/logistics/shipments/create' },
  { title: 'Track by AWB', source: 'Logistics', href: '/merchant/logistics/track/awb' },
  { title: 'NDR Management', source: 'Logistics', href: '/merchant/logistics/ndr/failed' },
  { title: 'Returns', source: 'Logistics', href: '/merchant/logistics/returns/requested' },
  { title: 'Schedule Pickup', source: 'Logistics', href: '/merchant/logistics/pickups/schedule' },

  // Global
  { title: 'KYC Verification', source: 'Account', href: '/merchant/kyc' },
  { title: 'Bank Details', source: 'Account', href: '/merchant/bank' },
  { title: 'Settings', source: 'Settings', href: '/merchant/settings' },
]

// Sidebar links
export const merchantSidebarLinks: Record<string, SidebarLink[]> = {
  // ================================
  // 1️⃣ DASHBOARD SECTION
  // ================================
  default: [
    // Overview
    { title: 'Overview', url: '/merchant/dashboard', icon: Home, group: 'Dashboard' },
    { title: 'Analytics', url: '/merchant/analytics', icon: BarChart, group: 'Dashboard' },
    { title: 'Reports', url: '/merchant/reports', icon: FileText, group: 'Dashboard' },

    // Financial
    {
      title: 'Financial',
      url: '/merchant/financial',
      icon: CreditCard,
      group: 'Dashboard',
      children: [
        { title: 'Revenue', url: '/merchant/financial/revenue', icon: DollarSign },
        { title: 'Expenses', url: '/merchant/financial/expenses', icon: Receipt },
        { title: 'Profit & Loss', url: '/merchant/financial/pnl', icon: TrendingUp },
        { title: 'Settlements', url: '/merchant/financial/settlements', icon: Landmark },
      ],
    },

    // Activity
    { title: 'Notifications', url: '/merchant/notifications', icon: Bell, group: 'Dashboard' },
    { title: 'Activity Log', url: '/merchant/activity', icon: Clock, group: 'Dashboard' },

    // Dashboard Settings
    {
      title: 'Dashboard Settings',
      url: '/merchant/dashboard/settings',
      icon: Settings,
      group: 'Settings',
      children: [
        {
          title: 'Widget Configuration',
          url: '/merchant/dashboard/settings/widgets',
          icon: Layers,
        },
        { title: 'Alert Preferences', url: '/merchant/dashboard/settings/alerts', icon: Bell },
        { title: 'Export Settings', url: '/merchant/dashboard/settings/export', icon: Download },
      ],
    },
  ],

  // ================================
  // 2️⃣ STORES/shop SECTION (Shop-only)
  // ================================
  shop: [
    // Shop Management
    { title: 'Overview', url: '/merchant/shop', icon: Home, group: 'Shop' },
    { title: 'My Stores', url: '/merchant/shop/stores', icon: Store, group: 'Shop' },

    // Products
    {
      title: 'Products',
      url: '/merchant/shop/products',
      icon: Boxes,
      group: 'Shop',
      children: [
        { title: 'All Products', url: '/merchant/shop/products/all', icon: Boxes },
        { title: 'Add Product', url: '/merchant/shop/products/add', icon: Upload },
        { title: 'Bulk Upload', url: '/merchant/shop/products/bulk', icon: Upload },
        {
          title: 'Out of Stock',
          url: '/merchant/shop/products/out-of-stock',
          icon: AlertTriangle,
        },
        {
          title: 'Low Stock',
          url: '/merchant/shop/products/low-stock',
          icon: AlertTriangle,
        },
      ],
    },

    // Inventory
    {
      title: 'Inventory',
      url: '/merchant/shop/inventory',
      icon: Warehouse,
      group: 'Shop',
      children: [
        {
          title: 'Stock Management',
          url: '/merchant/shop/inventory/stock',
          icon: Warehouse,
        },
        {
          title: 'Stock Adjustments',
          url: '/merchant/shop/inventory/adjustments',
          icon: RefreshCw,
        },
        { title: 'Warehouses', url: '/merchant/shop/inventory/warehouses', icon: Building },
        { title: 'Transfers', url: '/merchant/shop/inventory/transfers', icon: Truck },
      ],
    },

    // Categories
    {
      title: 'Categories',
      url: '/merchant/shop/categories',
      icon: Tag,
      group: 'Shop',
      children: [
        { title: 'All Categories', url: '/merchant/shop/categories/all', icon: Tag },
        { title: 'Collections', url: '/merchant/shop/categories/collections', icon: Layers },
        { title: 'Brands', url: '/merchant/shop/categories/brands', icon: Star },
      ],
    },

    // Orders (Shop view - focusing on order management, not logistics)
    {
      title: 'Orders',
      url: '/merchant/shop/orders',
      icon: ShoppingCart,
      group: 'Shop',
      children: [
        { title: 'All Orders', url: '/merchant/shop/orders/all', icon: ListChecks },
        { title: 'Pending', url: '/merchant/shop/orders/pending', icon: Clock },
        { title: 'Processing', url: '/merchant/shop/orders/processing', icon: Package },
        { title: 'Completed', url: '/merchant/shop/orders/completed', icon: FileCheck },
        { title: 'Cancelled', url: '/merchant/shop/orders/cancelled', icon: FileX },
      ],
    },

    // Customers
    {
      title: 'Customers',
      url: '/merchant/shop/customers',
      icon: Users,
      group: 'Shop',
      children: [
        { title: 'All Customers', url: '/merchant/shop/customers/all', icon: Users },
        { title: 'Customer Groups', url: '/merchant/shop/customers/groups', icon: Layers },
        { title: 'Reviews & Ratings', url: '/merchant/shop/customers/reviews', icon: Star },
      ],
    },

    // Marketing
    {
      title: 'Marketing',
      url: '/merchant/shop/marketing',
      icon: TrendingUp,
      group: 'Shop',
      children: [
        { title: 'Campaigns', url: '/merchant/shop/marketing/campaigns', icon: Mail },
        {
          title: 'Discounts & Coupons',
          url: '/merchant/shop/marketing/discounts',
          icon: Tag,
        },
        { title: 'Promotions', url: '/merchant/shop/marketing/promotions', icon: Zap },
      ],
    },

    // Store Analytics
    {
      title: 'Analytics',
      url: '/merchant/shop/analytics',
      icon: BarChart,
      group: 'Shop',
      children: [
        {
          title: 'Sales Analytics',
          url: '/merchant/shop/analytics/sales',
          icon: TrendingUp,
        },
        {
          title: 'Product Performance',
          url: '/merchant/shop/analytics/products',
          icon: Boxes,
        },
        {
          title: 'Customer Insights',
          url: '/merchant/shop/analytics/customers',
          icon: Users,
        },
      ],
    },

    // Store Settings
    {
      title: 'Store Settings',
      url: '/merchant/shop/settings',
      icon: Settings,
      group: 'Settings',
      children: [
        { title: 'Store Information', url: '/merchant/shop/settings/info', icon: Store },
        { title: 'Store Theme', url: '/merchant/shop/settings/theme', icon: Palette },
        {
          title: 'Payment Methods',
          url: '/merchant/shop/settings/payment',
          icon: CreditCard,
        },
        { title: 'Shipping Zones', url: '/merchant/shop/settings/shipping', icon: Globe },
        { title: 'Taxes', url: '/merchant/shop/settings/taxes', icon: Receipt },
        { title: 'Policies', url: '/merchant/shop/settings/policies', icon: FileText },
      ],
    },
  ],

  // ================================
  // 3️⃣ LOGISTICS SECTION
  // ================================
  logistics: [
    // Overview
    { title: 'Overview', url: '/merchant/logistics', icon: Home, group: 'Logistics' },
    {
      title: 'Dashboard',
      url: '/merchant/logistics/dashboard',
      icon: BarChart,
      group: 'Logistics',
    },

    // Shipments
    {
      title: 'Shipments',
      url: '/merchant/logistics/shipments',
      icon: Package,
      group: 'Logistics',
      children: [
        { title: 'All Shipments', url: '/merchant/logistics/shipments/all', icon: ListChecks },
        { title: 'Create Shipment', url: '/merchant/logistics/shipments/create', icon: Upload },
        { title: 'Bulk Create', url: '/merchant/logistics/shipments/bulk', icon: Upload },
        { title: 'In Transit', url: '/merchant/logistics/shipments/in-transit', icon: Truck },
        {
          title: 'Out for Delivery',
          url: '/merchant/logistics/shipments/out-for-delivery',
          icon: Package,
        },
        { title: 'Delivered', url: '/merchant/logistics/shipments/delivered', icon: FileCheck },
      ],
    },

    // Orders
    {
      title: 'Orders',
      url: '/merchant/logistics/orders',
      icon: Package,
      group: 'Logistics',
      children: [
        { title: 'Ready to Ship', url: '/merchant/logistics/orders/ready', icon: Package },
        { title: 'Awaiting Pickup', url: '/merchant/logistics/orders/pickup', icon: Clock },
        { title: 'Unfulfilled', url: '/merchant/logistics/orders/unfulfilled', icon: FileText },
        { title: 'SLA Breached', url: '/merchant/logistics/orders/sla', icon: AlertTriangle },
      ],
    },

    // Track & Trace
    {
      title: 'Track & Trace',
      url: '/merchant/logistics/track',
      icon: Search,
      group: 'Logistics',
      children: [
        { title: 'Track by Order ID', url: '/merchant/logistics/track/order', icon: ChevronRight },
        { title: 'Track by AWB', url: '/merchant/logistics/track/awb', icon: Search },
        { title: 'Track by Phone', url: '/merchant/logistics/track/phone', icon: Search },
        { title: 'Batch Tracking', url: '/merchant/logistics/track/batch', icon: Layers },
      ],
    },

    // NDR
    {
      title: 'NDR',
      url: '/merchant/logistics/ndr',
      icon: AlertTriangle,
      group: 'Logistics',
      children: [
        { title: 'Failed Deliveries', url: '/merchant/logistics/ndr/failed', icon: AlertTriangle },
        { title: 'Action Required', url: '/merchant/logistics/ndr/action', icon: Clock },
        { title: 'Customer Unavailable', url: '/merchant/logistics/ndr/unavailable', icon: Users },
        { title: 'RTO Cases', url: '/merchant/logistics/ndr/rto', icon: RotateCcw },
        { title: 'Resolved', url: '/merchant/logistics/ndr/resolved', icon: FileCheck },
      ],
    },

    // Returns
    {
      title: 'Returns',
      url: '/merchant/logistics/returns',
      icon: RotateCcw,
      group: 'Logistics',
      children: [
        { title: 'Requested Returns', url: '/merchant/logistics/returns/requested', icon: Clock },
        { title: 'Approved Returns', url: '/merchant/logistics/returns/approved', icon: FileCheck },
        { title: 'Rejected Returns', url: '/merchant/logistics/returns/rejected', icon: FileX },
        { title: 'In Transit (RTO)', url: '/merchant/logistics/returns/in-transit', icon: Truck },
        { title: 'Received', url: '/merchant/logistics/returns/received', icon: Warehouse },
      ],
    },

    // Couriers
    {
      title: 'Couriers',
      url: '/merchant/logistics/couriers',
      icon: Truck,
      group: 'Logistics',
      children: [
        { title: 'All Couriers', url: '/merchant/logistics/couriers/all', icon: Truck },
        {
          title: 'Courier Assignment',
          url: '/merchant/logistics/couriers/assign',
          icon: ChevronRight,
        },
        { title: 'Performance', url: '/merchant/logistics/couriers/performance', icon: BarChart },
        { title: 'Rate Card', url: '/merchant/logistics/couriers/rates', icon: DollarSign },
      ],
    },

    // Billing
    {
      title: 'Billing',
      url: '/merchant/logistics/billing',
      icon: Receipt,
      group: 'Logistics',
      children: [
        { title: 'Shipping Charges', url: '/merchant/logistics/billing/shipping', icon: Truck },
        { title: 'Weight Reconciliation', url: '/merchant/logistics/billing/weight', icon: Scale },
        { title: 'COD Remittance', url: '/merchant/logistics/billing/cod', icon: DollarSign },
        { title: 'Invoices', url: '/merchant/logistics/billing/invoices', icon: Receipt },
        { title: 'Disputes', url: '/merchant/logistics/billing/disputes', icon: AlertTriangle },
      ],
    },

    // Pickups
    {
      title: 'Pickups',
      url: '/merchant/logistics/pickups',
      icon: Calendar,
      group: 'Logistics',
      children: [
        { title: 'Schedule Pickup', url: '/merchant/logistics/pickups/schedule', icon: Calendar },
        { title: 'Pickup History', url: '/merchant/logistics/pickups/history', icon: Clock },
        { title: 'Pickup Locations', url: '/merchant/logistics/pickups/locations', icon: Building },
      ],
    },

    // Reports
    {
      title: 'Reports',
      url: '/merchant/logistics/reports',
      icon: FileText,
      group: 'Logistics',
      children: [
        { title: 'Shipment Report', url: '/merchant/logistics/reports/shipments', icon: Package },
        {
          title: 'Delivery Performance',
          url: '/merchant/logistics/reports/delivery',
          icon: TrendingUp,
        },
        { title: 'NDR Report', url: '/merchant/logistics/reports/ndr', icon: AlertTriangle },
        { title: 'RTO Report', url: '/merchant/logistics/reports/rto', icon: RotateCcw },
        { title: 'Cost Analysis', url: '/merchant/logistics/reports/cost', icon: DollarSign },
      ],
    },

    // Logistics Settings
    {
      title: 'Logistics Settings',
      url: '/merchant/logistics/settings',
      icon: Settings,
      group: 'Settings',
      children: [
        { title: 'Shipping Rules', url: '/merchant/logistics/settings/rules', icon: Layers },
        {
          title: 'Packaging Preferences',
          url: '/merchant/logistics/settings/packaging',
          icon: Package,
        },
        { title: 'Courier Preferences', url: '/merchant/logistics/settings/courier', icon: Truck },
        { title: 'Auto-assignment', url: '/merchant/logistics/settings/auto-assign', icon: Zap },
        { title: 'Notifications', url: '/merchant/logistics/settings/notifications', icon: Bell },
        { title: 'SLA Configuration', url: '/merchant/logistics/settings/sla', icon: Clock },
      ],
    },
  ],
}
