/**
 * Prebuild script for ARender documentation.
 *
 * Reads from a single source directory (docs/arender/) and generates two
 * filtered output trees:
 *   - .generated/arender-classic/  → Classic viewer (shared + classic + classic overrides)
 *   - .generated/arender-horizon/   → ARender Horizon (shared + horizon)
 *
 * Filtering rules:
 *   - Files with `viewer: classic` frontmatter → Classic only
 *   - Files with `viewer: horizon` frontmatter  → Horizon only
 *   - Files without `viewer:` frontmatter      → Both trees
 *   - `*.classic.md` files → Classic only (renamed to drop .classic suffix, overrides base file)
 *   - `*.horizon.md` files  → Horizon only (renamed to drop .horizon suffix, overrides base file)
 *   - Non-markdown files (_category_.json, images) → Both trees
 */

import { cpSync, rmSync, mkdirSync, existsSync, readFileSync, writeFileSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { resolve, dirname, join, relative, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const SOURCE = resolve(root, "docs/arender");
const OUT_CLASSIC = resolve(root, ".generated/arender-classic");
const OUT_HORIZON = resolve(root, ".generated/arender-horizon");

const MD_EXTENSIONS = new Set([".md", ".mdx"]);

/**
 * Extract the `viewer:` value from markdown frontmatter.
 * Returns "classic", "horizon", or null (shared).
 */
function getViewer(filePath) {
    const content = readFileSync(filePath, "utf8");
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) return null;
    const viewerMatch = fmMatch[1].match(/^viewer:\s*(classic|horizon)\s*\r?$/m);
    return viewerMatch ? viewerMatch[1] : null;
}

/**
 * Derive a URL path from the file's relative path in the output tree.
 * This matches how Docusaurus generates routes from directory structure.
 * e.g. "overview/index.md" → "/overview", "concepts/caching.md" → "/concepts/caching"
 */
function getRoutePath(relPath) {
    return "/" + relPath.replace(/\\/g, "/").replace(/\.mdx?$/, "").replace(/\/index$/, "").replace(/^index$/, "");
}

/**
 * Check if a file is a viewer-specific override (*.classic.md or *.horizon.md).
 */
function parseOverride(fileName) {
    const match = fileName.match(/^(.+)\.(classic|horizon)(\.mdx?$)/);
    if (match) return { base: match[1] + match[3], viewer: match[2] };
    return null;
}

/**
 * Recursively collect all files from a directory.
 */
function walkDir(dir, base = dir) {
    const results = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...walkDir(full, base));
        } else {
            results.push({ full, rel: relative(base, full) });
        }
    }
    return results;
}

function clean(dir) {
    if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
}

function copyTo(srcPath, destDir, relPath) {
    const dest = join(destDir, relPath);
    mkdirSync(dirname(dest), { recursive: true });
    const ext = extname(relPath);
    if (MD_EXTENSIONS.has(ext)) {
        // Normalize line endings to LF for markdown files.
        // On Windows, git checkout may produce CRLF locally (core.autocrlf),
        // which breaks Docusaurus heading anchor generation.
        const content = readFileSync(srcPath, "utf8").replace(/\r\n/g, "\n");
        writeFileSync(dest, content, "utf8");
    } else {
        copyFileSync(srcPath, dest);
    }
}

// --- Main ---

console.log("[arender-docs] Source: docs/arender/");

// Collect all files and build an override index
const allFiles = walkDir(SOURCE);
const overrideIndex = new Map(); // "installation/environment-variables.md" → Set{"classic"}

for (const { rel } of allFiles) {
    const override = parseOverride(basename(rel));
    if (override) {
        const baseRel = join(dirname(rel), override.base);
        if (!overrideIndex.has(baseRel)) overrideIndex.set(baseRel, new Set());
        overrideIndex.get(baseRel).add(override.viewer);
    }
}

// Build both trees and collect slugs for the viewer toggle manifest
const slugsByTree = { classic: [], horizon: [] };

for (const [target, outDir] of [["classic", OUT_CLASSIC], ["horizon", OUT_HORIZON]]) {
    console.log(`[arender-docs] Building ${target} tree → ${relative(root, outDir)}/`);
    clean(outDir);

    for (const { full, rel } of allFiles) {
        const ext = extname(rel);
        const fileName = basename(rel);
        const isMarkdown = MD_EXTENSIONS.has(ext);

        // 1. Handle override files (*.classic.md / *.horizon.md)
        const override = parseOverride(fileName);
        if (override) {
            if (override.viewer === target) {
                // Copy with renamed filename (drop .classic/.horizon suffix)
                const renamedRel = join(dirname(rel), override.base);
                copyTo(full, outDir, renamedRel);
                slugsByTree[target].push(getRoutePath(renamedRel));
            }
            // Skip overrides for the other viewer
            continue;
        }

        // 2. Handle regular markdown files
        if (isMarkdown) {
            // If this file has an override for the current target, skip it
            if (overrideIndex.has(rel) && overrideIndex.get(rel).has(target)) {
                continue;
            }

            // Check viewer frontmatter
            const viewer = getViewer(full);
            if (viewer && viewer !== target) continue; // Wrong viewer, skip

            // Shared or matching viewer → copy
            copyTo(full, outDir, rel);
            slugsByTree[target].push(getRoutePath(rel));
            continue;
        }

        // 3. Non-markdown files → copy to both trees
        copyTo(full, outDir, rel);
    }
}

// Write viewer toggle manifest for the ViewerToggle component
const manifestPath = resolve(root, "src/generated/arenderPages.json");
mkdirSync(dirname(manifestPath), { recursive: true });
writeFileSync(manifestPath, JSON.stringify(slugsByTree, null, 2));
console.log(`[arender-docs] Wrote viewer toggle manifest (${slugsByTree.classic.length} classic, ${slugsByTree.horizon.length} horizon slugs).`);

console.log("[arender-docs] Done.");
