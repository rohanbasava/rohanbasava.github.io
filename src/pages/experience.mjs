import { person } from "../data/site.mjs";
import { professional, leadership, studyWork } from "../data/experience.mjs";
import { icon } from "../lib/icons.mjs";
import { eyebrow, sectionHead, ctaBand, button, timelineItem } from "../components/ui.mjs";

export default function experience() {
  const pro = professional.map(timelineItem).join("");
  const lead = leadership.map(timelineItem).join("");
  const jobs = studyWork
    .map(
      (j) => `<article class="card reveal">
  <span class="icon-tile">${icon(j.icon)}</span>
  <h3>${j.title}</h3>
  <p class="muted card-dates">${j.dates}</p>
  <p>${j.body}</p>
</article>`
    )
    .join("");

  const main = `
<section class="page-hero">
  <div class="container">
    ${eyebrow("briefcase", "Experience")}
    <h1>Where I've worked and led</h1>
    <p class="lead">Professional roles, campus leadership, and the earlier experiences that shaped them. For a one-page version, download my resume.</p>
    <div class="btn-row page-hero-actions">
      ${button({ href: person.resume, label: "Download resume (PDF)", icon: "download", variant: "primary", external: true })}
      ${button({ href: person.linkedin, label: "View LinkedIn", icon: "linkedin", external: true })}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="pro-title">
  <div class="container">
    ${sectionHead({ title: "Professional experience", id: "pro-title" })}
    <ol class="timeline">${pro}</ol>
  </div>
</section>

<section class="section section-alt" aria-labelledby="lead-title">
  <div class="container">
    ${sectionHead({ title: "Campus leadership", id: "lead-title" })}
    <ol class="timeline">${lead}</ol>
  </div>
</section>

<section class="section" aria-labelledby="study-title">
  <div class="container">
    ${sectionHead({
      title: "Work while studying",
      id: "study-title",
      lead: "Regular shifts alongside a full course load, while maintaining Dean's List standing.",
    })}
    <div class="grid grid-2 stagger">${jobs}</div>
  </div>
</section>

${ctaBand({
  title: "Interested in working together?",
  body: "I'm seeking internships in product strategy, AI, and go-to-market roles.",
  actions: button({ href: "/contact/", label: "Get in touch", icon: "mail" }),
})}`;

  return {
    route: "/experience/",
    title: "Experience & Leadership | Rohan Basava",
    description:
      "Rohan Basava's roles at SeedlingLabs and Maekers.com, teaching assistant work at Purdue, and campus leadership across the Sustainable Energy Club and PSG.",
    main,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Experience", href: "/experience/" },
    ],
  };
}
