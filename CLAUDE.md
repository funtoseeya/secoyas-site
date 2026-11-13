# Las Secoyas — storefront site

Replacement for https://secoyaseventos.cl/ (old WordPress). Goal: get couples and companies to find Las Secoyas on Google / AI assistants and send a quote request. Owner: Francisco Fontecilla (the user's father).

## Rules

- **Source of truth for facts** (capacity, m², parking, phones, email, address, reviews, photos) is the business listing site: `../secoyas-inversion - com/` (live at inmejorableinversiongastronomica.com). If the old WordPress site disagrees, the listing site wins. **Exception:** facts the owners updated at the 2026-11-07 meeting (sent by Franco, the Google Ads manager) win over the listing site: up to 280 guests (ampliable con carpa), 65 parking spots, "más de 15 años", Pagoda de ceremonias 100 m², 16 lámparas; contact WhatsApp +56 9 5941 5518 and yasminsecoyaseventos@gmail.com, shown as "Coordinación de eventos" (Francisco's +56 9 6834 5841 must not appear anywhere).
- **Never mention or link to the sale.** The listing site sells the business; this site is the storefront. No links, no "for sale" wording, nothing that suggests the venue may change hands.
- **Layman-friendly for Francisco.** Anything he sees (reports, emails, instructions, admin steps) is in plain Spanish, no jargon. Explain a metric in words ("personas que vieron Las Secoyas en Google") instead of naming it ("impresiones"). If a term is unavoidable, explain it in one short sentence. Short, big numbers, and what they mean for the business.
- **Stack: plain HTML/CSS/JS + small PHP where needed** (form handling), same approach as the listing site. Hosted on cPanelHost (cpanelhost.cl, which also runs the domain's DNS), deployed by FTP. No build step, no frameworks that require Node on the server.
- **Accounts:** Search Console and Analytics live on the user's own Google account (their choice, to keep it simple). If the business changes hands, add the new owner as a second owner in each tool. The Google Business Profile already exists; claim it, never create a duplicate.

## Scope

- In: multi-page site (one page per event type), quote form → WhatsApp + email, structured data, local SEO / AI-search basics, Google reviews, Search Console + Bing + Analytics setup, Google Business Profile fixes, privacy/cookie notice (Ley 21.719, in force 2026-12-01).
- Out for now: blog articles, social media management. Paid ads and the monthly results report to Francisco are handled by Franco (Lodestar), not this repo.
