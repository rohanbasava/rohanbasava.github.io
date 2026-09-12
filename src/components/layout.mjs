/* The page shell: head metadata, header, navigation, breadcrumbs, footer.
 * Every page goes through renderPage() so these stay identical site-wide.
 */
import { esc, join, jsonLd } from "../lib/html.mjs";
import { icon, sprite, usedIcons } from "../lib/icons.mjs";
import { config, url, absUrl } from "../lib/config.mjs";
import { person, portrait, nav, navCta, footerLinks, seoDefaults } from "../data/site.mjs";

/* Person node, referenced by @id from other pages so search engines see one entity. */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${config.siteUrl}${url("/")}#person`,
  name: person.name,
  url: absUrl("/"),
  image: absUrl(portrait.sources.jpg800),
  email: `mailto:${person.email}`,
  telephone: person.phone,
  jobTitle: person.jobTitle,
  worksFor: { "@type": "Organization", name: person.employer },
  alumniOf: { "@type": "CollegeOrUniversity", name: person.university },
  affiliation: person.affiliations.map((name) => ({ "@type": "Organization", name })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "West Lafayette",
    addressRegion: "IN",
    addressCountry: "US",
  },
  sameAs: [person.linkedin],
  knowsAbout: person.knowsAbout,
  description:
    "Purdue University sophomore studying Integrated Business & Engineering with a minor in Finance. Marketing Strategy & Operations Consultant at SeedlingLabs, Chief Technology Engineer of the Sustainable Energy Club, and Director of Events for We Are Saath.",
};

function headTag({ title, description, route, noindex, ogType = "website", preloadPortrait = false }) {
  const canonical = absUrl(route);
  const ogImage = absUrl(seoDefaults.ogImage);
  return join([
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    `<meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}">`,
    `<link rel="canonical" href="${esc(canonical)}">`,
    `<meta name="author" content="${esc(person.name)}">`,
    `<meta name="theme-color" content="${seoDefaults.themeColor}">`,
    `<meta property="og:type" content="${ogType}">`,
    `<meta property="og:site_name" content="${esc(person.name)}">`,
    `<meta property="og:locale" content="${seoDefaults.locale}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${esc(canonical)}">`,
    `<meta property="og:image" content="${esc(ogImage)}">`,
    '<meta property="og:image:width" content="800">',
    '<meta property="og:image:height" content="800">',
    `<meta property="og:image:alt" content="${esc(seoDefaults.ogImageAlt)}">`,
    '<meta name="twitter:card" content="summary">',
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${esc(ogImage)}">`,
    `<meta name="twitter:image:alt" content="${esc(seoDefaults.ogImageAlt)}">`,
    `<link rel="icon" href="${url("/assets/img/favicon.svg")}" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="${url(portrait.sources.jpg400)}">`,
    /* Only the page that shows the portrait above the fold preloads it, and the
       descriptors match the <img> exactly so the browser reuses that request. */
    preloadPortrait
      ? `<link rel="preload" as="image" imagesrcset="${url(portrait.sources.webp400)} 400w, ${url(portrait.sources.webp800)} 800w" imagesizes="(max-width: 820px) 240px, 360px" type="image/webp" fetchpriority="high">`
      : "",
    `<link rel="stylesheet" href="${url("/assets/css/style.css")}">`,
    /* Scripting flag set before first paint. Motion styles are scoped to .js so that
       with scripting unavailable every element renders visible and unanimated. */
    '<script>document.documentElement.classList.add("js")</script>',
  ]);
}

function header(route) {
  const isCurrent = (href) => (href === route ? ' aria-current="page"' : "");
  const items = nav
    .map((item) => `<li><a href="${url(item.href)}"${isCurrent(item.href)}>${item.label}</a></li>`)
    .join("");
  const cta = `<li class="nav-cta"><a href="${url(navCta.href)}"${isCurrent(navCta.href)}>${icon(navCta.icon)} ${navCta.label}</a></li>`;
  return `
<header class="site-header" data-site-header>
  <div class="container nav">
    <a class="brand" href="${url("/")}" aria-label="${esc(person.name)} home"><span class="brand-mark" aria-hidden="true">${person.initials}</span><span>${esc(person.name)}</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span class="nav-toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span></button>
    <nav aria-label="Primary">
      <ul id="primary-nav" class="nav-list">${items}${cta}</ul>
    </nav>
  </div>
</header>`;
}

function breadcrumbTrail(crumbs) {
  if (!crumbs || !crumbs.length) return "";
  const items = crumbs
    .map((c, i) => {
      const last = i === crumbs.length - 1;
      const inner = last
        ? `<span aria-current="page">${c.label}</span>`
        : `<a href="${url(c.href)}">${i === 0 ? icon("home") : ""}${c.label}</a>`;
      return `<li>${inner}</li>`;
    })
    .join("");
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><div class="container"><ol>${items}</ol></div></nav>`;
}

function breadcrumbSchema(crumbs) {
  if (!crumbs || crumbs.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label.replace(/&amp;/g, "&"),
      item: absUrl(c.href),
    })),
  };
}

function footer() {
  const list = (links) =>
    links
      .map(
        (l) =>
          `<li><a href="${url(l.href)}"${l.external ? ' target="_blank" rel="noopener"' : ""}>${icon(l.icon)} ${esc(l.label)}${l.external ? icon("external-link", { className: "icon-xs" }) : ""}</a></li>`
      )
      .join("");
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="${url("/")}"><span class="brand-mark" aria-hidden="true">${person.initials}</span><span>${esc(person.name)}</span></a>
        <p class="muted footer-blurb">${person.blurb}</p>
      </div>
      <div>
        <h2 class="footer-heading">Explore</h2>
        <ul>${list(footerLinks.explore)}</ul>
      </div>
      <div>
        <h2 class="footer-heading">Connect</h2>
        <ul>${list(footerLinks.connect)}
          <li><span class="footer-static">${icon("map-pin")} ${person.locationShort}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(person.name)}. All rights reserved.</span>
      <span><a href="${url("/sitemap.xml")}">Sitemap</a></span>
    </div>
  </div>
</footer>`;
}

/**
 * Compose a full HTML document.
 * @param {object} page
 * @param {string} page.title        Unique <title> for this page.
 * @param {string} page.description  Unique meta description.
 * @param {string} page.route        Site-absolute route, e.g. "/work/".
 * @param {string} page.main         Markup for <main>.
 * @param {Array}  [page.breadcrumbs]
 * @param {Array}  [page.schemas]    Extra JSON-LD objects.
 * @param {boolean}[page.noindex]
 */
export function renderPage(page) {
  const { title, description, route, main, breadcrumbs, schemas = [], noindex = false, ogType, preloadPortrait = false } = page;

  const crumbs = breadcrumbTrail(breadcrumbs);
  const body = join([crumbs, main], "\n");
  const chrome = header(route) + footer();
  const allMarkup = chrome + body;

  const structured = [...schemas, breadcrumbSchema(breadcrumbs)].filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
${headTag({ title, description, route, noindex, ogType, preloadPortrait })}
${structured.map(jsonLd).join("\n")}
</head>
<body>
${sprite([...usedIcons(allMarkup), "arrow-up"])}
<a class="skip-link" href="#main">Skip to main content</a>
${header(route)}
${crumbs}
<main id="main" tabindex="-1">
${main}
</main>
${footer()}
<button class="to-top" type="button" aria-label="Back to top" hidden>${icon("arrow-up")}</button>
<script src="${url("/assets/js/main.js")}" defer></script>
</body>
</html>
`;
}
