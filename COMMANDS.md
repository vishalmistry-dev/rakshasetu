# 🚀 RAKSHASETU MONOREPO COMMAND REFERENCE

# Place this file at the repo root (e.g. /rakshasetu/COMMANDS.md)

A complete, structured reference for running, building, and maintaining all apps (API, Web, Database, Shopify, etc.) in the Turborepo + PNPM workspace.

──────────────────────────────────────────────
⚙️ 1. DEVELOPMENT
──────────────────────────────────────────────

# Run all apps in development mode (Turborepo)

# Run from: repo root

pnpm dev

# -> Starts all dev servers defined by the monorepo

# Run only API in dev mode

# Run from: repo root

pnpm dev:api

# -> Starts only the API app in dev mode

# Start Next.js web app (localhost:3000)

# Run from: repo root OR run inside apps/web

cd apps/web && pnpm dev

# -> Next.js dev server

# Start Shopify app development environment

# Run from: repo root OR run inside apps/shopify-app

cd apps/shopify-app && pnpm dev

# -> Shopify dev server (shopify-cli/tunnel etc.)

# Turborepo dev options

# Run from: repo root

turbo run dev

# -> Run dev across all apps (same as pnpm dev if configured)

turbo run dev --parallel

# -> Run dev across apps in parallel (faster on multi-core machines)

──────────────────────────────────────────────
🧱 2. BUILD (PRODUCTION PREPARATION)
──────────────────────────────────────────────

# Build all packages & apps (Turborepo handles dependency order)

# Run from: repo root

pnpm build

# -> Produces dist/ or .next builds for each package/app

# Build API (TypeScript → dist/)

# Run from: apps/api

cd apps/api && pnpm build

# OR from repo root:

# cd apps/api && pnpm build

# Build Next.js web app for production

# Run from: apps/web

cd apps/web && pnpm build

# Build Shopify app

# Run from: apps/shopify-app

cd apps/shopify-app && pnpm build

# Build only API via Turborepo filter

# Run from: repo root

turbo run build --filter=@rakshasetu/api

# -> Useful for CI or incremental builds

# Force rebuild (ignore Turborepo cache)

# Run from: repo root

turbo run build --force

# Rebuild database package after schema changes

# Run from: repo root

pnpm --filter @rakshasetu/database build

# -> Recompiles the shared database package (Prisma types etc.)

──────────────────────────────────────────────
🧰 3. DATABASE (PRISMA + MIGRATIONS)
──────────────────────────────────────────────

# Generate Prisma Client & TypeScript types

# Run from: repo root OR packages/database

pnpm db:generate

# -> Runs prisma generate for the database package

# Push schema changes to the database (no migration files)

# Run from: repo root OR packages/database

pnpm db:push

# -> Applies schema directly (dev only)

# Open Prisma Studio GUI (localhost:5555)

# Run from: repo root OR packages/database

pnpm db:studio

# Create & apply migration (production/development flow)

# Run from: repo root OR packages/database

pnpm db:migrate

# -> Creates migration files and applies them (recommended for prod)

# Direct Prisma CLI commands (when needed)

# Run from: repo root OR packages/database

npx prisma format # Format schema.prisma
npx prisma validate # Validate schema syntax
npx prisma studio # Open Prisma Studio directly
npx prisma migrate dev --name [name] # Create named dev migration
npx prisma migrate reset # Reset DB & rerun migrations

# Typical DB workflow (developer)

# Run from: repo root (or packages/database)

# 1. Edit packages/database/prisma/schema.prisma

# 2. Generate client/types

pnpm db:generate

# 3. Push to DB in dev

pnpm db:push

# 4. Rebuild database package (so API & other packages pick up types)

pnpm --filter @rakshasetu/database build

──────────────────────────────────────────────
🌐 4. RUNNING IN PRODUCTION
──────────────────────────────────────────────

# Run compiled API (node dist/index.js)

# Run from: apps/api

cd apps/api
pnpm start

