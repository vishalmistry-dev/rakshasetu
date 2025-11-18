# Rakshasetu - Project Context

## What We're Building

**Rakshasetu** is a comprehensive e-commerce escrow and logistics platform for Indian merchants. It provides:

1. **Escrow Services** - Secure payment holding for buyer protection
2. **Logistics Management** - Multi-courier shipping integration and tracking
3. **Returns Handling** - Automated return processing
4. **Multi-Store Support** - API for external integrations
5. **Shopify Integration** - Native Shopify app for merchants

---

## Target Users

- **Merchants:** Shopify/WooCommerce store owners in India
- **Buyers:** End customers purchasing products
- **Admin:** Platform administrators managing disputes, payouts

---

## Core Business Flow

### For Marketplace (P2P):

1. Buyer places order
2. Payment held in escrow
3. Seller ships product
4. Buyer confirms delivery
5. Payment released to seller

### For E-commerce (Shopify):

1. Customer orders on Shopify store
2. Merchant uses Rakshasetu for:
   - Payment collection (COD/POD/Prepaid)
   - Logistics assignment
   - Tracking & notifications
3. Auto-settlement after delivery

---

## Tech Stack

### Monorepo Setup:

- **Turborepo** - Build orchestration
- **pnpm workspaces** - Package management
- **Single PostgreSQL DB** - Shared across all apps

### Apps:

1. **apps/api** - Express backend (port 4000)
2. **apps/website** - Next.js main website (port 3000)
3. **apps/shopify-app** - React Router 7 Shopify app

### Packages:

- **packages/database** - Prisma schema + shared types (SINGLE SOURCE OF TRUTH)

### Key Technologies:

- TypeScript everywhere
- Prisma ORM for database
- Shopify Polaris for Shopify app UI
- Tailwind CSS for website
- ESM modules (required for Shopify)

---

## Database Architecture

### Single Source of Truth:

- One Prisma schema in `packages/database`
- Types auto-generate and share to all apps
- Change schema once → all apps get updated types

### Key Models (from schema.prisma):

**Authentication:**

- User (buyers/sellers)
- Merchant (e-commerce store owners)
- Admin

**Marketplace:**

- Listing (products/services for P2P)
- Order (marketplace orders)
- Transaction (escrow management)

**E-commerce:**

- MerchantStore (Shopify/WooCommerce connections)
- ShopProduct (synced products)
- ShopOrder (store orders)
- ShopOrderGroup (bulk orders)

**Logistics:**

- Logistics (shipment management)
- CourierPartner & CourierService
- Shipping (tracking & delivery)
- Manifest (bulk handover)

**Financial:**

- SellerAccount & MerchantAccount
- PayoutTransaction
- Deduction tracking

**Communication:**

- Notification
- Conversation & Message
- DisputeTicket

---

## Project Structure

```
rakshasetu/
├── apps/
│   ├── api/                    # Express backend
│   │   ├── src/
│   │   │   ├── routes/        # API routes
│   │   │   ├── controllers/   # Business logic
│   │   │   └── middleware/    # Auth, validation
│   │   └── package.json
│   │
│   ├── website/               # Next.js main website
│   │   ├── src/
│   │   │   ├── app/          # App router pages
│   │   │   └── components/   # React components
│   │   └── package.json
│   │
│   └── shopify-app/          # Shopify integration
│       ├── app/
│       │   ├── routes/       # App routes (dashboard, settings, etc.)
│       │   ├── components/   # UI components (Polaris wrappers)
│       │   ├── lib/          # Utils, API clients, webhooks
│       │   └── types/        # TypeScript types
│       ├── extensions/       # Theme extensions
│       └── package.json
│
├── packages/
│   └── database/             # Prisma + shared types
│       ├── prisma/
│       │   └── schema.prisma # SINGLE SOURCE OF TRUTH
│       └── src/
│           ├── client.ts     # Prisma client export
│           └── index.ts      # Type exports
│
├── .env                      # Centralized environment variables
├── pnpm-workspace.yaml       # Workspace config
├── turbo.json               # Build orchestration
└── package.json             # Root scripts
```

---

## Development Workflow

### Start All Apps:

```bash
pnpm dev          # All apps
pnpm dev:api      # Backend only
pnpm dev:web      # Website only
pnpm dev:shopify  # Shopify app only
```

### Database:

```bash
pnpm db:generate  # Generate Prisma types (MUST RUN after schema changes)
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Prisma Studio GUI (port 5555)
```

### Git Workflow:

- Main branches: `main` (production), `develop` (staging)
- Feature branches: `feature/<name>`, `fix/<name>`, `chore/<name>`
- Commit format: `feat(scope): description` (enforced by Commitlint)

---

## Current Status (as of Nov 3, 2025)

### ✅ Completed:

- Monorepo setup with Turborepo
- Database package with Prisma
- Basic API backend
- Basic Next.js website
- **Shopify app UI (COMPLETE)**
  - Dashboard with stats
  - Onboarding flow
  - Settings pages (5 tabs)
  - Setup guides
  - Webhook handlers
  - Toast notifications
  - Form validation
  - Loading states

### 🚧 In Progress:

- Migrating old codebase

### ⏳ Planned:

- Real API integration (replace mocks)
- Database integration for Shopify app
- Admin dashboard
- Merchant portal
- Order management
- Logistics tracking
- Returns management
- Deployment setup

---

## Key Design Decisions

### Why Monorepo?

- Share code easily (types, utils)
- Deploy apps independently
- Consistent tooling
- Single database ensures data consistency

### Why Single Database Package?

- One schema = single source of truth
- Types auto-sync to all apps
- No manual type syncing
- Change once, everywhere updated

### Why ESM (not CommonJS)?

- React Router/Vite requires ESM
- Modern standard
- Better tree-shaking
- Required for Shopify app

### Why Shopify Polaris?

- Official Shopify design system
- Native feel in Shopify admin
- Accessibility built-in
- Fast development

---

## Important Environment Variables

**Root `.env`:**

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/rakshasetu
PORT=4000
NODE_ENV=development
SHOPIFY_PORT=3000
```

---

## Code Style Preferences

- TypeScript everywhere
- Functional components (React)
- Async/await over promises
- Clear variable names
- Comments for complex logic only
- Relative imports for now (no `~` alias issues)

---

## Developer Notes

### Working Style:

- Step-by-step explanations with clear commands
- Show actual code, not placeholders
- Explain "why" behind decisions
- Copy-paste ready commands
- Simple language

### First Monorepo Project:

- Refactoring existing messy codebase
- Want production-ready, scalable architecture
- Care about type safety and developer experience
- Plan to scale with a team later

---

## Important Links

- Developer: Vishal Mistry
- Location: Surat, Gujarat, India
- Database: PostgreSQL (local)
- Package Manager: pnpm (v8.15+)
- Node: >= 18.0.0
