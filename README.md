# UxoDocs User Guide

This guide will help you set up your workstation and manage documentation for ARender, Fast2, FlowerDocs, and Uxopian AI.

## Table of Contents

1. [Workstation Setup](#workstation-setup)
2. [Understanding the Branch Structure](#understanding-the-branch-structure)
3. [Common Workflows](#common-workflows)
   - [Updating Current Version](#updating-current-version)
   - [Updating Old Version](#updating-old-version)
   - [Creating New Current Version](#creating-new-current-version)
   - [Creating New Old Version](#creating-new-old-version)
4. [Testing in Staging](#testing-in-staging)
5. [Deploying to Production](#deploying-to-production)
6. [Tips and Tricks](#tips-and-tricks)

---

## Workstation Setup

### Prerequisites

You'll need the following tools installed on your workstation:

1. **Git Bash** - For version control operations
2. **VSCode** - Code editor for making changes
3. **Node.js** (version 20 or higher) - Required for building the documentation site
4. **GitHub Access** - Google Single Sign-On (SSO) for authentication

### Installation Steps

#### 1. Install Git Bash

Download and install Git Bash from [git-scm.com](https://git-scm.com/downloads)

#### 2. Install Node.js

Download and install Node.js 20+ from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version  # Should show v20.x.x or higher
npm --version
```

#### 3. Install VSCode

Download and install from [code.visualstudio.com](https://code.visualstudio.com/)

#### 4. Clone the Repository

Open Git Bash and clone the repository:

```bash
git clone https://github.com/uxopian/uxodocs.git
cd uxodocs
```

#### 5. Install Dependencies

```bash
npm ci
```

#### 6. Configure GitHub Authentication

To be able to push changes to GitHub, you need to create a Personal Access Token.

**Steps to create your token:**

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a descriptive name: `UxoDocs Workstation`
4. Set expiration: Choose **90 days** or **No expiration** (depending on your preference)
5. Select scopes: Check **`repo`** (this gives full control of private repositories)
6. Click **"Generate token"** at the bottom
7. **IMPORTANT: Copy the token immediately!** You won't be able to see it again

**Save your token somewhere safe** (like a password manager) in case you need it later.

#### 7. Verify Setup

Start the local development server:

```bash
npm start
```

Your browser should open at `http://localhost:3000` with the documentation site.

#### 8. First Push to GitHub

The first time you push changes to GitHub, Git will ask for authentication:

```bash
git push origin your-branch-name
```

You'll see prompts like:
```
Username for 'https://github.com': your-github-username
Password for 'https://your-github-username@github.com':
```

**Important:** 
- For **Username**: Enter your GitHub username
- For **Password**: **Paste your Personal Access Token** (NOT your GitHub password!)

After this first authentication, Git will automatically remember your credentials using Windows Credential Manager, so you won't need to enter them again for future pushes.

---

## Understanding the Branch Structure

### Branch Types

The project uses a specific branching strategy:

| Branch Type | Pattern | Purpose | Deployed to Site? |
|-------------|---------|---------|-------------------|
| **Production** | `master` | Production environment | Yes (manual trigger) |
| **Staging** | `staging` | Current versions, staging environment | Yes (auto) |
| **Working Branch** | `dev-<product>-vX.Y.Z` | Work in progress | No |
| **Version Branch** | `<product>-vX.Y.Z` | Archived/old versions | Yes (auto) |

### Version Naming Convention

Versions follow the pattern `vX.Y.Z`:
- **X** = Year of major version release (e.g., 2024, 2025)
- **Y** = Minor version increment (e.g., 0, 1, 2)
- **Z** = Fix/patch version increment (e.g., 0, 1, 2)

Examples: `v2024.1.0`, `v2024.2.1`, `v2025.0.0`

### Visual Overview

```
Master (Production)
│
Staging (Current Versions)
│
├── dev-fast2-v2024.2.0 (Working)
│   └── fast2-v2024.1.0 (Old Version)
│       └── fast2-v2024.1.1 (Newer Old Version)
│
└── dev-arender-v2024.3.0 (Working)
    └── arender-v2024.2.0 (Old Version)
```

### Deployment Rules

**Staging** (`staging.doc.uxopian.com`):
- Builds from `staging` + all non-dev branches
- Auto-deploys when changes are pushed

**Production** (`doc.uxopian.com`):
- Builds from `master` + all non-dev non-staging branches
- Manual deployment trigger required

---

## Common Workflows

### Updating Current Version

Use this workflow when updating the current version of a product's documentation.

#### Steps

1. **Create working branch from staging**
   ```bash
   git checkout staging
   git pull origin staging
   git checkout -b dev-fast2-v2024.2.0
   ```

2. **Make your changes**
   - Edit files in `docs/fast2/` (or your product's folder)
   - Test locally with `npm start`
   - Commit your changes:
     ```bash
     git add .
     git commit -m "Update Fast2 documentation for feature X"
     ```

3. **Push to GitHub**
   ```bash
   git push origin dev-fast2-v2024.2.0
   ```

4. **Test in staging**
   ```bash
   git checkout staging
   git merge dev-fast2-v2024.2.0
   git push origin staging
   ```
   
   Check your changes at `staging.doc.uxopian.com`

5. **If changes look good, prepare for production**
   - Before the next release, you'll archive the current version (see "Creating New Current Version")

---

### Updating Old Version

Use this workflow when fixing documentation for an already released version.

#### Steps

1. **Create working branch from the old version branch**
   ```bash
   git fetch origin
   git checkout -b dev-fast2-v2024.1.0 origin/fast2-v2024.1.0
   ```

2. **Make your changes**
   - Edit files in `docs/fast2/`
   - Test locally with `npm start`
   - Commit your changes:
     ```bash
     git add .
     git commit -m "Fix typo in Fast2 v2024.1.0 installation guide"
     ```

3. **Push working branch to GitHub**
   ```bash
   git push origin dev-fast2-v2024.1.0
   ```

4. **Rename branch to make it visible in staging**
   
   In GitHub web interface:
   - Go to the repository
   - Click on "branches"
   - Find `dev-fast2-v2024.1.0`
   - Click the pencil icon to rename
   - Remove `dev-` prefix: `fast2-v2024.1.0`

5. **Validate in staging**
   
   Visit `staging.doc.uxopian.com` and verify your changes

6. **Deploy to production or rollback**
   
   If OK: Manually trigger the production workflow
   
   If NOT OK:
   - Rename back to `dev-fast2-v2024.1.0` in GitHub
   - Make additional fixes
   - Repeat from step 3

---

### Creating New Current Version

Use this workflow when releasing a new version of a product (e.g., going from v2024.1.0 to v2024.2.0).

#### Steps

1. **Create working branch for new version**
   ```bash
   git checkout staging
   git pull origin staging
   git checkout -b dev-fast2-v2024.2.0
   ```

2. **Make your changes for the new version**
   - Update documentation in `docs/fast2/`
   - Add new features, update screenshots, etc.
   - Test locally with `npm start`
   - Commit your changes:
     ```bash
     git add .
     git commit -m "Add Fast2 v2024.2.0 documentation"
     ```

3. **Push to GitHub**
   ```bash
   git push origin dev-fast2-v2024.2.0
   ```

4. **Archive the previous current version**
   
   Before merging your new version to staging, create an archive branch for the old current version:
   ```bash
   git checkout staging
   git pull origin staging
   git checkout -b fast2-v2024.1.0
   git push origin fast2-v2024.1.0
   ```
   
   This creates a permanent snapshot of v2024.1.0 that will appear on the documentation site.

5. **Merge new version to staging**
   ```bash
   git checkout staging
   git merge dev-fast2-v2024.2.0
   git push origin staging
   ```

6. **Validate in staging**
   
   Visit `staging.doc.uxopian.com` and verify:
   - New current version (v2024.2.0) appears correctly
   - Old version (v2024.1.0) is still accessible in the version selector

7. **Deploy to production when ready**
   
   See "Deploying to Production" section below

---

### Creating New Old Version

Use this workflow when creating a fix/patch version from an existing old version (e.g., v2024.1.0 → v2024.1.1).

#### Steps

1. **Create working branch from existing old version**
   ```bash
   git fetch origin
   git checkout -b dev-fast2-v2024.1.1 origin/fast2-v2024.1.0
   ```

2. **Make your changes**
   - Fix issues, update content
   - Test locally with `npm start`
   - Commit your changes:
     ```bash
     git add .
     git commit -m "Fix security documentation for Fast2 v2024.1.1"
     ```

3. **Push to GitHub**
   ```bash
   git push origin dev-fast2-v2024.1.1
   ```

4. **Rename branch to make it a version branch**
   
   In GitHub web interface:
   - Go to the repository
   - Click on "branches"
   - Find `dev-fast2-v2024.1.1`
   - Click the pencil icon
   - Rename to `fast2-v2024.1.1` (remove `dev-` prefix)

5. **Validate in staging**
   
   Visit `staging.doc.uxopian.com` and check:
   - v2024.1.1 appears in the version selector
   - Changes are correct

6. **Deploy to production or rollback**
   
   If OK: Manually trigger the production workflow
   
   If NOT OK:
   - Rename back to `dev-fast2-v2024.1.1`
   - Fix issues
   - Repeat from step 3

---

## Testing in Staging

The staging environment automatically builds and deploys when:
- Changes are pushed to `staging`
- Changes are pushed to any non-dev branch (version branches)

### Accessing Staging

Visit: `staging.doc.uxopian.com`

### What Gets Deployed to Staging

- Current versions from `staging`
- All version branches (anything matching `<product>-vX.Y.Z`)
- Common pages and site structure from `staging`

### What Does NOT Get Deployed to Staging

- Working branches (anything starting with `dev-`)
- The `master` branch

### Testing Checklist

Before deploying to production, verify in staging:
- [ ] All links work correctly
- [ ] Images display properly
- [ ] Version selector shows correct versions
- [ ] Navigation menus are correct
- [ ] Search functionality works
- [ ] Code examples are properly formatted
- [ ] Release notes are up to date

---

## Deploying to Production

Production deployment is a **manual process** to ensure quality control.

### Prerequisites

Before deploying to production:
1. All changes must be validated in staging
2. If you updated current versions, merge `staging` into `master`

### Steps

#### 1. Merge staging into master (if needed)

If you made changes to current versions or site structure:

```bash
git checkout master
git pull origin master
git merge staging
git push origin master
```

Skip this step if you only updated old version branches.

#### 2. Manually trigger the production workflow

1. Go to the GitHub repository
2. Click on "Actions" tab
3. Find the production deployment workflow
4. Click "Run workflow"
5. Select `master` branch
6. Click "Run workflow" button

#### 3. Monitor the deployment

- Watch the workflow execution in the Actions tab
- Check for any errors
- Wait for completion (usually a few minutes)

#### 4. Verify production

Visit: `doc.uxopian.com`

Verify:
- [ ] Changes appear correctly
- [ ] All versions are accessible
- [ ] No broken links or errors
- [ ] Version selector works

---

## Tips and Tricks

### Working Locally

**Start development server:**
```bash
npm start
```

**Build the site locally:**
```bash
npm run build
```

**Clear cache if build fails:**
```bash
npm run clear
```

### Branch Management

**See all branches:**
```bash
git branch -a
```

**Switch between branches:**
```bash
git checkout <branch-name>
```

**Update your local branch with remote changes:**
```bash
git pull origin <branch-name>
```

**Delete a local branch:**
```bash
git branch -d <branch-name>
```

### Renaming Branches in GitHub

**Via GitHub Web Interface:**
1. Go to repository → Branches
2. Find the branch to rename
3. Click the pencil icon next to the branch name
4. Enter new name
5. Click "Rename branch"

**Via Git Command Line:**
```bash
# Rename local branch
git branch -m old-name new-name

# Delete old branch on remote
git push origin :old-name

# Push new branch to remote
git push origin new-name

# Reset upstream
git push origin -u new-name
```

### Quick Reference

**I want to...** | **What to do**
--- | ---
Update current docs | Create `dev-<product>-vX.Y.Z` from `develop`, merge back to `develop`
Fix old version | Create `dev-<product>-vX.Y.Z` from `<product>-vX.Y.Z`, rename to remove `dev-`
Release new version | Create version branch from current `develop`, merge new work to `develop`
Test before production | Check `staging.doc.uxopian.com`
Deploy to production | Merge `develop` to `master`, manually trigger workflow

---

## Getting Help

If you encounter issues:
1. Check the staging environment first
2. Clear your local cache: `npm run clear`
3. Pull latest changes: `git pull origin staging`
4. Ask the team in your communication channel
5. Contact the original developer for technical issues

---

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [GitHub Documentation](https://docs.github.com/)
- [Markdown Guide](https://www.markdownguide.org/)

---

**Happy documenting! 📚**