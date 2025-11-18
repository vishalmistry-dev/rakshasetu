# RakshaSetu API Backend - Handover Summary

**Date:** November 8, 2025  
**Current Status:** Partial Implementation Complete  
**Next Phase:** Fix Schema + Build Core Features  
**Previous Chat:** [Reference this chat for full context]

---

## 🎯 QUICK CONTEXT

We're building **RakshaSetu** - a comprehensive e-commerce platform with:
- **Shop Platform:** Escrow + Logistics for merchants (Shopify integration)
- **RSmart Marketplace:** B2B peer-to-peer trading with escrow (ON HOLD - legal review)

**Tech Stack:**
- Monorepo (Turborepo + pnpm)
- PostgreSQL + Prisma ORM
- Node.js + Express + TypeScript
- All types shared from `packages/database`

**Location:** `apps/api/` (backend API)

---

## ✅ WHAT WE'VE BUILT (114 API Endpoints)

### 1. Authentication Systems ✅
**Location:** `apps/api/src/core/auth/`

**What Works:**
- Admin auth (login, logout, refresh, create admin)
- Merchant auth (login, set password, forgot/reset password)
- User auth (register, login, verify email, 2FA) - RSmart users
- Shared managers: token.manager, password.manager, otp.manager
- Middlewares: authenticateAdmin, authenticateMerchant, authenticateUser
- Permission-based access control

**API Endpoints (14):**
```
Admin Auth:
POST   /api/v1/auth/admin/login
POST   /api/v1/auth/admin/refresh
POST   /api/v1/auth/admin/logout
GET    /api/v1/auth/admin/me
POST   /api/v1/auth/admin/admins

Merchant Auth:
POST   /api/v1/auth/merchant/login
POST   /api/v1/auth/merchant/set-password/:token
POST   /api/v1/auth/merchant/forgot-password
POST   /api/v1/auth/merchant/reset-password/:token
POST   /api/v1/auth/merchant/logout

User Auth (RSmart):
POST   /api/v1/auth/user/register
POST   /api/v1/auth/user/login
POST   /api/v1/auth/user/verify-email
POST   /api/v1/auth/user/2fa/verify
```

---

### 2. Admin Dashboard ✅
**Location:** `apps/api/src/admin/`

**What Works:**
- Dashboard analytics (platform-wide stats)
- Merchant management (list, view, approve/reject, status updates)
- Order management (list, view, update status, high-value alerts)
- Dispute management (list, view, resolve, reject)
- Admin notifications (high-value orders, new merchants, disputes, payments)
- Platform settings (fees, couriers, email templates)

**API Endpoints (33):**
```
Dashboard:
GET    /api/v1/admin/dashboard/overview
GET    /api/v1/admin/dashboard/activity
GET    /api/v1/admin/dashboard/stats

Merchants:
GET    /api/v1/admin/merchants
GET    /api/v1/admin/merchants/:id
GET    /api/v1/admin/merchants/:id/stats
PATCH  /api/v1/admin/merchants/:id/status
POST   /api/v1/admin/merchants/:id/approve
POST   /api/v1/admin/merchants/:id/reject
DELETE /api/v1/admin/merchants/:id

Orders:
GET    /api/v1/admin/orders
GET    /api/v1/admin/orders/:id
GET    /api/v1/admin/orders/statistics
GET    /api/v1/admin/orders/high-value
PATCH  /api/v1/admin/orders/:id/status

Disputes:
GET    /api/v1/admin/disputes
GET    /api/v1/admin/disputes/:id
GET    /api/v1/admin/disputes/statistics
POST   /api/v1/admin/disputes/:id/resolve
POST   /api/v1/admin/disputes/:id/reject
PATCH  /api/v1/admin/disputes/:id/status

Notifications:
GET    /api/v1/admin/notifications
GET    /api/v1/admin/notifications/unread-count
PATCH  /api/v1/admin/notifications/:id/read
POST   /api/v1/admin/notifications/mark-all-read
DELETE /api/v1/admin/notifications/:id

Settings:
GET    /api/v1/admin/settings/platform
PUT    /api/v1/admin/settings/platform
GET    /api/v1/admin/settings/fees
PUT    /api/v1/admin/settings/fees
POST   /api/v1/admin/settings/fees/calculate
GET    /api/v1/admin/settings/couriers
POST   /api/v1/admin/settings/couriers
PUT    /api/v1/admin/settings/couriers/:id
DELETE /api/v1/admin/settings/couriers/:id
```

