#!/usr/bin/env node
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
    // Prefer files at this level first (sorted)
    const files = entries.filter((e) => e.isFile()).map((e) => e.name).sort();
    for (const f of files) {
        if (/\.mdx?$/i.test(f)) return path.join(dir, f);
    }
    // Then go deeper in alphabetical order
    const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
    for (const d of dirs) {
        const found = await findFirstMarkdown(path.join(dir, d), maxDepth, depth + 1);
        if (found) return found;
    }
    return null;
}

// Helper function to check if a directory contains markdown files recursively
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

// Helper function to extract title from markdown front matter
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
        // If we can't read the file, return null
    }
    return null;
}

// Helper function to extract label from _category_.json
async function extractLabelFromCategoryJson(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const json = JSON.parse(content);
        return json.label || null;
    } catch (err) {
        // If we can't read the file, return null
    }
    return null;
}

async function build() {
    const result = {};
    const products = await fs.readdir(docsDir, { withFileTypes: true });
    for (const p of products) {
        if (!p.isDirectory()) continue;
        const productName = p.name;
        const productPath = path.join(docsDir, productName);
        const entries = await fs.readdir(productPath, { withFileTypes: true });
        const categories = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
        const outItems = [];
        for (const c of categories) {
            const catPath = path.join(productPath, c);

            // Skip category if it doesn't contain any markdown files
            const containsMd = await hasMarkdownFiles(catPath);
            if (!containsMd) {
                console.log(`Skipping empty category: ${productName}/${c}`);
                continue;
            }

            const categoryJson = path.join(catPath, '_category_.json');
            const indexMd = path.join(catPath, 'index.md');
            const indexMdx = path.join(catPath, 'index.mdx');
            const underscoreIndex = path.join(catPath, '_index.md');

            // Try to extract title - prioritize _category_.json, then index files
            let label = titleCase(c); // Default fallback

            // First, try _category_.json
            if (await exists(categoryJson)) {
                const extractedLabel = await extractLabelFromCategoryJson(categoryJson);
                if (extractedLabel) {
                    label = extractedLabel;
                }
            } else {
                // Fallback to index files
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

            // Determine the href: use index if exists, otherwise find first markdown
            let href = `/docs/${productName}/${c}/`;

            // Check if we have an actual index page
            const hasIndex = await exists(indexMd) || await exists(indexMdx) || await exists(underscoreIndex);

            if (!hasIndex) {
                // No index file, find the first markdown file to use as landing page
                const firstMd = await findFirstMarkdown(catPath);
                if (firstMd) {
                    const rel = path.relative(docsDir, firstMd).split(path.sep).join('/');
                    const noExt = rel.replace(/\.(md|mdx)$/i, '');
                    href = `/docs/${noExt}`;
                }
            }

            outItems.push({ label, href });
        }
        result[productName] = outItems;
    }

    // Ensure output directory exists
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, JSON.stringify(result, null, 2) + '\n', 'utf8');
    console.log('Wrote', outFile);
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
