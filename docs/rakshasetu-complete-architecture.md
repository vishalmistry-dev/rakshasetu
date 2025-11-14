# Rakshasetu - Complete Architecture & Flow

**Last Updated:** November 3, 2025
**Developer:** Vishal Mistry
**Location:** Surat, Gujarat, India

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Products & Features](#products--features)
3. [User Types & Dashboards](#user-types--dashboards)
4. [Monorepo Structure](#monorepo-structure)
5. [Database Architecture](#database-architecture)
6. [API Structure (apps/api)](#api-structure-appsapi)
7. [Order Flows](#order-flows)
8. [Authentication Flows](#authentication-flows)
9. [Integration Points](#integration-points)
10. [Key Architecture Decisions](#key-architecture-decisions)

---

## Project Overview

**Rakshasetu** is a comprehensive e-commerce platform providing:

- **Escrow Services** - Secure payment holding for buyer protection
- **Logistics Management** - Multi-courier shipping integration
- **Returns Handling** - Automated return processing
- **B2B Marketplace** - Direct buyer-seller connections
- **Multi-Store Support** - Shopify/WooCommerce integration

**Tech Stack:**

- **Monorepo:** Turborepo + pnpm workspaces
- **Database:** PostgreSQL with Prisma ORM (single source of truth)
- **Backend:** Node.js + Express + TypeScript
- **Main Website:** Next.js 15 + React 19 + Tailwind CSS
- **Shopify App:** React Router 7 + Shopify Polaris

---

## Products & Features

### 1. RSmart (B2B Marketplace)

**Purpose:** Pure financial escrow platform for B2B transactions

**Features:**

- Sellers create listings (products/services)
- Buyers connect with sellers
- Order placement with escrow payment
- **NO logistics/shipping** (offline delivery)
- Manual release after delivery confirmation
- Dispute resolution system

**User Flow:**

```
Seller lists product → Buyer connects → Order created
→ Payment held in escrow → Deliver offline
→ Buyer confirms → Payment released to seller
```

**Database Models:**

- `User` (type: BUYER/SELLER)
- `Listing`
- `Connects`
- `Order` (marketplace orders)
- `Transaction`
- `DisputeTicket`

**Part of:** Main website (`apps/website`)
**Future:** Separate app after v1 release

---

### 2. Shop (E-commerce Platform)

**Purpose:** Full e-commerce solution with escrow + logistics

**Two Channels:**

#### A) Shopify Integration

- Merchants install **Rakshasetu Shopify App** on their store
- Orders from merchant's Shopify store → Rakshasetu handles escrow + logistics
- Merchant manages via **Merchant Dashboard** (not Shopify app UI)

#### B) Rakshasetu Storefront

- Merchants list products on **Rakshasetu.com** (myntra-style marketplace)
- Customers buy from Rakshasetu website
- Rakshasetu handles: checkout, escrow, logistics, payments

**Features:**

- Multi-store management (one merchant, multiple Shopify stores)
- Product sync from Shopify
- Logistics (BlueDart, Delhivery, etc.)
- Payment methods: Prepaid, COD, POD, Partial COD
- Shipping label generation
- Order tracking
- Return management
- Auto-settlement after delivery

**Database Models:**

- `Merchant`
- `MerchantStore` (Shopify stores)
- `ShopProduct` (synced from Shopify)
- `ShopOrder` (source: SHOPIFY or RAKSHASETU)
- `ShopOrderGroup`
- `ShopPayment`
- `ShopTransaction`
- `Logistics`
- `Shipping`
- `ReturnRequest`

**Merchant Dashboard:** Separate frontend (to be built)
**Shopify App UI:** Minimal analytics only (already built)

---

### 3. Checkout Gateway (Shopify Extension)

**Purpose:** Payment selector at Shopify cart page

**How it works:**

1. Customer adds items to cart on merchant's Shopify store
2. Our extension shows payment options:
   - **Prepaid** → Redirect to Shopify default checkout
   - **Partial COD** → Redirect to Shopify default checkout
   - **COD** → Show our custom checkout form
   - **POD** → Show our custom checkout form

3. For COD/POD:
   - Customer fills our checkout form
   - We create Shopify **draft order**
   - Create `ShopOrder` in our DB
   - Convert draft → real Shopify order

**POD (Pay on Delivery) Flow:**

- Courier out for delivery → We send WhatsApp/SMS payment link
- Customer pays → Gets OTP
- OTP = delivery confirmation code
- Courier collects OTP, marks delivered

**Database Models:**

- `ShopifyCheckoutSession` (temporary checkout data)
- `ShopOrder` (final order)
- `ShopPayment`

---

## User Types & Dashboards

### 1. Users (RSmart)

**Model:** `User` (type: BUYER/SELLER)

- Can be buyer, seller, or both
- Access: Main website (`apps/website`)
- Dashboard: Embedded in main website
- Auth: JWT-based

**Cannot:** Use Shop features (completely separate)

---

### 2. Merchants (Shop)

**Model:** `Merchant`

- E-commerce store owners
- Connect Shopify/WooCommerce stores
- Access: **Merchant Dashboard** (separate portal)
- Auth: Auto-created via Shopify OAuth OR manual registration

**Features:**

- Manage multiple stores
- View all orders (Shopify + Rakshasetu storefront)
- Create shipping labels
- Track shipments
- Handle returns
- Manage settings (pricing, logistics, notifications)

**Shopify App:** Only shows minimal analytics, NOT full management

---

### 3. Admin

**Model:** `Admin`

- Platform administrators
- Access: Admin dashboard (to be built)
- Manages: RSmart + Shop + Finance + Disputes

**Features:**

- View all orders (marketplace + shop)
- Resolve disputes
- Manage payouts
- View analytics
- Moderate listings
- Platform settings

---

### 4. Guest/Customer

**Model:** `GuestSessionToken`

- Shop customers (no account needed)
- Can checkout as guest
- Track orders via guest session

---

## Monorepo Structure

```
rakshasetu/                              ← ROOT
├── apps/
│   ├── api/                            ← Express Backend (WE BUILD HERE)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/                        ← API source code
│   │       ├── common/                 → Errors, middleware, utils
│   │       ├── config/                 → Environment, constants
│   │       ├── core/                   → Shared business logic
│   │       ├── domains/                → Product features
│   │       ├── integrations/           → External services
│   │       ├── admin/                  → Admin APIs
│   │       ├── routes/                 → Main router
│   │       ├── server.ts               → Express app
│   │       └── index.ts                → Entry point
│   │
│   ├── shopify-app/                    ← Shopify App (React Router 7)
│   │   ├── app/                        → Routes, components, types
│   │   ├── extensions/                 → Theme extension (checkout)
│   │   ├── shopify.app.toml            → Shopify config
│   │   └── package.json
│   │
│   └── website/                        ← Main Website (Next.js 15)
│       ├── src/app/                    → Pages (RSmart + Storefront)
│       └── package.json
│
├── packages/
│   └── database/                       ← Prisma (SINGLE SOURCE OF TRUTH)
│       ├── prisma/schema.prisma        → Database schema
│       └── src/
│           ├── client.ts               → Prisma client export
│           └── index.ts                → Type exports
│
├── docs/                               ← Documentation
│   ├── project-context.md
│   ├── rakshasetu-git-workflow.md
│   ├── shopify-app-build-log.md
│   └── rakshasetu-complete-architecture.md  ← THIS FILE
│
├── .env                                ← Environment variables (root)
├── pnpm-workspace.yaml                 ← Workspace config
├── turbo.json                          ← Build orchestration
└── package.json                        ← Root scripts
```

**Key Points:**

- ✅ Single database package (`packages/database`)
- ✅ All apps import from `@rakshasetu/database`
- ✅ No duplicate Prisma clients
- ✅ Types auto-sync across all apps

---

## Database Architecture

### Single Source of Truth

**Location:** `packages/database/prisma/schema.prisma`

**Workflow:**

1. Modify `schema.prisma`
2. Run `pnpm db:generate` (generates types)
3. Run `pnpm db:push` (push to PostgreSQL)
4. All apps get updated types automatically

### Key Model Groups

#### Authentication

- `User` - RSmart users (BUYER/SELLER)
- `Merchant` - Shop merchants
- `Admin` - Platform admins
- `UserKycDetails` - KYC verification
- `MerchantProfile` - Business details

#### Marketplace (RSmart)

- `Listing` - Products/services
- `Connects` - Buyer-seller connections
- `Order` - Marketplace orders (no logistics)
- `OrderDetails` - Order breakdown
- `Transaction` - Escrow transactions
- `DisputeTicket` - Disputes
- `Refund` - Refund records

#### E-commerce (Shop)

- `MerchantStore` - Connected stores
- `ShopProduct` - Synced products
- `ShopProductVariant` - Product variants
- `ShopOrder` - Store orders
- `ShopOrderGroup` - Bulk orders
- `ShopOrderItem` - Line items
- `ShopTransaction` - Shop transactions
- `ShopPayment` - Payment records
- `ShopRefund` - Refund records
- `ShopDisputeTicket` - Shop disputes

#### Logistics

- `Logistics` - Shipment management
- `CourierPartner` - BlueDart, Delhivery, etc.
- `CourierService` - Service types
- `CourierQuote` - Shipping quotes
- `Shipping` - Tracking & delivery
- `ShippingDocument` - Labels, invoices
- `TrackingEvent` - Status updates
- `Manifest` - Bulk handover
- `ReturnRequest` - Return handling

#### Financial

- `SellerAccount` - Marketplace seller earnings
- `MerchantAccount` - Merchant earnings
- `PayoutTransaction` - Payout records
- `MerchantDeduction` - Charges & fees
- `PlatformFeeConfig` - Fee settings

#### Communication

- `Notification` - User notifications
- `Conversation` - Messaging threads
- `Message` - Individual messages
- `ConversationParticipant` - Thread members

#### Integration

- `ShopifyState` - OAuth state
- `ShopifyTempSession` - Temp sessions
- `ShopifyCheckoutSession` - Checkout data
- `StoreWebhook` - Webhook configs
- `StoreSession` - Store sessions
- `StoreSyncLog` - Sync history

---

## API Structure (apps/api)

### Directory Structure

```
apps/api/src/
├── common/                              ← SHARED utilities
│   ├── errors/
│   │   ├── AppErrorHandler.ts          → Main error handler
│   │   ├── appError.ts                 → Custom error class
│   │   ├── prismaError.ts              → Prisma error handler
│   │   ├── zodError.ts                 → Zod validation errors
│   │   ├── jwtError.ts                 → JWT errors
│   │   ├── axiosError.ts               → Axios errors
│   │   ├── multerError.ts              → File upload errors
│   │   └── index.ts                    → Export all
│   │
│   ├── middleware/
│   │   ├── error.middleware.ts         → Global error handler
│   │   ├── notFound.middleware.ts      → 404 handler
│   │   ├── requestLogger.middleware.ts → Request logging
│   │   ├── multer.middleware.ts        → File upload
│   │   └── index.ts
│   │
│   ├── types/
│   │   ├── common.types.ts             → Shared types
│   │   ├── enums.ts                    → Enums
│   │   └── express.d.ts                → Express type extensions
│   │
│   └── utils/
│       ├── asyncHandler.utils.ts       → Async error wrapper
│       ├── logger.utils.ts             → Winston logger
│       ├── sendResponse.utils.ts       → Response formatter
│       ├── validateRequest.utils.ts    → Zod validator
│       ├── uniqueId.utils.ts           → UID generator
│       ├── uniqueUsername.utils.ts     → Username generator
│       └── index.ts
│
├── config/
│   ├── env.ts                          → Environment variables
│   ├── constants.ts                    → App constants
│   ├── prisma.ts                       → Import from @rakshasetu/database
│   └── index.ts
│
├── core/                                ← SHARED business logic
│   ├── auth/
│   │   ├── auth.routes.ts              → Main auth router
│   │   ├── shared/
│   │   │   ├── token.manager.ts        → JWT handling
│   │   │   ├── password.manager.ts     → Hashing, validation
│   │   │   ├── otp.manager.ts          → OTP generation
│   │   │   └── core.service.ts         → Shared auth logic
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authenticateUser.middleware.ts
│   │   │   ├── authenticateMerchant.middleware.ts
│   │   │   ├── authenticateAdmin.middleware.ts
│   │   │   ├── authorizeRole.middleware.ts
│   │   │   └── require2FA.middleware.ts
│   │   │
│   │   └── domain/
│   │       ├── user/                   → RSmart user auth
│   │       │   ├── user-auth.controller.ts
│   │       │   ├── user-auth.service.ts
│   │       │   ├── user-auth.routes.ts
│   │       │   └── user-auth.schema.ts
│   │       │
│   │       ├── merchant/               → Shop merchant auth
│   │       │   ├── merchant-auth.controller.ts
│   │       │   ├── merchant-auth.service.ts
│   │       │   ├── merchant-auth.routes.ts
│   │       │   └── merchant-auth.schema.ts
│   │       │
│   │       └── admin/                  → Admin auth
│   │           ├── admin-auth.controller.ts
│   │           ├── admin-auth.service.ts
│   │           ├── admin-auth.routes.ts
│   │           └── admin-auth.schema.ts
│   │
│   ├── escrow/                          → Escrow engine
│   │   ├── escrow.service.ts
│   │   ├── escrow.schema.ts
│   │   ├── state-machine.ts            → Status transitions
│   │   └── policies/
│   │       ├── simple-release.policy.ts    → RSmart (manual)
│   │       ├── cod-release.policy.ts       → Shop COD
│   │       ├── pod-release.policy.ts       → Shop POD
│   │       ├── refund.policy.ts
│   │       └── dispute.policy.ts
│   │
│   ├── disputes/                        → Dispute resolution
│   │   ├── disputes.controller.ts
│   │   ├── disputes.service.ts
│   │   ├── disputes.routes.ts
│   │   ├── disputes.schema.ts
│   │   └── resolution-engine.ts
│   │
│   ├── payments/                        → Payment processing
│   │   ├── payments.service.ts
│   │   ├── payments.schema.ts
│   │   └── payment-methods.ts
│   │
│   ├── transactions/                    → Transaction management
│   │   ├── transactions.service.ts
│   │   ├── transactions.schema.ts
│   │   └── transaction-types.ts
│   │
│   ├── payouts/                         → Payout processing
│   │   ├── payouts.service.ts
│   │   ├── payouts.schema.ts
│   │   └── payout-scheduler.ts
│   │
│   ├── notifications/                   → Notifications
│   │   ├── notifications.controller.ts
│   │   ├── notifications.service.ts
│   │   ├── notifications.routes.ts
│   │   ├── notifications.schema.ts
│   │   └── templates/
│   │       ├── escrow.templates.ts
│   │       ├── order.templates.ts
│   │       └── dispute.templates.ts
│   │
│   ├── conversations/                   → Messaging
│   │   ├── conversations.service.ts
│   │   └── conversations.types.ts
│   │
│   ├── merchants/                       → Merchant management
│   │   ├── merchants.controller.ts
│   │   ├── merchants.service.ts
│   │   ├── merchants.routes.ts
│   │   └── merchants.schema.ts
│   │
│   └── users/                           → User management
│       ├── users.controller.ts
│       ├── users.service.ts
│       ├── users.routes.ts
│       └── users.schema.ts
│
├── domains/                             ← PRODUCT features
│   ├── rsmart/                          → B2B Marketplace
│   │   ├── rsmart.routes.ts            → Main router
│   │   │
│   │   ├── listings/
│   │   │   ├── listings.controller.ts
│   │   │   ├── listings.service.ts
│   │   │   ├── listings.routes.ts
│   │   │   └── listings.schema.ts
│   │   │
│   │   ├── connections/
│   │   │   ├── connections.controller.ts
│   │   │   ├── connections.service.ts
│   │   │   ├── connections.routes.ts
│   │   │   └── connections.schema.ts
│   │   │
│   │   ├── orders/
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   ├── orders.routes.ts
│   │   │   └── orders.schema.ts
│   │   │
│   │   └── helpers/
│   │       └── listing-search.ts
│   │
│   └── shop/                            → E-commerce
│       ├── shop.routes.ts               → Main router
│       │
│       ├── stores/
│       │   ├── stores.controller.ts
│       │   ├── stores.service.ts
│       │   ├── stores.routes.ts
│       │   └── stores.schema.ts
│       │
│       ├── products/
│       │   ├── products.controller.ts
│       │   ├── products.service.ts
│       │   ├── products.routes.ts
│       │   └── products.schema.ts
│       │
│       ├── orders/
│       │   ├── orders.controller.ts
│       │   ├── orders.service.ts
│       │   ├── orders.routes.ts
│       │   └── orders.schema.ts
│       │
│       ├── cart/
│       │   ├── cart.controller.ts
│       │   ├── cart.service.ts
│       │   ├── cart.routes.ts
│       │   └── cart.schema.ts
│       │
│       ├── logistics/
│       │   ├── shipments/
│       │   │   ├── shipments.controller.ts
│       │   │   ├── shipments.service.ts
│       │   │   ├── shipments.routes.ts
│       │   │   └── shipments.schema.ts
│       │   │
│       │   ├── pickups/
│       │   │   ├── pickups.controller.ts
│       │   │   ├── pickups.service.ts
│       │   │   ├── pickups.routes.ts
│       │   │   └── pickups.schema.ts
│       │   │
│       │   ├── tracking/
│       │   │   ├── tracking.controller.ts
│       │   │   ├── tracking.service.ts
│       │   │   ├── tracking.routes.ts
│       │   │   └── tracking.schema.ts
│       │   │
│       │   ├── logistics.routes.ts
│       │   └── helpers/
│       │       ├── label-generator.ts
│       │       └── rate-calculator.ts
│       │
│       ├── returns/
│       │   ├── returns.controller.ts
│       │   ├── returns.service.ts
│       │   ├── returns.routes.ts
│       │   └── returns.schema.ts
│       │
│       └── helpers/
│           ├── platform-fee.ts
│           └── merchant-split.ts
│
├── integrations/                        ← EXTERNAL services
│   ├── shopify/
│   │   ├── shopify.routes.ts           → Main router
│   │   │
│   │   ├── oauth/                      → OAuth flow
│   │   │   ├── oauth.controller.ts
│   │   │   ├── oauth.service.ts
│   │   │   └── oauth.routes.ts
│   │   │
│   │   ├── webhooks/                   → Webhook handlers
│   │   │   ├── webhooks.controller.ts
│   │   │   ├── webhooks.routes.ts
│   │   │   ├── webhooks.middleware.ts
│   │   │   └── handlers/
│   │   │       ├── order-created.handler.ts
│   │   │       ├── product-created.handler.ts
│   │   │       ├── product-updated.handler.ts
│   │   │       └── app-uninstalled.handler.ts
│   │   │
│   │   ├── api/                        → Shopify Admin API
│   │   │   ├── client.ts
│   │   │   ├── checkout.api.ts
│   │   │   ├── orders.api.ts
│   │   │   └── products.api.ts
│   │   │
│   │   ├── sync/                       → Data sync
│   │   │   ├── products-sync.service.ts
│   │   │   ├── orders-sync.service.ts
│   │   │   └── inventory-sync.service.ts
│   │   │
│   │   └── helpers/
│   │       ├── hmac-validator.ts
│   │       └── webhook-registry.ts
│   │
│   ├── payment-gateways/
│   │   ├── payment-gateway.interface.ts
│   │   │
│   │   ├── razorpay/
│   │   │   ├── razorpay.client.ts
│   │   │   ├── razorpay.service.ts
│   │   │   ├── razorpay.types.ts
│   │   │   └── webhooks/
│   │   │       ├── webhooks.controller.ts
│   │   │       ├── webhooks.routes.ts
│   │   │       └── handlers/
│   │   │           ├── payment-success.handler.ts
│   │   │           ├── payment-failed.handler.ts
│   │   │           └── refund.handler.ts
│   │   │
│   │   └── stripe/
│   │       └── stripe.service.ts
│   │
│   ├── courier-partners/
│   │   ├── courier.interface.ts
│   │   │
│   │   ├── bluedart/
│   │   │   ├── bluedart.client.ts
│   │   │   ├── bluedart.service.ts
│   │   │   ├── bluedart.types.ts
│   │   │   └── modules/
│   │   │       ├── auth.module.ts
│   │   │       ├── quote.module.ts
│   │   │       ├── shipment.module.ts
│   │   │       ├── pickup.module.ts
│   │   │       └── track.module.ts
│   │   │
│   │   └── delhivery/
│   │       └── delhivery.service.ts
│   │
│   ├── communication/
│   │   ├── email/
│   │   │   ├── email.service.ts
│   │   │   ├── email.types.ts
│   │   │   ├── email.helpers.ts
│   │   │   ├── providers/
│   │   │   │   ├── nodemailer/
│   │   │   │   │   └── nodemailer.service.ts
│   │   │   │   └── sendgrid/
│   │   │   │       └── sendgrid.service.ts
│   │   │   └── templates/
│   │   │       ├── welcome.html
│   │   │       ├── order-confirmation.html
│   │   │       ├── escrow-hold.html
│   │   │       ├── escrow-release.html
│   │   │       └── dispute-created.html
│   │   │
│   │   ├── sms/
│   │   │   ├── sms.service.ts
│   │   │   ├── sms.types.ts
│   │   │   ├── sms.helpers.ts
│   │   │   ├── providers/
│   │   │   │   └── twilio/
│   │   │   │       └── twilio.service.ts
│   │   │   └── templates/
│   │   │       ├── otp.sms.txt
│   │   │       └── welcome.sms.txt
│   │   │
│   │   └── whatsapp/
│   │       ├── whatsapp.service.ts
│   │       ├── whatsapp.types.ts
│   │       ├── whatsapp.helpers.ts
│   │       ├── providers/
│   │       │   └── twilio/
│   │       │       └── twilio-whatsapp.service.ts
│   │       └── templates/
│   │           ├── normalMessage.ts
│   │           ├── interactiveButtons.ts
│   │           └── interactiveList.ts
│   │
│   └── storage/
│       ├── cloudinary/
│       │   └── cloudinary.service.ts
│       └── s3/
│           └── s3.service.ts
│
├── admin/                               ← ADMIN panel APIs
│   ├── admin.routes.ts                 → Main router
│   │
│   ├── dashboard/
│   │   ├── dashboard.controller.ts
│   │   ├── dashboard.service.ts
│   │   ├── dashboard.routes.ts
│   │   └── dashboard.schema.ts
│   │
│   ├── analytics/
│   │   ├── analytics.controller.ts
│   │   ├── analytics.service.ts
│   │   └── analytics.routes.ts
│   │
│   ├── finance/
│   │   ├── finance.controller.ts
│   │   ├── finance.service.ts
│   │   ├── finance.routes.ts
│   │   └── finance.service.ts
│   │
│   ├── moderation/
│   │   ├── moderation.controller.ts
│   │   ├── moderation.service.ts
│   │   ├── moderation.routes.ts
│   │   └── moderation.service.ts
│   │
│   ├── escrow-management/
│   │   ├── escrow-management.controller.ts
│   │   ├── escrow-management.service.ts
│   │   └── escrow-management.routes.ts
│   │
│   ├── logs/
│   │   ├── logs.controller.ts
│   │   ├── logs.service.ts
│   │   └── logs.routes.ts
│   │
│   └── settings/
│       ├── settings.controller.ts
│       ├── settings.service.ts
│       ├── settings.routes.ts
│       └── settings.service.ts
│
├── services/                            ← Cross-cutting services
│   ├── analytics/
│   │   ├── analytics.service.ts
│   │   └── reports/
│   │       ├── escrow.report.ts
│   │       ├── marketplace.report.ts
│   │       └── revenue.report.ts
│   │
│   └── jobs/                            → Background jobs
│       ├── queues/
│       │   ├── setup.ts
│       │   ├── email.queue.ts
│       │   ├── notification.queue.ts
│       │   ├── webhook.queue.ts
│       │   └── escrow.queue.ts
│       │
│       └── workers/
│           ├── cleanup.worker.ts
│           ├── escrow-auto-release.worker.ts
│           ├── payout-processing.worker.ts
│           └── shopify-sync.worker.ts
│
├── routes/
│   └── index.ts                        → Main router (combines all)
│
├── server.ts                           → Express app setup
└── index.ts                            → Entry point (starts server)
```

### Route Structure

```typescript
// Main API Routes
/api/
  ├── auth/                             → Authentication
  │   ├── user/                         → RSmart users
  │   ├── merchant/                     → Shop merchants
  │   └── admin/                        → Admins
  │
  ├── rsmart/                           → B2B Marketplace
  │   ├── listings/
  │   ├── connections/
  │   └── orders/
  │
  ├── shop/                             → E-commerce (Merchant APIs)
  │   ├── stores/
  │   ├── products/
  │   ├── orders/
  │   ├── cart/
  │   ├── logistics/
  │   └── returns/
  │
  ├── storefront/                       → Rakshasetu Storefront (Public)
  │   ├── products/
  │   ├── cart/
  │   └── checkout/
  │
  ├── shopify/                          → Shopify Integration
  │   ├── oauth/
  │   └── webhooks/
  │
  ├── webhooks/                         → Payment Webhooks
  │   └── razorpay/
  │
  └── admin/                            → Admin Panel
      ├── dashboard/
      ├── analytics/
      ├── finance/
      ├── moderation/
      └── settings/
```

---

## Order Flows

### 1. RSmart (Marketplace) Order Flow

```
1. Seller creates listing
   ↓
2. Buyer browses, finds listing
   ↓
3. Buyer sends connection request
   ↓
4. Seller accepts connection
   ↓
5. Buyer creates order (custom amount/details)
   ↓
6. Payment initiated → Held in escrow
   ↓
7. Seller delivers product/service (offline)
   ↓
8. Buyer confirms delivery
   ↓
9. Payment released to seller

Alternative: Buyer disputes → Admin resolves → Refund/Release
```

**Models Involved:**

- `Listing`
- `Connects`
- `Order`
- `Transaction` (ESCROW_STATUS: HELD → RELEASED)
- `Payment`

**No Logistics:** Pure financial transaction

---

### 2. Shop - Shopify Store Order (Prepaid/Partial COD)

```
1. Customer on merchant's Shopify store
   ↓
2. Adds items to cart
   ↓
3. Checkout → Our extension shows
   ↓
4. Selects: Prepaid or Partial COD
   ↓
5. Redirect to Shopify default checkout
   ↓
6. Customer completes payment (Shopify handles)
   ↓
7. Shopify webhook → order.created
   ↓
8. We create ShopOrder in our DB (source: SHOPIFY)
   ↓
9. Merchant sees order in dashboard
   ↓
10. Merchant creates shipping label (our logistics API)
    ↓
11. Courier picks up, delivers
    ↓
12. Delivery confirmed
    ↓
13. Auto-settlement after X days
```

**Models Involved:**

- `ShopOrder` (source: SHOPIFY)
- `ShopOrderItem`
- `ShopPayment` (status: CAPTURED)
- `Logistics`
- `Shipping`

---

### 3. Shop - Shopify Store Order (COD)

```
1. Customer on merchant's Shopify store
   ↓
2. Adds items to cart
   ↓
3. Checkout → Our extension shows
   ↓
4. Selects: COD
   ↓
5. Redirect to OUR checkout form
   ↓
6. Customer fills address, phone, etc.
   ↓
7. We create Shopify DRAFT order
   ↓
8. Create ShopOrder in our DB (source: SHOPIFY)
   ↓
9. Convert draft → real Shopify order
   ↓
10. Merchant creates shipping label
    ↓
11. Courier picks up, delivers
    ↓
12. Courier collects cash from customer
    ↓
13. Courier remits to us
    ↓
14. We settle with merchant after X days
```

**Models Involved:**

- `ShopifyCheckoutSession` (temporary)
- `ShopOrder` (source: SHOPIFY)
- `ShopPayment` (method: COD, status: COD_PENDING → COD_COLLECTED)
- `Logistics`
- `Shipping`

---

### 4. Shop - Shopify Store Order (POD)

```
1. Customer on merchant's Shopify store
   ↓
2. Adds items to cart
   ↓
3. Checkout → Our extension shows
   ↓
4. Selects: POD (Pay on Delivery)
   ↓
5. Redirect to OUR checkout form
   ↓
6. Customer fills address (NO payment yet)
   ↓
7. We create Shopify DRAFT order
   ↓
8. Create ShopOrder in our DB (source: SHOPIFY)
   ↓
9. Convert draft → real Shopify order
   ↓
10. Merchant creates shipping label
    ↓
11. Courier out for delivery
    ↓
12. We send WhatsApp/SMS payment link to customer
    ↓
13. Customer pays online (Razorpay)
    ↓
14. Payment success → Generate OTP
    ↓
15. Send OTP to customer
    ↓
16. Courier asks for OTP, customer provides
    ↓
17. Courier marks delivered with OTP
    ↓
18. We settle with merchant after X days
```

**Models Involved:**

- `ShopifyCheckoutSession` (temporary)
- `ShopOrder` (source: SHOPIFY)
- `ShopPayment` (method: POD, status: INITIATED → CAPTURED)
- `Logistics`
- `Shipping`
- `DeliveryVerification` (OTP record)

---

### 5. Shop - Rakshasetu Storefront Order

```
1. Customer browses Rakshasetu.com
   ↓
2. Sees products from multiple merchants
   ↓
3. Adds items to cart (can be from different stores)
   ↓
4. Goes to checkout (OUR checkout page)
   ↓
5. Selects payment: Prepaid/COD/POD
   ↓
6. Completes payment
   ↓
7. We create ShopOrderGroup (if multiple merchants)
   ↓
8. Create ShopOrder per merchant (source: RAKSHASETU)
   ↓
9. Each merchant sees their order in dashboard
   ↓
10. Each merchant creates shipping label
    ↓
11. Orders delivered independently
    ↓
12. Settlement per merchant
```

**Models Involved:**

- `ShopCart` (customer's cart)
- `ShopCartItem`
- `ShopOrderGroup` (bulk order)
- `ShopOrder` (source: RAKSHASETU, one per merchant)
- `ShopPayment`
- `Logistics` (one per order)
- `Shipping` (one per order)

**Key Difference:** One checkout, multiple orders to different merchants

---

## Authentication Flows

### 1. RSmart User Authentication

**Registration:**

```
POST /api/auth/user/register
Body: { firstName, lastName, email, password, type: "BUYER" | "SELLER" }
→ Create User record
→ Send verification email
→ Return JWT tokens
```

**Login:**

```
POST /api/auth/user/login
Body: { email, password }
→ Verify credentials
→ Return JWT tokens (access + refresh)
```

**Protected Routes:**

```
GET /api/rsmart/listings
Headers: { Authorization: "Bearer <access_token>" }
→ authenticateUser middleware extracts userId
→ Controller gets user from req.user
```

---

### 2. Merchant Authentication

**A) Via Shopify OAuth (Auto-registration):**

```
1. Merchant installs app on Shopify store
   ↓
2. Shopify redirects to: /api/shopify/oauth/callback?code=xxx&shop=xxx
   ↓
3. We exchange code for access_token
   ↓
4. Check if Merchant exists (by email)
   ↓
5. If NOT exists:
   - Create Merchant record
   - Create MerchantStore record
   - Store access_token
   ↓
6. If exists:
   - Update MerchantStore
   - Update access_token
   ↓
7. Generate JWT tokens for merchant
   ↓
8. Redirect to Shopify app with session token
```

**B) Direct Login (if merchant has account):**

```
POST /api/auth/merchant/login
Body: { email, password }
→ Verify credentials
→ Return JWT tokens
```

**Protected Routes:**

```
GET /api/shop/orders
Headers: { Authorization: "Bearer <access_token>" }
→ authenticateMerchant middleware extracts merchantId
→ Controller gets merchant from req.merchant
```

---

### 3. Admin Authentication

**Login:**

```
POST /api/auth/admin/login
Body: { email, password }
→ Verify credentials
→ Check admin status (ACTIVE)
→ Return JWT tokens
```

**Protected Routes:**

```
GET /api/admin/dashboard
Headers: { Authorization: "Bearer <access_token>" }
→ authenticateAdmin middleware
→ requireAdmin middleware (checks role permissions)
```

---

## Integration Points

### 1. Shopify Integration

**OAuth Flow:**

```
1. Merchant clicks "Install App" on Shopify App Store
   ↓
2. Shopify redirects to our OAuth URL with shop parameter
   ↓
3. We generate state token, redirect to Shopify authorization page
   ↓
4. Merchant approves permissions
   ↓
5. Shopify redirects to callback: /api/shopify/oauth/callback
   ↓
6. We exchange code for access_token
   ↓
7. Create/update Merchant + MerchantStore in DB
   ↓
8. Register webhooks (orders, products, app_uninstalled)
   ↓
9. Redirect merchant to app dashboard
```

**Webhooks:**

- `orders/create` → Sync order to ShopOrder
- `orders/updated` → Update ShopOrder status
- `products/create` → Sync to ShopProduct
- `products/update` → Update ShopProduct
- `app/uninstalled` → Mark store as inactive

**Draft Orders (COD/POD):**

```typescript
// When customer selects COD/POD
1. Create draft order via Shopify Admin API
2. Store draft order ID in ShopifyCheckoutSession
3. Customer completes our checkout form
4. We complete the draft order (converts to real order)
5. Create ShopOrder in our DB
```

---

### 2. Razorpay Integration

**Payment Creation:**

```typescript
// Prepaid/POD orders
const order = await razorpay.orders.create({
  amount: totalAmount * 100, // paise
  currency: 'INR',
  receipt: orderId,
  notes: { orderId, merchantId },
})

// Store razorpayOrderId in ShopPayment
```

**Payment Verification:**

```typescript
// Razorpay webhook: payment.captured
1. Verify signature
2. Extract payment details
3. Update ShopPayment status
4. Update ShopOrder status
5. Trigger logistics (if applicable)
```

**Refunds:**

```typescript
// When dispute resolved in buyer favor
const refund = await razorpay.payments.refund(paymentId, {
  amount: refundAmount * 100,
  notes: { disputeId, orderId },
})
```

---

### 3. BlueDart Integration

**Get Quote:**

```typescript
POST /api/shop/logistics/quotes
Body: {
  origin: { pincode: "395006" },
  destination: { pincode: "110001" },
  weight: 500, // grams
  dimensions: { length: 10, width: 10, height: 5 } // cm
}

→ Call BlueDart API
→ Store CourierQuote in DB
→ Return quotes to merchant
```

**Create Shipment:**

```typescript
POST /api/shop/logistics/shipments
Body: {
  orderId: "xxx",
  courierQuoteId: "yyy",
  pickupAddressId: "zzz"
}

→ Call BlueDart shipment API
→ Create Logistics + Shipping record
→ Generate tracking ID
→ Return shipping label URL
```

**Track Shipment:**

```typescript
GET /api/shop/logistics/track/:trackingId

→ Call BlueDart tracking API
→ Store TrackingEvent records
→ Update Shipping status
→ Notify merchant/customer
```

---

### 4. Communication (Email/SMS/WhatsApp)

**Email:**

```typescript
// Order confirmation
await emailService.send({
  to: customer.email,
  template: 'order-confirmation',
  data: { orderNumber, items, total },
})
```

**SMS (OTP for POD):**

```typescript
// Send OTP when courier out for delivery
const otp = generateOTP()
await smsService.send({
  to: customer.phone,
  message: `Your delivery OTP is: ${otp}`,
})

// Store in DeliveryVerification
```

**WhatsApp (Payment link for POD):**

```typescript
// When courier out for delivery
await whatsappService.send({
  to: customer.phone,
  template: 'payment-link',
  data: {
    orderNumber,
    amount,
    paymentUrl: razorpayCheckoutUrl,
  },
})
```

---

## Key Architecture Decisions

### 1. Monorepo Benefits

- **Single database package** → No type duplication
- **Shared code** → Common utils, types across apps
- **Independent deployment** → Deploy API, website, Shopify app separately
- **Consistent tooling** → Same ESLint, TypeScript config

---

### 2. Database Strategy

- **Single PostgreSQL database** for all products
- **Prisma ORM** generates types automatically
- **packages/database** exports types to all apps
- **No duplicate models** → One `Merchant` model serves all apps

---

### 3. Auth Strategy

- **Separate models** → User (RSmart), Merchant (Shop), Admin
- **Shared logic** → token.manager, password.manager in `core/auth/shared/`
- **Middleware-based permissions** → No route duplication
- **JWT tokens** → Access token (15min) + Refresh token (7 days)

---

### 4. Escrow Strategy

- **Core escrow engine** → Used by RSmart + Shop
- **Policy-based release** → Different rules for marketplace vs COD vs POD
- **State machine** → Enforces valid status transitions
- **Dispute support** → Admin can intervene at any stage

---

### 5. Shopify Integration

- **OAuth auto-registration** → No manual merchant signup needed
- **Webhook-based sync** → Real-time product/order sync
- **Draft orders for COD/POD** → Bypass Shopify checkout
- **Separate extension** → Theme extension for payment selector

---

### 6. Logistics Strategy

- **Multi-courier support** → BlueDart, Delhivery (via interface)
- **Quote comparison** → Merchant chooses best rate
- **Label generation** → Direct API integration
- **Tracking sync** → Real-time status updates

---

### 7. No Route Duplication

**Old approach (BAD):**

```
/api/marketplace/adminMarketplace/orders/
/api/marketplace/userMarketplace/orders/
/api/shop/adminShop/orders/
/api/shop/merchantShop/orders/
```

**New approach (GOOD):**

```
/api/rsmart/orders/            → authenticateUser middleware
/api/shop/orders/              → authenticateMerchant middleware
/api/admin/rsmart/orders/      → authenticateAdmin middleware
/api/admin/shop/orders/        → authenticateAdmin middleware
```

Middleware handles permissions, not route structure.

---

### 8. Error Handling Strategy

- **Centralized error handler** → All errors go through one middleware
- **Type-specific handlers** → Prisma, Zod, JWT, Axios, Multer
- **Consistent API responses** → Always return { success, data?, error? }
- **Logging** → Winston logger for debugging

---

### 9. File Structure Principles

- **Feature-based organization** → Not layer-based (no global "controllers/" folder)
- **Co-located files** → Keep related files together
- **Max 3 levels deep** → Avoid over-nesting
- **Explicit imports** → No circular dependencies

---

### 10. API Response Format

```typescript
// Success
{
  success: true,
  data: { ... },
  message?: "Order created successfully"
}

// Error
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input",
    details?: [ ... ]
  }
}
```

---

## Development Workflow

### Database Changes

```bash
1. Edit packages/database/prisma/schema.prisma
2. pnpm db:generate    # Generate types
3. pnpm db:push        # Push to database
4. All apps get updated types automatically
```

---

### Adding New Feature

```bash
1. Create feature folder in appropriate domain/integration
   Example: apps/api/src/domains/shop/logistics/tracking/

2. Add files:
   - tracking.controller.ts
   - tracking.service.ts
   - tracking.routes.ts
   - tracking.schema.ts (Zod validation)

3. Register routes in parent router
   Example: domains/shop/logistics/logistics.routes.ts

4. Import in main router
   Example: routes/index.ts
```

---

### Running Development

```bash
# Terminal 1: Database GUI
pnpm db:studio

# Terminal 2: API
cd apps/api
pnpm dev

# Terminal 3: Website
cd apps/website
pnpm dev

# Terminal 4: Shopify App
cd apps/shopify-app
pnpm dev
```

---

### Testing API

```bash
# Use Postman/Thunder Client/REST Client

# RSmart user login
POST http://localhost:4000/api/auth/user/login
Body: { "email": "user@example.com", "password": "password" }

# Get listings (authenticated)
GET http://localhost:4000/api/rsmart/listings
Headers: { "Authorization": "Bearer <access_token>" }

# Merchant login
POST http://localhost:4000/api/auth/merchant/login
Body: { "email": "merchant@example.com", "password": "password" }

# Get orders (authenticated)
GET http://localhost:4000/api/shop/orders
Headers: { "Authorization": "Bearer <access_token>" }
```

---

## Next Steps

### Phase 1: Foundation (Priority)

1. ✅ Copy `common/` folder from refactored backend
2. ✅ Setup `config/` (env, constants, prisma client)
3. ✅ Build `core/auth/shared/` (token, password, otp managers)
4. ✅ Build `core/auth/middlewares/` (authentication middlewares)

### Phase 2: Merchant & Shopify (For Shopify App)

5. Build `core/auth/domain/merchant/` (merchant auth)
6. Build `core/merchants/` (onboarding, settings)
7. Build `integrations/shopify/oauth/` (OAuth flow)
8. Build `integrations/shopify/webhooks/` (product/order sync)
9. Build `domains/shop/stores/` (store management)
10. Build `domains/shop/products/` (product listing)

### Phase 3: Orders & Logistics

11. Build `domains/shop/orders/` (order management)
12. Build `integrations/courier-partners/bluedart/` (shipping)
13. Build `domains/shop/logistics/` (shipments, tracking)
14. Build `core/escrow/` (escrow engine)
15. Build `core/payments/` (Razorpay integration)

### Phase 4: Marketplace (RSmart)

16. Build `core/auth/domain/user/` (user auth)
17. Build `domains/rsmart/listings/`
18. Build `domains/rsmart/connections/`
19. Build `domains/rsmart/orders/`
20. Build `core/disputes/` (dispute resolution)

### Phase 5: Admin & Analytics

21. Build `core/auth/domain/admin/` (admin auth)
22. Build `admin/dashboard/`
23. Build `admin/analytics/`
24. Build `admin/finance/`
25. Build `admin/moderation/`

### Phase 6: Communication & Jobs

26. Build `integrations/communication/email/`
27. Build `integrations/communication/sms/`
28. Build `integrations/communication/whatsapp/`
29. Build `services/jobs/` (background workers)

---

## Environment Variables

**Location:** Root `.env` file

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/rakshasetu"

# Server
PORT=4000
NODE_ENV=development

# JWT
JWT_SECRET="your-secret-key"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

# Shopify
SHOPIFY_API_KEY="your-api-key"
SHOPIFY_API_SECRET="your-api-secret"
SHOPIFY_SCOPES="read_products,write_products,read_orders,write_orders"
SHOPIFY_HOST="https://yourapp.com"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_xxx"
RAZORPAY_KEY_SECRET="xxx"
RAZORPAY_WEBHOOK_SECRET="xxx"

# BlueDart
BLUEDART_API_KEY="xxx"
BLUEDART_LICENSE_KEY="xxx"

# Email (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-password"

# SMS (Twilio)
TWILIO_ACCOUNT_SID="xxx"
TWILIO_AUTH_TOKEN="xxx"
TWILIO_PHONE_NUMBER="+1234567890"

# WhatsApp (Twilio)
TWILIO_WHATSAPP_NUMBER="whatsapp:+1234567890"

# Cloudinary
CLOUDINARY_CLOUD_NAME="xxx"
CLOUDINARY_API_KEY="xxx"
CLOUDINARY_API_SECRET="xxx"
```

---

## Glossary

**RSmart:** B2B marketplace for escrow-based trading (no logistics)

**Shop:** E-commerce platform with logistics (Shopify + Rakshasetu storefront)

**Merchant:** E-commerce store owner (uses Shop product)

**User:** RSmart participant (buyer or seller)

**Escrow:** Payment holding mechanism (held until delivery/dispute)

**COD:** Cash on Delivery (courier collects cash)

**POD:** Pay on Delivery (customer pays online before receiving)

**Draft Order:** Shopify order created but not paid (used for COD/POD)

**Manifest:** Bulk shipment handover document to courier

**NDR:** Non-Delivery Report (failed delivery attempt)

**RTO:** Return to Origin (package sent back to seller)

---

## Document History

- **v1.0** - November 3, 2025 - Initial comprehensive architecture documentation
- Created by: Vishal Mistry
- Purpose: Single source of truth for Rakshasetu project architecture

---

**END OF DOCUMENT**
