"use strict";
/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
            if (k2 === undefined) k2 = k;
            Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                    return m[k];
                },
            });
        }
        : function (o, m, k, k2) {
            if (k2 === undefined) k2 = k;
            o[k2] = m[k];
        });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
        }
        : function (o, v) {
            o["default"] = v;
        });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdfFiles = void 0;
const puppeteer = require("puppeteer");
const pdfMerge = require("easy-pdf-merge");
const { PDFParse } = require("pdf-parse");
const join = require("path").join;
const express = require("express");
const fs = __importStar(require("fs-extra"));
const GithubSlugger = require("github-slugger");
const cheerio = require("cheerio");
let slugger = new GithubSlugger();
const pluginLogPrefix = "[papersaurus] ";
/**
 * Generate table of contents from HTML content using cheerio
 * Replacement for html-toc module
 */
function generateToc(html, options) {
    const $ = cheerio.load(html);
    const headings = $(options.selectors);
    if (headings.length < options.minLength) {
        return html;
    }
    let tocHtml = '<nav class="nav sidenav">';
    if (options.header) {
        tocHtml += options.header;
    }
    tocHtml += '<ol class="nav">';
    headings.each((index, element) => {
        const $el = $(element);
        const text = $el.text();
        const tagName = element.tagName.toLowerCase();
        const level = parseInt(tagName.substring(1));
        // Generate or use existing ID
        let id = $el.attr('id');
        if (!id && options.addId) {
            id = slugger.slug(text);
            $el.attr('id', id);
        }
        if (id) {
            // Add anchor before heading if anchorTemplate is provided
            if (options.anchorTemplate) {
                const anchor = options.anchorTemplate(`#${id}`);
                $el.before(anchor);
            }
            // Add to TOC
            const className = `nav-item nav-level-${level}`;
            tocHtml += `<li class="${className}"><a href="#${id}">${text}</a></li>`;
        }
    });
    tocHtml += '</ol></nav>';
    // Insert TOC at the beginning
    const tocDiv = $('#toc');
    if (tocDiv.length > 0) {
        tocDiv.replaceWith(tocHtml);
    }
    return $.html();
}
async function generatePdfFiles(outDir, pluginOptions, { siteConfig, plugins }) {
    console.log(`${pluginLogPrefix}Execute generatePdfFiles...`);
    if (!plugins) {
        throw new Error(`${pluginLogPrefix}No docs plugin found.`);
    }
    const docsPlugins = plugins.filter((item) => item.name === "docusaurus-plugin-content-docs");
    let docPlugin;
    if (pluginOptions.docPluginId) {
        docPlugin = docsPlugins.find((p) => p.options.id === pluginOptions.docPluginId);
    } else {
        if (docsPlugins.length > 1) {
            console.log(
                `${pluginLogPrefix}Multiple docs plugins found but no docPluginId specified. Using the first one.`
            );
        }
        docPlugin = docsPlugins[0];
    }

    if (!docPlugin) {
        throw new Error(
            `${pluginLogPrefix}Doc plugin not found. Available plugins: ${docsPlugins.map((p) => p.options.id).join(", ")}`
        );
    }
    // Check if docusaurus build directory exists
    const docusaurusBuildDir = outDir;
    if (
        !fs.existsSync(docusaurusBuildDir) ||
        !fs.existsSync(join(docusaurusBuildDir, "index.html")) ||
        !fs.existsSync(join(docusaurusBuildDir, "404.html"))
    ) {
        throw new Error(
            `${pluginLogPrefix}Could not find a valid docusaurus build directory at "${docusaurusBuildDir}". ` +
            'Did you run "docusaurus build" before?'
        );
    }
    // Check pdf build directory and clean if requested
    const pdfPath = "pdfs";
    const pdfBuildDir = join(docusaurusBuildDir, pdfPath);
    fs.ensureDirSync(pdfBuildDir);
    console.log(`${pluginLogPrefix}Clean pdf build folder '${pdfBuildDir}'`);
    fs.emptyDirSync(pdfBuildDir);
    // Start local webserver and host files in docusaurus build folder
    const app = express();
    const httpServer = await app.listen();
    const address = httpServer.address();
    if (!address || !isAddressInfo(address)) {
        httpServer.close();
        throw new Error(
            `${pluginLogPrefix}Something went wrong spinning up the express webserver.`
        );
    }
    app.use(siteConfig.baseUrl, express.static(docusaurusBuildDir));
    for (const extraUsePath of pluginOptions.useExtraPaths) {
        let localPath = extraUsePath.localPath;
        if (localPath == "..") {
            localPath = join(docusaurusBuildDir, localPath);
        }
        app.use(extraUsePath.serverPath, express.static(localPath));
    }
    const siteAddress = `http://127.0.0.1:${address.port}${siteConfig.baseUrl}`;
    console.log(`${pluginLogPrefix}Server started at ${siteAddress}`);
    // Start a puppeteer browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"],
    });
    const linkToFile = {};
    // Loop through all found versions
    for (const versionInfo of docPlugin.content.loadedVersions) {
        if (
            pluginOptions.versions.length != 0 &&
            !pluginOptions.versions.includes(versionInfo.versionName)
        ) {
            // Skip this version as it was not specified in versions option.
            continue;
        }
        console.log(`${pluginLogPrefix}Processing version '${versionInfo.label}'`);
        if (pluginOptions.sidebarNames.length == 0) {
            // No sidebar specified, use all of them.
            let allSidebarNames = [];
            for (const name in versionInfo.sidebars) {
                allSidebarNames.push(name);
            }
            pluginOptions.sidebarNames = allSidebarNames;
        }
        // Loop through all configured sidebar names
        for (const [i, sidebarName] of pluginOptions.sidebarNames.entries()) {
            slugger = new GithubSlugger();
            let folderName = "";
            let productTitle = "";
            if (pluginOptions.productTitles && pluginOptions.productTitles.length > i) {
                productTitle = pluginOptions.productTitles[i];
            }
            if (pluginOptions.subfolders && pluginOptions.subfolders.length > i) {
                folderName = pluginOptions.subfolders[i];
            }
            // Create build folder for that version
            let versionPath = getVersionPath(versionInfo, siteConfig);
            const versionPdfPath = [pdfPath, versionPath, folderName]
                .filter((str) => str != "")
                .join("/");
            const versionBuildDir = join(pdfBuildDir, versionPath, folderName);
            fs.ensureDirSync(versionBuildDir);
            console.log(
                `${pluginLogPrefix}Start processing sidebar named '${sidebarName}' in version '${versionInfo.label}'`
            );
            let sidebar = versionInfo.sidebars[sidebarName];
            if (sidebar) {
                let projectName = siteConfig.projectName;
                if (!projectName) {
                    console.log(
                        `${pluginLogPrefix}Docusaurus projectName not set, using placeholder...`
                    );
                    projectName = "Unnamed project";
                }
                // Create a fake category with root of sidebar
                const rootCategory = {
                    type: "category",
                    label: projectName,
                    unversionedId: projectName,
                    items: sidebar,
                    collapsed: true,
                    collapsible: true,
                };
                // Browse through all documents of this sidebar
                pickHtmlArticlesRecursive(
                    rootCategory,
                    [],
                    versionInfo,
                    `${siteAddress}docs/`,
                    docusaurusBuildDir,
                    siteConfig
                );
                let productVersion = "";
                if (docPlugin.content.loadedVersions.length === 1) {
                    productVersion = pluginOptions.productVersion;
                }
                // Create all PDF files for this sidebar
                await createPdfFilesRecursive(
                    rootCategory,
                    [],
                    [],
                    versionInfo,
                    pluginOptions,
                    siteConfig,
                    versionBuildDir,
                    versionPdfPath,
                    browser,
                    siteAddress,
                    productTitle,
                    productVersion
                );
                // Save url to filename mappings
                saveUrlToFileMappingsRecursive(rootCategory.items, linkToFile, [
                    {
                        label: rootCategory.label,
                        file: rootCategory.pdfFilename,
                        type: "root",
                    },
                ]);
            } else {
                console.log(
                    `${pluginLogPrefix}Sidebar '${sidebarName}' doesn't exist in version '${versionInfo.label}', continue without it...`
                );
            }
        }
    }
    fs.writeFileSync(join(docusaurusBuildDir, "pdfs.json"), JSON.stringify(linkToFile));
    browser.close();
    httpServer.close();
    console.log(`${pluginLogPrefix}generatePdfFiles finished!`);
}
exports.generatePdfFiles = generatePdfFiles;
function stripTrailingSlash(str) {
    return str.endsWith("/") ? str.slice(0, -1) : str;
}
function saveUrlToFileMappingsRecursive(sideBarItems, output, parents = []) {
    for (const item of sideBarItems) {
        if (item.permalink) {
            output[stripTrailingSlash(item.permalink)] = [
                ...parents,
                {
                    label: item.label,
                    file: item.pdfFilename,
                    type: "chapter",
                },
            ];
        }
        if (item.items) {
            saveUrlToFileMappingsRecursive(item.items, output, [
                ...parents,
                {
                    label: item.label,
                    file: item.pdfFilename,
                    type: "section",
                },
            ]);
        }
    }
}
function pickHtmlArticlesRecursive(
    sideBarItem,
    parentTitles,
    version,
    rootDocUrl,
    htmlDir,
    siteConfig
) {
    switch (sideBarItem.type) {
        case "category": {
            const hasDocLink = sideBarItem.link && sideBarItem.link.type == "doc";
            if (hasDocLink) {
                let path = htmlDir;
                for (const doc of version.docs) {
                    if (doc.id == sideBarItem.link.id) {
                        sideBarItem.id = doc.id;
                        if (doc.unversionedId) {
                            sideBarItem.unversionedId = doc.unversionedId.split("/").pop();
                        } else {
                            sideBarItem.unversionedId = doc.id;
                        }
                        sideBarItem.permalink = doc.permalink;
                        path = join(path, getPermaLink(doc, siteConfig));
                        break;
                    }
                }
                readHtmlForItem(sideBarItem, parentTitles, rootDocUrl, path, version, siteConfig);
            } else {
                sideBarItem.unversionedId = sideBarItem.label || "untitled";
            }
            const newParentTitles = [...parentTitles];
            newParentTitles.push(sideBarItem.label);
            for (const categorySubItem of sideBarItem.items) {
                pickHtmlArticlesRecursive(
                    categorySubItem,
                    newParentTitles,
                    version,
                    rootDocUrl,
                    htmlDir,
                    siteConfig
                );
                if (!hasDocLink && !sideBarItem.stylePath) {
                    sideBarItem.stylePath = categorySubItem.stylePath;
                    sideBarItem.scriptPath = categorySubItem.scriptPath;
                }
            }
            break;
        }
        case "doc": {
            // Merge properties we need that is specified on the document.
            let path = htmlDir;
            for (const doc of version.docs) {
                if (doc.id == sideBarItem.id || doc.unversionedId == sideBarItem.id) {
                    sideBarItem.label = doc.title;
                    if (doc.unversionedId) {
                        sideBarItem.unversionedId = doc.unversionedId.split("/").pop();
                    } else {
                        sideBarItem.unversionedId = sideBarItem.id;
                    }
                    sideBarItem.permalink = doc.permalink;
                    path = join(path, getPermaLink(doc, siteConfig));
                    break;
                }
            }
            readHtmlForItem(sideBarItem, parentTitles, rootDocUrl, path, version, siteConfig);
            break;
        }
        default:
            break;
    }
}
async function createPdfFilesRecursive(
    sideBarItem,
    parentTitles,
    parentIds,
    version,
    pluginOptions,
    siteConfig,
    buildDir,
    pdfPath,
    browser,
    siteAddress,
    productTitle,
    productVersion
) {
    let articles = [];
    switch (sideBarItem.type) {
        case "category": {
            if (sideBarItem.permalink) {
                articles.push(sideBarItem);
            }
            const newParentTitles = [...parentTitles];
            newParentTitles.push(sideBarItem.label);
            const newParentIds = [...parentIds];
            newParentIds.push(sideBarItem.unversionedId);
            for (const categorySubItem of sideBarItem.items) {
                const subDocs = await createPdfFilesRecursive(
                    categorySubItem,
                    newParentTitles,
                    newParentIds,
                    version,
                    pluginOptions,
                    siteConfig,
                    buildDir,
                    pdfPath,
                    browser,
                    siteAddress,
                    productTitle,
                    productVersion
                );
                articles.push(...subDocs);
            }
            break;
        }
        case "doc": {
            articles.push(sideBarItem);
            break;
        }
        default:
            break;
    }
    let pdfFilename = pluginOptions.getPdfFileName(
        siteConfig,
        pluginOptions,
        sideBarItem.label,
        sideBarItem.unversionedId,
        parentTitles,
        parentIds,
        version.versionName,
        version.path
    );
    pdfFilename = slugger.slug(pdfFilename);
    let documentTitle = sideBarItem.label || "";
    if (parentTitles.length > 1) {
        documentTitle = parentTitles.slice(1).join(" / ") + " / " + documentTitle;
    }
    if (productTitle) {
        documentTitle = productTitle + " / " + documentTitle;
    }
    if (articles.length > 0 && parentTitles.length === 0) {
        const cacheDir = join(process.cwd(), "node_modules/.cache/docusaurus-pdf");
        fs.ensureDirSync(cacheDir);
        const cachedPdfPath = join(cacheDir, `${pdfFilename}.pdf`);
        let hasChanges = true;

        try {
            const statusPath = join(process.cwd(), "pdf-build-status.json");
            if (fs.existsSync(statusPath)) {
                const status = JSON.parse(fs.readFileSync(statusPath, "utf8"));
                hasChanges = status.hasChanges;
            }
        } catch (e) {
            console.log(`${pluginLogPrefix}Could not read build status, forcing rebuild.`);
        }

        if (!hasChanges && fs.existsSync(cachedPdfPath)) {
            console.log(
                `${pluginLogPrefix}No content changes detected. Using cached PDF for ${pdfFilename}.`
            );
            fs.copyFileSync(cachedPdfPath, `${buildDir}/${pdfFilename}.pdf`);
            // buildDir passed to this function is .../pdfs/docs/productName/
            // pdfPath passed is docs/productName/

            // Re-evaluating paths:
            // The file expected is `${buildDir}/${pdfFilename}.pdf` (based on line 352 logic relative to buildDir)
            // But createPdfFromArticles takes buildDir and joins it.
            // So we should copy to join(buildDir, `${pdfFilename}.pdf`)

            fs.copyFileSync(cachedPdfPath, join(buildDir, `${pdfFilename}.pdf`));
        } else {
            await createPdfFromArticles(
                documentTitle,
                productVersion || version.label,
                pdfFilename,
                articles,
                pluginOptions,
                siteConfig,
                buildDir,
                browser,
                siteAddress
            );
            // Cache the result
            const generatedPdf = join(buildDir, `${pdfFilename}.pdf`);
            if (fs.existsSync(generatedPdf)) {
                fs.copyFileSync(generatedPdf, cachedPdfPath);
                console.log(`${pluginLogPrefix}Cached PDF to ${cachedPdfPath}`);
            }
        }

        sideBarItem.pdfFilename = `${pdfPath}/${pdfFilename}.pdf`;
    }
    return articles;
}
function readHtmlForItem(item, parentTitles, rootDocUrl, htmlDir, version, siteConfig) {
    let htmlFilePath = htmlDir;
    // Patched file resolution logic
    if (!fs.existsSync(htmlFilePath) || fs.statSync(htmlFilePath).isDirectory()) {
        let indexHtml = join(htmlFilePath, "index.html");
        if (fs.existsSync(indexHtml)) {
            htmlFilePath = indexHtml;
        } else {
            let pathNoSlash = htmlFilePath.replace(/\/+$/, "");
            if (fs.existsSync(pathNoSlash + ".html")) {
                htmlFilePath = pathNoSlash + ".html";
            } else {
                htmlFilePath = indexHtml;
            }
        }
    }
    let stylePath = "";
    let scriptPath = "";
    let html = "";
    console.log(`${pluginLogPrefix}Reading file ${htmlFilePath}`);
    let htmlFileContent = fs.readFileSync(htmlFilePath, { encoding: "utf8" });
    const origin = new URL(rootDocUrl).origin;
    stylePath = getStylesheetPathFromHTML(htmlFileContent, origin);
    try {
        scriptPath = getScriptPathFromHTML(htmlFileContent, origin);
    } catch (_a) { }
    const articleMatch = htmlFileContent.match(/<article>.*<\/article>/s);
    if (articleMatch) {
        html = articleMatch[0];
        const markDownDivPos = html.indexOf('<div class=\"theme-doc-markdown markdown\">');
        const footerPos = html.indexOf("<footer ");
        if (markDownDivPos > 0 && footerPos > markDownDivPos) {
            html = html.substring(markDownDivPos, footerPos);
        }
    }
    html = html.replace(/loading="lazy"/g, 'loading="eager"');
    // Search for title in h1 tag
    let titleMatch = html.match(/<h1 class=".*">.*<\/h1>/s);
    if (!titleMatch) {
        titleMatch = html.match(/<h1>.*<\/h1>/s);
    }
    if (titleMatch) {
        const h1Tag = titleMatch[0];
        // Save found title in item
        item.pageTitle = h1Tag.substring(h1Tag.indexOf(">") + 1, h1Tag.indexOf("</h1>"));
        // Add parent titles in front of existing title in h1 tag
        let newTitle = item.pageTitle;
        if (parentTitles.length > 1) {
            newTitle = parentTitles.slice(1).join(" / ") + " / " + item.pageTitle;
        }
        const newH1Tag =
            h1Tag.substring(0, h1Tag.indexOf(">") + 1) +
            newTitle +
            h1Tag.substring(h1Tag.indexOf("</h1>"));
        html = html.replace(h1Tag, newH1Tag);
    }
    html = getHtmlWithAbsoluteLinks(html, version, siteConfig);
    item.articleHtml = html;
    item.scriptPath = scriptPath;
    item.stylePath = stylePath;
    item.parentTitles = parentTitles;
    return;
}
async function createPdfFromArticles(
    documentTitle,
    documentVersion,
    pdfName,
    articleList,
    pluginOptions,
    siteConfig,
    buildDir,
    browser,
    siteAddress
) {
    console.log(`${pluginLogPrefix}Creating PDF ${buildDir}\\${pdfName}.pdf...`);
    const titlePdfFile = join(buildDir, `${pdfName}.title.pdf`);
    const contentRawPdfFile = join(buildDir, `${pdfName}.content.raw.pdf`);
    const contentHtmlFile = join(buildDir, `${pdfName}.content.html`);
    const contentPdfFile = join(buildDir, `${pdfName}.content.pdf`);
    const finalPdfFile = join(buildDir, `${pdfName}.pdf`);
    const coverPage = await browser.newPage();
    await coverPage.setContent(
        pluginOptions.getPdfCoverPage(siteConfig, pluginOptions, documentTitle, documentVersion),
        {
            timeout: pluginOptions.puppeteerTimeout,
        }
    );
    await coverPage.pdf({
        format: "a4",
        path: titlePdfFile,
        headerTemplate: pluginOptions.coverPageHeader,
        footerTemplate: pluginOptions.coverPageFooter,
        displayHeaderFooter: true,
        printBackground: true,
        margin: pluginOptions.coverMargins,
        timeout: pluginOptions.puppeteerTimeout,
    });
    await coverPage.close();
    const page = await browser.newPage();
    let stylePath = articleList[0].stylePath;
    let scriptPath = articleList[0].scriptPath;
    let fullHtml = "";
    for (const article of articleList) {
        if (
            articleList.length > 1 &&
            pluginOptions.ignoreDocs.includes(article.unversionedId || "-IdIsEmpty-")
        ) {
            // Don't add ignored articles to PDF's with multiple articles (section pdf's, complete document pdf)
            continue;
        }
        fullHtml += article.articleHtml || "";
    }
    // Remove header tags (around h1)
    fullHtml = fullHtml.replace(/<header>/g, "");
    fullHtml = fullHtml.replace(/<header\/>/g, "");
    // Hide hashlinks (replace visible hash with space)
    fullHtml = fullHtml.replace(/">#<\/a>/g, `"> </a>`);
    const $ = cheerio.load(fullHtml);
    if (pluginOptions.ignoreCssSelectors) {
        for (const ignoreSelector of pluginOptions.ignoreCssSelectors) {
            $(ignoreSelector).remove();
        }
    }
    $(".theme-doc-breadcrumbs").remove();
    $(".theme-doc-version-badge").remove();
    $(".theme-doc-toc-mobile").remove();
    $(".buttonGroup__atx").remove();
    fullHtml = $.html();
    // Add table of contents using custom generateToc function (replacement for html-toc)
    fullHtml = generateToc('<div id="toc"></div>' + fullHtml, {
        anchorTemplate: function (id) {
            return `<a class="toc-target" href="${id}" id="${id}"></a>`;
        },
        selectors: "h1,h2,h3",
        parentLink: false,
        header: '<h1 class="ignoreCounter">Contents</h1>',
        minLength: 0,
        addId: false, //=default
    });
    // Extract TOC HTML from the generated content
    const tocMatch = fullHtml.match(/<nav class="nav sidenav">([\s\S]*?)<\/nav>/);
    let htmlToc = tocMatch ? tocMatch[0] : "";
    htmlToc = htmlToc.replace(/class="nav sidenav"/g, 'class="toc-headings"');
    htmlToc = htmlToc.replace(/class="nav"/g, 'class="toc-headings"');
    htmlToc = htmlToc.replace(/[\r\n]+/g, "");
    // Extract content after TOC (remove the nav element from fullHtml)
    const htmlArticles = fullHtml.replace(/<nav class="nav sidenav">[\s\S]*?<\/nav>/, "");
    const tocLinks = htmlToc.match(/<a href="#[^<>]+">[^<>]+<\/a>/g);
    let tocLinksInfos =
        tocLinks === null || tocLinks === void 0
            ? void 0
            : tocLinks.map((link) => {
                const entry = {
                    link: link,
                    href: link.substring(link.indexOf('href="') + 6, link.indexOf('">')),
                    text: link.substring(link.indexOf('">') + 2, link.indexOf("</a>")),
                };
                return entry;
            });
    tocLinksInfos = tocLinksInfos || [];
    for (const tocLinkInfo of tocLinksInfos) {
        htmlToc = htmlToc.replace(
            tocLinkInfo.link,
            `<a href="${tocLinkInfo.href}"><span>${tocLinkInfo.text}</span><span class="dotLeader"></span><span class="pageNumber">_</span></a>`
        );
    }
    let htmlStyles = `<style>
  h1 {
    page-break-before: always;
  }

  .toc-headings a {
    width: 100%;
    display: flex;
  }

  .dotLeader {
    flex-grow: 1;
    margin: 0 0.2cm;
    border-bottom: 2px dotted;
    margin-bottom: 6px;
  }
  .theme-code-block, .theme-admonition {
    break-inside: avoid;
  }
  </style>`;
    const hasCustomStyles = pluginOptions.stylesheets && pluginOptions.stylesheets.length > 0;
    if (hasCustomStyles) {
        for (const stylesheet of pluginOptions.stylesheets) {
            htmlStyles = `${htmlStyles}<link rel="stylesheet" href="${stylesheet}">`;
        }
    }
    if (!hasCustomStyles || pluginOptions.alwaysIncludeSiteStyles) {
        if (stylePath) {
            htmlStyles = `${htmlStyles}<link rel="stylesheet" href="${stylePath}">`;
        }
    }
    let htmlScripts = "";
    if (pluginOptions.scripts && pluginOptions.scripts.length > 0) {
        for (const script of pluginOptions.scripts) {
            htmlScripts = `${htmlScripts}<script src="${script}"></script>`;
        }
    } else {
        if (scriptPath) {
            htmlScripts = `${htmlScripts}<script src="${scriptPath}"></script>`;
        }
    }
    let htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="generator" content="Papersaurus">
      ${htmlStyles}
      ${htmlScripts}
    </head>
    <body>
      ${htmlToc}${htmlArticles}
    </body>
  </html>`;
    await generateContentPdf(contentRawPdfFile);
    const dataBuffer = fs.readFileSync(contentRawPdfFile);
    const pdfParser = new PDFParse({ data: dataBuffer });
    const parsedData = await pdfParser.getText();
    await pdfParser.destroy();
    htmlContent = getPageWithFixedToc(
        pluginOptions.footerParser,
        tocLinksInfos,
        parsedData.text,
        htmlContent
    );
    await generateContentPdf(contentPdfFile);
    htmlContent = await page.content();
    fs.writeFileSync(contentHtmlFile, htmlContent);
    await page.close();
    await mergeMultiplePDF([titlePdfFile, contentPdfFile], finalPdfFile);
    fs.unlinkSync(titlePdfFile);
    fs.unlinkSync(contentRawPdfFile);
    fs.unlinkSync(contentPdfFile);
    if (!pluginOptions.keepDebugHtmls) {
        fs.unlinkSync(contentHtmlFile);
    }
    async function generateContentPdf(targetFile) {
        await page.goto(siteAddress, { timeout: pluginOptions.puppeteerTimeout });
        await page.setContent(htmlContent, {
            timeout: pluginOptions.puppeteerTimeout,
        });
        await page.pdf({
            path: targetFile,
            format: "a4",
            headerTemplate: pluginOptions.getPdfPageHeader(
                siteConfig,
                pluginOptions,
                documentTitle,
                documentVersion
            ),
            footerTemplate: pluginOptions.getPdfPageFooter(
                siteConfig,
                pluginOptions,
                documentTitle,
                documentVersion
            ),
            displayHeaderFooter: true,
            printBackground: true,
            scale: 1,
            margin: pluginOptions.margins,
            timeout: pluginOptions.puppeteerTimeout,
        });
    }
}
const mergeMultiplePDF = (pdfFiles, name) => {
    return new Promise((resolve, reject) => {
        pdfMerge(pdfFiles, name, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve("");
        });
    });
};
const escapeHeaderRegex = (header) => {
    return (
        header
            // escape all regex reserved characters
            .replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")
            // replace white-spaces to allow line breaks
            .replace(/\s/g, "(\\s|\\s\\n)")
    );
};
const pdfHeaderRegex = [
    (h1) => new RegExp(`^\\d+\\s{2}${escapeHeaderRegex(h1)}(\\s|\\s\\n)?$`, "gm"),
    (h2) => new RegExp(`^\\d+\\.\\d+\\s{2}${escapeHeaderRegex(h2)}(\\s|\\s\\n)?$`, "gm"),
    (h3) => new RegExp(`^\\d+\\.\\d+.\\d+\\s{2}${escapeHeaderRegex(h3)}(\\s|\\s\\n)?$`, "gm"),
    (unnumbered) => new RegExp(`^${escapeHeaderRegex(unnumbered)}$`, "gm"),
];
const getHtmlWithAbsoluteLinks = (html, version, siteConfig) => {
    let versionPath = "";
    if (!version.isLast) {
        versionPath = `${getVersionPath(version, siteConfig)}/`;
    }
    return html.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g, function (matched, _p1, p2) {
        if (p2.indexOf("http") === 0) {
            // ignore already external links
            return matched;
        }
        if (p2.indexOf("#") === 0) {
            // ignore anchor links. because we don't know in which file
            // they are. Plus they will allways work (but can have multiple targets when merging)
            return matched;
        }
        if (p2.indexOf(".") === 0) {
            // this is some kind of a manually created link.
            return matched;
        }
        if (p2.indexOf(siteConfig.baseUrl) === 0) {
            return matched.replace(p2, `${siteConfig.url}${p2}`);
        }
        return matched.replace(
            p2,
            `${siteConfig.url}${siteConfig.baseUrl}docs/${versionPath}${p2}`
        );
    });
};
const getVersionPath = (version, siteConfig) => {
    let versionPath = version.path;
    return versionPath.substring(siteConfig.baseUrl.length, versionPath.length);
};
const getPermaLink = (doc, siteConfig) => {
    let link = doc.permalink;
    return link.substring(siteConfig.baseUrl.length, link.length);
};
const decodeHtml = (str) => {
    // Taken from here: https://stackoverflow.com/a/39243641
    const htmlEntities = {
        nbsp: " ",
        cent: "¢",
        pound: "£",
        yen: "¥",
        euro: "€",
        copy: "©",
        reg: "®",
        lt: "<",
        gt: ">",
        quot: '"',
        amp: "&",
        apos: "'",
    };
    return (
        str
            .replace(/\&([^;]+);/g, function (entity, entityCode) {
                var match;
                if (entityCode in htmlEntities) {
                    return htmlEntities[entityCode];
                    /*eslint no-cond-assign: 0*/
                } else if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
                    return String.fromCharCode(parseInt(match[1], 16));
                    /*eslint no-cond-assign: 0*/
                } else if ((match = entityCode.match(/^#(\d+)$/))) {
                    return String.fromCharCode(~~match[1]);
                } else {
                    return entity;
                }
            })
            // taken from here: https://stackoverflow.com/a/11305926
            .replace(/[\u200B-\u200D\uFEFF]/g, "")
    );
};
const getPageWithFixedToc = (footerRegEx, tocList, pdfContent, htmlContent) => {
    const pdfPages = pdfContent.split(footerRegEx);
    if (!pdfPages.length) {
        return htmlContent;
    }
    let pageIndex = 0;
    tocList.forEach((e) => {
        for (; pageIndex < pdfPages.length; pageIndex++) {
            let page = pdfPages[pageIndex];
            let found = false;
            for (let i = 0; i < pdfHeaderRegex.length; ++i) {
                if (pdfHeaderRegex[i](decodeHtml(e.text)).test(page)) {
                    htmlContent = htmlContent.replace(
                        '<span class="pageNumber">_</span>',
                        `<span class="pageNumber">${pageIndex}</span>`
                    );
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
    });
    return htmlContent;
};
const getURL = (origin, filePath) => {
    return origin + "/" + filePath.substring(filePath.startsWith("/") ? 1 : 0);
};
const getStylesheetPathFromHTML = (html, origin) => {
    const regExp = /(?:|<link[^<>]*){1}href="([^<>]*styles[^<>]*?\.css){1}"/g;
    let filePath = "";
    try {
        filePath = getFirstCapturingGroup(regExp, html);
    } catch (_a) {
        throw new Error("The href attribute of the 'styles*.css' file could not be found!");
    }
    return getURL(origin, filePath);
};
const getScriptPathFromHTML = (html, origin) => {
    const regExp = /(?:|<script[^<>]*){1}src="([^<>]*styles[^<>]*?\.js){1}"/g;
    let filePath = "";
    try {
        filePath = getFirstCapturingGroup(regExp, html);
    } catch (_a) {
        throw new Error("The src attribute of the 'styles*.js' file could not be found!");
    }
    return getURL(origin, filePath);
};
const getFirstCapturingGroup = (regExp, text) => {
    const match = regExp.exec(text);
    if (match && match[1]) {
        return match[1];
    } else {
        throw new ReferenceError("No capture group found in the provided text.");
    }
};
function isObject(x) {
    return x !== null && typeof x === "object";
}
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
const isAddressInfo = (arg) => {
    return (
        isObject(arg) &&
        hasOwnProperty(arg, "address") &&
        typeof arg.address == "string" &&
        hasOwnProperty(arg, "family") &&
        typeof arg.family == "string" &&
        hasOwnProperty(arg, "port") &&
        typeof arg.port == "number"
    );
};
