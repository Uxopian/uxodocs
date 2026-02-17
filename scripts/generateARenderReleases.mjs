#!/usr/bin/env node

/**
 * Script de génération des données de release notes ARender
 * Lit les fichiers release-notes.md et génère un JSON avec les métadonnées
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
    // Retirer le frontmatter
    const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

    // Chercher le premier paragraphe non vide
    const lines = withoutFrontmatter.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith(':::')) {
            // Limiter à 150 caractères
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

    // Trier par année décroissante, puis par major décroissant, puis par minor décroissant
    if (vA.year !== vB.year) return vB.year - vA.year;
    if (vA.major !== vB.major) return vB.major - vA.major;
    return vB.minor - vA.minor;
}

function main() {
    console.log('🔍 Recherche des release notes ARender...');

    if (!existsSync(RELEASE_NOTES_DIR)) {
        console.error(`❌ Le répertoire ${RELEASE_NOTES_DIR} n'existe pas`);
        process.exit(1);
    }

    const versionDirs = readdirSync(RELEASE_NOTES_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log(`📁 Trouvé ${versionDirs.length} dossiers de version`);

    const releases = [];

    for (const versionDir of versionDirs) {
        const releaseNotesPath = join(RELEASE_NOTES_DIR, versionDir, 'release-notes.md');
        const upgradeNotesPath = join(RELEASE_NOTES_DIR, versionDir, 'upgrade-notes.md');

        if (!existsSync(releaseNotesPath)) {
            console.warn(`⚠️  Pas de release-notes.md pour ${versionDir}`);
            continue;
        }

        const content = readFileSync(releaseNotesPath, 'utf-8');
        const frontmatter = extractFrontmatter(content);

        if (!frontmatter) {
            console.warn(`⚠️  Pas de frontmatter pour ${versionDir}`);
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

    // Trier les releases par version (décroissant)
    releases.sort(compareVersions);

    // Ajouter le flag "latest" à la première version
    if (releases.length > 0) {
        releases[0].latest = true;
    }

    // Écrire le fichier JSON
    const outputDir = dirname(OUTPUT_FILE);
    if (!existsSync(outputDir)) {
        console.log(`📁 Création du répertoire ${outputDir}`);
        mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(OUTPUT_FILE, JSON.stringify(releases, null, 2), 'utf-8');

    console.log(`\n✅ Généré ${releases.length} releases dans ${OUTPUT_FILE}`);
    console.log(`📝 Versions : ${releases.map(r => r.version).join(', ')}`);
}

main();
