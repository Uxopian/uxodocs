import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const releaseNotesDir = path.join(__dirname, "../src/pages/release-note/uxopian-ai");
const outputFile = path.join(__dirname, "../src/generated/uxopianAiReleases.json");

function extractFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter = {};
    const lines = match[1].split("\n");

    lines.forEach((line) => {
        if (line.trim().startsWith("#") && !line.includes(":")) return;

        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            const commentIndex = value.indexOf("#");
            if (commentIndex > 0) {
                value = value.substring(0, commentIndex).trim();
            }

            value = value.replace(/^["'](.*)["']$/, "$1");

            if (value === "true") value = true;
            if (value === "false") value = false;

            frontmatter[key] = value;
        }
    });

    return frontmatter;
}

try {
    const files = fs.readdirSync(releaseNotesDir).filter((f) => f.endsWith(".md"));

    const releases = files.map((file) => {
        const content = fs.readFileSync(path.join(releaseNotesDir, file), "utf-8");
        const frontmatter = extractFrontmatter(content);

        return {
            version: frontmatter.version || "Unknown",
            majorVersion: frontmatter.major_version || "0",
            date: frontmatter.date || "",
            description: frontmatter.description || "",
            latest: frontmatter.latest || false,
            slug: file.replace(".md", ""),
        };
    });

    releases.sort((a, b) => {
        const versionA = a.version.split(/[.-]/).map((p) => (isNaN(p) ? p : Number(p)));
        const versionB = b.version.split(/[.-]/).map((p) => (isNaN(p) ? p : Number(p)));

        for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
            const pA = versionA[i] ?? "";
            const pB = versionB[i] ?? "";

            if (typeof pA === "number" && typeof pB === "number") {
                if (pA !== pB) return pB - pA;
            } else {
                const cmp = String(pB).localeCompare(String(pA));
                if (cmp !== 0) return cmp;
            }
        }
        return 0;
    });

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(releases, null, 2));

    console.log(`✅ Generated ${releases.length} Uxopian AI release notes → ${outputFile}`);
} catch (error) {
    console.error("❌ Error generating Uxopian AI releases:", error);
    process.exit(1);
}
