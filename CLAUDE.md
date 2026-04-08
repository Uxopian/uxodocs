# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UxoDocs is a multi-product documentation platform built with **Docusaurus 3.9.2** (React 19, TypeScript 5.9). It manages docs for 4 products: **Fast2**, **ARender**, **FlowerDocs**, and **Uxopian AI**, each with independent versioning and deployment.

- Staging: `https://staging.doc.uxopian.com/` (auto-deploys from `staging` branch)
- Production: `https://doc.uxopian.com/` (manual deploy from `master` branch)

## Common Commands

```bash
npm start                    # Dev server on port 3000
npm run build                # Production build (staging)
BUILD_PDF=1 npm run build    # Production build with PDF generation
npm run typecheck            # TypeScript type checking
npm run format               # Format with Prettier
npm run format:check         # Check formatting only
npm run generate:releases    # Regenerate release notes for all products
npm run prebuild             # Run all pre-build scripts (updateLastModified, generateTopCategories, generateSecondaryNav)
npm run clear                # Clear Docusaurus cache
```

## Architecture

### Docs Structure

Each product's docs live under `docs/<product>/` (arender, fast2, flowerdocs, uxopian-ai). A separate `docs_default/` directory holds the home page content. Each product has its own Docusaurus plugin instance configured in `docusaurus.config.ts` and its own sidebar defined in `sidebars*.ts` files.

### Branch-Based Versioning

Versioning is managed through Git branches, not Docusaurus's built-in versioning:
- **`staging`** — integration branch, auto-deploys to staging
- **`master`** — production branch, manual deployment
- **`dev-<product>-vX.Y.Z`** — development branches for new versions
- **`<product>-vX.Y.Z`** — archived version branches (e.g., `arender-v2023.14.0`)

CI/CD extracts docs from version branches and creates Docusaurus version snapshots automatically during build. See `VERSIONING.md` for full details.

### Build Scripts (`scripts/`)

- **updateLastModified.mjs** — SHA-256 content hashing to track doc changes
- **generateTopCategories.mjs** / **generateSecondaryNav.mjs** — Auto-generate navigation from `_category_.json` files
- **generate*Releases.mjs** — Index release notes per product (4 scripts)
- **build-arender-docs.mjs** — ARender Classic/Modern prebuild: filters `docs/arender/` into `.generated/arender-classic/` and `.generated/arender-modern/` by `viewer:` frontmatter. See [README.md § ARender Classic/Modern Viewer Architecture](README.md#arender-classicmodern-viewer-architecture) for full details.
- **remark-variables.mjs** — Remark plugin for Markdown variable injection
- **organize-pdfs.mjs** — Post-build PDF organization
- **patch-search-plugin.js** — Patches the local search plugin

### Custom Plugin

`plugins/docusaurus-plugin-papersaurus/` — Custom Docusaurus plugin for PDF generation from docs (uses Puppeteer + Cheerio).

### Generated Files

`src/generated/` contains auto-generated navigation data. These files are produced by pre-build scripts and should not be edited manually.

## Code Style

- **TypeScript required** — use explicit types, `.tsx` extension for components
- **CSS Modules only** — no Tailwind, Styled-Components, or other CSS frameworks
- **Functional components** with `React.FC` typing
- **No code comments** — write self-documenting code
- **Formatting**: 4-space indentation, no tabs, LF line endings, 100 char print width (enforced by Prettier)
- English only in code

## CI/CD

GitHub Actions workflows in `.github/workflows/`:
- **sync-deploy.yml** — Triggered on push to `staging` or product branches (`fast2-*`, `arender-*`, `flowerdocs-*`, `uxopian-ai-*`). Builds all product versions from their branches and deploys to AWS S3 (staging).
- **deploy-prod.yml** — Manual trigger (`workflow_dispatch`). Same process on `master` branch, deploys to production S3 bucket with PDF generation enabled.

Requires Node.js 20+. Deployed to AWS (eu-west-1).
