"use strict";
/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const generate_1 = require("./generate");
const validateOptions_1 = require("./validateOptions");
const import_fresh_1 = __importDefault(require("import-fresh"));
const fs = __importStar(require("fs"));
function loadConfig(configPath) {
    if (!fs.existsSync(configPath)) {
        throw new Error(`Config file "${configPath}" not found`);
    }
    const loadedConfig = (0, import_fresh_1.default)(configPath);
    return loadedConfig;
}
function default_1(_context, options) {
    let pluginOptions = (0, validateOptions_1.processOptions)(options);
    return {
        name: 'docusaurus-plugin-papersaurus',
        injectHtmlTags() {
            var _a;
            if (!pluginOptions.addDownloadButton) {
                return {};
            }
            const CWD = process.cwd();
            const siteConfig = loadConfig(`${CWD}/docusaurus.config.js`);
            return {
                headTags: [`
        ${(pluginOptions.jQueryUrl ? "<script src='" + pluginOptions.jQueryUrl + "'></script>" : "")}
        <script>
          var pdfData = {};

          const getBaseUrl = function (href) {
            return '${siteConfig.baseUrl}${((_a = siteConfig.baseUrl) === null || _a === void 0 ? void 0 : _a.endsWith("/")) ? "" : "/"}';
          };
          
          const getDownloadItems = function () {
          
            const stripTrailingSlash = (str) => {
              return str.endsWith('/') ?
                str.slice(0, -1) : str;
            };
          
            var downloadItems = [];
            var activePdfData = pdfData[stripTrailingSlash(document.location.pathname)] || [];
          
            for (var i = 0, il = activePdfData.length; i < il; i++) {
              if (activePdfData[i].type === 'root') {
          
                downloadItems.push({
                  title: 'Download complete version: <br/> <strong style=font-size:16px>' + activePdfData[i].label + '</strong>',
                  path: getBaseUrl() + activePdfData[i].file
                });
                continue;
              }
          
              if (activePdfData[i].type === 'section') {
                downloadItems.push({
                  title: 'Download section: <br/> <strong style=font-size:16px>' + activePdfData[i].label + '</strong>',
                  path: getBaseUrl() + activePdfData[i].file
                });
                continue;
              }
          
              if (activePdfData[i].type === 'chapter') {
                downloadItems.push({
                  title: 'Download page: <br/> <strong style=font-size:16px>' + activePdfData[i].label + '</strong>',
                  path: getBaseUrl() + activePdfData[i].file
                });
              }
            }
          
            return downloadItems;
          };
          
          const fillDownloadDropdownMenu = function () {
            $('#pdfDownloadMenuList').empty();
          
            const downloadItems = getDownloadItems();
          
            var printPopupContent = '';
            downloadItems.forEach(function (downloadItem) {
              printPopupContent += '<li>';
              printPopupContent += '<a class="dropdown__link" href="' + downloadItem.path + '" download>' + downloadItem.title + '</a>';
              printPopupContent += '</li>';
            });
            if (printPopupContent.length === 0) {
              printPopupContent = '<li>No PDF downloads on this page</li>';
            }
          
            $("#pdfDownloadMenuList").append(printPopupContent);
          };
          
          const fillDownloadSidebarMenu = function () {
            $('#pdfLinkSidebarMenu').empty();
          
            const downloadItems = getDownloadItems();
          
            var printMenuContent = '';
            downloadItems.forEach(function (downloadItem) {
              printMenuContent += '<li class="menu__list-item">';
              printMenuContent += '<a class="menu__link" href="' + downloadItem.path + '" download>' + downloadItem.title + '</a>';
              printMenuContent += '</li>';
            });
            if (printMenuContent.length === 0) {
              printMenuContent = '<li>No PDF downloads on this page</li>';
            }
            $('#pdfLinkSidebarMenu').append(printMenuContent);
          };
          
          const checkAndInsertPdfButtons = function () {
            if (!$("html").hasClass("plugin-docs")) {
              return;
            }
            if (!$("#pdfLink").length) {
              var pdfDownloadButton = $('' +
                '<div class="navbar__item dropdown dropdown--hoverable dropdown--right" id="pdfDownloadMenu">' +
                '  <a class="navbar__item navbar__link pdfLink" id="pdfLink" href="#">${pluginOptions.downloadButtonText}</a>' +
                '  <ul class="dropdown__menu" id="pdfDownloadMenuList"></ul>' +
                '</div>');
              $(".navbar__items--right").prepend(pdfDownloadButton);
          
              $("#pdfDownloadMenu").mouseenter(fillDownloadDropdownMenu);
            }
          
            if (!$("#pdfLinkSidebar").length) {
              var pdfDownoadButtonSidebar = $('<li class="menu__list-item menu__list-item--collapsed" id="pdfLinkSidebar"><a role="button" class="menu__link menu__link--sublist">${pluginOptions.downloadButtonText}</a><ul class="menu__list" id="pdfLinkSidebarMenu" style=""></ul></li>');
              $('.navbar-sidebar__items > .menu > .menu__list').append(pdfDownoadButtonSidebar);
              $('#pdfLinkSidebar').click(function () {
                $('#pdfLinkSidebar').toggleClass('menu__list-item--collapsed');
              });
              $('.navbar__toggle').click(fillDownloadSidebarMenu);
            }
          };
          
          $(window).on('load', function () {
            fetch(getBaseUrl() + 'pdfs.json')
              .then((response) => response.json())
              .then(function (json) {
                pdfData = json;
                checkAndInsertPdfButtons();
                setInterval(checkAndInsertPdfButtons, 1000);
              });
          });
        </script>`
                ],
            };
        },
        async postBuild(props) {
            let forceBuild = process.env.BUILD_PDF || "";
            if ((pluginOptions.autoBuildPdfs && !forceBuild.startsWith("0")) || forceBuild.startsWith("1")) {
                await (0, generate_1.generatePdfFiles)(_context.outDir, pluginOptions, props);
            }
        },
    };
}
exports.default = default_1;
var validateOptions_2 = require("./validateOptions");
Object.defineProperty(exports, "validateOptions", { enumerable: true, get: function () { return validateOptions_2.validateOptions; } });
