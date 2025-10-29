# ───────────────────────────────────────────────

# 🧠 Branch Naming Convention

# ───────────────────────────────────────────────

# Primary branches

# - main: Production-ready code

# - develop: Staging/integration branch

# Feature branches

# - feature/<scope> → New features

# e.g. feature/razorpay-webhook, feature/admin-dashboard

# Fixes & Refactors

# - fix/<scope> → Bug fixes

# - refactor/<scope> → Code restructuring

# Infra & Setup

# - chore/<scope> → Tooling, setup, config

# e.g. chore/monorepo-db-setup

# Hotfixes

# - hotfix/<scope> → Urgent production fixes

# ───────────────────────────────────────────────

# ✍️ Commit Message Format (Commitlint Enforced)

# ───────────────────────────────────────────────

# Format: <type>(<scope>): <message>

# Allowed types: feat, fix, chore, docs, style, refactor, perf, test

# Examples:

# feat(escrow): add buyer protection logic

# fix(address): validate pincode format

# chore(repo): setup Husky and Commitlint

# ───────────────────────────────────────────────

# 🚀 Developer Workflow

# ───────────────────────────────────────────────

# Step 1: Sync with develop

git checkout develop
git pull origin develop

# Step 2: Create a new branch

# Replace 'escrow-flow' with your task name

git checkout -b feat/escrow-flow

# Step 3: Do your work (code, refactor, test)

# [Edit files manually]

# Step 4: Stage changes

git add .

# Step 5: Commit with conventional format

git commit -m "feat(escrow): add buyer protection logic"

# Step 6: Push to remote

git push -u origin feat/escrow-flow

# Step 7: Open GitHub and create a PR into develop

# Optional cleanup after merge:

# git branch -d feat/escrow-flow

# git push origin --delete feat/escrow-flow

# ───────────────────────────────────────────────

# 🔁 Pull Request Flow

# ───────────────────────────────────────────────

# 1. Start from develop

git checkout develop
git pull

# 2. Create feature branch

git checkout -b feat/escrow-flow

# 3. Work → commit

git add .
git commit -m "feat(escrow): add buyer protection logic"

# 4. Push and open PR

git push -u origin feat/escrow-flow

# 5. Open PR → develop

# Title: feat(escrow): add buyer protection logic

# Description: What changed, why, edge cases

# 6. Merge into main when ready for production

# ───────────────────────────────────────────────

# 🧼 Git Hygiene Setup (Husky + Commitlint)

# ───────────────────────────────────────────────

# Install Husky

pnpm dlx husky-init && pnpm install

# Install Commitlint

pnpm add -Dw @commitlint/{cli,config-conventional}

# Create commit-msg hook

mkdir -p .husky
printf '#!/bin/sh\npnpm exec commitlint --edit "$1"\n' > .husky/commit-msg
chmod +x .husky/commit-msg

# Create config file

echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
