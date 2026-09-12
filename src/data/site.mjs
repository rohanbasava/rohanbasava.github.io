/* Site-wide content and identity. Copy lives here, not in components. */

export const person = {
  name: "Rohan Basava",
  initials: "RB",
  headline: "Integrated Business & Engineering student at Purdue University",
  jobTitle: "Marketing Strategy & Operations Consultant",
  employer: "SeedlingLabs",
  university: "Purdue University",
  email: "rohanbasava.work@gmail.com",
  phone: "+1 (765) 543-1008",
  phoneHref: "tel:+17655431008",
  linkedin: "https://www.linkedin.com/in/rohanbasava",
  linkedinLabel: "linkedin.com/in/rohanbasava",
  location: "West Lafayette, Indiana (Purdue University)",
  locationShort: "West Lafayette, IN",
  resume: "/assets/Rohan-Basava-Resume.pdf",
  blurb:
    "Integrated Business & Engineering student at Purdue University, working at the intersection of product strategy, marketing operations, and hands-on engineering.",
  knowsAbout: [
    "Product strategy",
    "Go-to-market strategy",
    "Marketing operations",
    "Market research",
    "Rapid prototyping",
    "Arduino",
    "Fusion 360",
    "PCB design",
    "Python",
    "C++",
  ],
  affiliations: [
    "Purdue University",
    "Sustainable Energy Club of Purdue",
    "We Are Saath Purdue",
  ],
};

/* The portrait, described once and reused everywhere. */
export const portrait = {
  alt: "Portrait of Rohan Basava, smiling, wearing a dark suit and glasses",
  sources: {
    webp400: "/assets/img/rohan-basava-400.webp",
    webp800: "/assets/img/rohan-basava-800.webp",
    jpg400: "/assets/img/rohan-basava-400.jpg",
    jpg800: "/assets/img/rohan-basava-800.jpg",
  },
};

export const nav = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about/", icon: "user" },
  { label: "Work", href: "/work/", icon: "layers" },
  { label: "Experience", href: "/experience/", icon: "briefcase" },
];

export const navCta = { label: "Get in touch", href: "/contact/", icon: "mail" };

export const footerLinks = {
  explore: [
    { label: "About", href: "/about/", icon: "user" },
    { label: "Work & case studies", href: "/work/", icon: "layers" },
    { label: "Experience", href: "/experience/", icon: "briefcase" },
    { label: "Contact", href: "/contact/", icon: "mail" },
  ],
  connect: [
    { label: person.email, href: `mailto:${person.email}`, icon: "mail" },
    { label: "LinkedIn", href: person.linkedin, icon: "linkedin", external: true },
    { label: "Resume (PDF)", href: person.resume, icon: "download", external: true },
  ],
};

export const contactTopics = [
  "Internship opportunity",
  "Project collaboration",
  "Speaking or campus event",
  "Something else",
];

export const seoDefaults = {
  ogImage: "/assets/img/rohan-basava-800.jpg",
  ogImageAlt: "Portrait of Rohan Basava",
  themeColor: "#101828",
  locale: "en_US",
};
