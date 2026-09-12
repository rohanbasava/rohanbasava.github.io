#!/usr/bin/env node
/* Build verification.
 *
 * Walks everything in dist/ and fails the run on anything that would reach a
 * visitor broken: a link with no target, a duplicated title or description, an
 * image with no alt text, a skipped heading level, malformed structured data.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { config } from "../src/lib/config.mjs";

const dist = resolve(config.root, "dist");
const problems = [];
const notes = [];
const fail = (file, message) => problems.push(`${file}: ${message}`);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const exists = async (p) => {
  try { return (await stat(p)).isFile(); } catch { return false; }
};

/** Resolve a site href to a file on disk, the way a static host would. */
async function resolveHref(href, fromFile) {
  let path = href.split("#")[0].split("?")[0];
  if (!path) return true;

  if (config.basePath && path.startsWith(config.basePath + "/")) path = path.slice(config.basePath.length);
  else if (config.basePath && path === config.basePath) path = "/";

  let target;
  if (path.startsWith("/")) {
    target = join(dist, path);
  } else {
    target = resolve(join(fromFile, ".."), path);
  }
  if (path.endsWith("/") || path === "") return exists(join(target, "index.html"));
  return (await exists(target)) || exists(join(target, "index.html"));
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? m[1] : null;
};

