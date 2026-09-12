# Rohan Basava portfolio

A static portfolio site. No framework, no runtime dependencies, no build
dependencies: the generator is plain Node, and what it produces is HTML, one
stylesheet and one script.

```
npm run build     # generate dist/
npm run check     # verify the build (links, metadata, accessibility)
npm start         # build, then serve dist/ at http://localhost:8080
```

Node 18 or newer. There is nothing to `npm install`.

---

## Before you deploy: three things to set

Everything deployment-specific lives in **`site.config.json`**. Change it, run
`npm run build`, and every canonical URL, Open Graph tag, sitemap entry and
structured-data node updates together.

### 1. Your domain

```json
"siteUrl": "https://rohanbasava.github.io",
"basePath": ""
```

| Where the site lives | `siteUrl` | `basePath` |
| --- | --- | --- |
| GitHub Pages user site (`rohanbasava.github.io`) | `https://rohanbasava.github.io` | `""` |
| GitHub Pages project site (`rohanbasava.github.io/portfolio/`) | `https://rohanbasava.github.io` | `"/portfolio"` |
| Custom domain | `https://yourdomain.com` | `""` |

`basePath` takes a leading slash and no trailing slash. Every internal link is
built through it, so a project site works without editing any page.

### 2. The contact form

The form is wired and validated but has nowhere to send mail until you give it
an endpoint. Until then it falls back to opening the visitor's own email client
with the message pre-filled, and says plainly that the message is a draft until
they press send there.

To make it send for real:

1. Create a free form at [formspree.io](https://formspree.io) using the email
   address you want inquiries delivered to.
2. Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
   Copy the ID off the end, not the whole URL.
3. Put it in `site.config.json`:

   ```json
   "formspreeId": "abcdwxyz"
   ```

4. `npm run build`.

Confirm the first submission from Formspree's dashboard; that is their standard
verification step for a new form.

Once an ID is set the form submits in the background and shows loading, success
and error states, then sends the visitor to `/thank-you/`. It also works with
JavaScript switched off: the form posts natively and Formspree honours the
`_next` field to perform the same redirect.

**Using a different provider?** Any service that accepts a `multipart/form-data`
POST and returns JSON will work (Basin, Web3Forms, a Resend function of your
own). The only thing to change is the endpoint built in
`src/pages/contact.mjs`; the validation, states and redirect need no edits.

No key, endpoint or address is ever hard-coded outside `site.config.json`, and
nothing secret belongs in this repository. Formspree IDs are public by design
(they sit in the form's HTML), so this one is safe to commit.

### 3. Your resume and photo

- Resume: replace `src/assets/Rohan-Basava-Resume.pdf`.
- Photo: replace the four files in `src/assets/img/` (400px and 800px, JPEG and
  WebP). Keeping all four keeps the responsive `srcset` working. If the new
  portrait is framed differently, update `portrait.alt` in `src/data/site.mjs`
  so the description still matches the picture.

---

## Deploying

### GitHub Pages (set up in this repo)

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. It
runs `npm run check` first, so a broken link or a duplicated page title fails
the deploy rather than shipping.

One-time: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

For a project site, remember to set `basePath` as described above.

### Anywhere else

`npm run build`, then upload `dist/`. It is a plain static folder and works on
Netlify, Vercel, Cloudflare Pages, S3 or any web server.

- Point the host's custom error page at `/404.html` if it does not pick it up
  automatically. GitHub Pages, Netlify and Cloudflare Pages all do.
- No server-side rewrites are needed. Every route is a real directory with an
  `index.html`, so `/work/geiger-counter-prototype/` resolves on any host, typed
  directly, refreshed, or deep-linked.

---

## Editing content

Content is separated from markup. In most cases you will only touch `src/data/`:

| File | What it holds |
| --- | --- |
| `src/data/site.mjs` | Name, contact details, navigation, footer links, portrait alt text |
| `src/data/projects.mjs` | Case studies (section by section) and the shorter project cards |
| `src/data/experience.mjs` | Roles, campus leadership, work while studying |
| `src/data/about.mjs` | About-page story, skills, credentials, homepage stats and competencies |

Adding a case study means adding one entry to `caseStudies` in
`src/data/projects.mjs`. The page, its route, its card on the homepage and the
work index, its breadcrumbs, its previous/next links, its sitemap entry and its
structured data are all generated from that entry.

### Statistics that count up

Any stat can animate from zero by giving it a target:

```js
{ value: "54%", countTo: 54, suffix: "%", label: "..." }
```

`value` is what renders in the HTML, so the real number is present for search
engines, for anyone with JavaScript off, and for anyone who prefers reduced
motion. The animation only ever replaces a number that is already correct.

---

## How it is put together

```
site.config.json        Domain, base path, form endpoint
src/
  data/                 All copy and content
  components/           layout (head, header, breadcrumbs, footer), ui, diagrams
  lib/                  config, html escaping, icon sprite
  pages/                One module per route
  assets/               style.css, main.js, images, resume
tools/
  build.mjs             Generates dist/
  check.mjs             Verifies dist/
  serve.mjs             Local preview server
dist/                   Build output (generated, not committed)
```

**Routing.** Each page declares a route such as `/about/` and is written to
`dist/about/index.html`. The `.html` addresses the site used previously
(`/about.html`, `/work/geiger-counter-prototype.html`) are still published as
redirect stubs, so any link already shared keeps working.

**Icons.** One 24px stroked outline set, defined once in
`src/lib/icon-data.json`. Each page inlines only the symbols it actually uses,
so there is no icon request and no unused weight. Icons are decorative by
default and hidden from screen readers; `icon(name, { label })` makes one
meaningful when no nearby text already says the same thing.

**Motion.** Reveal-on-scroll, staggered grids, counting statistics, page fades
and the animated menu are all enhancements. The motion styles are scoped to a
`.js` class set before first paint, so with scripting unavailable the page
renders complete and static rather than blank. Everything is disabled under
`prefers-reduced-motion`.

---

## What `npm run check` verifies

It fails the build on anything a visitor would meet broken:

- every internal link, image, `srcset` candidate and sitemap URL resolves
- every page has a unique title, meta description and canonical URL
- `og:url` matches the canonical; Open Graph and Twitter tags are present
- JSON-LD parses, and no page claims to be a `LocalBusiness`
- every `<img>` has an `alt` attribute
- exactly one `<h1>` per page, and no skipped heading levels
- a `<main>` landmark, a skip link, a `lang` attribute, and an accessible name
  on every button
- no leftover placeholder text and no empty anchors

Run it before any deploy. The GitHub Actions workflow already does.