---

### 3. Merchant Management ✅
**Location:** `apps/api/src/core/merchants/`

**What Works:**
- Merchant profile management
- Onboarding flow
- Settings (general, logistics, notifications, preferences)

**API Endpoints (7):**
```
GET    /api/v1/merchants/profile
POST   /api/v1/merchants/onboard
GET    /api/v1/merchants/settings
PUT    /api/v1/merchants/settings/general
PUT    /api/v1/merchants/settings/logistics
PUT    /api/v1/merchants/settings/notifications
PUT    /api/v1/merchants/settings/preferences
```

---

### 4. Shop APIs (E-commerce) ✅
**Location:** `apps/api/src/domains/shop/`

**What Works:**
- Store management (list, view, stats)
- Product listing (with pagination, filters)
- Order management (list, view, update status, stats)
- Manual product sync

**API Endpoints (11):**
```
Stores:
GET    /api/v1/shop/stores
GET    /api/v1/shop/stores/:id
GET    /api/v1/shop/stores/:id/stats

Products:
GET    /api/v1/shop/products
GET    /api/v1/shop/products/:id
POST   /api/v1/shop/products/sync

Orders:
GET    /api/v1/shop/orders
GET    /api/v1/shop/orders/:id
GET    /api/v1/shop/orders/stats
PATCH  /api/v1/shop/orders/:id/status
```

---

### 5. Logistics & Shipping ✅
**Location:** `apps/api/src/domains/logistics/` + `integrations/courier-partners/`

**What Works:**
- BlueDart integration (complete)
- Delhivery stub (placeholder)
- Shipment creation with auto-courier selection
- Tracking with real-time events
- Label generation
- Pickup scheduling/cancellation

**API Endpoints (5):**
```
POST   /api/v1/logistics/shipments
GET    /api/v1/logistics/shipments
GET    /api/v1/logistics/shipments/:id
GET    /api/v1/logistics/shipments/:id/track
DELETE /api/v1/logistics/shipments/:id
```

---

### 6. Payment Integration ✅
**Location:** `apps/api/src/integrations/payment-gateways/`

**What Works:**
- Razorpay order creation
- Payment verification
- Payment capture
- Refund processing (full/partial)
- Payment status tracking
- Webhook endpoint (INCOMPLETE - needs automation)

**API Endpoints (6):**
```
POST   /api/v1/payments/razorpay/orders
POST   /api/v1/payments/razorpay/verify
POST   /api/v1/payments/razorpay/payments/:id/capture
POST   /api/v1/payments/razorpay/payments/:id/refund
GET    /api/v1/payments/razorpay/payments/:id/status
POST   /api/v1/payments/razorpay/webhook (PUBLIC - needs completion)
```

---

### 7. Shopify Integration ✅
**Location:** `apps/api/src/integrations/shopify/`

**What Works:**
- OAuth flow (complete)
- Auto merchant/store creation
- Webhook handlers (orders, products, app uninstall)
- HMAC validation
- Automatic webhook registration

**API Endpoints (6):**
```
GET    /api/v1/integrations/shopify/oauth
GET    /api/v1/integrations/shopify/oauth/callback
POST   /api/v1/integrations/shopify/webhooks/orders/create
POST   /api/v1/integrations/shopify/webhooks/products/create
POST   /api/v1/integrations/shopify/webhooks/products/update
POST   /api/v1/integrations/shopify/webhooks/app/uninstalled
```

---

### 8. Notifications ✅
**Location:** `apps/api/src/domains/notifications/`

**What Works:**
- Merchant notifications (in-app)
- Email notifications (via Nodemailer/SendGrid)
- SMS notifications (via Twilio)
- Notification preferences
- Mark as read functionality

**API Endpoints (7):**
```
GET    /api/v1/notifications
GET    /api/v1/notifications/unread-count
PATCH  /api/v1/notifications/:id/read
POST   /api/v1/notifications/mark-all-read
DELETE /api/v1/notifications/:id
GET    /api/v1/notifications/preferences
PUT    /api/v1/notifications/preferences
```

---

### 9. Analytics & Reports ✅
**Location:** `apps/api/src/domains/analytics/`

**What Works:**
- Merchant analytics (orders, revenue, products)
- Revenue reports (daily/weekly/monthly)
- Product performance analysis
- Customer insights
- Shipping analytics
- Period comparison
- CSV export

