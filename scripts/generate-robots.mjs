#!/usr/bin/env node
/**
 * Writes static/robots.txt before each build. Content depends on SITE_URL
 * (same env var docusaurus.config.ts uses to pick the site's base url):
 * production disallows nothing and points to the sitemap, anything else
 * (staging, local dev, unset) disallows everything so search engines don't
 * index a duplicate of the production docs.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const PROD_URL = "https://doc.uxopian.com/";
const siteUrl = process.env.SITE_URL || "https://staging.doc.uxopian.com/";
const isProd = siteUrl.replace(/\/+$/, "") === PROD_URL.replace(/\/+$/, "");

const content = isProd
    ? `User-agent: *\nAllow: /\n\nSitemap: ${PROD_URL}sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

writeFileSync(resolve(root, "static/robots.txt"), content, "utf8");
console.log(
    `-> generate-robots: wrote static/robots.txt for ${isProd ? "PRODUCTION (indexing allowed)" : "non-production (indexing disallowed)"} (SITE_URL=${siteUrl})`
);
