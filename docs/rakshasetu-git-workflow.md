───────────────────────────────────────────────
🚀 RAKSHASETU - Complete Development Guide
───────────────────────────────────────────────
═══════════════════════════════════════════════
📦 MONOREPO STRUCTURE
═══════════════════════════════════════════════
rakshasetu/
├── apps/
│ ├── web/ # Next.js main website
│ ├── api/ # Express backend
│ └── shopify-app/ # Shopify app
├── packages/
│ ├── database/ # Prisma + DB types (SOURCE OF TRUTH)
│ ├── typescript-config/
│ └── eslint-config/
└── .env # Single env file for all
═══════════════════════════════════════════════
🎯 ROOT COMMANDS (from rakshasetu/)
═══════════════════════════════════════════════
DEVELOPMENT
pnpm dev # Run all apps in dev mode
pnpm dev:api # Run only API
DATABASE
pnpm db:generate # Generate Prisma types (ALWAYS RUN AFTER SCHEMA CHANGE)
pnpm db:push # Push schema to DB (dev)
pnpm db:studio # Open Prisma Studio GUI (localhost:5555)
BUILD
pnpm build # Build all packages & apps (Turborepo)
INSTALL
pnpm install # Install all dependencies
pnpm add [package] -w # Add package to root
CLEAN
pnpm clean # Remove all build artifacts
FILTER (run in specific package)
pnpm --filter @rakshasetu/database [command]
pnpm --filter @rakshasetu/api [command]
pnpm --filter @rakshasetu/web [command]
═══════════════════════════════════════════════
🗄️ DATABASE COMMANDS (packages/database/)
═══════════════════════════════════════════════
cd packages/database
pnpm db:generate # Generate Prisma Client & types
pnpm db:push # Push schema to DB (no migrations)
pnpm db:migrate # Create migration (production)
pnpm db:studio # Open Studio GUI
pnpm build # Compile TypeScript
Direct Prisma
npx prisma format # Format schema.prisma
npx prisma validate # Validate schema
npx prisma migrate dev --name [name] # Create named migration
npx prisma migrate reset # Reset DB & run migrations
═══════════════════════════════════════════════
🔌 BACKEND API COMMANDS (apps/api/)
═══════════════════════════════════════════════
cd apps/api
pnpm dev # Run in watch mode
pnpm start # Run production build
pnpm build # Compile TypeScript
pnpm add [package] # Add dependency
═══════════════════════════════════════════════
🌐 FRONTEND WEB COMMANDS (apps/web/)
═══════════════════════════════════════════════
cd apps/web
pnpm dev # Next.js dev (localhost:3000)
pnpm build # Build for production
pnpm start # Start production server
pnpm add [package] # Add dependency
═══════════════════════════════════════════════
🛍️ SHOPIFY APP COMMANDS (apps/shopify-app/)
═══════════════════════════════════════════════
cd apps/shopify-app
pnpm dev # Shopify dev
pnpm build # Build app
pnpm add [package] # Add dependency
═══════════════════════════════════════════════
🔄 COMMON WORKFLOWS
═══════════════════════════════════════════════
──────────────────────────────────────────────
Add New Database Table
──────────────────────────────────────────────

1. Edit packages/database/prisma/schema.prisma
2. Generate types
   pnpm db:generate
3. Push to database
   pnpm db:push
4. Rebuild database package
   pnpm --filter @rakshasetu/database build
