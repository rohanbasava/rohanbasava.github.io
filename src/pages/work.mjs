import { icon } from "../lib/icons.mjs";
import { absUrl } from "../lib/config.mjs";
import { caseStudies, otherProjects } from "../data/projects.mjs";
import { card, sectionHead, ctaBand, button } from "../components/ui.mjs";

export default function work() {
  const studies = caseStudies
    .map((cs) =>
      card({
        icon: cs.icon,
        tags: cs.tags,
        title: cs.cardTitle,
        body: cs.cardSummary,
        href: `/work/${cs.slug}/`,
      })
    )
    .join("");

  const others = otherProjects
    .map((p) => card({ icon: p.icon, tags: p.tags, title: p.title, body: p.body }))
    .join("");

  const main = `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">${icon("layers")} Work</p>
    <h1>Case studies and projects</h1>
    <p class="lead">A closer look at how I approach problems, from growth marketing for AI products to autonomous hardware built from the ground up.</p>
  </div>
</section>

<section class="section" aria-labelledby="cs-title">
  <div class="container">
    ${sectionHead({ title: "Case studies", id: "cs-title", lead: "Three projects written up end to end: the problem, what I decided, and how it turned out." })}
    <div class="grid grid-3 stagger">${studies}</div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="more-title">
  <div class="container">
    ${sectionHead({ title: "More projects", id: "more-title", lead: "Earlier builds and programs that shaped how I work." })}
    <div class="grid grid-3 stagger">${others}</div>
  </div>
</section>

${ctaBand({
  title: "Want the full story on any of these?",
  body: "I'm happy to walk through the details, the trade-offs, and what I'd do differently next time.",
  actions: button({ href: "/contact/", label: "Get in touch", icon: "mail" }),
})}`;

  return {
    route: "/work/",
    title: "Work & Case Studies | Rohan Basava",
    description:
      "Case studies from Rohan Basava: organic growth for three AI products, a solar-powered autonomous weed harvester, and a Geiger counter built to prototype.",
    main,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work/" },
    ],
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Work & case studies",
        url: absUrl("/work/"),
        hasPart: caseStudies.map((cs) => ({
          "@type": "CreativeWork",
          name: cs.title.replace(/&amp;/g, "&"),
          url: absUrl(`/work/${cs.slug}/`),
        })),
      },
    ],
  };
}