async function main() {
  const files = await walk(dist);
  const htmlFiles = files.filter((f) => f.endsWith(".html"));

  const titles = new Map();
  const descriptions = new Map();
  const canonicals = new Map();

  for (const file of htmlFiles) {
    const rel = relative(dist, file);
    const html = await readFile(file, "utf8");
    const isRedirect = html.includes('http-equiv="refresh"');

    /* --- links ------------------------------------------------------- */
    for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)) {
      const href = m[1];
      if (/^(https?:|mailto:|tel:|data:|#)/i.test(href)) continue;
      if (!(await resolveHref(href, file))) fail(rel, `link target missing: ${href}`);
    }

    /* --- assets ------------------------------------------------------ */
    for (const m of html.matchAll(/\b(?:src|href)="(\/[^"]+\.(?:css|js|jpg|jpeg|png|webp|svg|pdf))"/gi)) {
      if (!(await resolveHref(m[1], file))) fail(rel, `asset missing: ${m[1]}`);
    }
    for (const m of html.matchAll(/srcset="([^"]+)"/gi)) {
      for (const candidate of m[1].split(",")) {
        const url = candidate.trim().split(/\s+/)[0];
        if (url && !(await resolveHref(url, file))) fail(rel, `srcset asset missing: ${url}`);
      }
    }

    if (isRedirect) continue;

    /* --- metadata ---------------------------------------------------- */
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
    if (!title) fail(rel, "missing <title>");
    else if (titles.has(title)) fail(rel, `duplicate title, also used by ${titles.get(title)}`);
    else titles.set(title, rel);

    const descTag = html.match(/<meta name="description"[^>]*>/i);
    const description = descTag ? attr(descTag[0], "content") : null;
    if (!description) fail(rel, "missing meta description");
    else if (description.length > 170) notes.push(`${rel}: meta description is ${description.length} chars (over ~160 may be truncated)`);
    else if (descriptions.has(description)) fail(rel, `duplicate meta description, also used by ${descriptions.get(description)}`);
    if (description) descriptions.set(description, rel);

    const canonicalTag = html.match(/<link rel="canonical"[^>]*>/i);
    const canonical = canonicalTag ? attr(canonicalTag[0], "href") : null;
    if (!canonical) fail(rel, "missing canonical URL");
    else {
      if (!canonical.startsWith(config.siteUrl)) fail(rel, `canonical does not use the configured siteUrl: ${canonical}`);
      if (canonicals.has(canonical)) fail(rel, `duplicate canonical with ${canonicals.get(canonical)}`);
      canonicals.set(canonical, rel);
    }

    const ogUrl = (html.match(/<meta property="og:url"[^>]*>/i) || []).map?.((t) => attr(t, "content"))?.[0];
    if (ogUrl && canonical && ogUrl !== canonical) fail(rel, "og:url does not match canonical");

    for (const required of ["og:title", "og:description", "og:image", "og:type", "twitter:card"]) {
      const pattern = new RegExp(`<meta (?:property|name)="${required}"`, "i");
      if (!pattern.test(html)) fail(rel, `missing ${required}`);
    }

    /* --- structured data --------------------------------------------- */
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try {
        const data = JSON.parse(m[1].replace(/\\u003c/g, "<"));
        if (data["@type"] === "LocalBusiness") fail(rel, "LocalBusiness schema is not appropriate for a personal portfolio");
      } catch (error) {
        fail(rel, `invalid JSON-LD: ${error.message}`);
      }
    }

    /* --- images ------------------------------------------------------ */
    for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = m[0];
      if (attr(tag, "alt") === null) fail(rel, `<img> without alt attribute: ${tag.slice(0, 90)}`);
      if (!attr(tag, "width") || !attr(tag, "height")) notes.push(`${rel}: <img> without explicit width/height may shift layout`);
    }

    /* --- headings ----------------------------------------------------- */
    const headings = [...html.matchAll(/<(h[1-6])\b[^>]*>/gi)].map((m) => Number(m[1][1]));
    const h1Count = headings.filter((h) => h === 1).length;
    if (h1Count !== 1) fail(rel, `expected exactly one <h1>, found ${h1Count}`);
    let previous = 0;
    for (const level of headings) {
      if (previous && level > previous + 1) fail(rel, `heading level jumps from h${previous} to h${level}`);
      previous = level;
    }

    /* --- landmarks and a11y ------------------------------------------- */
    if (!/<main\b/i.test(html)) fail(rel, "missing <main> landmark");
    if (!/class="skip-link"/.test(html)) fail(rel, "missing skip link");
    if (!/<html lang="/.test(html)) fail(rel, "missing lang attribute on <html>");
    for (const m of html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)) {
      const tag = m[0];
      const text = m[1].replace(/<[^>]*>/g, "").trim();
      if (!text && !attr(tag, "aria-label") && !attr(tag, "aria-labelledby")) {
        fail(rel, `button with no accessible name: ${tag.slice(0, 80)}`);
      }
    }

    /* --- leftovers ----------------------------------------------------- */
    for (const marker of ["TODO", "FIXME", "lorem ipsum", "PLACEHOLDER", "example.com"]) {
      if (html.toLowerCase().includes(marker.toLowerCase())) {
        fail(rel, `leftover placeholder text: ${marker}`);
      }
    }
    if (/href="(#|)"(?![^>]*aria-hidden)/.test(html)) fail(rel, "anchor with empty or placeholder href");
  }

  /* --- sitemap and robots ---------------------------------------------- */
  const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const path = loc.replace(config.siteUrl, "");
    if (!(await resolveHref(path, join(dist, "sitemap.xml")))) fail("sitemap.xml", `lists a URL with no page: ${loc}`);
  }
  if (!locs.length) fail("sitemap.xml", "contains no URLs");

  const robots = await readFile(join(dist, "robots.txt"), "utf8");
  if (!robots.includes(`Sitemap: ${config.siteUrl}`)) fail("robots.txt", "sitemap line does not match the configured siteUrl");

  /* --- report ----------------------------------------------------------- */
  console.log(`Checked ${htmlFiles.length} HTML files, ${locs.length} sitemap URLs.`);
  if (notes.length) {
    console.log(`\n${notes.length} note(s):`);
    [...new Set(notes)].forEach((n) => console.log(`  - ${n}`));
  }
  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    problems.forEach((p) => console.error(`  ! ${p}`));
    process.exit(1);
  }
  console.log("\nNo problems found.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