5. Restart dev servers
   ──────────────────────────────────────────────
   Start Full Development
   ──────────────────────────────────────────────
   Terminal 1: API
   pnpm dev:api
   Terminal 2: Database GUI (optional)
   pnpm db:studio
   Terminal 3: Frontend (when ready)
   cd apps/web && pnpm dev
   ──────────────────────────────────────────────
   Full Clean & Reinstall
   ──────────────────────────────────────────────
   pnpm clean
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   pnpm db:generate
   pnpm build
   ──────────────────────────────────────────────
   Deploy Preparation
   ──────────────────────────────────────────────
   pnpm db:generate # Generate types
   pnpm build # Build all
   Deploy each app's dist/ folder separately
   ═══════════════════════════════════════════════
   🌿 GIT BRANCH NAMING
   ═══════════════════════════════════════════════
   PRIMARY BRANCHES
   main # Production-ready code
   develop # Staging/integration
   FEATURE BRANCHES
   feature/<scope> # New features
   Examples:
   feature/razorpay-integration
   feature/admin-dashboard
   feature/user-auth
   FIXES & REFACTORS
   fix/<scope> # Bug fixes
   refactor/<scope> # Code restructuring
   Examples:
   fix/payment-webhook
   refactor/database-queries
   INFRASTRUCTURE
   chore/<scope> # Tooling, setup, config
   Examples:
   chore/monorepo-setup
   chore/ci-cd-pipeline
   HOTFIXES
   hotfix/<scope> # Urgent production fixes
   Examples:
   hotfix/payment-bug
   hotfix/security-patch
   ═══════════════════════════════════════════════
   ✍️ COMMIT MESSAGE FORMAT (Commitlint)
   ═══════════════════════════════════════════════
   Format: <type>(<scope>): <message>
   ALLOWED TYPES:
   feat # New feature
   fix # Bug fix
   chore # Tooling, config, dependencies
   docs # Documentation only
   style # Code style (formatting, semicolons)
   refactor # Code change (no new feature or fix)
   perf # Performance improvement
   test # Adding or updating tests
   build # Build system changes
   ci # CI/CD changes
   EXAMPLES:
   git commit -m "feat(auth): add JWT token validation"
   git commit -m "fix(payment): handle razorpay webhook timeout"
   git commit -m "chore(deps): update prisma to v5.22"
   git commit -m "refactor(api): extract user service logic"
   git commit -m "docs(readme): add deployment instructions"
   git commit -m "perf(db): add index on user email"
   MULTI-LINE COMMITS:
   git commit -m "feat(escrow): add buyer protection logic

Add escrow model to database
Create payment hold endpoint
Implement release mechanism
Add buyer dispute flow"

═══════════════════════════════════════════════
🔁 DAILY GIT WORKFLOW
═══════════════════════════════════════════════
──────────────────────────────────────────────
START NEW FEATURE
──────────────────────────────────────────────
git checkout develop
git pull origin develop
git checkout -b feature/razorpay-integration
──────────────────────────────────────────────
SAVE YOUR WORK (Daily commits)
──────────────────────────────────────────────
git add .
git status # Check what's staged
git commit -m "feat(payment): add razorpay checkout"
git push -u origin feature/razorpay-integration
──────────────────────────────────────────────
UPDATE BRANCH WITH LATEST DEVELOP
──────────────────────────────────────────────
git checkout develop
git pull origin develop
git checkout feature/razorpay-integration
git merge develop
Resolve conflicts if any
git push origin feature/razorpay-integration
──────────────────────────────────────────────
FINISH FEATURE (Create PR)
──────────────────────────────────────────────

1. Push latest changes
   git push origin feature/razorpay-integration
2. Go to GitHub and create Pull Request:

- Base: develop
- Compare: feature/razorpay-integration
- Title: feat(payment): add razorpay integration
- Description: What changed, why, screenshots

