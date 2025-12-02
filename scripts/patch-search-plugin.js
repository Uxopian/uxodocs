/**
 * Ce script patche le plugin docusaurus-search-local pour :
 * 1. Inclure l'URL du document dans chaque suggestion de recherche
 * 2. Utiliser ?h= au lieu de ?_highlight= pour le paramètre de highlight
 * 
 * Exécuter après npm install : node scripts/patch-search-plugin.js
 */

const fs = require('fs');
const path = require('path');

// Patch 1: SuggestionTemplate - ajouter l'URL du document
const templatePath = path.join(
    __dirname,
    '../node_modules/@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar/SuggestionTemplate.js'
);

// Patch 2: SearchBar - changer _highlight en h
const searchBarPath = path.join(
    __dirname,
    '../node_modules/@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar/SearchBar.jsx'
);

console.log('Patching search plugin...');

// === PATCH 1: SuggestionTemplate ===
try {
    let content = fs.readFileSync(templatePath, 'utf8');

    if (!content.includes('search-doc-url')) {
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
            fs.writeFileSync(templatePath, content, 'utf8');
            console.log('✅ SuggestionTemplate patched (document URL)');
        } else {
            const altPattern = /return \[\s*\.\.\.treeWrapper,\s*icon,/;
            if (altPattern.test(content)) {
                content = content.replace(altPattern, `// PATCHED: Add document URL
    const docUrl = document.u || '';
    const urlMarker = \`<span class="search-doc-url" data-url="\${docUrl}" style="display:none;"></span>\`;
    return [
        urlMarker,
        ...treeWrapper,
        icon,`);
                fs.writeFileSync(templatePath, content, 'utf8');
                console.log('✅ SuggestionTemplate patched (alt pattern)');
            } else {
                console.log('⚠️  SuggestionTemplate: pattern not found');
            }
        }
    } else {
        console.log('✅ SuggestionTemplate already patched');
    }
} catch (error) {
    console.error('❌ Error patching SuggestionTemplate:', error.message);
}

// === PATCH 2: SearchBar - change _highlight to h ===
try {
    let content = fs.readFileSync(searchBarPath, 'utf8');

    if (content.includes('SEARCH_PARAM_HIGHLIGHT = "_highlight"')) {
        content = content.replace(
            'const SEARCH_PARAM_HIGHLIGHT = "_highlight"',
            'const SEARCH_PARAM_HIGHLIGHT = "h"'
        );
        fs.writeFileSync(searchBarPath, content, 'utf8');
        console.log('✅ SearchBar patched (_highlight → h)');
    } else if (content.includes('SEARCH_PARAM_HIGHLIGHT = "h"')) {
        console.log('✅ SearchBar already patched');
    } else {
        console.log('⚠️  SearchBar: SEARCH_PARAM_HIGHLIGHT not found');
    }
} catch (error) {
    console.error('❌ Error patching SearchBar:', error.message);
}

console.log('Done!');
