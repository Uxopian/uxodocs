import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const gettingStartedDir = resolve(__dirname, "../docs/uxopian-ai/getting_started");

const zips = [
    {
        sourceDir: "docker_example",
        outputZip: "uxopian-ai_docker_example.zip",
    },
    {
        sourceDir: "docker_example_arender",
        outputZip: "uxopian-ai_docker_example_arender.zip",
    },
];

const pythonScript = `
import zipfile, os, sys
source, output = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(source):
        for file in files:
            abs_path = os.path.join(root, file)
            zf.write(abs_path, os.path.relpath(abs_path, source))
`;

for (const { sourceDir, outputZip } of zips) {
    const sourcePath = resolve(gettingStartedDir, sourceDir);
    const outputPath = resolve(gettingStartedDir, outputZip);

    if (!existsSync(sourcePath)) {
        console.warn(`⚠️  Source directory not found, skipping: ${sourcePath}`);
        continue;
    }

    execFileSync("python3", ["-c", pythonScript, sourcePath, outputPath]);
    console.log(`📦 Generated: ${outputZip}`);
}
