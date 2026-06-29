import * as fs from "fs";
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkVariables from "./scripts/remark-variables.mjs";

// Update these when releasing a new version. They are injected into all
// markdown files at build time via the remarkVariables script,
// replacing {{version}} placeholders.
const arenderVersion = "2026.0.0";

// Suppress the "unmaintained" banner only on the LTS — the highest snapshot
// major strictly below `current`. We allow at most two maintained majors in
// parallel: `current` (auto, no banner) + LTS. Older majors fall back to the
// default banner. The function is also gated on snapshot presence so the
// Docusaurus loop doesn't crash referencing a version whose directory
// hasn't been created yet (it's built one-by-one in CI).
//
// Zero maintenance: shipping v2023.20.0 → CI snapshots it → next build
// auto-promotes it as LTS. Shipping v2027 (bump arenderVersion + add the
// arender-v2026.X.Y branch) → v2026 auto-promoted as LTS, v2023 demoted to
// the default "unmaintained" banner (EOL).
function arenderVersionOverrides(): Record<string, { banner?: "none" }> {
    const versionedDir = "arender_versioned_docs";
    if (!fs.existsSync(versionedDir)) return {};

    const currentMajor = parseInt(arenderVersion.split(".")[0], 10);

    const byMajor: Record<number, { name: string; minor: number; patch: number }[]> = {};
    for (const entry of fs.readdirSync(versionedDir)) {
        const m = entry.match(/^version-v(\d+)\.(\d+)\.(\d+)$/);
        if (!m) continue;
        const major = parseInt(m[1], 10);
        if (major >= currentMajor) continue;
        (byMajor[major] ||= []).push({
            name: entry.replace(/^version-/, ""),
            minor: parseInt(m[2], 10),
            patch: parseInt(m[3], 10),
        });
    }

    const legacyMajors = Object.keys(byMajor).map(Number).sort((a, b) => b - a);
    if (legacyMajors.length === 0) return {};

    const ltsMajor = legacyMajors[0];
    const list = byMajor[ltsMajor].sort((a, b) => b.minor - a.minor || b.patch - a.patch);
    return { [list[0].name]: { banner: "none" } };
}

const flowerDocsVersion = "2026.0.0";
const flowerDocsArenderVersion = "2026.0.1";
const flowerDocsOSVersion = "3.6.0";
const flowerDocsRedisVersion = "8.8";
const flowerDocsJavaVersion = "25";
const flowerDocsCompanionVersion = "2026.0.0";
const flowerDocsPlumeVersion ="2026.0.0";

const getPdfFileName = (
    siteConfig: any,
    pluginConfig: any,
    pageTitle: string,
    pageId: string,
    parentTitles: string[],
    parentIds: string[],
    version: string,
    versionPath: string
) => {
    if (pageId === siteConfig.projectName) {
        return `${pluginConfig.docPluginId}-${version}`;
    }
    return pageId;
};

