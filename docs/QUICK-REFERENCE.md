# RakshaSetu - Quick Reference Card

**For New Chat Session**

---

## 📌 CONTEXT IN 30 SECONDS

- **Project:** RakshaSetu - E-commerce Escrow + Logistics Platform
- **Current:** 114 API endpoints built, missing core features
- **Next:** Fix schema → Build escrow engine → Complete webhooks → Add jobs
- **Status:** Branch `feature/api-foundation`, ready to continue

---

## 🚀 START NEW CHAT WITH:

```
Hi Claude! Continuing RakshaSetu API backend.

Please read these project files first:
1. HANDOVER-SUMMARY.md (current status + what to build)
2. RAKSHASETU-API-ANALYSIS.md (detailed gap analysis)  
3. rakshasetu-complete-architecture.md (full architecture)
4. schema.prisma (database models)

Current task: Phase 1, Step 1 - Fix schema issues.
Ready to start?
```

---

## 📁 KEY FILES TO READ

1. **HANDOVER-SUMMARY.md** ← Start here!
2. **RAKSHASETU-API-ANALYSIS.md** ← Detailed analysis
3. **rakshasetu-complete-architecture.md** ← Architecture
4. **schema.prisma** ← Database schema
5. **project-context.md** ← Original setup

---

## ⚡ CRITICAL GAPS TO BUILD

1. 🚨 **Escrow Engine** (0%) - Core business logic
2. 🚨 **Payment Webhooks** (30%) - Automation missing
3. 🚨 **Background Jobs** (0%) - No async processing
4. 🔴 **Returns** (0%) - Full system missing
5. 🔴 **Cart/Checkout** (0%) - Storefront non-functional

---

## ✅ WHAT'S WORKING

- ✅ Admin dashboard (33 endpoints)
- ✅ Merchant management (7 endpoints)
- ✅ Shop APIs (11 endpoints)
- ✅ Logistics/BlueDart (5 endpoints)
- ✅ Payments/Razorpay (6 endpoints)
- ✅ Shopify integration (6 endpoints)
- ✅ Notifications (14 endpoints)
- ✅ Analytics (7 endpoints)
- ✅ Files (8 endpoints)
- ✅ Settings (11 endpoints)
- ✅ Auth (14 endpoints)

**Total: 114 endpoints**

---

## 🎯 IMMEDIATE NEXT STEPS

### Phase 1: Critical (16-21 hours)

**1.1 Fix Schema (2-3h)**
- Add: File, AdminNotification, CourierConfiguration, FeeConfiguration, EmailTemplate
- Fix: Notification.merchantId field
- Run: `pnpm db:generate && pnpm db:push`

**1.2 Build Escrow (8-10h)**
- Location: `apps/api/src/core/escrow/`
- State machine + policies (COD/POD/Prepaid/Marketplace)

**1.3 Complete Webhooks (2-3h)**
- Auto-capture payments
- Update order status
- Trigger escrow

**1.4 Setup Jobs (4-5h)**
- Bull queues + Redis
- Email/notification/escrow workers

---

## 📊 PROGRESS TRACKING

- **Built:** 114 endpoints, 60% Shop, 80% Admin
- **Missing:** Escrow, Jobs, Returns, Cart, RSmart
- **Time Needed:** ~74-99 hours total
- **Phase 1:** 16-21 hours (critical)
- **Phase 2:** 18-24 hours (high priority)

---

## 🔗 USEFUL COMMANDS

```bash
# See all routes
cd apps/api && pnpm dev

# Database
pnpm db:generate  # After schema changes
pnpm db:push      # Push to DB
pnpm db:studio    # Open GUI

# Development
cd apps/api && pnpm dev      # Start API (port 4000)
cd apps/website && pnpm dev  # Start website (port 3000)

# Git
git status
git add .
git commit -m "feat: description"
git push
```

---

## 💡 DEVELOPER PREFERENCES

- **Short responses** - Get to the point
- **Complete code** - No truncation
- **Full commands** - With paths
- **One step at a time** - Wait for confirmation
- **No long explanations** - Action over theory

---

## 🚨 SCHEMA ISSUES (FIX FIRST!)

**Missing Models:**
- File
- AdminNotification  
- CourierConfiguration
- FeeConfiguration
- EmailTemplate

**Field Issues:**
- Notification needs merchantId field

**Fix in:** `packages/database/prisma/schema.prisma`

---

## 📞 SUPPORT

- **Location:** Surat, Gujarat, India
- **Timezone:** IST (UTC+5:30)
- **Developer:** Vishal Mistry
- **Repository:** github.com/vishalmistry-dev/rakshasetu

---

**Ready to continue! 🚀**
