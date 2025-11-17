import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const releaseNotesDir = path.join(__dirname, '../src/pages/release-note/fast2');
const outputFile = path.join(__dirname, '../src/generated/fast2Releases.json');

function extractFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter = {};
    const lines = match[1].split('\n');

    lines.forEach(line => {
        // Skip comment lines
        if (line.trim().startsWith('#') && !line.includes(':')) return;

        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            // Remove inline comments (everything after #)
            const commentIndex = value.indexOf('#');
            if (commentIndex > 0) {
                value = value.substring(0, commentIndex).trim();
            }

            // Remove quotes
            value = value.replace(/^["'](.*)["']$/, '$1');

            // Parse booleans
            if (value === 'true') value = true;
            if (value === 'false') value = false;

            frontmatter[key] = value;
        }
    });

    return frontmatter;
}

try {
    const files = fs.readdirSync(releaseNotesDir).filter(f => f.endsWith('.md'));

    const releases = files.map(file => {
        const content = fs.readFileSync(path.join(releaseNotesDir, file), 'utf-8');
        const frontmatter = extractFrontmatter(content);

        return {
            version: frontmatter.version || 'Unknown',
            majorVersion: frontmatter.major_version || '0',
            date: frontmatter.date || '',
            description: frontmatter.description || '',
            latest: frontmatter.latest || false,
            slug: file.replace('.md', ''),
        };
    });

    // Sort by version descending
    releases.sort((a, b) => {
        const versionA = a.version.split('.').map(Number);
        const versionB = b.version.split('.').map(Number);

        for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
            const numA = versionA[i] || 0;
            const numB = versionB[i] || 0;
            if (numA !== numB) return numB - numA;
        }
        return 0;
    });

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    // Write JSON file
    fs.writeFileSync(outputFile, JSON.stringify(releases, null, 2));

    console.log(`✅ Generated ${releases.length} Fast2 release notes → ${outputFile}`);
} catch (error) {
    console.error('❌ Error generating Fast2 releases:', error);
    process.exit(1);
}
