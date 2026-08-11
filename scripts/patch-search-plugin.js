const fs = require("fs");
const path = require("path");

const templatePath = path.join(
    __dirname,
    "../node_modules/@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar/SuggestionTemplate.js"
);

const searchBarPath = path.join(
    __dirname,
    "../node_modules/@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar/SearchBar.jsx"
);

try {
    let content = fs.readFileSync(templatePath, "utf8");

    if (!content.includes("search-doc-url")) {
        const originalReturn = `return [
        ...treeWrapper,
        icon,`;

        const patchedReturn = `// PATCHED: Add document URL as data attribute
    const docUrl = document.u || '';
    const urlMarker = \`<span class="search-doc-url" data-url="\${docUrl}" style="display:none;"></span>\`;
    return [
        urlMarker,
        ...treeWrapper,
        icon,`;

        if (content.includes(originalReturn)) {
            content = content.replace(originalReturn, patchedReturn);
            fs.writeFileSync(templatePath, content, "utf8");
        } else {
            const altPattern = /return \[\s*\.\.\.treeWrapper,\s*icon,/;
            if (altPattern.test(content)) {
                content = content.replace(
                    altPattern,
                    `// PATCHED: Add document URL
    const docUrl = document.u || '';
    const urlMarker = \`<span class="search-doc-url" data-url="\${docUrl}" style="display:none;"></span>\`;
    return [
        urlMarker,
        ...treeWrapper,
        icon,`
                );
                fs.writeFileSync(templatePath, content, "utf8");
            }
        }
    } else {
    }
} catch {}

try {
    let content = fs.readFileSync(searchBarPath, "utf8");

    if (content.includes('SEARCH_PARAM_HIGHLIGHT = "h"')) {
        content = content.replace('const SEARCH_PARAM_HIGHLIGHT = "h"');
        fs.writeFileSync(searchBarPath, content, "utf8");
    }
} catch {}

// PATCHED: Treat "." as a token separator so dotted identifiers
// (e.g. secured.classloader.whitelist.additional) are searchable by
// any of their parts, not just as one exact glued-together token.
const lunrPath = path.join(__dirname, "../node_modules/lunr/lunr.js");

try {
    let content = fs.readFileSync(lunrPath, "utf8");

    if (content.includes("lunr.tokenizer.separator = /[\\s\\-]+/")) {
        content = content.replace(
            "lunr.tokenizer.separator = /[\\s\\-]+/",
            "lunr.tokenizer.separator = /[\\s\\-.]+/"
        );
        fs.writeFileSync(lunrPath, content, "utf8");
    }
} catch {}

const tokenizePath = path.join(
    __dirname,
    "../node_modules/@easyops-cn/docusaurus-search-local/dist/client/client/utils/tokenize.js"
);

try {
    let content = fs.readFileSync(tokenizePath, "utf8");

    if (content.includes("let regExpMatchWords = /[^-\\s]+/g;")) {
        content = content.replace(
            "let regExpMatchWords = /[^-\\s]+/g;",
            "let regExpMatchWords = /[^-.\\s]+/g;"
        );
        fs.writeFileSync(tokenizePath, content, "utf8");
    }
} catch {}
