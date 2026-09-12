/* Reusable content blocks shared across pages. */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { url } from "../lib/config.mjs";
import { portrait } from "../data/site.mjs";

/** Responsive portrait. `eager` for the hero, lazy everywhere else. */
export function portraitImage({ size = 360, eager = false, className = "" } = {}) {
  const sizes = `(max-width: 820px) 240px, ${size}px`;
  const loading = eager
    ? 'loading="eager" fetchpriority="high" decoding="async"'
    : 'loading="lazy" decoding="async"';
  return `<picture${className ? ` class="${className}"` : ""}><source type="image/webp" srcset="${url(portrait.sources.webp400)} 400w, ${url(portrait.sources.webp800)} 800w" sizes="${sizes}"><img src="${url(portrait.sources.jpg800)}" srcset="${url(portrait.sources.jpg400)} 400w, ${url(portrait.sources.jpg800)} 800w" sizes="${sizes}" width="${size}" height="${size}" alt="${esc(portrait.alt)}" ${loading}></picture>`;
}

export function eyebrow(iconName, text) {
  return `<p class="eyebrow">${icon(iconName)} ${text}</p>`;
}

export function tagList(tags) {
  if (!tags?.length) return "";
  return `<ul class="tag-list">${tags.map((t) => `<li>${t}</li>`).join("")}</ul>`;
}

/** A statistic tile. Counters animate up from zero when scrolled into view. */
export function stat({ value, countTo, suffix = "", decimals, label }) {
  const data =
    countTo != null
      ? ` data-count-to="${countTo}"${suffix ? ` data-count-suffix="${esc(suffix)}"` : ""}${decimals ? ` data-count-decimals="${decimals}"` : ""}`
      : "";
  return `<div class="stat"><div class="stat-value"${data}>${value}</div><div class="stat-label">${label}</div></div>`;
}

/** Content card. Pass `href` to make the whole card a link target. */
export function card({ icon: iconName, tags, title, body, href, linkLabel = "Read the case study", headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const heading = href
    ? `<${H}><a class="card-title-link" href="${url(href)}">${title}</a></${H}>`
    : `<${H}>${title}</${H}>`;
  const link = href
    ? `<span class="card-link" aria-hidden="true">${linkLabel} ${icon("arrow-right")}</span>`
    : "";
  return `<article class="card${href ? " card-linked" : ""}">
  <span class="icon-tile">${icon(iconName)}</span>
  ${tagList(tags)}
  ${heading}
  <p>${body}</p>
  ${link}
</article>`;
}

export function sectionHead({ icon: iconName, kicker, title, id, lead }) {
  return `<div class="section-head reveal">
  ${kicker ? eyebrow(iconName, kicker) : ""}
  <h2${id ? ` id="${id}"` : ""}>${title}</h2>
  ${lead ? `<p class="lead">${lead}</p>` : ""}
</div>`;
}

export function ctaBand({ title, body, actions }) {
  return `<section class="section cta-band" aria-labelledby="cta-title">
  <div class="container cta-inner">
    <h2 id="cta-title">${title}</h2>
    <p class="lead">${body}</p>
    <div class="btn-row btn-row-center">${actions}</div>
  </div>
</section>`;
}

export function button({ href, label, icon: iconName, variant = "secondary", external = false, className = "" }) {
  const cls = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
  const ext = external ? ' target="_blank" rel="noopener"' : "";
  return `<a class="${cls}" href="${url(href)}"${ext}>${iconName ? icon(iconName) : ""} ${label}${external ? icon("external-link", { className: "icon-xs" }) : ""}</a>`;
}

/** Timeline entry used on the experience page. */
export function timelineItem(role) {
  const points = role.points.map((p) => `<li>${p}</li>`).join("");
  const link = role.caseStudy
    ? `<li><a href="${url(`/work/${role.caseStudy.slug}/`)}">${role.caseStudy.label}</a>.</li>`
    : "";
  return `<li class="reveal">
  <h3>${role.title}</h3>
  <div class="role-meta">
    <span>${icon(role.orgIcon)}${role.org}</span>
    <span>${icon("calendar")}${role.dates}</span>
    <span>${icon("map-pin")}${role.location}</span>
  </div>
  <ul>${points}${link}</ul>
</li>`;
}
