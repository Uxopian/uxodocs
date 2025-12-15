/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface PluginOptions {
    addDownloadButton?: boolean;
    autoBuildPdfs?: boolean;
    downloadButtonText?: string;
    ignoreDocs?: string[];
    stylesheets?: string[];
    alwaysIncludeSiteStyles?: boolean;
    scripts?: string[];
    coverPageHeader?: string;
    coverPageFooter?: string;
    getPdfCoverPage?: PageFunction;
    getPdfPageHeader?: PageFunction;
    getPdfPageFooter?: PageFunction;
    margins?: Margins;
    coverMargins?: Margins;
    author?: string;
    footerParser?: RegExp;
    keepDebugHtmls?: boolean;
    puppeteerTimeout?: number;
    sidebarNames?: string[];
    versions?: string[];
    productVersion?: string;
    subfolders?: string[];
    productTitles?: string[];
    useExtraPaths?: UsePath[];
    ignoreCssSelectors?: string[];
    jQueryUrl?: string;
    getPdfFileName?: FileNameFunction;
}
export declare type PapersaurusPluginOptions = Required<PluginOptions>;
export declare type PageFunction = (siteConfig: any, pluginConfig: PapersaurusPluginOptions, pageTitle: string, version: string) => string;
export declare type FileNameFunction = (siteConfig: any, pluginConfig: PapersaurusPluginOptions, pageTitle: string, pageId: string, parentTitles: string[], parentIds: string[], version: string, versionPath: string) => string;
export declare type UsePath = {
    serverPath: string;
    localPath: string;
};
export declare type TocInfo = {
    link: string;
    href: string;
    text: string;
};
export declare type Margins = {
    top: string;
    right: string;
    bottom: string;
    left: string;
};
