import { icon } from "../lib/icons.mjs";
import { url } from "../lib/config.mjs";
import { nav, navCta, person } from "../data/site.mjs";
import { caseStudies } from "../data/projects.mjs";
import { eyebrow, button } from "../components/ui.mjs";

export default function notFound() {
  const destinations = [...nav, navCta]
    .map(
      (item) =>
        `<li><a href="${url(item.href)}">${icon(item.icon)}<span>${item.label}</span></a></li>`
    )
    .join("");

  const studies = caseStudies
    .map(
      (cs) =>
        `<li><a href="${url(`/work/${cs.slug}/`)}">${icon(cs.icon)}<span>${cs.cardTitle}</span></a></li>`
    )
    .join("");

  const main = `
<section class="center-page container">
  <span class="icon-tile icon-tile-warn">${icon("compass")}</span>
  ${eyebrow("alert-triangle", "Error 404")}
  <h1>That page doesn't exist</h1>
  <p class="lead">The address may have a typo, or the link that brought you here may be out of date. Nothing is broken on your end. Here is everything that does exist on this site.</p>
  <div class="btn-row btn-row-center">
    ${button({ href: "/", label: "Go to the homepage", icon: "home", variant: "primary" })}
    ${button({ href: "/contact/", label: "Contact me", icon: "mail" })}
  </div>
</section>

<section class="section section-alt">
  <div class="container notfound-grid">
    <div>
      <h2 class="notfound-heading">Main pages</h2>
      <ul class="link-list">${destinations}</ul>
    </div>
    <div>
      <h2 class="notfound-heading">Case studies</h2>
      <ul class="link-list">${studies}</ul>
    </div>
    <div>
      <h2 class="notfound-heading">Elsewhere</h2>
      <ul class="link-list">
        <li><a href="${person.linkedin}" target="_blank" rel="noopener">${icon("linkedin")}<span>LinkedIn${icon("external-link", { className: "icon-xs" })}</span></a></li>
        <li><a href="${url(person.resume)}" target="_blank" rel="noopener">${icon("download")}<span>Resume (PDF)${icon("external-link", { className: "icon-xs" })}</span></a></li>
        <li><a href="mailto:${person.email}">${icon("mail")}<span>${person.email}</span></a></li>
      </ul>
    </div>
  </div>
</section>`;

  return {
    route: "/404.html",
    outputPath: "404.html",
    title: "Page Not Found (404) | Rohan Basava",
    description:
      "That page could not be found on Rohan Basava's portfolio. Head back to the homepage, browse the case studies, or get in touch.",
    main,
    noindex: true,
  };
}
