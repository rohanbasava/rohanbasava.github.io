/* Deployment configuration, read once from site.config.json at build time. */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const raw = JSON.parse(readFileSync(resolve(root, "site.config.json"), "utf8"));

const siteUrl = String(raw.siteUrl || "").replace(/\/+$/, "");
const basePath = String(raw.basePath || "").replace(/\/+$/, "");

if (!siteUrl) throw new Error("site.config.json: siteUrl is required.");
if (basePath && !basePath.startsWith("/")) {
  throw new Error('site.config.json: basePath must start with "/" (for example "/portfolio").');
}

export const config = {
  siteUrl,
  basePath,
  formspreeId: String(raw.formspreeId || "").trim(),
  buildDate:
    raw.buildDate && raw.buildDate !== "auto"
      ? raw.buildDate
      : new Date().toISOString().slice(0, 10),
  root,
};

/**
 * Turn a site-absolute path ("/about/") into a href for the deployed site.
 * Leaves external, mail, tel and hash links untouched.
 */
export function url(path) {
  if (!path) return path;
  if (/^([a-z]+:|\/\/|#)/i.test(path)) return path;
  if (!path.startsWith("/")) return path;
  return `${config.basePath}${path}` || "/";
}

/** Absolute URL for canonical tags, Open Graph, sitemap and structured data. */
export function absUrl(path) {
  if (/^[a-z]+:/i.test(path)) return path;
  return `${config.siteUrl}${url(path)}`;
}
