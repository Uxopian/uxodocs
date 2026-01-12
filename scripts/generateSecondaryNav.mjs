#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const cwd = process.cwd();
const docsDir = path.join(cwd, 'docs');
const outDir = path.join(cwd, 'src', 'generated');
const outFile = path.join(outDir, 'topCategories.json');

function humanize(s) {
    return s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function getTitleFromIndex(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const m = content.match(/title:\s*(?:"([^"]+)"|'([^']+)'|([^\n]+))/i);
        if (m) return (m[1] || m[2] || m[3]).trim();
    } catch (e) {
        // ignore
    }
    return null;
}

async function main() {
    const result = {};
    try {
        const products = await fs.readdir(docsDir, { withFileTypes: true });
        for (const p of products) {
            if (!p.isDirectory()) continue;
            const product = p.name;
            const productDir = path.join(docsDir, product);
            const entries = await fs.readdir(productDir, { withFileTypes: true });
            const categories = [];

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

            for (const e of entries) {
                if (e.isDirectory()) {
                    const catName = e.name;
                    const catDir = path.join(productDir, catName);

                    // Skip category if it doesn't contain any markdown files
                    const containsMd = await hasMarkdownFiles(catDir);
                    if (!containsMd) {
                        continue;
                    }

                    const idxPaths = [
                        path.join(productDir, catName, 'index.md'),
                        path.join(productDir, catName, 'index.mdx'),
                        path.join(productDir, catName, '_index.md'),
                        path.join(productDir, catName, '_index.mdx'),
                    ];
                    let label = null;
                    for (const ip of idxPaths) {
                        try {
                            const stat = await fs.stat(ip);
                            if (stat && stat.isFile()) {
                                label = await getTitleFromIndex(ip);
                                if (label) break;
                            }
                        } catch (err) {
                            // continue
                        }
                    }
                    if (!label) label = humanize(catName);
                    const href = `/docs/${product}/${catName}/`;
                    categories.push({ label, href });
                }
            }
            result[product] = categories;
        }
    } catch (err) {
        console.error('Error scanning docs:', err);
    }
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outFile, JSON.stringify(result, null, 2), 'utf8');
}

main();
