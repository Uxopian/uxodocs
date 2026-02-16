# UxoDocs

Multi-product documentation platform built with [Docusaurus 3.9.2](https://docusaurus.io/), serving documentation for ARender, Fast2, FlowerDocs, and Uxopian AI.

## Prerequisites

- Node.js >= 20
- npm (not yarn)
- Git LFS (for large files)

## Installation

```bash
npm ci
```

## Local Development

```bash
npm start
```

Starts a local development server with hot reload at http://localhost:3000.

## Build

### Standard Build

```bash
npm run build
```

This runs the prebuild pipeline automatically:
1. Updates last modified dates based on content hashes
2. Generates secondary navigation from directory structure
3. Generates top categories from `_category_.json` files

### Build with PDF Generation

```bash
BUILD_PDF=1 npm run build
```

Generates PDFs incrementally based on content changes tracked in `pdf-build-status.json`.

### Clear Cache

If the build fails, clear the Docusaurus cache:

```bash
npm run clear
```

## Available Scripts

```bash
npm start              # Dev server with hot reload
npm run build          # Production build (prebuild runs automatically)
```

### Manual Script Execution

```bash
npm run generate:releases      # Re-index release notes from all products
npm run update:lastModified    # Update content hashes and timestamps
npm run generate:topCategories # Regenerate top categories navigation
```

## Project Structure

This is a multi-product documentation platform with independent versioning per product:

| Product     | Docs Path            | Route               | Sidebar                  |
|-------------|----------------------|---------------------|--------------------------|
| ARender     | `docs/arender/`      | `/docs/arender`     | `sidebars_arender.ts`    |
| Fast2       | `docs/fast2/`        | `/docs/fast2`       | `sidebars_fast2.ts`      |
| FlowerDocs  | `docs/flowerdocs/`   | `/docs/flowerdocs`  | `sidebars_flowerdocs.ts` |
| Uxopian AI  | `docs/uxopian-ai/`   | `/docs/uxopian-ai`  | `sidebars_uxopian_ai.ts` |

## Versioning

This project uses branch-based versioning. Each version lives in a `test-<product>-v<version>` branch. The CI/CD pipeline:

1. Fetches all version branches
2. Creates Docusaurus snapshots for each version
3. Builds the site with all versions
4. Deploys to staging or production

See [VERSIONING.md](VERSIONING.md) for detailed information.

## Deployment

Deployment is automated via GitHub Actions:

- **Staging**: Automatic deployment on push to `staging` or `test-*` branches
- **Production**: Manual deployment via workflow dispatch from `master` branch

The workflows handle:
- Multi-version snapshot creation from branches
- LFS file caching
- Node dependencies caching
- Build optimization with 4GB memory allocation
- AWS S3 deployment

## Development Guidelines

- **Language**: TypeScript only
- **Styling**: CSS Modules only (no Tailwind, SASS, or CSS-in-JS)
- **Components**: Functional components typed with `React.FC<Props>`
- **Formatting**: Prettier with 4-space indent, double quotes
- **No comments**: Code should be self-documenting