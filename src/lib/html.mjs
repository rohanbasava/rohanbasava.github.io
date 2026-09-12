/* Small HTML helpers shared by every component. */

/** Escape a string for use in HTML text or a double-quoted attribute. */
export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Join template fragments, dropping null/undefined/false so conditionals read cleanly. */
export function join(parts, separator = "\n") {
  return parts.filter(Boolean).join(separator);
}

/** Render `attr="value"` pairs, skipping empty values. `true` renders a bare attribute. */
export function attrs(map) {
  return Object.entries(map)
    .filter(([, v]) => v !== undefined && v !== null && v !== false && v !== "")
    .map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`))
    .join(" ");
}

/** Serialise a JSON-LD object into a script tag. */
export function jsonLd(data) {
  const safe = JSON.stringify(data).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${safe}</script>`;
}
