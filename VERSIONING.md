# 🚀 UxoDocs Versioning & Architecture

## 📋 Overview

Multi-product documentation platform built with Docusaurus 3.9.2, managing documentation for **Fast2**, **ARender**, **FlowerDocs**, and **Uxopian AI** with independent versioning and automated builds.

---

## 🏗️ Project Structure

```
uxodocs/
├── docs/                          # Current documentation (development)
│   ├── fast2/
│   ├── arender/
│   ├── flowerdocs/
│   └── uxopian-ai/
│
├── versioned_docs/                # 🚫 GENERATED (CI/CD only)
├── versioned_sidebars/            # 🚫 GENERATED (CI/CD only)
│
├── src/
│   ├── components/                # React components
│   ├── pages/                     # Static pages & release notes
│   ├── generated/                 # 🚫 Auto-generated navigation & releases
│   └── css/                       # Global styles
│
├── scripts/                       # Build automation
│   ├── updateLastModified.mjs     # Content tracking & timestamps
│   ├── generateTopCategories.mjs  # Navigation generation
│   ├── generateSecondaryNav.mjs   # Secondary nav
│   └── generate*Releases.mjs      # Release notes indexing
│
├── .github/workflows/
│   └── sync-deploy.yml            # CI/CD pipeline
│
└── docusaurus.config.ts           # Main configuration
```

---

## 🔄 Versioning System

### Branch-Based Strategy

Each version is stored in a dedicated Git branch, keeping the main repository lightweight.

**Branch Naming Convention:**
```
dev-<product>-v<version>   # Development branch
test-<product>-v<version>  # Staging/version branch
```

**Main Branches:**
- `staging` - Integration branch with all products (triggers staging deployment)
- `master` - Production branch (manual deployment only)

**Examples:**
- `dev-fast2-v2025.2.0` → `test-fast2-v2025.2.0`
- `dev-flowerdocs-v2` → `test-flowerdocs-v2`
- `dev-arender-v2023.14.0` → `test-arender-v2023.14.0`

### How It Works

1. **Development**: Work on `dev-<product>-v<version>` branch with only one product in `docs/<product>/`
2. **Testing**: Rename to `test-<product>-v<version>` when ready for staging
3. **Version Branches**: Each release lives in its own `test-*` branch
4. **CI/CD**: Pipeline fetches all `test-*` branches, extracts docs, and builds complete site
5. **Production**: Manual workflow dispatch from `master` branch

---

## ⚙️ Build Workflow

### Pre-Build Scripts (Automatic)

Run before each build via `package.json` `prebuild`:

1. **`updateLastModified.mjs`**
   - Calculates SHA-256 hash of content
   - Updates `last_update.date` only when content changes
   - Generates `pdf-build-status.json` for incremental PDF builds

2. **`generateTopCategories.mjs`** & **`generateSecondaryNav.mjs`**
   - Scan product directories for categories
   - Read `_category_.json` for labels and positions
   - Generate `src/generated/topCategories.json`

3. **`generate*Releases.mjs`**
   - Index release notes from `src/pages/release-note/<product>/`
   - Extract frontmatter metadata
   - Generate JSON for release page filtering

### Build Commands

```bash
# Development (current version only)
npm start

# Production build (all versions via CI/CD)
npm run build
```

---

## 🚀 CI/CD Pipeline

**File:** `.github/workflows/sync-deploy.yml`  
**Trigger:** Push to `staging` or `test-*` branches

### Process

1. **Setup**
   - Checkout `staging` branch with full history
   - Cache Git LFS objects and npm packages
   - Install dependencies

2. **Version Snapshot Generation**
   
   For each product:
   ```bash
   # Cache current version
   rsync -a "docs/${product}/" ".cache_${product}_current/"
   
   # For each test-<product>-v* branch:
   #   1. Extract docs from branch
   #   2. Replace current docs
   #   3. Create Docusaurus snapshot
   npx docusaurus "docs:version:${product}" "${version}"
   
   # Restore current version
   rsync -a ".cache_${product}_current/" "docs/${product}/"
   ```

