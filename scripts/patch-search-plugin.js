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
