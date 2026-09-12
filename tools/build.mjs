#!/usr/bin/env node
/* Static site generator.
 *
 * Reads content from src/data, renders it through src/components and
 * src/pages, and writes a plain static site to dist/. No dependencies, no
 * client-side framework: the output is HTML, one stylesheet and one script.
 */
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { config, url, absUrl } from "../src/lib/config.mjs";
import { renderPage } from "../src/components/layout.mjs";
import { esc } from "../src/lib/html.mjs";

import home from "../src/pages/home.mjs";
import about from "../src/pages/about.mjs";
import work from "../src/pages/work.mjs";
import experience from "../src/pages/experience.mjs";
import contact from "../src/pages/contact.mjs";
import thankYou from "../src/pages/thank-you.mjs";
import notFound from "../src/pages/not-found.mjs";
import caseStudyPages from "../src/pages/case-study.mjs";

const dist = resolve(config.root, "dist");
const src = resolve(config.root, "src");

/* Legacy .html paths kept alive so links shared before the move still work. */
const REDIRECTS = [
  ["about.html", "/about/"],
  ["experience.html", "/experience/"],
  ["contact.html", "/contact/"],
  ["thank-you.html", "/thank-you/"],
  ["work/seedlinglabs-organic-growth.html", "/work/seedlinglabs-organic-growth/"],
  ["work/solar-aquatic-weed-harvester.html", "/work/solar-aquatic-weed-harvester/"],
  ["work/geiger-counter-prototype.html", "/work/geiger-counter-prototype/"],
];

/** Where a route is written on disk. "/" -> index.html, "/about/" -> about/index.html */
function outputPathFor(page) {
  if (page.outputPath) return page.outputPath;
  const clean = page.route.replace(/^\/|\/$/g, "");
  return clean ? `${clean}/index.html` : "index.html";
}

async function write(relativePath, contents) {
  const target = resolve(dist, relativePath);
  await mkdir(resolve(target, ".."), { recursive: true });
  await writeFile(target, contents, "utf8");
}

function redirectStub(to) {
  const target = url(to);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>Redirecting&hellip;</title>
<link rel="canonical" href="${esc(absUrl(to))}">
<meta http-equiv="refresh" content="0; url=${esc(target)}">
<style>body{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;margin:0;display:grid;place-items:center;min-height:100vh;color:#344054;background:#f7f8fa}a{color:#1d4ed8}</style>
<script>location.replace(${JSON.stringify(target)});</script>
</head>
<body><p>This page has moved. <a href="${esc(target)}">Continue to its new address</a>.</p></body>
</html>
`;
}

function robotsTxt(pages) {
  const blocked = pages
    .filter((p) => p.noindex && p.route !== "/404.html")
    .map((p) => `Disallow: ${url(p.route)}`);
  return [
    "User-agent: *",
    "Allow: /",
    ...blocked,
    `Disallow: ${url("/404.html")}`,
    "",
    `Sitemap: ${absUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
}

function sitemapXml(pages) {
  const entries = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const priority = p.route === "/" ? "1.0" : p.route.startsWith("/work") ? "0.8" : "0.7";
      return `  <url><loc>${esc(absUrl(p.route))}</loc><lastmod>${config.buildDate}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

async function build() {
  const started = Date.now();
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  /* Assets are copied verbatim: stylesheet, script, images, resume. */
  await cp(resolve(src, "assets"), resolve(dist, "assets"), { recursive: true });

  const pages = [
    home(),
    about(),
    work(),
    ...caseStudyPages(),
    experience(),
    contact(),
    thankYou(),
    notFound(),
  ];

  for (const page of pages) {
    await write(outputPathFor(page), renderPage(page));
  }

  for (const [from, to] of REDIRECTS) {
    await write(from, redirectStub(to));
  }

  await write("robots.txt", robotsTxt(pages));
  await write("sitemap.xml", sitemapXml(pages));
  /* GitHub Pages skips Jekyll processing when this file is present. */
  await write(".nojekyll", "");

  const indexed = pages.filter((p) => !p.noindex).length;
  console.log(
    `Built ${pages.length} pages (${indexed} indexable) + ${REDIRECTS.length} redirects in ${Date.now() - started}ms`
  );
  console.log(`  site:     ${config.siteUrl}${config.basePath || ""}`);
  console.log(
    `  form:     ${config.formspreeId ? `Formspree (${config.formspreeId})` : "not configured, falls back to the visitor's email client"}`
  );
  console.log(`  output:   dist/`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
