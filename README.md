# Shree Shakti Tailor - Premium Men's Tailoring Website

Production-ready single-page static website for Shree Shakti Tailor, Ahmedabad, Gujarat.

## Tech Stack
- HTML5
- CSS3
- Bootstrap 5 (CDN)
- Vanilla JavaScript
- Google Fonts (Playfair Display, Inter)
- Font Awesome (CDN)
- AOS (CDN) for reveal animations
- GLightbox (CDN) for gallery previews

## Project Structure

```text
shree-shakti-tailor/
|-- index.html
|-- README.md
|-- .gitignore
|-- assets/
|   |-- css/
|   |   |-- style.css
|   |   `-- responsive.css
|   |-- js/
|   |   |-- config.js
|   |   |-- main.js
|   |   `-- gallery.js
|   |-- images/
|   |   |-- logo/
|   |   |   `-- logo-mark.svg
|   |   |-- hero/
|   |   |   `-- hero-main.svg
|   |   |-- about/
|   |   |   `-- about-workspace.svg
|   |   |-- services/
|   |   |   |-- service-suits.svg
|   |   |   |-- service-shirts.svg
|   |   |   |-- service-wedding.svg
|   |   |   |-- service-trousers.svg
|   |   |   |-- service-blazer.svg
|   |   |   `-- service-alteration.svg
|   |   `-- gallery/
|   |       |-- gallery-formal-01.svg
|   |       |-- gallery-formal-02.svg
|   |       |-- gallery-wedding-01.svg
|   |       |-- gallery-wedding-02.svg
|   |       |-- gallery-shirts-01.svg
|   |       |-- gallery-shirts-02.svg
|   |       |-- gallery-custom-01.svg
|   |       `-- gallery-custom-02.svg
|   `-- favicon/
|       `-- favicon.svg
```

## Run Locally

1. Open the project in VS Code.
2. Start a static server from the project root.
   - Option A (Python):

```bash
python -m http.server 5500
```

   - Option B (Node):

```bash
npx serve .
```

3. Visit:
   - `http://localhost:5500` (Python)
   - or the URL printed by `serve`

## Business Data Configuration

Update all business details in one file:
- `assets/js/config.js`

Config sections:
- `brand`: business and owner text
- `contact`: phone, WhatsApp, Instagram, provided email text
- `location`: address, map search text, optional direct map link overrides
- `seo`: canonical URL and OG image path

### Map Update (Important)
If the owner shares a direct Google Maps link later:
- Set `location.mapEmbedUrlOverride`
- Set `location.mapDirectionsUrlOverride`

If both overrides are empty, the site uses address-based map URLs automatically.

## Collection Images

The service cards and work gallery use the normalized collection assets in:
- `assets/images/collections/`

Collection filenames are descriptive and URL-safe, and the image presentation uses a full-image fit so portrait garments are not cropped inside cards or gallery tiles.
Each visible main-content image is assigned to one section only, so the same collection image is not repeated across Hero, About, Services, Our Work, or Why Choose Us.

## Notes About Email
Provided value is `shreeshaktitailor.com` and is intentionally displayed as plain text only.
No mailto link is used until a full email address is confirmed.

## SEO and Accessibility Included
- Semantic HTML sections and heading hierarchy
- Meta description, Open Graph tags, and production canonical URL
- `robots.txt` and `sitemap.xml` for search-engine discovery
- LocalBusiness/Tailor JSON-LD
- Lazy loading for below-the-fold images
- Accessible contrast-aware theme
- Skip link for keyboard users
- Responsive map iframe and mobile layout

## Deploy to Cloudflare Pages

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. Open Cloudflare Dashboard -> Pages -> Create a project.
3. Connect your repository and select this project.
4. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `/`
5. Deploy.
6. After deployment, verify:
   - `https://shreeshaktitailor.com/`
   - `https://shreeshaktitailor.com/robots.txt`
   - `https://shreeshaktitailor.com/sitemap.xml`

## Content Checklist Before Going Live
- Replace all placeholder photos with real Shree Shakti Tailor photos.
- Confirm final website URL and update canonical URL.
- Confirm complete email address if mail link is needed.
- Optionally update map overrides with an owner-provided share link.
