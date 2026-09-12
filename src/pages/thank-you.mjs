import { person } from "../data/site.mjs";
import { eyebrow, button } from "../components/ui.mjs";
import { icon } from "../lib/icons.mjs";

export default function thankYou() {
  const main = `
<section class="center-page container">
  <span class="icon-tile icon-tile-success">${icon("check-circle")}</span>
  ${eyebrow("send", "Message sent")}
  <h1>Thank you for reaching out</h1>
  <p class="lead">Your message is on its way. I read every inquiry personally and typically reply within two business days. If it's time-sensitive, feel free to email me directly at <a href="mailto:${person.email}">${person.email}</a>.</p>
  <div class="btn-row btn-row-center">
    ${button({ href: "/", label: "Back to home", icon: "home", variant: "primary" })}
    ${button({ href: "/work/", label: "Browse case studies", icon: "layers" })}
    ${button({ href: "/about/", label: "About me", icon: "user" })}
  </div>
</section>`;

  return {
    route: "/thank-you/",
    title: "Message Received | Rohan Basava",
    description:
      "Thanks for contacting Rohan Basava. Your message has been received and you can expect a reply within two business days.",
    main,
    noindex: true,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact/" },
      { label: "Message received", href: "/thank-you/" },
    ],
  };
}
