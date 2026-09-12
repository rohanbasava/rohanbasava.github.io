import { icon } from "../lib/icons.mjs";
import { esc } from "../lib/html.mjs";
import { config, absUrl } from "../lib/config.mjs";
import { person, contactTopics } from "../data/site.mjs";
import { eyebrow, button } from "../components/ui.mjs";
import { personSchema } from "../components/layout.mjs";

export default function contact() {
  /* With a Formspree ID configured the form posts natively too, so it still
   * works with JavaScript disabled: Formspree honours _next and redirects to
   * the thank-you page itself. Without an ID the form is JavaScript-only and
   * falls back to composing an email in the visitor's own mail client. */
  const endpoint = config.formspreeId ? `https://formspree.io/f/${config.formspreeId}` : "";
  const thankYou = absUrl("/thank-you/");

  const topics = contactTopics
    .map((t) => `<option value="${esc(t)}">${esc(t)}</option>`)
    .join("");

  const details = [
    { icon: "mail", label: "Email", value: `<a href="mailto:${person.email}">${person.email}</a>` },
    { icon: "phone", label: "Phone", value: `<a href="${person.phoneHref}">${person.phone}</a>` },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: `<a href="${person.linkedin}" target="_blank" rel="noopener">${person.linkedinLabel}${icon("external-link", { className: "icon-xs" })}</a>`,
    },
    { icon: "map-pin", label: "Location", value: person.location },
    {
      icon: "download",
      label: "Resume",
      value: `<a href="${person.resume}" target="_blank" rel="noopener">Download as PDF${icon("external-link", { className: "icon-xs" })}</a>`,
    },
  ]
    .map(
      (d) =>
        `<li>${icon(d.icon)}<span><strong>${d.label}</strong><br>${d.value}</span></li>`
    )
    .join("");

  const main = `
<section class="page-hero">
  <div class="container">
    ${eyebrow("mail", "Contact")}
    <h1>Let's talk</h1>
    <p class="lead">Whether you're recruiting for an internship, exploring a collaboration, or just want to compare notes on a project, I'd love to hear from you. I typically reply within two business days.</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <div class="reveal">
      <h2>Reach me directly</h2>
      <ul class="contact-list">${details}</ul>
      <div class="callout"><p><strong>Currently seeking:</strong> internships at the intersection of product strategy, AI, and go-to-market functions.</p></div>
    </div>
    <div class="reveal">
      <form id="contact-form" class="form"
            action="${endpoint}"
            method="post"
            novalidate
            data-thank-you="${thankYou}"
            data-mailto="${person.email}"
            aria-labelledby="form-title">
        <h2 id="form-title" class="form-title">Send a message</h2>
        <p class="muted form-note">Fields marked with an asterisk (*) are required.</p>

        <div class="form-row">
          <div class="field">
            <label for="name">Name <span aria-hidden="true">*</span><span class="visually-hidden">(required)</span></label>
            <input id="name" name="name" type="text" autocomplete="name" required aria-describedby="name-error">
            <p class="error" id="name-error"></p>
          </div>
          <div class="field">
            <label for="email">Email <span aria-hidden="true">*</span><span class="visually-hidden">(required)</span></label>
            <input id="email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="email-error">
            <p class="error" id="email-error"></p>
          </div>
        </div>

        <div class="field">
          <label for="subject">Subject</label>
          <select id="subject" name="subject">${topics}</select>
        </div>

        <div class="field">
          <label for="message">Message <span aria-hidden="true">*</span><span class="visually-hidden">(required)</span></label>
          <textarea id="message" name="message" rows="6" required aria-describedby="message-hint message-error"></textarea>
          <p class="hint" id="message-hint">A sentence or two about what you have in mind is plenty.</p>
          <p class="error" id="message-error"></p>
        </div>

        <input type="hidden" name="_next" value="${thankYou}">
        <input type="hidden" name="_subject" value="Portfolio inquiry for ${esc(person.name)}">
        <div class="honeypot" aria-hidden="true"><label for="_gotcha">Leave this field empty</label><input id="_gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off"></div>

        <button class="btn btn-primary btn-submit" type="submit" data-label="Send message">
          <span class="btn-spinner" aria-hidden="true"></span>
          ${icon("send")}
          <span class="btn-text">Send message</span>
        </button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>`;

  return {
    route: "/contact/",
    title: "Contact Rohan Basava | Internships, Collaborations, and Inquiries",
    description:
      "Get in touch with Rohan Basava about internship opportunities, project collaborations, or campus events. Email, phone, LinkedIn, and a contact form.",
    main,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact/" },
    ],
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Rohan Basava",
        url: absUrl("/contact/"),
        mainEntity: { "@id": personSchema["@id"] },
      },
    ],
  };
}
