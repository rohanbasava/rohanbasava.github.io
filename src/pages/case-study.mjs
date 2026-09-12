import { icon } from "../lib/icons.mjs";
import { url, absUrl } from "../lib/config.mjs";
import { caseStudies } from "../data/projects.mjs";
import { diagrams } from "../components/diagrams.mjs";
import { personSchema } from "../components/layout.mjs";

/* Section bodies use [[check]] as shorthand for the check-list bullet icon,
 * so the content module stays free of markup plumbing. */
function expand(body) {
  return body.replace(/\[\[check\]\]/g, icon("check"));
}

function renderSection(section) {
  const diagram = section.diagram ? diagrams[section.diagram]() : "";
  return `<section class="case-section reveal" aria-labelledby="sec-${section.id}">
  <h2 id="sec-${section.id}">${icon(section.icon)} ${section.title}</h2>
  ${expand(section.body)}
  ${diagram}
</section>`;
}

/** Build one case-study page. */
export function caseStudyPage(study, index) {
  const prev = caseStudies[index - 1];
  const next = caseStudies[index + 1];

  const meta = study.meta
    .map(
      (m) =>
        `<div><dt>${icon(m.icon)}${m.label}</dt><dd>${m.value}</dd></div>`
    )
    .join("");

  const sections = study.sections.map(renderSection).join("\n");

  const jump = study.sections
    .map((s) => `<li><a href="#sec-${s.id}">${s.title}</a></li>`)
    .join("");

  const prevLink = prev
    ? `<a class="case-nav-link" href="${url(`/work/${prev.slug}/`)}" rel="prev">${icon("arrow-left")}<span><span class="case-nav-label">Previous</span><span class="case-nav-title">${prev.cardTitle}</span></span></a>`
    : `<a class="case-nav-link" href="${url("/work/")}">${icon("arrow-left")}<span><span class="case-nav-label">Back</span><span class="case-nav-title">All work</span></span></a>`;
  const nextLink = next
    ? `<a class="case-nav-link case-nav-next" href="${url(`/work/${next.slug}/`)}" rel="next"><span><span class="case-nav-label">Next</span><span class="case-nav-title">${next.cardTitle}</span></span>${icon("arrow-right")}</a>`
    : `<a class="case-nav-link case-nav-next" href="${url("/contact/")}"><span><span class="case-nav-label">Talk it through</span><span class="case-nav-title">Get in touch</span></span>${icon("arrow-right")}</a>`;

  const main = `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">${icon(study.kickerIcon)} ${study.kicker}</p>
    <h1>${study.title}</h1>
    <p class="lead">${study.lead}</p>
    <dl class="case-meta">${meta}</dl>
  </div>
</section>

<section class="section">
  <div class="container case-layout">
    <aside class="case-toc" aria-labelledby="toc-title">
      <h2 id="toc-title" class="case-toc-title">On this page</h2>
      <nav aria-labelledby="toc-title"><ol>${jump}</ol></nav>
    </aside>
    <article class="case-body">
      ${sections}
      <nav class="case-nav" aria-label="Case study navigation">${prevLink}${nextLink}</nav>
    </article>
  </div>
</section>`;

  return {
    route: `/work/${study.slug}/`,
    title: `${study.seoTitle} | Rohan Basava`,
    description: study.seoDescription,
    ogType: "article",
    main,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work/" },
      { label: study.cardTitle, href: `/work/${study.slug}/` },
    ],
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: study.title.replace(/&amp;/g, "&"),
        description: study.seoDescription,
        url: absUrl(`/work/${study.slug}/`),
        image: absUrl("/assets/img/rohan-basava-800.jpg"),
        author: { "@id": personSchema["@id"] },
        publisher: { "@id": personSchema["@id"] },
        mainEntityOfPage: absUrl(`/work/${study.slug}/`),
        keywords: study.tags.join(", "),
      },
    ],
  };
}

export default function caseStudyPages() {
  return caseStudies.map(caseStudyPage);
}