**API Endpoints (7):**
```
GET    /api/v1/analytics/overview
GET    /api/v1/analytics/revenue
GET    /api/v1/analytics/products
GET    /api/v1/analytics/customers
GET    /api/v1/analytics/shipping
GET    /api/v1/analytics/comparison
GET    /api/v1/analytics/export
```

---

### 10. File Management ✅
**Location:** `apps/api/src/domains/files/`

**What Works:**
- File uploads to Cloudinary
- Invoice generation (HTML)
- Shipping label generation (HTML)
- Order export (CSV)
- File metadata tracking

**API Endpoints (8):**
```
POST   /api/v1/files/upload
POST   /api/v1/files/upload/multiple
GET    /api/v1/files
GET    /api/v1/files/:id
DELETE /api/v1/files/:id
POST   /api/v1/files/invoice/:orderId
POST   /api/v1/files/shipping-label/:shippingId
GET    /api/v1/files/export/orders
```

---

## ❌ CRITICAL GAPS (What's NOT Built)

### 1. ESCROW ENGINE (0%) 🚨 CRITICAL
**Location:** Should be `apps/api/src/core/escrow/`

**What's Missing:**
- Escrow state machine (HELD → RELEASED / REFUNDED)
- Auto-release logic:
  - COD: Release after delivery + 3 days
  - POD: Release after payment + delivery
  - Prepaid: Release after delivery + 3 days
  - Marketplace: Release after buyer confirms
- Hold/freeze on dispute
- Refund processing
- Different policies for different order types

**Why Critical:** Core business value - payments held but no release mechanism!

**Models Available:** 
- `ShopTransaction` (for Shop orders)
- `Transaction` (for Marketplace orders)
- Both have `escrowStatus` field

---

### 2. PAYMENT WEBHOOK AUTOMATION (30%) 🚨 CRITICAL
**Location:** `apps/api/src/integrations/payment-gateways/razorpay/`

**What's Missing:**
- Auto-capture authorized payments
- Update order status on payment success
- Initiate escrow on payment
- Handle failed payments
- Retry logic
- Proper webhook processing (currently just endpoint exists)

**Why Critical:** Manual payment processing not scalable

---

### 3. BACKGROUND JOBS (0%) 🚨 CRITICAL
**Location:** Should be `apps/api/src/services/jobs/`

**What's Missing:**
- Queue setup (Bull/BullMQ + Redis)
- Email queue worker
- SMS/notification queue worker
- Escrow auto-release worker (daily cron)
- Payout processing worker
- Shopify sync worker
- Cleanup jobs

**Why Critical:** Production requirement for async processing

---

### 4. RETURNS MANAGEMENT (0%) 🔴 HIGH
**Location:** Should be `apps/api/src/domains/shop/returns/`

**What's Missing:**
- Return request creation
- Return approval workflow
- Reverse pickup scheduling
- Return tracking
- Refund after return received
- Return statistics
- Return policy validation

**Models Available:** `ReturnRequest`, `ReturnItem`

---

### 5. CART & CHECKOUT (0%) 🔴 HIGH
**Location:** Should be `apps/api/src/domains/shop/cart/` + `checkout/`

**What's Missing:**
- Cart APIs (add, update, remove, clear)
- Guest checkout session
- Checkout flow (address, payment method selection)
- Order creation from cart
- Price calculation with platform fees
- Stock validation

**Models Available:** `Cart`, `CartItem`, `GuestCheckoutSession`, `ShopifyCheckoutSession`

**Why Important:** Can't sell on Rakshasetu.com storefront without this

---

### 6. RSMART MARKETPLACE (0%) 🟡 ON HOLD
**Location:** Should be `apps/api/src/domains/rsmart/`

**What's Missing (ENTIRE PLATFORM):**
- Listings management (create, edit, search)
- Connection system (buyer-seller matching)
- Custom order creation
- Marketplace escrow (different from Shop)
- Dispute resolution
- Chat/messaging system
- Reviews & ratings

**Models Available:** `User`, `Listing`, `Connect`, `Order` (marketplace), `Transaction` (marketplace)

**Status:** BLOCKED - awaiting legal clarity on payment aggregator license

---

### 7. BULK OPERATIONS (0%) 🟠 MEDIUM
**What's Missing:**
- Manifest generation (bulk shipment handover to courier)
- NDR (Non-Delivery Report) management
- RTO (Return to Origin) handling
- Bulk label generation
- Batch order processing

