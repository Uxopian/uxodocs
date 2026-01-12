"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOptions = exports.validateOptions = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
const he = require("he");
const isStringOrArrayOfStrings = utils_validation_1.Joi.alternatives().try(
    utils_validation_1.Joi.string(),
    utils_validation_1.Joi.array().items(utils_validation_1.Joi.string())
);
const defaultCoverPageFunction = (siteConfig, _pluginConfig, pageTitle, _version) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      
    </head>

      <body>
        <div style="margin: 2cm;">
          <h1 style="color:#005479;font-size:28px;font-family:sans-serif;font-weight:bold">${siteConfig.projectName}<h1>
          <h2 style="color:#005479;font-size:16px;font-family:sans-serif;">${pageTitle || siteConfig.tagline}<h2>

          <dl style="font-family:sans-serif;margin-top:10em;display: flex; flex-flow: row; flex-wrap: wrap; width: 600px; overflow: visible;color:#005479;font-size:12px;font-weight:normal;">
            <dt style="margin-top:1em;flex: 0 0 20%; text-overflow: ellipsis; overflow: hidden;">Author:</dt>    
            <dd style="margin-top:1em;flex:0 0 80%; margin-left: auto; text-align: left;text-overflow: ellipsis; overflow: hidden;">Your name</dd>
            <dt style="margin-top:1em;flex: 0 0 20%; text-overflow: ellipsis; overflow: hidden;">Date:</dt>
            <dd style="margin-top:1em;flex:0 0 80%; margin-left: auto; text-align: left;text-overflow: ellipsis; overflow: hidden;">${new Date().toISOString().substring(0, 10)}</dd>
          </dl>
        </div>
      </body>

    </html>
  `;
};
const defaultPageHeaderFunction = (_siteConfig, pluginConfig, pageTitle, _version) => {
    return `
    <div style="justify-content: center;align-items: center;height:2.5cm;display:flex;margin: 0 1.5cm;color: #005479;font-size:9px;font-family:sans-serif;width:100%;">
      <span style="flex-grow: 1; width: 50%; text-align:left;">${pluginConfig.author}</span>
      <span style="flex-grow: 1; width: 50%; text-align:right;">${pageTitle}</span>
    </div>
  `;
};
const defaultPageFooterFunction = (_siteConfig, pluginConfig, _pageTitle, _version) => {
    return `
    <div style="height:1cm;display:flex;margin: 0 1.5cm;color: #005479;font-size:9px;font-family:sans-serif;width:100%;">
      <span style="flex-grow: 1; width: 33%;">© ${pluginConfig.author}</span>
      <span style="flex-grow: 1; width: 33%; text-align:center;">${new Date().toISOString().substring(0, 10)}</span>
      <span style="flex-grow: 1; width: 33%; text-align:right;">Page <span class='pageNumber'></span> / <span class='totalPages'></span></span>
    </div>
  `;
};
const defaultPdfFileNameFunction = (
    _siteConfig,
    _pluginConfig,
    _pageTitle,
    pageId,
    _parentTitles,
    parentIds,
    _version,
    _versionPath
) => {
    let pdfFilename = he.decode(pageId);
    if (parentIds.length > 1) {
        pdfFilename =
            parentIds
                .slice(1)
                .filter((id) => id != "")
                .join("-") +
            "-" +
            pdfFilename;
    }
    return pdfFilename;
};
const marginsSchema = utils_validation_1.Joi.object({
    top: utils_validation_1.Joi.string().required(),
    right: utils_validation_1.Joi.string().required(),
    bottom: utils_validation_1.Joi.string().required(),
    left: utils_validation_1.Joi.string().required(),
});
const schema = utils_validation_1.Joi.object({
    addDownloadButton: utils_validation_1.Joi.boolean().default(true),
    autoBuildPdfs: utils_validation_1.Joi.boolean().default(true),
    downloadButtonText: utils_validation_1.Joi.string().default("Download as PDF"),
    ignoreDocs: isStringOrArrayOfStrings.default([]),
    stylesheets: isStringOrArrayOfStrings.default([]),
    alwaysIncludeSiteStyles: utils_validation_1.Joi.boolean().default(false),
    scripts: isStringOrArrayOfStrings.default([]),
    coverPageHeader: utils_validation_1.Joi.string().default("..."),
    coverPageFooter: utils_validation_1.Joi.string().default("..."),
    getPdfCoverPage: utils_validation_1.Joi.func().default(() => defaultCoverPageFunction),
    getPdfPageHeader: utils_validation_1.Joi.func().default(() => defaultPageHeaderFunction),
    getPdfPageFooter: utils_validation_1.Joi.func().default(() => defaultPageFooterFunction),
    margins: marginsSchema.default({
        top: "5cm",
        right: "2cm",
        bottom: "2.3cm",
        left: "2cm",
    }),
    coverMargins: marginsSchema.default({
        top: "10cm",
        right: "0",
        bottom: "3cm",
        left: "0",
    }),
    author: utils_validation_1.Joi.string().default("").allow(""),
    footerParser: utils_validation_1.Joi.object().instance(RegExp),
    keepDebugHtmls: utils_validation_1.Joi.boolean().default(false),
    puppeteerTimeout: utils_validation_1.Joi.number().default(300000),
    sidebarNames: isStringOrArrayOfStrings.default([]),
    versions: isStringOrArrayOfStrings.default([]),
    productVersion: utils_validation_1.Joi.string().default("").allow(""),
    subfolders: isStringOrArrayOfStrings.default([]),
    productTitles: isStringOrArrayOfStrings.default([]),
    useExtraPaths: utils_validation_1.Joi.array()
        .items(
            utils_validation_1.Joi.object({
                serverPath: utils_validation_1.Joi.string().required(),
                localPath: utils_validation_1.Joi.string().required(),
            })
        )
        .default([]),
    ignoreCssSelectors: isStringOrArrayOfStrings.default([]),
    jQueryUrl: utils_validation_1.Joi.string()
        .allow("")
        .default("https://code.jquery.com/jquery-3.6.0.min.js"),
    getPdfFileName: utils_validation_1.Joi.func().default(() => defaultPdfFileNameFunction),
    docPluginId: utils_validation_1.Joi.string().optional(),
});
function validateOptions({ options, validate }) {
    return validate(schema, options || {});
}
exports.validateOptions = validateOptions;
function processOptions(options) {
    const pluginOptions = Object.assign({}, options);
    if (!pluginOptions.footerParser) {
        pluginOptions.footerParser = RegExp(
            `© ${pluginOptions.author}\\d{4}-\\d{2}-\\d{2}Page \\d* \\/ \\d*`,
            "g"
        );
    }
    ensureArray(pluginOptions, "ignoreDocs");
    ensureArray(pluginOptions, "stylesheets");
    ensureArray(pluginOptions, "scripts");
    ensureArray(pluginOptions, "sidebarNames");
    ensureArray(pluginOptions, "subfolders");
    ensureArray(pluginOptions, "productTitles");
    ensureArray(pluginOptions, "ignoreCssSelectors");
    return pluginOptions;
}
exports.processOptions = processOptions;
function ensureArray(object, key) {
    if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
    }
}