const config: Config = {
    title: "UXO Docs",
    tagline: "Product Documentation",
    favicon: "img/uxopian-o.png",

    url: process.env.SITE_URL || "https://staging.doc.uxopian.com/",
    baseUrl: "/",

    organizationName: "uxopian",
    projectName: "uxodocs",
    deploymentBranch: "staging",

    trailingSlash: true,

    onBrokenLinks: "warn",
    markdown: {
        hooks: { onBrokenMarkdownLinks: "warn", onBrokenMarkdownImages: "warn" },
        mermaid: true,
    },

    themes: ["@docusaurus/theme-mermaid"],

    presets: [
        [
            "classic",
            {
                docs: false,
                theme: { customCss: "./src/css/custom.css" },
            } satisfies Preset.Options,
        ],
    ],

	customFields: {
	    flowerDocsCompanionVersion, flowerDocsPlumeVersion,
	},

    plugins: [
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "default",
                path: "docs_default",
                routeBasePath: "docs-default",
                showLastUpdateTime: true,
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "arender",
                path: ".generated/arender-classic",
                routeBasePath: "docs/arender",
                numberPrefixParser: false,
                sidebarPath: require.resolve("./sidebars_arender.ts"),
                lastVersion: "current",
                versions: {
                    current: { label: `v${arenderVersion}` },
                    ...arenderVersionOverrides(),
                },
                showLastUpdateTime: true,
                remarkPlugins: [[remarkVariables, { variables: { version: arenderVersion } }]],
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "arender-horizon",
                path: ".generated/arender-horizon",
                routeBasePath: "docs/arender-horizon",
                numberPrefixParser: false,
                sidebarPath: require.resolve("./sidebars_arender_horizon.ts"),
                lastVersion: "current",
                versions: { current: { label: `v${arenderVersion}` } },
                showLastUpdateTime: true,
                remarkPlugins: [[remarkVariables, { variables: { version: arenderVersion } }]],
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "fast2",
                path: "docs/fast2",
                routeBasePath: "docs/fast2",
                sidebarPath: require.resolve("./sidebars_fast2.ts"),
                lastVersion: "current",
                versions: { current: { label: "v2025.9.0" } },
                showLastUpdateTime: true,
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
			{
                id: "flowerdocs",
                path: "docs/flowerdocs",
                routeBasePath: "docs/flowerdocs",
                sidebarPath: require.resolve("./sidebars_flowerdocs.ts"),
                lastVersion: "current",
                versions: { current: { label: `v${flowerDocsVersion}` } },
                showLastUpdateTime: true,
                remarkPlugins: [[remarkVariables, { variables: { version: flowerDocsVersion, arenderVersion: flowerDocsArenderVersion, osVersion: flowerDocsOSVersion, redisVersion: flowerDocsRedisVersion, javaVersion: flowerDocsJavaVersion } }]],
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "uxopian-ai",
                path: "docs/uxopian-ai",
                routeBasePath: "docs/uxopian-ai",
                sidebarPath: require.resolve("./sidebars_uxopian_ai.ts"),
                lastVersion: "current",
                versions: { current: { label: "v2026.0.0" } },
                showLastUpdateTime: true,
            },
        ],
        [
            require.resolve("./plugins/docusaurus-plugin-papersaurus/lib/index.js"),
            {
                id: "arender-pdf",
                docPluginId: "arender",
                autoBuildPdfs: false,
                addDownloadButton: false,
                keepDebugHtmls: false,
                sidebarNames: ["docs"],
                ignoreDocs: ["index"],
                author: "Uxopian",
                productTitles: ["ARender"],
                getPdfFileName: getPdfFileName,
            },
        ],
        [
            require.resolve("./plugins/docusaurus-plugin-papersaurus/lib/index.js"),
            {
                id: "fast2-pdf",
                docPluginId: "fast2",
                autoBuildPdfs: false,
                addDownloadButton: false,
                keepDebugHtmls: false,
                sidebarNames: ["fast2"],
                ignoreDocs: ["index"],
                author: "Uxopian",
                productTitles: ["Fast2"],
                getPdfFileName: getPdfFileName,
            },
        ],
        [
            require.resolve("./plugins/docusaurus-plugin-papersaurus/lib/index.js"),
            {
                id: "flowerdocs-pdf",
                docPluginId: "flowerdocs",
                autoBuildPdfs: false,
                addDownloadButton: false,
                keepDebugHtmls: false,
                sidebarNames: ["flowerdocs"],
                ignoreDocs: ["index"],
                author: "Uxopian",
                productTitles: ["FlowerDocs"],
                getPdfFileName: getPdfFileName,
            },
        ],
        [
            require.resolve("./plugins/docusaurus-plugin-papersaurus/lib/index.js"),
            {
                id: "uxopian-ai-pdf",
                docPluginId: "uxopian-ai",
                autoBuildPdfs: false,
                addDownloadButton: false,
                keepDebugHtmls: false,
                sidebarNames: ["uxopian_ai"],
                ignoreDocs: ["index"],
                author: "Uxopian",
                productTitles: ["Uxopian AI"],
                getPdfFileName: getPdfFileName,
            },
        ],
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                indexDocs: true,
                indexPages: true,
                hashed: true,
                docsRouteBasePath: ["docs/arender"],
                ignoreFiles: [],
                removeDefaultStopWordFilter: true,
                explicitSearchResultPath: true,
                highlightSearchTermsOnTargetPage: true,
            },
        ],
        require.resolve("docusaurus-plugin-image-zoom"),
    ],

    themeConfig: {
        zoom: {
            selector: ".markdown img",
            background: {
                light: "rgba(245, 246, 248, 0.95)",
                dark: "rgba(10, 10, 12, 0.95)",
            },
            config: { margin: 24 },
        },
        colorMode: {
            defaultMode: "dark",
            respectPrefersColorScheme: false,
        },
        navbar: {
            logo: { alt: "UXO", src: "img/uxopian-o.png" },
            items: [
                {
                    type: "docsVersionDropdown",
                    docsPluginId: "arender",
                    position: "left",
                    className: "verdd verdd--arender",
                },

                {
                    html: '<span></span>',
                    to: "/releases",
                    position: "right",
                    className: "verdd verdd--releases nav-release-notes",
                },
                {
                    label: "Github",
                    href: "https://github.com/uxopian/uxodocs",
                    position: "right",
                    className: "nav-github",
                },
                {
                    type: "docsVersionDropdown",
                    docsPluginId: "fast2",
                    position: "left",
                    className: "verdd verdd--fast2",
                },
                {
                    type: "docsVersionDropdown",
                    docsPluginId: "flowerdocs",
                    position: "left",
                    className: "verdd verdd--flowerdocs",
                },
                {
                    type: "docsVersionDropdown",
                    docsPluginId: "uxopian-ai",
                    position: "left",
                    className: "verdd verdd--uxopian-ai",
                },
                { type: "search", position: "right" },
            ],
        },

        footer: {
            style: "dark",
            links: [
                {
                    title: "Company",
                    items: [
                        {
                            label: "About Uxopian",
                            href: "https://uxopian.com",
                        },
                        {
                            label: "Privacy Policy",
                            to: "/privacy-policy",
                        },
                    ],
                },
                {
                    title: "Follow Us",
                    items: [
                        {
                            label: "LinkedIn",
                            href: "https://www.linkedin.com/company/uxopiansoftware/posts/?feedView=all",
                        },
                        {
                            label: "YouTube",
                            href: "https://www.youtube.com/@Uxopian",
                        },
                    ],
                },
            ],
            copyright: `© ${new Date().getFullYear()} Uxopian Software. All rights reserved.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ["java", "bash", "json", "ini"],
        },
    } satisfies Preset.ThemeConfig,

    stylesheets: [
        {
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
            type: "text/css",
            crossorigin: "anonymous",
        },
    ],
};

export default config;
