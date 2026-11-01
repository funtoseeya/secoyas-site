# Las Secoyas — storefront site

Replacement for https://secoyaseventos.cl/ (old WordPress). Goal: get couples and companies to find Las Secoyas on Google / AI assistants and send a quote request. Owner: Francisco Fontecilla (the user's father).

## Rules

- **Source of truth for facts** (capacity, m², parking, phones, email, address, reviews, photos) is the business listing site: `../secoyas-inversion - com/` (live at inmejorableinversiongastronomica.com). If the old WordPress site disagrees, the listing site wins.
- **Never mention or link to the sale.** The listing site sells the business; this site is the storefront. No links, no "for sale" wording, nothing that suggests the venue may change hands.
- **Layman-friendly for Francisco.** Anything he sees (reports, emails, instructions, admin steps) is in plain Spanish, no jargon. Explain a metric in words ("personas que vieron Las Secoyas en Google") instead of naming it ("impresiones"). If a term is unavoidable, explain it in one short sentence. Short, big numbers, and what they mean for the business.
- **Stack: plain HTML/CSS/JS + small PHP where needed** (form handling), same approach as the listing site. Hosted on NixiHost, deployed by FTP. No build step, no frameworks that require Node on the server.
- **Accounts belong to the business**, not to personal Gmail accounts (Search Console, Analytics, Business Profile, domain), so they can be handed over cleanly later.

## Scope

- In: multi-page site (one page per event type), quote form → WhatsApp + email, structured data, local SEO / AI-search basics, Google reviews, Search Console + Bing + Analytics setup, Google Business Profile fixes, privacy/cookie notice (Ley 21.719, in force 2026-12-01), automated monthly report emailed to Francisco.
- Out for now: blog articles, social media management, paid ads.
