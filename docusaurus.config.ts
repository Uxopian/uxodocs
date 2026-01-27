import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

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

    url: "https://uxopian.github.io",
    baseUrl: "/uxodocs/",

    organizationName: "uxopian",
    projectName: "uxodocs",
    deploymentBranch: "gh-pages",

    trailingSlash: false,

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
                id: "flowerdocs",
                path: "docs/flowerdocs",
                routeBasePath: "docs/flowerdocs",
                sidebarPath: require.resolve("./sidebars_flowerdocs.ts"),
                lastVersion: "current",
                versions: { current: { label: "v2.8.0" } },
                showLastUpdateTime: true,
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
                sidebarNames: ["docs"],
                ignoreDocs: ["index"],
                author: "Uxopian",
                productTitles: ["FlowerDocs"],
                getPdfFileName: getPdfFileName,
            },
        ],
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                indexDocs: true,
                indexPages: true,
                hashed: true,
                docsRouteBasePath: [
                    "docs/flowerdocs",
                ],
                ignoreFiles: [],
                removeDefaultStopWordFilter: true,
                explicitSearchResultPath: true,
                highlightSearchTermsOnTargetPage: true,
            },
        ],
    ],

    themeConfig: {
        colorMode: {
            defaultMode: "dark",
            respectPrefersColorScheme: false,
        },
        navbar: {
            logo: { alt: "UXO", src: "img/uxopian-o.png" },
            items: [
                {
                    type: "docsVersionDropdown",
                    docsPluginId: "flowerdocs",
                    position: "left",
                    className: "verdd verdd--flowerdocs",
                },
                {
                    label: "Release Notes",
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
