# secoyaseventos.cl

Storefront site for Parque y Casa de Eventos Las Secoyas (Calera de Tango). Plain HTML, CSS and JS. No PHP, no database, nothing that runs on the server.

## Folders

| Folder | What it is |
|---|---|
| `site/` | **The website.** Upload the contents of this folder to `public_html` on NixiHost. |
| `partials/` | Header and footer shared by every page. |
| `photos/` | Original photos (max 2400 px). Web versions are generated from these. |
| `tools/` | Two small helper scripts (below). |

## Editing

- **Text on a page:** edit the page's `index.html` in `site/` directly.
- **Header or footer (menu, phones, address):** edit `partials/header.html` or `partials/footer.html`, then run
  `node tools/sync-partials.js` to copy the change into every page.
- **New photo:** drop it in `photos/` with a short name (e.g. `boda-jardin.jpg`), run
  `python tools/optimize-images.py`, and use `/img/boda-jardin-800.webp` (and `-1600.webp`) in the page.
- **Facts** (capacity, m², phones, email) must match the listing site (`../secoyas-inversion - com/`). See `CLAUDE.md`.

## Preview locally

Open the repo in VS Code and click **Go Live** (Live Server extension). It serves `site/` at http://127.0.0.1:5502 and reloads on save. The root is set in `.vscode/settings.json`.

Without VS Code: `cd site` then `python -m http.server 8765`, and open http://127.0.0.1:8765.

Redirects in `.htaccess` only work on the real server.

## Deploy (FileZilla)

1. Connect to NixiHost and open the `public_html` folder for secoyaseventos.cl.
2. Upload **everything inside** `site/`, including the hidden `.htaccess` file (in FileZilla: Server → Force showing hidden files).
3. Visit https://secoyaseventos.cl and check one page, the quote form and the WhatsApp button.

## Launch checklist

- [ ] Add secoyaseventos.cl as an addon domain on NixiHost and turn on free SSL (AutoSSL / Let's Encrypt)
- [ ] At NIC Chile, point the domain's nameservers to NixiHost (and `nuevo.` to the same place)
- [ ] Upload `site/` and confirm https works
- [ ] Create a Google Analytics 4 property and put its ID in `site/js/main.js` (`gaId`)
- [ ] Mark `generate_lead` as a key event in Analytics
- [ ] Google Search Console: add the domain, verify by DNS, submit `sitemap.xml`
- [ ] Bing Webmaster Tools: import from Search Console
- [ ] Google Business Profile: category **Recinto para eventos**, website → https://secoyaseventos.cl, same phone and address as the site
- [ ] Monthly report email to Francisco

## To confirm with Francisco

Stated on the site but not found on the listing site. Correct or remove if wrong:

- Coffee break / almuerzo for company trainings (eventos-empresa)
- Salón montable in mesas imperiales and cocktail format
- Civil and religious ceremonies in the pérgola
- Visits by appointment
- Legal name and RUT for the privacy policy (currently "Las Secoyas SpA", no RUT)
- A "desde $X por persona" price to show on the site (filters out curious browsers and builds trust)
- Whether the Patio de Comidas (restaurant facing the road) should have its own page, with hours and menu

## Ideas for later

- Replace the quote form's "Enviar por correo" button (opens the visitor's email app) with a real send button through Web3Forms (free, no PHP). Needs: which inbox receives quotes, a Web3Forms key, and a line in the privacy policy naming the service.

## Seasonal content

- `site/index.html` has a "Fiestas de fin de año 2026" notice (`<aside class="season">`), and `site/eventos-empresa/index.html` ends with a year-end CTA. Change both in January (e.g. to wedding season).
