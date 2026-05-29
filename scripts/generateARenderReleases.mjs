#!/usr/bin/env node

/**
 * ARender release notes data generation script
 * Reads release-notes.md files and generates a JSON with the metadata
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RELEASE_NOTES_DIR = join(__dirname, '../src/pages/release-note/arender');
const OUTPUT_FILE = join(__dirname, '../src/generated/arenderReleases.json');

function extractFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return null;

    const frontmatter = match[1];
    const lines = frontmatter.split('\n');
    const data = {};

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
            data[key] = value;
        }
    });

    return data;
}

function extractDescription(content) {
    // Remove the frontmatter
    const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

    // Find the first non-empty paragraph
    const lines = withoutFrontmatter.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith(':::')) {
            // Limit to 150 characters
            return trimmed.length > 150 ? trimmed.substring(0, 150) + '...' : trimmed;
        }
    }

    return '';
}

function parseVersion(versionString) {
    // v2023.15.0 → { year: 2023, major: 15, minor: 0 }
    const match = versionString.match(/v(\d+)\.(\d+)\.(\d+)/);
    if (!match) return null;

    return {
        year: parseInt(match[1]),
        major: parseInt(match[2]),
        minor: parseInt(match[3]),
    };
}

function compareVersions(a, b) {
    const vA = parseVersion(a.version);
    const vB = parseVersion(b.version);

    if (!vA || !vB) return 0;

    // Sort by year descending, then by major descending, then by minor descending
    if (vA.year !== vB.year) return vB.year - vA.year;
    if (vA.major !== vB.major) return vB.major - vA.major;
    return vB.minor - vA.minor;
}

function main() {
    console.log('🔍 Looking for ARender release notes...');

    if (!existsSync(RELEASE_NOTES_DIR)) {
        console.error(`❌ The directory ${RELEASE_NOTES_DIR} does not exist`);
        process.exit(1);
    }

    const versionDirs = readdirSync(RELEASE_NOTES_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log(`📁 Found ${versionDirs.length} version directories`);

    const releases = [];

    for (const versionDir of versionDirs) {
        const releaseNotesPath = join(RELEASE_NOTES_DIR, versionDir, 'release-notes.md');
        const upgradeNotesPath = join(RELEASE_NOTES_DIR, versionDir, 'upgrade-notes.md');

        if (!existsSync(releaseNotesPath)) {
            console.warn(`⚠️  No release-notes.md for ${versionDir}`);
            continue;
        }

        const content = readFileSync(releaseNotesPath, 'utf-8');
        const frontmatter = extractFrontmatter(content);

        if (!frontmatter) {
            console.warn(`⚠️  No frontmatter for ${versionDir}`);
            continue;
        }

        const release = {
            version: versionDir,
            title: frontmatter.title || `ARender ${versionDir}`,
            date: frontmatter.date || '',
            description: frontmatter.description || extractDescription(content),
            slug: `/release-note/arender/${versionDir}/release-notes`,
            hasUpgradeNotes: existsSync(upgradeNotesPath),
        };

        releases.push(release);
        console.log(`✅ ${versionDir} - ${release.title}`);
    }

    // Sort releases by version (descending)
    releases.sort(compareVersions);

    // Flag "latest": one version per year (v2023.x → latest ; v2026.x → latest ; etc.)
    // The list is sorted by year descending then major/minor descending, so the first
    // occurrence of each year is the most recent version for that year.
    const seenYears = new Set();
    for (const release of releases) {
        const parsed = parseVersion(release.version);
        if (parsed && !seenYears.has(parsed.year)) {
            release.latest = true;
            seenYears.add(parsed.year);
        }
    }

    // Write the JSON file
    const outputDir = dirname(OUTPUT_FILE);
    if (!existsSync(outputDir)) {
        console.log(`📁 Creating directory ${outputDir}`);
        mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(OUTPUT_FILE, JSON.stringify(releases, null, 2), 'utf-8');

    console.log(`\n✅ Generated ${releases.length} releases in ${OUTPUT_FILE}`);
    console.log(`📝 Versions: ${releases.map(r => r.version).join(', ')}`);
}

main();
