/* One icon system for the whole site.
 *
 * Every icon is a stroked 24x24 outline glyph with a consistent 2px weight, so
 * they sit together at any size. Pages inline only the symbols they actually
 * use, which keeps the sprite small without costing an extra request.
 *
 * Accessibility: icon() is decorative by default (aria-hidden). Pass a `label`
 * only when the icon carries meaning no nearby text already provides.
 */
import icons from "./icon-data.json" with { type: "json" };
import { esc } from "./html.mjs";

export const ICON_NAMES = Object.keys(icons);

/**
 * Render an icon reference.
 * @param {string} name  Icon key, e.g. "mail".
 * @param {{label?: string, className?: string}} [options]
 */
export function icon(name, options = {}) {
  if (!icons[name]) throw new Error(`Unknown icon: "${name}"`);
  const { label, className } = options;
  const cls = ["icon", className].filter(Boolean).join(" ");
  const a11y = label
    ? `role="img" aria-label="${esc(label)}"`
    : 'aria-hidden="true" focusable="false"';
  return `<svg class="${cls}" ${a11y}><use href="#i-${name}"/></svg>`;
}

/** Build the inline sprite containing just the named symbols. */
export function sprite(names) {
  const unique = [...new Set(names)].filter((n) => icons[n]).sort();
  if (!unique.length) return "";
  const symbols = unique
    .map((n) => `<symbol id="i-${n}" viewBox="${icons[n].viewBox}">${icons[n].body}</symbol>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" class="icon-sprite" aria-hidden="true">${symbols}</svg>`;
}

/** Collect icon names referenced by rendered markup, so the sprite stays in sync automatically. */
export function usedIcons(markup) {
  return [...markup.matchAll(/href="#i-([a-z0-9-]+)"/g)].map((m) => m[1]);
}
