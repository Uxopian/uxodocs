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
test-<product>-v<version>
```

**Examples:**
- `test-fast2-v2025.2.0`
- `test-flowerdocs-v2`
- `test-arender-v2023.14.0`

### How It Works

1. **Development**: Work on `test` branch with current versions in `docs/<product>/`
2. **Version Branches**: Each release lives in its own branch
3. **CI/CD**: Pipeline fetches all version branches, extracts docs, and builds complete site

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

# Update timestamps manually
npm run update:lastModified

# Generate release notes
npm run generate:releases
```

---

## 🚀 CI/CD Pipeline

**File:** `.github/workflows/sync-deploy.yml`  
**Trigger:** Push to `test` or `test-*` branches

### Process

1. **Setup**
   - Checkout `test-v2` with full history
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
   - Deploy to GitHub Pages (`gh-pages` branch)

**Deployment URL:** `https://uxopian.github.io/uxodocs/`

---

## 📝 Development Workflow

### 1. Working on Current Version

```bash
git checkout test
# Edit docs/<product>/
git commit -m "Update documentation"
git push origin test
```

### 2. Creating a New Version

```bash
# Create version branch
git checkout -b test-fast2-v2025.2.0
git add docs/fast2/
git commit -m "Release Fast2 v2025.2.0"
git push origin test-fast2-v2025.2.0

# Return to development
git checkout test
```

### 3. Updating Existing Version

```bash
git checkout test-fast2-v2025.2.0
# Make changes
git commit -m "Fix typo"
git push origin test-fast2-v2025.2.0
# CI/CD rebuilds automatically
```

### 4. Testing Versions Locally

```bash
# Create snapshot manually
npx docusaurus docs:version:fast2 v2025.2.0
npm start

# Clean up
rm -rf versioned_docs/ versioned_sidebars/
```

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
---
version: "2025.2.0"
major_version: "2025"
date: "2024-12-15"
description: "New features"
latest: true
---
```

---

## 🐛 Troubleshooting

### Version Not Appearing

```bash
# Check branch exists
git branch -r | grep test-<product>-v

# Fetch all branches
git fetch --all
```

### Build Fails

```bash
# Verify branch structure
git checkout test-<product>-v<version>
ls docs/<product>/

# Clear cache
npm run clear
npm run build
```

### Outdated Timestamps

```bash
npm run update:lastModified
```

---

## 🎯 Key Features

✅ **Lightweight Repository** - Only current versions stored locally  
✅ **Independent Versioning** - Each product has its own timeline  
✅ **Automated Tracking** - SHA-256 hashing for change detection  
✅ **Dynamic Navigation** - Auto-generated from directory structure  
✅ **Offline Search** - No external dependencies  
✅ **Release Management** - Centralized, filterable release notes  
✅ **Incremental PDFs** - Only rebuild when content changes  

---

## 📞 Support

1. Check this documentation
2. Review CI/CD logs in GitHub Actions
3. Inspect `src/generated/` files
4. Test locally with `npm start`

---

**Built with:** Docusaurus 3.9.2 • React 19.0.0 • TypeScript 5.6.2  
**Maintained by:** Uxopian Software  
**Last Updated:** 2026-01-16