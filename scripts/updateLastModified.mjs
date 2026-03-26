#!/usr/bin/env node
/**
 * Script to update last_update dates in markdown files only when content changes.
 * 
 * This script:
 * 1. Scans all .md and .mdx files in the docs folder
 * 2. Calculates a hash of the content (excluding front matter metadata)
 * 3. Compares with the stored content_hash
 * 4. If different: updates last_update.date and content_hash
 * 5. If same: leaves the file unchanged
 * 
 * Run this script before each build in your CI/CD pipeline.
 */

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const cwd = process.cwd();
const docsDir = path.join(cwd, 'docs');

const UPDATE_AUTHOR = 'CI/CD Bot';

/**
 * Parse front matter from markdown content
 * Returns { frontMatter: string, content: string, data: object }
 */
function parseFrontMatter(fileContent) {
    const fmRegex = /^---\n([\s\S]*?)\n---\n?/;
    const match = fileContent.match(fmRegex);

    if (!match) {
        return {
            frontMatter: null,
            content: fileContent,
            data: {}
        };
    }

    const frontMatterStr = match[1];
    const content = fileContent.slice(match[0].length);

    const data = {};
    const lines = frontMatterStr.split('\n');
    let currentKey = null;
    let currentIndent = 0;
    let nestedObj = null;

    for (const line of lines) {
        const indent = line.search(/\S/);
        if (indent === -1) continue;

        const trimmed = line.trim();

        if (indent > 0 && currentKey && nestedObj !== null) {
            const nestedMatch = trimmed.match(/^(\w+):\s*(.*)$/);
            if (nestedMatch) {
                let value = nestedMatch[2].trim();
                if ((value.startsWith("'") && value.endsWith("'")) ||
                    (value.startsWith('"') && value.endsWith('"'))) {
                    value = value.slice(1, -1);
                }
                nestedObj[nestedMatch[1]] = value;
            }
            continue;
        }

        const topMatch = trimmed.match(/^(\w+[-\w]*):\s*(.*)$/);
        if (topMatch) {
            const key = topMatch[1];
            let value = topMatch[2].trim();

            if (value === '' || value === null) {
                currentKey = key;
                nestedObj = {};
                data[key] = nestedObj;
                currentIndent = indent;
            } else {
                if ((value.startsWith("'") && value.endsWith("'")) ||
                    (value.startsWith('"') && value.endsWith('"'))) {
                    value = value.slice(1, -1);
                }
                data[key] = value;
                currentKey = null;
                nestedObj = null;
            }
        }
    }

    return {
        frontMatter: frontMatterStr,
        content,
        data
    };
}

/**
 * Calculate SHA-256 hash of content (excluding front matter metadata fields we manage)
 */
function calculateContentHash(fileContent) {
    const { content, data } = parseFrontMatter(fileContent);

    const stableFrontMatter = { ...data };
    delete stableFrontMatter.last_update;
    delete stableFrontMatter.content_hash;

    const toHash = JSON.stringify(stableFrontMatter) + '\n---\n' + content;

    return crypto.createHash('sha256').update(toHash, 'utf8').digest('hex');
}

/**
 * Update or add front matter fields in the file content
 */
function updateFrontMatter(fileContent, newHash, newDate) {
    const fmRegex = /^---\n([\s\S]*?)\n---\n?/;
    const match = fileContent.match(fmRegex);

    if (!match) {
        const frontMatter = `---
last_update:
  date: '${newDate}'
  author: ${UPDATE_AUTHOR}
content_hash: ${newHash}
---

`;
        return frontMatter + fileContent;
    }

    let frontMatterStr = match[1];
    const restOfFile = fileContent.slice(match[0].length);

    if (/^content_hash:/m.test(frontMatterStr)) {
        frontMatterStr = frontMatterStr.replace(
            /^content_hash:.*$/m,
            `content_hash: ${newHash}`
        );
    } else {
        frontMatterStr += `\ncontent_hash: ${newHash}`;
    }

    const lastUpdateRegex = /last_update:\n(\s+date:.*\n)?(\s+author:.*\n?)?/;
    const newLastUpdate = `last_update:\n  date: '${newDate}'\n  author: ${UPDATE_AUTHOR}\n`;

    if (lastUpdateRegex.test(frontMatterStr)) {
        frontMatterStr = frontMatterStr.replace(lastUpdateRegex, newLastUpdate);
    } else {
        const lines = frontMatterStr.split('\n');
        let insertIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('title:')) {
                insertIndex = i + 1;
                while (insertIndex < lines.length && lines[insertIndex].startsWith('  ')) {
                    insertIndex++;
                }
                break;
            }
        }
        lines.splice(insertIndex, 0, `last_update:\n  date: '${newDate}'\n  author: ${UPDATE_AUTHOR}`);
        frontMatterStr = lines.join('\n');
    }

    frontMatterStr = frontMatterStr.replace(/\n{3,}/g, '\n\n').trim();

    return `---\n${frontMatterStr}\n---\n${restOfFile}`;
}

/**
 * Get all markdown files recursively
 */
async function getMarkdownFiles(dir) {
    const files = [];

    async function scan(currentDir) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                await scan(fullPath);
            } else if (entry.isFile() && /\.mdx?$/.test(entry.name)) {
                files.push(fullPath);
            }
        }
    }

    await scan(dir);
    return files;
}

/**
 * Main function
 */
async function main() {
    console.log('🔍 Scanning for markdown files...');

    const files = await getMarkdownFiles(docsDir);
    console.log(`📄 Found ${files.length} markdown files`);

    let updatedCount = 0;
    let unchangedCount = 0;
    let newCount = 0;

    const now = new Date().toISOString();

    for (const filePath of files) {
        const relativePath = path.relative(cwd, filePath);

        try {
            const content = await fs.readFile(filePath, 'utf8');
            const { data } = parseFrontMatter(content);

            const newHash = calculateContentHash(content);
            const existingHash = data.content_hash;

            if (!existingHash) {
                console.log(`✨ NEW: ${relativePath}`);
                const updatedContent = updateFrontMatter(content, newHash, now);
                await fs.writeFile(filePath, updatedContent, 'utf8');
                newCount++;
            } else if (existingHash !== newHash) {
                console.log(`📝 UPDATED: ${relativePath}`);
                const updatedContent = updateFrontMatter(content, newHash, now);
                await fs.writeFile(filePath, updatedContent, 'utf8');
                updatedCount++;
            } else {
                unchangedCount++;
            }
        } catch (err) {
            console.error(`❌ Error processing ${relativePath}:`, err.message);
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   ✨ New files: ${newCount}`);
    console.log(`   📝 Updated: ${updatedCount}`);
    console.log(`   ✅ Unchanged: ${unchangedCount}`);
    console.log(`   📄 Total: ${files.length}`);

    const hasChanges = newCount > 0 || updatedCount > 0;
    try {
        await fs.writeFile('pdf-build-status.json', JSON.stringify({ hasChanges }), 'utf8');
    } catch (e) {
        console.error('Failed to write pdf-build-status.json', e);
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