# -> Start server using built files in apps/api/dist

# Start built Next.js web app

# Run from: apps/web

cd apps/web
pnpm start

# -> Starts Next production server (ensure .env and build exist)

──────────────────────────────────────────────
🧩 5. INSTALLATION & DEPENDENCY MANAGEMENT
──────────────────────────────────────────────

# Install dependencies across the entire workspace

# Run from: repo root

pnpm install

# -> Installs for all packages (workspace install)

# Add a package to the root workspace (shared dependency)

# Run from: repo root

pnpm add [package] -w

# -> Adds package to root package.json (available to all workspaces)

# Add runtime dependency to API

# Run from: apps/api

cd apps/api && pnpm add express

# OR from repo root:

pnpm --filter @rakshasetu/api add express

# Add dev dependency (e.g. @types/express)

# Run from: target package folder OR repo root with filter

cd apps/api && pnpm add -D @types/express

# OR

pnpm --filter @rakshasetu/api add -D @types/express

# List dependencies

# Run from: current working folder (repo root or package)

pnpm list # List for current folder
pnpm list -r # List recursively (entire monorepo)
pnpm list --depth 0 # Show top-level dependencies only

# Allow postinstall scripts (some packages require this)

# Run from: repo root

pnpm approve-builds [package-name]

──────────────────────────────────────────────
🧹 6. CLEANUP & RESET
──────────────────────────────────────────────

# Remove dist, node_modules, and .turbo

# Run from: repo root

pnpm clean

# -> Uses workspace script to clean build artifacts

# Full reset (nuclear option)

# Run from: repo root

pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm db:generate
pnpm build

# -> Full remove + reinstall + regenerate + rebuild

# Clear Turborepo cache and force rebuild

# Run from: repo root

rm -rf .turbo && pnpm build --force

# Kill process on port 4000 (Mac/Linux)

# Run from: any terminal on your machine

lsof -ti:4000 | xargs kill -9

# Find port on Windows (then kill PID)

# Run in PowerShell/CMD

netstat -ano | findstr :4000

# then kill the found PID with taskkill /PID <pid> /F

──────────────────────────────────────────────
🧪 7. TESTING (Future)
──────────────────────────────────────────────

# Run tests (configure Jest/Vitest later)

# Run from: repo root OR individual package

pnpm test

# -> Placeholder, add per-package test scripts (apps/api, apps/web)

──────────────────────────────────────────────
🧭 8. GIT WORKFLOW
──────────────────────────────────────────────

# Standard commit workflow

# Run from: repo root

git add .
git commit -m "message"
git push origin main

# Remove ignored files already tracked by git

# Run from: repo root

git rm -r --cached node_modules
git rm --cached .env

# -> Use when you added files that are now in .gitignore

──────────────────────────────────────────────
🧩 9. FILTERING COMMANDS (PNPM FILTER)
──────────────────────────────────────────────

# Run command in Database package

# Run from: repo root

pnpm --filter @rakshasetu/database [command]

# Run command in API app

# Run from: repo root

pnpm --filter @rakshasetu/api [command]

# Run command in Web app

# Run from: repo root

pnpm --filter @rakshasetu/web [command]

──────────────────────────────────────────────
🌎 10. ENVIRONMENT MANAGEMENT
──────────────────────────────────────────────

# Root .env file used by all packages & apps

# Location: repo root

rakshasetu/.env

# -> Keep shared environment variables here; individual packages can have their own .env if needed

──────────────────────────────────────────────
⚡ QUICK WORKFLOW SUMMARY (one-line copyables)
──────────────────────────────────────────────

# Start API dev + DB GUI

# Run from: repo root (open 2 terminals)

pnpm dev:api
pnpm db:studio

# After schema update (dev workflow)

# Run from: repo root

pnpm db:generate
pnpm --filter @rakshasetu/database build
pnpm build

# Clean & reinstall (if things break)

# Run from: repo root

pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm db:generate
pnpm build