3. **Build & Deploy**
   - Build site: `npm run build`
   - Deploy to AWS S3 staging bucket

**Staging URL:** `https://staging.doc.uxopian.com/`  
**Production URL:** `https://doc.uxopian.com/` (manual deployment from `master`)

---

## 📝 Development Workflow

### 1. Creating a New Version Branch

**Step 1: Branch from staging**

```bash
git checkout staging
git pull origin staging
git checkout -b dev-fast2-v2025.2.0
```

**Step 2: Clean up other products**

```bash
# Keep only Fast2 documentation
rm -rf docs/arender docs/flowerdocs docs/uxopian-ai

# Verify
ls docs/  # Should only show fast2/
```

**Step 3: Configure for single product**

Edit `docusaurus.config.ts` and comment out all plugins/presets that don't concern Fast2:

```typescript
// Comment these sections:
// - arender plugin instance
// - flowerdocs plugin instance
// - uxopian-ai plugin instance
// - arender PDF plugin
// - flowerdocs PDF plugin
// - uxopian-ai PDF plugin

// Keep only:
// - fast2 plugin instance
// - fast2 PDF plugin (if needed)
```

**Step 4: Develop and test**

```bash
# Install and start dev server
npm ci
npm start

# Edit docs/fast2/ as needed
git add docs/fast2/
git commit -m "Update Fast2 documentation"
git push origin dev-fast2-v2025.2.0
```

**Step 5: Promote to staging**

When ready for deployment:

```bash
# Rename branch to trigger CI/CD
git branch -m test-fast2-v2025.2.0
git push origin test-fast2-v2025.2.0
git push origin :dev-fast2-v2025.2.0  # Delete old branch

# CI/CD will automatically build and deploy to staging
```

### 2. Working on Staging (All Products)

```bash
git checkout staging
# Edit docs/<any-product>/
git commit -m "Update documentation"
git push origin staging
# Triggers automatic staging deployment
```

### 3. Updating Existing Version

```bash
git checkout test-fast2-v2025.2.0
# Make changes to docs/fast2/
git commit -m "Fix typo"
git push origin test-fast2-v2025.2.0
# CI/CD rebuilds staging automatically
```

### 4. Deploying to Production

**Manual process via GitHub Actions:**

1. Merge `staging` into `master`
2. Go to Actions → "Deploy to PRODUCTION (Manual)"
3. Click "Run workflow" on `master` branch

### 5. Testing Versions Locally

---

## 📦 Plugin Architecture

### Multi-Instance Docs

Each product has its own plugin instance:

```typescript
{
  id: 'fast2',
  path: 'docs/fast2',
  routeBasePath: 'docs/fast2',
  sidebarPath: './sidebars_fast2.ts',
  lastVersion: 'current',
  versions: { current: { label: 'v2025.x.x' } }
}
```

### PDF Generation (Papersaurus)

```typescript
{
  id: 'fast2-pdf',
  docPluginId: 'fast2',
  autoBuildPdfs: false,
  ignoreDocs: ['index'],
  author: 'Uxopian'
}
```

### Search (Local)

```typescript
{
  indexDocs: true,
  docsRouteBasePath: ['docs/fast2', 'docs/arender', ...],
  highlightSearchTermsOnTargetPage: true
}
```

---

## 📄 Content Management

### Markdown Frontmatter

```yaml
---
title: "Page Title"
sidebar_position: 1
last_update:
  date: '2024-12-15T10:30:00.000Z'
  author: CI/CD Bot
content_hash: abc123...
---
```

### Category Configuration

`_category_.json`:
```json
{
  "label": "Getting Started",
  "position": 1,
  "collapsed": false
}
```

### Release Notes Format

```yaml
version: "2025.2.0"
major_version: "2025"
date: "2024-12-15"
description: "New features"
latest: true
```