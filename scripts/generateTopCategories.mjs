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

            const indexMd = path.join(catPath, 'index.md');
            const underscoreIndex = path.join(catPath, '_index.md');
            let href = `/docs/${productName}/${c}/`;
            if (await exists(indexMd) || await exists(underscoreIndex)) {
                // keep href as folder
            } else {
                // Prefer a file named after the category (e.g., administration.md)
                const preferNames = [
                    `${c}.md`,
                    `${c}.mdx`,
                    path.join(c, 'index.md'),
                    path.join(c, 'index.mdx'),
                    'README.md',
                    'readme.md',
                ];
                let found = null;
                for (const pn of preferNames) {
                    const pth = path.join(productPath, pn);
                    if (await exists(pth)) {
                        found = pth;
                        break;
                    }
                }
                if (!found) {
                    found = await findFirstMarkdown(catPath);
                }
                if (found) {
                    // build href from docs-relative path without extension
                    const rel = path.relative(docsDir, found).split(path.sep).join('/');
                    const noExt = rel.replace(/\.(md|mdx)$/i, '');
                    href = `/docs/${noExt}/`;
                }
            }
            outItems.push({ label: titleCase(c), href });
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
