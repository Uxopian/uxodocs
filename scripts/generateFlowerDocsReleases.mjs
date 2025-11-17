import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RELEASE_NOTES_DIR = path.join(__dirname, '../src/pages/release-note/flowerdocs');
const OUTPUT_FILE = path.join(__dirname, '../src/generated/flowerDocsReleases.json');

function extractFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return null;

    const frontmatter = {};
    const lines = match[1].split('\n');

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) return;

        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Remove quotes if present
        value = value.replace(/^["']|["']$/g, '');

        // Remove inline comments (everything after #)
        const commentIndex = value.indexOf('#');
        if (commentIndex !== -1) {
            value = value.substring(0, commentIndex).trim();
        }

        frontmatter[key] = value;
    });

    return frontmatter;
}

function generateReleases() {
    const releases = [];

    // Read all version directories
    const versionDirs = fs.readdirSync(RELEASE_NOTES_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    versionDirs.forEach(versionDir => {
        const indexPath = path.join(RELEASE_NOTES_DIR, versionDir, '_index.md');

        if (!fs.existsSync(indexPath)) {
            console.log(`⚠️  No _index.md found for ${versionDir}`);
            return;
        }

        const content = fs.readFileSync(indexPath, 'utf-8');
        const frontmatter = extractFrontmatter(content);

        if (!frontmatter || !frontmatter.title) {
            console.log(`⚠️  No valid frontmatter in ${versionDir}/_index.md`);
            return;
        }

        const version = frontmatter.title;
        const releaseDate = frontmatter.ReleaseDate || '';

        // Convert date from DD/MM/YYYY to YYYY-MM-DD
        let formattedDate = '';
        if (releaseDate) {
            const dateParts = releaseDate.split('/');
            if (dateParts.length === 3) {
                formattedDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
            }
        }

        // Determine major version (2 or 2025)
        const majorVersion = version.startsWith('2025') ? '2025' : '2';

        // Check if there's an upgrade-notes.md file
        const upgradeNotesPath = path.join(RELEASE_NOTES_DIR, versionDir, 'upgrade-notes.md');
        const hasUpgradeNotes = fs.existsSync(upgradeNotesPath);

        // Generate description from release-notes.md if available
        let description = '';
        const releaseNotesPath = path.join(RELEASE_NOTES_DIR, versionDir, 'release-notes.md');
        if (fs.existsSync(releaseNotesPath)) {
            const releaseContent = fs.readFileSync(releaseNotesPath, 'utf-8');
            // Extract first paragraph after "# Overview" or similar
            const overviewMatch = releaseContent.match(/# Overview\s+([\s\S]*?)(?=\n#|$)/);
            if (overviewMatch) {
                description = overviewMatch[1].trim().split('\n')[0].substring(0, 200);
            }
        }

        releases.push({
            version,
            majorVersion,
            date: formattedDate,
            description: description || `Release notes for FlowerDocs ${version}`,
            hasUpgradeNotes,
            slug: versionDir,
            latest: false
        });
    });

    // Sort by date descending
    releases.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Mark the latest version
    if (releases.length > 0) {
        releases[0].latest = true;
    }

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(releases, null, 2));

    console.log(`✅ Generated ${releases.length} FlowerDocs release notes`);
    console.log(`📄 Output: ${OUTPUT_FILE}`);
}

generateReleases();
