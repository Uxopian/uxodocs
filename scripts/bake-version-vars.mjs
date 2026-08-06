#!/usr/bin/env node
/**
 * Bakes a version branch's OWN {{placeholder}} values into its extracted
 * markdown, using that branch's own docusaurus.config.ts (passed via
 * --config) instead of whatever config.ts is active in the working tree.
 *
 * Why: the CI pipeline snapshots each <product>-v* branch's docs/ into a
 * versioned_docs/ folder, but the final `npm run build` always runs with
 * staging's docusaurus.config.ts — so remarkVariables would otherwise
 * replace {{version}} etc. in EVERY version's docs with staging's CURRENT
 * constants, not the ones that were correct when that branch was cut.
 * Baking literal values in here, before the snapshot is created, freezes
 * each version's docs with the values that were true for it.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

function parseArgs(argv) {
    const args = {};
    for (let i = 0; i < argv.length; i += 2) {
        args[argv[i].replace(/^--/, "")] = argv[i + 1];
    }
    return args;
}

// Isolates the plugin-config object for `product` by slicing the text
// between its `id: "<product>"` and the next plugin's `id: "..."`.
function extractPluginBlock(configText, product) {
    const idMatch = new RegExp(`id:\\s*["'\`]${product}["'\`]`).exec(configText);
    if (!idMatch) return null;

    const rest = configText.slice(idMatch.index);
    const nextIdMatch = /id:\s*["'`][\w-]+["'`]/.exec(rest.slice(1));
    return nextIdMatch ? rest.slice(0, nextIdMatch.index + 1) : rest;
}

// Resolves { placeholderKey: constIdentifier } from the plugin's
// remarkPlugins/variables block, then looks up each identifier's literal
// string value from its `const <identifier> = "...";` declaration.
function extractVariablesMap(configText, product) {
    const block = extractPluginBlock(configText, product);
    if (!block) return null;

    const varsMatch = /variables:\s*\{([^}]*)\}/.exec(block);
    if (!varsMatch) return null;

    const pairs = [...varsMatch[1].matchAll(/(\w+)\s*:\s*(\w+)/g)];
    if (pairs.length === 0) return null;

    const map = {};
    for (const [, key, identifier] of pairs) {
        const constMatch = new RegExp(`const\\s+${identifier}\\s*=\\s*["'\`]([^"'\`]+)["'\`]`).exec(configText);
        if (constMatch) {
            map[key] = constMatch[1];
        } else {
            console.warn(`   (bake-version-vars: could not resolve const "${identifier}" for key "${key}")`);
        }
    }
    return map;
}

function walk(dir, exts, out = []) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const st = statSync(full);
        if (st.isDirectory()) walk(full, exts, out);
        else if (exts.has(extname(entry))) out.push(full);
    }
    return out;
}

function bakeInto(docsDir, variables) {
    const pattern = /\{\{(\w+)\}\}/g;
    const files = walk(docsDir, new Set([".md", ".mdx"]));
    let filesChanged = 0;
    let replacements = 0;

    for (const file of files) {
        const original = readFileSync(file, "utf8");
        const updated = original.replace(pattern, (match, key) => {
            if (key in variables) {
                replacements++;
                return variables[key];
            }
            return match;
        });
        if (updated !== original) {
            writeFileSync(file, updated, "utf8");
            filesChanged++;
        }
    }
    return { filesChanged, replacements, filesScanned: files.length };
}

const args = parseArgs(process.argv.slice(2));
if (!args.product || !args.config || !args.docs) {
    console.error("Usage: bake-version-vars.mjs --product <id> --config <path-to-config.ts> --docs <dir>");
    process.exit(1);
}

const configText = readFileSync(args.config, "utf8");
const variables = extractVariablesMap(configText, args.product);

if (!variables) {
    console.log(`-> bake-version-vars: no remarkVariables block found for "${args.product}" in ${args.config}, skipping (nothing to freeze)`);
    process.exit(0);
}

const { filesChanged, replacements, filesScanned } = bakeInto(args.docs, variables);
console.log(`-> bake-version-vars: ${args.product} -> ${JSON.stringify(variables)}`);
console.log(`   scanned ${filesScanned} files, updated ${filesChanged}, ${replacements} placeholder(s) resolved`);
