import { icon } from "../lib/icons.mjs";
import { person } from "../data/site.mjs";
import { storyParagraphs, quickFacts, skillGroups, credentials } from "../data/about.mjs";
import { portraitImage, eyebrow, sectionHead, button, card } from "../components/ui.mjs";
import { personSchema } from "../components/layout.mjs";
import { absUrl } from "../lib/config.mjs";

export default function about() {
  const facts = quickFacts
    .map((f) => `<li>${icon(f.icon)}<span>${f.text}</span></li>`)
    .join("");

  const story = storyParagraphs.map((p) => `<p>${p}</p>`).join("\n      ");

  const skills = skillGroups
    .map(
      (g) => `<div class="skill-group reveal">
  <h3>${icon(g.icon)} ${g.title}</h3>
  <ul>${g.items.map((i) => `<li>${i}</li>`).join("")}</ul>
</div>`
    )
    .join("");

  const creds = credentials
    .map(
      (c) => `<article class="card reveal">
  <span class="icon-tile">${icon(c.icon)}</span>
  <h3>${c.title}</h3>
  ${c.html}
</article>`
    )
    .join("");

  const main = `
<section class="page-hero">
  <div class="container">
    ${eyebrow("user", "About me")}
    <h1>Hi, I'm Rohan.</h1>
    <p class="lead">A Purdue sophomore who moves comfortably between a marketing dashboard and a soldering iron, and who is happiest when a project needs both.</p>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="split-photo reveal">
      ${portraitImage({ size: 320 })}
      <ul class="contact-list about-facts">${facts}
        <li>${icon("linkedin")}<a href="${person.linkedin}" target="_blank" rel="noopener">${person.linkedinLabel}${icon("external-link", { className: "icon-xs" })}</a></li>
      </ul>
    </div>
    <div class="reveal">
      <h2>My story</h2>
      ${story}
      <div class="btn-row">
        ${button({ href: "/contact/", label: "Get in touch", icon: "mail", variant: "primary" })}
        ${button({ href: person.resume, label: "Download resume (PDF)", icon: "download", external: true })}
      </div>
    </div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="skills-title">
  <div class="container">
    ${sectionHead({ icon: "settings", kicker: "Toolkit", title: "Skills", id: "skills-title" })}
    <div class="grid grid-2 stagger">${skills}</div>
  </div>
</section>

<section class="section" aria-labelledby="edu-title">
  <div class="container">
    ${sectionHead({
      icon: "graduation-cap",
      kicker: "Education &amp; credentials",
      title: "Education, certifications, and honors",
      id: "edu-title",
    })}
    <div class="grid grid-3 stagger">${creds}</div>
  </div>
</section>`;

  return {
    route: "/about/",
    title: "About Rohan Basava | Bangalore to Purdue, Business and Engineering",
    description:
      "From robotics and economics contests in Bangalore to Integrated Business & Engineering at Purdue: Rohan Basava's story, skills, education, and honors.",
    main,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about/" },
    ],
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Rohan Basava",
        url: absUrl("/about/"),
        mainEntity: { "@id": personSchema["@id"] },
      },
    ],
  };
}
