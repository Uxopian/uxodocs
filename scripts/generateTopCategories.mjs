import fs from 'fs/promises';
import path from 'path';

const docsDir = path.join(process.cwd(), 'docs');
const outFile = path.join(process.cwd(), 'src', 'generated', 'topCategories.json');

function titleCase(name) {
    return name
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
        .join(' ');
}

async function exists(p) {
    try {
        await fs.access(p);
        return true;
    } catch (e) {
        return false;
    }
}

async function findFirstMarkdown(dir, maxDepth = 4, depth = 0) {
    if (depth > maxDepth) return null;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile()).map((e) => e.name);

    // First, check for getting-started.md or getting-started.mdx in current directory
    const gettingStarted = files.find(f => /^getting-started\.mdx?$/i.test(f));
    if (gettingStarted) return path.join(dir, gettingStarted);

    // Then check for other markdown files in current directory, sorted alphabetically
    const sortedFiles = files.sort();
    for (const f of sortedFiles) {
        if (/\.mdx?$/i.test(f)) return path.join(dir, f);
    }

    // If no markdown files in current directory, recurse into subdirectories
    const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();

    // First pass: look for getting-started.md in subdirectories
    for (const d of dirs) {
        const subPath = path.join(dir, d);
        const subEntries = await fs.readdir(subPath, { withFileTypes: true });
        const subFiles = subEntries.filter((e) => e.isFile()).map((e) => e.name);
        const subGettingStarted = subFiles.find(f => /^getting-started\.mdx?$/i.test(f));
        if (subGettingStarted) return path.join(subPath, subGettingStarted);
    }

    // Second pass: recurse normally if no getting-started found
    for (const d of dirs) {
        const found = await findFirstMarkdown(path.join(dir, d), maxDepth, depth + 1);
        if (found) return found;
    }
    return null;
}

async function hasMarkdownFiles(dir) {
    try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const it of items) {
            const pth = path.join(dir, it.name);
            if (it.isFile()) {
                if (/\.mdx?$/.test(it.name)) return true;
            } else if (it.isDirectory()) {
                if (await hasMarkdownFiles(pth)) return true;
            }
        }
    } catch (err) {
        return false;
    }
    return false;
}

async function extractTitleFromMarkdown(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
        if (frontMatterMatch) {
            const frontMatter = frontMatterMatch[1];
            const titleMatch = frontMatter.match(/^title:\s*["']?(.+?)["']?\s*$/m);
            if (titleMatch) {
                return titleMatch[1].replace(/^["']|["']$/g, '');
            }
        }
    } catch (err) {
    }
    return null;
}

async function extractCategoryInfo(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const json = JSON.parse(content);
        return {
            label: json.label || null,
            position: json.position !== undefined ? json.position : 999
        };
    } catch (err) {
    }
    return { label: null, position: 999 };
}

async function scanProductCategories(productPath, productName, versionSlug = null) {
    const entries = await fs.readdir(productPath, { withFileTypes: true });
    const categories = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    const outItems = [];

    for (const c of categories) {
        const catPath = path.join(productPath, c);

        const containsMd = await hasMarkdownFiles(catPath);
        if (!containsMd) {
            continue;
        }

        const categoryJson = path.join(catPath, '_category_.json');
        const indexMd = path.join(catPath, 'index.md');
        const indexMdx = path.join(catPath, 'index.mdx');
        const underscoreIndex = path.join(catPath, '_index.md');

        let label = titleCase(c);
        let position = 999;

        if (await exists(categoryJson)) {
            const categoryInfo = await extractCategoryInfo(categoryJson);
            if (categoryInfo.label) {
                label = categoryInfo.label;
            }
            position = categoryInfo.position;
        } else {
            for (const indexFile of [indexMd, indexMdx, underscoreIndex]) {
                if (await exists(indexFile)) {
                    const extractedTitle = await extractTitleFromMarkdown(indexFile);
                    if (extractedTitle) {
                        label = extractedTitle;
                        break;
                    }
                }
            }
        }

        // Build href with version slug if provided
        let href = versionSlug
            ? `/docs/${productName}/${versionSlug}/${c}/`
            : `/docs/${productName}/${c}/`;

        const hasIndex = await exists(indexMd) || await exists(indexMdx) || await exists(underscoreIndex);

        if (!hasIndex) {
            const firstMd = await findFirstMarkdown(catPath);
            if (firstMd) {
                // For versioned docs, we need to adjust the relative path calculation
                const baseDir = versionSlug
                    ? path.join(process.cwd(), 'versioned_docs', `${productName}-${versionSlug}`)
                    : docsDir;
                const rel = path.relative(baseDir, firstMd).split(path.sep).join('/');
                const noExt = rel.replace(/\.(md|mdx)$/i, '');
                href = versionSlug
                    ? `/docs/${productName}/${versionSlug}/${noExt}`
                    : `/docs/${noExt}`;
            }
        }

        outItems.push({ label, href, position });
    }

    // Sort by position
    outItems.sort((a, b) => a.position - b.position);
    // Remove position from final output
    return outItems.map(({ label, href }) => ({ label, href }));
}

async function build() {
    const result = {};

    // Scan current versions from docs/
    const products = await fs.readdir(docsDir, { withFileTypes: true });
    for (const p of products) {
        if (!p.isDirectory()) continue;
        const productName = p.name;
        const productPath = path.join(docsDir, productName);

        // Initialize product with nested structure
        result[productName] = {
            current: await scanProductCategories(productPath, productName)
        };
    }

    // Scan versioned content from versioned_docs/
    const versionedDocsDir = path.join(process.cwd(), 'versioned_docs');
    if (await exists(versionedDocsDir)) {
        const versionedDirs = await fs.readdir(versionedDocsDir, { withFileTypes: true });

        for (const vDir of versionedDirs) {
            if (!vDir.isDirectory()) continue;

            // Parse directory name: e.g., "arender-v2.8-LTS" -> product: "arender", version: "v2.8-LTS"
            const match = vDir.name.match(/^(.+?)-(v[\d.]+-?[A-Z]*)$/);
            if (!match) continue;

            const [, productName, versionSlug] = match;
            const versionedProductPath = path.join(versionedDocsDir, vDir.name);

            // Initialize product if not exists
            if (!result[productName]) {
                result[productName] = { current: [] };
            }

            // Add versioned categories
            result[productName][versionSlug] = await scanProductCategories(
                versionedProductPath,
                productName,
                versionSlug
            );
        }
    }

    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, JSON.stringify(result, null, 2) + '\n', 'utf8');
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