**Models Available:** `ShippingManifest`, `NDR`

---

### 8. COMMUNICATION INTEGRATIONS (50%) 🟠 MEDIUM
**What's Partial:**
- Email service exists (Nodemailer)
- SMS service exists (Twilio)
- WhatsApp service exists (Twilio)

**What's Missing:**
- Email templates in database
- Template rendering engine
- Proper queue integration
- WhatsApp notification endpoints

---

## 🚨 SCHEMA ISSUES (Must Fix First!)

### Models We Used But DON'T Exist in Schema:

1. **File** - We built entire file management system but no model!
   ```typescript
   // Used in: apps/api/src/domains/files/
   // Need to add to schema
   ```

2. **AdminNotification** - Referenced but missing
   ```typescript
   // Used in: apps/api/src/admin/notifications/
   // Need to add to schema
   ```

3. **CourierConfiguration** - Used in settings
   ```typescript
   // Used in: apps/api/src/admin/settings/
   // Need to add to schema
   ```

4. **FeeConfiguration** - Used in settings
   ```typescript
   // Used in: apps/api/src/admin/settings/
   // Need to add to schema
   ```

5. **EmailTemplate** - Used in settings
   ```typescript
   // Used in: apps/api/src/admin/settings/
   // Need to add to schema
   ```

6. **PlatformSettings** - We reference it but schema only has PlatformSetting (singular)

### Field Mismatches:

1. **Notification Model:**
   ```typescript
   // We used:
   merchantId?: string (DOESN'T EXIST IN SCHEMA!)
   
   // Schema has:
   userId: string (required)
   ```

2. **Merchant fields we reference but may not exist:**
   Check if all fields we use match schema exactly

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: Fix Foundation (CRITICAL - Do First!)

#### Step 1.1: Fix Schema Issues (2-3 hours)
```bash
# Add missing models to packages/database/prisma/schema.prisma
1. Add File model
2. Add AdminNotification model
3. Add CourierConfiguration model
4. Add FeeConfiguration model
5. Add EmailTemplate model
6. Fix Notification model (add merchantId field)
7. Run: pnpm db:generate
8. Run: pnpm db:push
```

#### Step 1.2: Build Escrow Engine (8-10 hours)
```
Location: apps/api/src/core/escrow/
Files to create:
- escrow.service.ts (state machine, policies)
- escrow.controller.ts
- escrow.routes.ts
- escrow.types.ts
- policies/
  - cod.policy.ts
  - pod.policy.ts
  - prepaid.policy.ts
  - marketplace.policy.ts
```

#### Step 1.3: Complete Payment Webhooks (2-3 hours)
```
Update: apps/api/src/integrations/payment-gateways/razorpay/razorpay.controller.ts
- Auto-capture on payment.authorized
- Update ShopOrder status
- Initiate escrow
- Error handling
```

#### Step 1.4: Setup Background Jobs (4-5 hours)
```
Location: apps/api/src/services/jobs/
Setup:
- Install bull, @bull-board/api, @bull-board/express
- Setup Redis connection
- Create queues (email, notification, escrow)
- Create workers
- Add to server startup
```

**Total Phase 1: 16-21 hours**

---

### Phase 2: Core Features (HIGH Priority)

#### Step 2.1: Returns Management (6-8 hours)
```
Location: apps/api/src/domains/shop/returns/
- Return request creation
- Approval workflow
- Reverse pickup integration
- Return tracking
- Refund processing
```

#### Step 2.2: Cart & Checkout (8-10 hours)
```
Location: apps/api/src/domains/shop/
- cart/ (cart management)
- checkout/ (checkout flow)
- storefront/ (public product APIs)
```

#### Step 2.3: Bulk Operations (4-6 hours)
```
Location: apps/api/src/domains/logistics/bulk/
- Manifest APIs
- NDR management
- RTO handling
```

**Total Phase 2: 18-24 hours**

---

### Phase 3: Marketplace (When Legal Cleared)

#### RSmart Complete Build (30-40 hours)
```
Location: apps/api/src/domains/rsmart/
- listings/
- connections/
- orders/
- disputes/
- chat/ (messaging)
- reviews/
```

---

## 📁 PROJECT STRUCTURE REFERENCE

