/**
 * Ce script patche le plugin docusaurus-search-local pour inclure
 * l'URL du document dans chaque suggestion de recherche.
 * 
 * Exécuter après npm install : node scripts/patch-search-plugin.js
 */

const fs = require('fs');
const path = require('path');

const templatePath = path.join(
    __dirname,
    '../node_modules/@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar/SuggestionTemplate.js'
);

console.log('Patching search plugin template...');

try {
    let content = fs.readFileSync(templatePath, 'utf8');

    // Vérifier si déjà patché
    if (content.includes('data-doc-url')) {
        console.log('Plugin already patched. Skipping.');
        process.exit(0);
    }

    // Trouver la ligne qui retourne le HTML et ajouter data-doc-url
    // Original: return [...].join("");
    // On veut ajouter l'URL du document comme attribut data

    // Le template retourne un array de strings qui sont join
    // On doit modifier pour que le premier élément contienne data-doc-url

    // Chercher le pattern de retour
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
        console.log('✅ Plugin patched successfully!');
        console.log('   Document URLs will now be available in search results.');
    } else {
        // Essayer un autre pattern
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
            console.log('✅ Plugin patched successfully (alt pattern)!');
        } else {
            console.log('⚠️  Could not find pattern to patch. Manual patching may be required.');
            console.log('   Looking for: return [...treeWrapper, icon,');
        }
    }
} catch (error) {
    console.error('❌ Error patching plugin:', error.message);
    process.exit(1);
}
