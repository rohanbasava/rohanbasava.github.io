import { icon } from "../lib/icons.mjs";
import { url, absUrl } from "../lib/config.mjs";
import { person } from "../data/site.mjs";
import { caseStudies } from "../data/projects.mjs";
import { competencies, headlineStats } from "../data/about.mjs";
import { portraitImage, eyebrow, stat, card, sectionHead, ctaBand, button } from "../components/ui.mjs";
import { personSchema } from "../components/layout.mjs";

export default function home() {
  const stats = headlineStats.map(stat).join("");
  const studies = caseStudies
    .map((cs) =>
      card({
        icon: cs.icon,
        tags: cs.tags,
        title: cs.cardTitle,
        body: cs.homeSummary,
        href: `/work/${cs.slug}/`,
      })
    )
    .join("");
  const skills = competencies
    .map((c) => card({ icon: c.icon, title: c.title, body: c.body }))
    .join("");

  const main = `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-copy">
      ${eyebrow("compass", "Purdue University &middot; Integrated Business &amp; Engineering")}
      <h1 id="hero-title">Engineering the business side. Running the technical side.</h1>
      <p class="lead">I'm Rohan Basava, a Purdue sophomore in Integrated Business &amp; Engineering. I think in systems, build in prototypes, and communicate in stories, and I'm looking for internships where product strategy, AI, and go-to-market work meet.</p>
      <div class="btn-row">
        ${button({ href: "/contact/", label: "Get in touch", icon: "mail", variant: "primary" })}
        ${button({ href: "/work/", label: "View case studies", icon: "layers" })}
      </div>
      <ul class="hero-badges" aria-label="Current roles">
        <li>${icon("briefcase")} Marketing Strategy &amp; Ops Consultant, SeedlingLabs</li>
        <li>${icon("zap")} Chief Technology Engineer, Sustainable Energy Club</li>
        <li>${icon("users")} Director of Events, We Are Saath</li>
      </ul>
    </div>
    <div class="hero-photo">${portraitImage({ size: 360, eager: true })}</div>
  </div>
</section>

<section class="section section-tight" aria-labelledby="highlights-title">
  <div class="container">
    <h2 id="highlights-title" class="visually-hidden">Highlights</h2>
    <div class="stats reveal">${stats}</div>
  </div>
</section>

<section class="section section-alt" id="about" aria-labelledby="about-title">
  <div class="container split">
    <div class="split-photo reveal">${portraitImage({ size: 320 })}</div>
    <div class="reveal">
      ${eyebrow("user", "About me")}
      <h2 id="about-title">A builder who can also carry the business case</h2>
      <p>I grew up in Bangalore, where I founded my school's debate club, competed in the World Robot Olympiad, and prototyped a WiFi-connected smart lighting product as a product development intern. At Purdue I've kept both halves of that story running: on the business side I own content strategy and CRM segmentation for three AI products at SeedlingLabs; on the technical side I direct a 100-member build team across hydroelectric, wind, and solar projects.</p>
      <p>What ties it together is a habit of scoping ambiguous problems, breaking them into workstreams, and translating technical detail into something a business leader can act on. I made the Dean's List in my first semester while working regular shifts at Purdue Dining and Chick-fil-A, and I'm currently a teaching assistant for two upper-level sociology courses.</p>
      <div class="btn-row">
        ${button({ href: "/about/", label: "More about me", icon: "arrow-right" })}
        ${button({ href: person.resume, label: "Download resume (PDF)", icon: "download", variant: "ghost", external: true })}
      </div>
    </div>
  </div>
</section>

<section class="section" id="work" aria-labelledby="work-title">
  <div class="container">
    ${sectionHead({
      icon: "layers",
      kicker: "Selected work",
      title: "Case studies",
      id: "work-title",
      lead: "Three projects that show how I work: one in growth marketing, two in hardware and systems design.",
    })}
    <div class="grid grid-3 stagger">${studies}</div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="skills-title">
  <div class="container">
    ${sectionHead({ icon: "settings", kicker: "What I bring", title: "Competencies", id: "skills-title" })}
    <div class="grid grid-3 stagger">${skills}</div>
  </div>
</section>

${ctaBand({
  title: "Let's build something together",
  body: "Recruiting for a product, strategy, or marketing internship, or looking for a collaborator on an engineering project? I'd love to hear from you.",
  actions:
    button({ href: "/contact/", label: "Start a conversation", icon: "send" }) +
    button({ href: person.linkedin, label: "Connect on LinkedIn", icon: "linkedin", variant: "ghost", className: "btn-on-dark", external: true }),
})}`;

  return {
    route: "/",
    title: "Rohan Basava | Integrated Business & Engineering, Purdue University",
    description:
      "Portfolio of Rohan Basava, a Purdue Integrated Business & Engineering student working across product strategy, marketing operations, and hands-on engineering.",
    main,
    preloadPortrait: true,
    schemas: [
      personSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: person.name,
        url: absUrl("/"),
        author: { "@id": personSchema["@id"] },
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: absUrl("/"),
        mainEntity: { "@id": personSchema["@id"] },
      },
    ],
  };
}