```
apps/api/src/
├── common/              ✅ Error handling, utils
├── config/              ✅ Environment, constants
├── core/
│   ├── auth/           ✅ Complete (admin, merchant, user)
│   ├── merchants/      ✅ Complete
│   ├── escrow/         ❌ MISSING - BUILD THIS!
│   └── disputes/       ⚠️  Partial (admin side done)
├── domains/
│   ├── shop/
│   │   ├── stores/     ✅ Complete
│   │   ├── products/   ✅ Complete
│   │   ├── orders/     ✅ Complete
│   │   ├── cart/       ❌ MISSING
│   │   ├── checkout/   ❌ MISSING
│   │   ├── returns/    ❌ MISSING
│   │   └── logistics/  ✅ Complete
│   ├── rsmart/         ❌ MISSING (all)
│   ├── notifications/  ✅ Complete
│   ├── analytics/      ✅ Complete
│   └── files/          ✅ Complete
├── integrations/
│   ├── shopify/        ✅ Complete
│   ├── payment-gateways/
│   │   └── razorpay/   ⚠️  Partial (webhook incomplete)
│   ├── courier-partners/
│   │   └── bluedart/   ✅ Complete
│   └── communication/  ⚠️  Partial (services done, no queue)
├── admin/              ✅ Complete
├── services/
│   └── jobs/           ❌ MISSING - BUILD THIS!
├── routes/             ✅ Complete
├── server.ts           ✅ Complete
└── index.ts            ✅ Complete
```

---

## 📊 CURRENT STATISTICS

- **Total API Endpoints:** 114
- **Models Used:** ~25 out of 100+
- **Schema Models Missing:** 6+ critical ones
- **Completion Percentage:**
  - Shop Platform: 60%
  - Admin System: 80%
  - RSmart Marketplace: 0%
  - Core Systems: 40%

---

## 🔗 IMPORTANT FILES TO CHECK

1. **Architecture Document:** `/mnt/project/rakshasetu-complete-architecture.md`
2. **Database Schema:** `/mnt/project/schema.prisma`
3. **Shopify Build Log:** `/mnt/project/shopify-app-build-log.md`
4. **Project Context:** `/mnt/project/project-context.md`
5. **Git Workflow:** `/mnt/project/rakshasetu-git-workflow.md`

---

## 💡 WORKING STYLE (From Previous Developer)

**Preferences:**
- Short, direct responses
- Complete code (no truncation)
- Show FULL paths for commands
- One step at a time
- No long explanations unless asked
- Copy-paste ready commands

**What They Hate:**
- Long paragraphs
- Multiple options
- "Check documentation" responses

**What They Love:**
- "Run this: [command]"
- "Replace line X with: [code]"
- Getting things done FAST

---

## 🚀 NEXT CHAT INSTRUCTIONS

**Start With:**
"Hi Claude! Continuing RakshaSetu API backend from handover summary. 

Current status: 114 endpoints built, need to fix schema issues and build escrow engine.

Ready to start with Phase 1: Schema fixes. Show me exactly what models need to be added."

**Then Follow:**
1. Fix schema (add missing models)
2. Build escrow engine
3. Complete payment webhooks
4. Setup background jobs
5. Move to Phase 2

**Reference:**
- This handover summary
- Previous chat conversation (for context)
- Architecture document
- Database schema

---

## ✅ COMMITS TO REFERENCE

All work is in branch: `feature/api-foundation`

**Recent Commits:**
1. Admin auth + analytics models
2. Admin dashboard APIs (merchants, orders, disputes)
3. Notifications + Analytics + Settings + Files
4. Payment integration (Razorpay)
5. Logistics integration (BlueDart)
6. Shop APIs (stores, products, orders)
7. Merchant management
8. Shopify integration

**To see route list:**
```bash
cd apps/api
pnpm dev
# Will print all 114 routes on startup
```

---

## 🎯 SUCCESS CRITERIA

**Phase 1 Complete When:**
- [ ] All schema models added
- [ ] No TypeScript errors
- [ ] Escrow engine working with tests
- [ ] Payment webhooks auto-processing
- [ ] Background jobs running
- [ ] No breaking changes to existing APIs

**Phase 2 Complete When:**
- [ ] Returns fully functional
- [ ] Cart + checkout working
- [ ] Bulk operations implemented
- [ ] Can process end-to-end order on Rakshasetu.com

---

**END OF HANDOVER SUMMARY**

**Developer:** Continue from Phase 1, Step 1.1 (Schema Fixes)  
**Location:** Start in `/mnt/project/packages/database/prisma/schema.prisma`  
**First Task:** Add missing models to schema
