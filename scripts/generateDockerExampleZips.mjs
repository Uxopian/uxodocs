import { execFileSync, execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const gettingStartedDir = resolve(__dirname, "../docs/uxopian-ai/getting_started");

// Single source of truth for image versions
const { uxopianVersion, gatewayVersion, opensearchVersion, registry } = JSON.parse(
    readFileSync(resolve(__dirname, "./uxopian-ai-version.json"), "utf-8")
);

const ENV_CONTENT = `# Uxopian AI — generated at build time, do not edit manually
# To use a different registry, override REGISTRY below.

UXOPIAN_VERSION=${uxopianVersion}
# uxopian-gateway has not shipped a ${uxopianVersion} tag yet — pinned separately.
GATEWAY_VERSION=${gatewayVersion}
OPENSEARCH_VERSION=${opensearchVersion}
REGISTRY=${registry}

# LLM API keys — set at least one before starting
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
AZURE_OPENAI_API_KEY=
GEMINI_API_KEY=

# Gateway public URL (update if not running on localhost)
APP_BASE_URL=http://localhost:8085/uxopian-ai
`;

const ENV_CONTENT_ALFRESCO = `# Uxopian AI + Alfresco + ARender — generated at build time, do not edit manually

UXOPIAN_VERSION=${uxopianVersion}
# uxopian-gateway has not shipped a ${uxopianVersion} tag yet — pinned separately.
GATEWAY_VERSION=${gatewayVersion}
OPENSEARCH_VERSION=${opensearchVersion}
REGISTRY=${registry}

# Public URL of the gateway — must be reachable from the browser, and must be
# same-origin with Alfresco Share (the gateway is routed through Traefik on
# :8080 alongside Share; :8085 is not exposed to the browser). Default works
# when running on localhost. Adjust for remote deployments, keeping the same
# host:port Share is served from.
UXOPIAN_AI_PUBLIC_URL=http://localhost:8080/share/uxopian-ai

# Alfresco admin credentials — default works for this dev stack
ALFRESCO_ADMIN_USER=admin
ALFRESCO_ADMIN_PASSWORD=admin

# Alfresco default tenant ID
ALFRESCO_DEFAULT_TENANT_ID=Tenant-development

# LLM API keys — set at least one before starting
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
AZURE_OPENAI_API_KEY=
`;

const dockerZips = [
    {
        sourceDir: "docker_example",
        outputZip: "uxopian-ai_docker_example.zip",
        envContent: ENV_CONTENT,
    },
    {
        sourceDir: "docker_example_arender",
        outputZip: "uxopian-ai_docker_example_arender.zip",
        envContent: ENV_CONTENT,
    },
    {
        sourceDir: "docker_alfresco_arender",
        outputZip: "uxopian-ai_docker_alfresco_arender.zip",
        envContent: ENV_CONTENT_ALFRESCO,
    },
];

const howToDir = resolve(__dirname, "../docs/uxopian-ai/how_to");

const staticZips = [
    {
        sourceDir: resolve(howToDir, "flowerdocs_scope"),
        outputZip: resolve(howToDir, "uxopian-ai_flowerdocs_scope.zip"),
        label: "uxopian-ai_flowerdocs_scope.zip",
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

for (const { sourceDir, outputZip, envContent } of dockerZips) {
    const sourcePath = resolve(gettingStartedDir, sourceDir);
    const outputPath = resolve(gettingStartedDir, outputZip);
    const envPath = resolve(sourcePath, ".env");

    if (!existsSync(sourcePath)) {
        console.warn(`⚠️  Source directory not found, skipping: ${sourcePath}`);
        continue;
    }

    // Inject .env with current versions before zipping
    writeFileSync(envPath, envContent, "utf-8");

    try {
        execFileSync("python3", ["-c", pythonScript, sourcePath, outputPath]);
        console.log(`📦 Generated: ${outputZip} (uxopian=${uxopianVersion}, opensearch=${opensearchVersion})`);
    } finally {
        // Remove the generated .env so it is not committed to git
        unlinkSync(envPath);
    }
}

for (const { sourceDir, outputZip, label } of staticZips) {
    if (!existsSync(sourceDir)) {
        console.warn(`⚠️  Source directory not found, skipping: ${sourceDir}`);
        continue;
    }
    execFileSync("python3", ["-c", pythonScript, sourceDir, outputZip]);
    console.log(`📦 Generated: ${label}`);
}
