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

async function getCategoryInfo(catDir, catName) {
    const categoryJsonPath = path.join(catDir, '_category_.json');
    try {
        const content = await fs.readFile(categoryJsonPath, 'utf8');
        const data = JSON.parse(content);
        return {
            label: data.label || null,
            position: data.position || 999
        };
    } catch (e) {
        // ignore
    }
    return { label: null, position: 999 };
}

async function findFirstMarkdownFile(dir, product, catName) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        // First, look for index files (preferred)
        const indexFiles = ['index.md', 'index.mdx', '_index.md', '_index.mdx'];
        for (const indexFile of indexFiles) {
            const indexPath = path.join(dir, indexFile);
            try {
                const stat = await fs.stat(indexPath);
                if (stat && stat.isFile()) {
                    // For index files, return the directory path with trailing slash
                    return `/docs/${product}/${catName}/`;
                }
            } catch (e) {
                // continue
            }
        }

        // If no index file, find the first .md or .mdx file
        for (const entry of entries) {
            if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
                const filePath = path.join(dir, entry.name);
                return filePath.replace(/.*\/docs\//, '/docs/').replace(/\.(mdx?)$/, '');
            }
        }

        // If no files, search subdirectories
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const subPath = path.join(dir, entry.name);
                const found = await findFirstMarkdownFile(subPath, product, catName);
                if (found) return found;
            }
        }
    } catch (err) {
        // ignore
    }

    // Fallback to category path
    return `/docs/${product}/${catName}/`;
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

async function getPositionFromIndex(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const m = content.match(/sidebar_position:\s*(\d+)/i);
        if (m) return parseInt(m[1], 10);
    } catch (e) {
        // ignore
    }
    return 999; // Default position for items without sidebar_position
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
                    // First try to get info from _category_.json
                    const catInfo = await getCategoryInfo(catDir, catName);
                    let label = catInfo.label;
                    let position = catInfo.position;

                    // If no label from _category_.json, try index files
                    if (!label) {
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
                    }

                    // If position wasn't found in _category_.json, check index files
                    if (position === 999) {
                        for (const ip of idxPaths) {
                            try {
                                const stat = await fs.stat(ip);
                                if (stat && stat.isFile()) {
                                    const pos = await getPositionFromIndex(ip);
                                    if (pos !== 999) {
                                        position = pos;
                                        break;
                                    }
                                }
                            } catch (err) {
                                // continue
                            }
                        }
                    }
                    if (!label) label = humanize(catName);
                    const href = await findFirstMarkdownFile(catDir, product, catName);
                    categories.push({ label, href, position });
                }
            }
            // Sort categories by position
            categories.sort((a, b) => a.position - b.position);
            // Remove position from final output
            result[product] = categories.map(({ label, href }) => ({ label, href }));
        }
    } catch (err) {
        console.error('Error scanning docs:', err);
    }
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outFile, JSON.stringify(result, null, 2), 'utf8');
}

main();
