# 🚀 RAKSHASETU — Complete Development Guide

---

## 📦 Monorepo Structure

```
rakshasetu/
├── apps/
│   ├── web/            # Next.js main website
│   ├── api/            # Express backend
│   └── shopify-app/    # Shopify app
├── packages/
│   ├── database/       # Prisma + DB types (SOURCE OF TRUTH)
│   ├── typescript-config/
│   └── eslint-config/
└── .env                # Single env file for all
```

---

## 🎯 Root Commands (run from `rakshasetu/`)

### Development

```
pnpm dev
pnpm dev:api
```

### Database

```
pnpm db:generate
pnpm db:push
pnpm db:studio
```

### Build

```
pnpm build
```

### Install

```
pnpm install
pnpm add [package] -w
```

### Clean

```
pnpm clean
```

### Filter

```
pnpm --filter @rakshasetu/database [command]
pnpm --filter @rakshasetu/api [command]
pnpm --filter @rakshasetu/web [command]
```

---

## 🗄️ Database Commands (`packages/database/`)

```
cd packages/database
pnpm db:generate
pnpm db:push
pnpm db:migrate
pnpm db:studio
pnpm build
```

### Prisma Direct

```
npx prisma format
npx prisma validate
npx prisma migrate dev --name <name>
npx prisma migrate reset
```

---

## 🔌 Backend API Commands (`apps/api/`)

```
cd apps/api
pnpm dev
pnpm start
pnpm build
pnpm add <package>
```

---

## 🌐 Frontend Web Commands (`apps/web/`)

```
cd apps/web
pnpm dev
pnpm build
pnpm start
pnpm add <package>
```

---

## 🛍️ Shopify App Commands (`apps/shopify-app/`)

```
cd apps/shopify-app
pnpm dev
pnpm build
pnpm add <package>
```

---

## 🔄 Common Workflows

---

### ➕ Add New Database Table

1. Edit `packages/database/prisma/schema.prisma`
2. `pnpm db:generate`
3. `pnpm db:push`
4. `pnpm --filter @rakshasetu/database build`
5. Restart dev servers

---

### 🖥️ Start Full Development

**Terminal 1: API**

```
pnpm dev:api
```

**Terminal 2: Prisma Studio**

```
pnpm db:studio
```

**Terminal 3: Web**

```
cd apps/web && pnpm dev
```

---

### 🔥 Full Clean & Reinstall

```
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm db:generate
pnpm build
```

---

### 🚢 Deploy Preparation

```
pnpm db:generate
pnpm build
pnpm --filter @rakshasetu/database db:migrate
```

---

## 🌿 Git Branch Naming

### Primary

- main
- develop

### Feature

```
feature/<scope>
```

### Fix / Refactor

```
fix/<scope>
refactor/<scope>
```

### Infra

```
chore/<scope>
```

### Hotfix

```
hotfix/<scope>
```

---

## ✍️ Commit Message Format (Commitlint)

Format:

```
<type>(<scope>): <message>
```

Types:

- feat
- fix
- chore
- docs
- style
- refactor
- perf
- test
- build
- ci

Examples:

```
feat(auth): add JWT token validation
fix(payment): handle razorpay webhook timeout
chore(deps): update prisma to v5.22
refactor(api): extract user service logic
docs(readme): add deployment instructions
perf(db): add index on user email
```

Multi-line example:

```
feat(escrow): add buyer protection logic

Add escrow model to database
Create payment hold endpoint
Implement release mechanism
Add buyer dispute flow
```

---

## 🔁 Daily Git Workflow

### Start New Feature

```
git checkout develop
git pull origin develop
git checkout -b feature/razorpay-integration
```

### Save Work

```
git add .
git commit -m "feat(payment): add razorpay checkout"
git push -u origin feature/razorpay-integration
```

### Update Feature With Latest Develop

```
git checkout develop
git pull
git checkout feature/razorpay-integration
git merge develop
git push
```

### Finish Feature (PR)

- Base: develop
- Compare: feature/razorpay-integration

Cleanup:

```
git checkout develop
git pull
git branch -d feature/razorpay-integration
git push origin --delete feature/razorpay-integration
```

---

## 🚑 Hotfix Workflow

```
git checkout main
git pull
git checkout -b hotfix/payment-webhook-crash

# fix bug

git add .
git commit -m "fix(webhook): prevent null payment crash"
git push -u origin hotfix/payment-webhook-crash
```

After merging → merge main → develop.

---

## 🧰 Stash

```
git stash
git stash list
git stash pop
git stash apply stash@{0}
git stash drop
```

---

## 🆘 Troubleshooting

### Prisma

```
pnpm db:generate
```

### Types not updating

```
pnpm --filter @rakshasetu/database build
```

### Port in use (Windows)

```
netstat -ano | findstr :4000
taskkill /PID <id> /F
```

### Port in use (Mac/Linux)

```
lsof -ti:4000 | xargs kill -9
```

### Dependencies broken

```
pnpm clean && pnpm install
```

### Merge Conflicts

```
git status
# fix conflicts
git add .
git commit -m "merge: resolve conflicts"
```

---

## 🔐 Environment Variables (`rakshasetu/.env`)

```
DATABASE_URL="postgresql://user:pass@localhost:5432/rakshasetu"
PORT=4000
NODE_ENV=development

# Production
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
RAZORPAY_KEY_ID="rzp_live..."
RAZORPAY_KEY_SECRET="..."
```

---

## 🚢 Deployment Checklist

1. `pnpm db:generate`
2. `pnpm build`
3. `pnpm --filter @rakshasetu/database db:migrate`
4. Deploy each app:
   - API → Railway / Render
   - Web → Vercel
   - Shopify → Shopify hosting
5. Set env vars

---

## 💡 Pro Tips

- Always run `pnpm db:generate` after schema changes
- Commit often
- Use small PRs
- Keep `.env` secret
- Use feature flags
- Write commits for "future you"

---

## 🎯 Quick Commands

### New Feature

```
git checkout develop && git pull && git checkout -b feature/my-feature
git add . && git commit -m "feat(scope): desc"
git push -u origin feature/my-feature
```

### Update Schema

```
pnpm db:generate
pnpm db:push
pnpm --filter @rakshasetu/database build
```