3. After PR is merged, cleanup:
   git checkout develop
   git pull origin develop
   git branch -d feature/razorpay-integration
   git push origin --delete feature/razorpay-integration
   ──────────────────────────────────────────────
   EMERGENCY PRODUCTION FIX (Hotfix)
   ──────────────────────────────────────────────
   git checkout main
   git pull origin main
   git checkout -b hotfix/payment-webhook-crash
   Fix the bug
   git add .
   git commit -m "fix(webhook): prevent null payment crash"
   git push -u origin hotfix/payment-webhook-crash
   Create PR to main (mark as urgent)
   After merge to main, also merge to develop:
   git checkout develop
   git merge main
   git push origin develop
   Cleanup
   git branch -d hotfix/payment-webhook-crash
   ──────────────────────────────────────────────
   STASH WORK (save without committing)
   ──────────────────────────────────────────────
   git stash # Save current changes
   git stash list # List all stashes
   git stash pop # Apply latest stash
   git stash apply stash@{0} # Apply specific stash
   git stash drop # Delete latest stash
   ──────────────────────────────────────────────
   UNDO CHANGES
   ──────────────────────────────────────────────
   git reset --soft HEAD1 # Undo last commit (keep changes)
   git reset --hard HEAD1 # Undo last commit (DELETE changes)
   git checkout -- [file] # Discard changes in file
   git restore [file] # Restore file to last commit
   ═══════════════════════════════════════════════
   🔍 GIT STATUS & HISTORY
   ═══════════════════════════════════════════════
   git status # Check current status
   git log --oneline # Compact commit history
   git log --oneline --graph --all # Visual branch history
   git diff # Show unstaged changes
   git diff --staged # Show staged changes
   git branch -a # List all branches
   git remote -v # Show remote URLs
   ═══════════════════════════════════════════════
   🆘 TROUBLESHOOTING
   ═══════════════════════════════════════════════
   Prisma not initialized
   pnpm db:generate
   Types not updating
   pnpm --filter @rakshasetu/database build
   Port already in use
   Windows:
   netstat -ano | findstr :4000 # Find PID
   taskkill /PID [number] /F # Kill process
   Mac/Linux:
   lsof -ti:4000 | xargs kill -9
   Dependencies messed up
   pnpm clean && pnpm install
   Husky hooks not working
   chmod +x .husky/commit-msg
   chmod +x .husky/pre-commit
   Merge conflicts
   git status # See conflicted files
   Edit files, resolve conflicts
   git add .
   git commit -m "merge: resolve conflicts"
   Accidentally committed to wrong branch
   git log --oneline # Find commit hash
   git checkout correct-branch
   git cherry-pick [commit-hash]
   git checkout wrong-branch
   git reset --hard HEAD~1
   ═══════════════════════════════════════════════
   🔐 ENVIRONMENT VARIABLES
   ═══════════════════════════════════════════════
   Location: rakshasetu/.env (root only)
   DATABASE*URL="postgresql://user:pass@localhost:5432/rakshasetu"
   PORT=4000
   NODE_ENV=development
   For production (Railway, Render, Vercel)
   DATABASE_URL="postgresql://..." # Production DB
   JWT_SECRET="your-secret-key"
   RAZORPAY_KEY_ID="rzp_live*..."
   RAZORPAY_KEY_SECRET="..."
   ═══════════════════════════════════════════════
   🚢 DEPLOYMENT CHECKLIST
   ═══════════════════════════════════════════════
1. Generate types
   pnpm db:generate
1. Build all
   pnpm build
1. Run migrations (production DB)
   pnpm --filter @rakshasetu/database db:migrate
1. Deploy each app separately:

- API → Railway/Render
- Web → Vercel
- Shopify → Shopify hosting

5. Set environment variables in each platform
   ═══════════════════════════════════════════════
   📚 USEFUL LINKS
   ═══════════════════════════════════════════════
   Prisma Docs: https://prisma.io/docs
   Turborepo Docs: https://turbo.build/repo/docs
   Conventional Commits: https://conventionalcommits.org
   pnpm Workspace: https://pnpm.io/workspaces
   ═══════════════════════════════════════════════
   💡 PRO TIPS
   ═══════════════════════════════════════════════
1. ALWAYS run pnpm db:generate after changing schema
1. Commit often with clear messages
1. Create small PRs (easier to review)
1. Use develop for integration, main for production
1. Test locally before pushing
1. Keep .env file secret (never commit)
1. Use feature flags for incomplete features
1. Write commit messages like you're explaining to future you
   ═══════════════════════════════════════════════
   🎯 QUICK COPY-PASTE COMMANDS
   ═══════════════════════════════════════════════
   New feature start to finish:
   git checkout develop && git pull && git checkout -b feature/my-feature
   ... code ...
   git add . && git commit -m "feat(scope): description"
   git push -u origin feature/my-feature
   Create PR on GitHub → Merge → Cleanup:
   git checkout develop && git pull && git branch -d feature/my-feature
   Daily work loop:
   ... code ...
   git add . && git commit -m "feat(scope): description" && git push
   Update schema:
   Edit schema.prisma
   pnpm db:generate && pnpm db:push && pnpm --filter @rakshasetu/database build
