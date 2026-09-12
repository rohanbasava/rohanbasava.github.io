#!/usr/bin/env node
/* Minimal static server for local review of dist/.
 *
 * Mirrors how a typical static host behaves: directory URLs resolve to
 * index.html, unknown paths return the real 404 page with a 404 status.
 */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat, readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { config } from "../src/lib/config.mjs";

const dist = resolve(config.root, "dist");
const port = Number(process.env.PORT || 8080);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const base = config.basePath && clean.startsWith(config.basePath)
    ? clean.slice(config.basePath.length) || "/"
    : clean;
  const candidates = base.endsWith("/")
    ? [join(dist, base, "index.html")]
    : [join(dist, base), join(dist, `${base}/index.html`)];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url || "/");
  if (file) {
    res.writeHead(200, {
      "Content-Type": TYPES[extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    createReadStream(file).pipe(res);
    return;
  }
  const notFound = await readFile(join(dist, "404.html"), "utf8").catch(() => "Not found");
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end(notFound);
}).listen(port, () => {
  console.log(`Serving dist/ at http://localhost:${port}${config.basePath || "/"}`);
});
