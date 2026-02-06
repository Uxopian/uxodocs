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

async function extractSidebarPosition(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
        if (frontMatterMatch) {
            const frontMatter = frontMatterMatch[1];
            const positionMatch = frontMatter.match(/^sidebar_position:\s*(\d+)\s*$/m);
            if (positionMatch) {
                return parseInt(positionMatch[1], 10);
            }
        }
    } catch (err) {
    }
    return 999; // Default position if not found
}

async function findFirstMarkdown(dir, maxDepth = 4, depth = 0) {
    if (depth > maxDepth) return null;
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile()).map((e) => e.name);

    // First, check for getting-started.md or getting-started.mdx in current directory
    const gettingStarted = files.find(f => /^getting-started\.mdx?$/i.test(f));
    if (gettingStarted) return path.join(dir, gettingStarted);

    // Then check for other markdown files in current directory, sorted by sidebar_position
    const mdFiles = files.filter(f => /\.mdx?$/i.test(f));
    if (mdFiles.length > 0) {
        // Get sidebar positions for all markdown files
        const filesWithPositions = await Promise.all(
            mdFiles.map(async (f) => {
                const filePath = path.join(dir, f);
                const position = await extractSidebarPosition(filePath);
                return { file: f, position, filePath };
            })
        );

        // Sort by sidebar_position, then alphabetically
        filesWithPositions.sort((a, b) => {
            if (a.position !== b.position) {
                return a.position - b.position;
            }
            return a.file.localeCompare(b.file);
        });

        return filesWithPositions[0].filePath;
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
                    ? path.join(process.cwd(), `${productName}_versioned_docs`, `version-${versionSlug}`)
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

    // Scan versioned content from {pluginId}_versioned_docs/version-{version}/
    // Docusaurus multi-instance plugins use format: arender_versioned_docs/version-v4/
    const rootDir = process.cwd();
    const rootEntries = await fs.readdir(rootDir, { withFileTypes: true });

    for (const entry of rootEntries) {
        if (!entry.isDirectory()) continue;

        // Match pattern like "arender_versioned_docs"
        const versionedDirMatch = entry.name.match(/^(.+)_versioned_docs$/);
        if (!versionedDirMatch) continue;

        const productName = versionedDirMatch[1];
        const versionedDocsPath = path.join(rootDir, entry.name);

        // Scan version folders inside (e.g., version-v4, version-v2.8-LTS)
        const versionFolders = await fs.readdir(versionedDocsPath, { withFileTypes: true });

        for (const vFolder of versionFolders) {
            if (!vFolder.isDirectory()) continue;

            // Match pattern like "version-v4" or "version-v2.8-LTS"
            const versionMatch = vFolder.name.match(/^version-(v[\d.]+-?[A-Z]*)$/);
            if (!versionMatch) continue;

            const versionSlug = versionMatch[1];
            const versionedProductPath = path.join(versionedDocsPath, vFolder.name);

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
