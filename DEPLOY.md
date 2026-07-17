# Deploying Roots Tropical Cocktails

This is a **static site** (plain HTML/CSS/JS) — no build step, no server code.
You just upload the folder to a static host and point your domain at it.

Recommended host: **Netlify** (free, free SSL, custom domains, drag-and-drop).
Alternatives that work the same way: Cloudflare Pages, Vercel, GitHub Pages.

---

## ⚠️ Read this first — which branch has the site?

All the real work lives on the **`branch1`** branch. The repo's default branch on
GitHub is **`main`**, which is still the near-empty initial commit.

**This matters:** if you connect Netlify to GitHub, it deploys `main` by default —
you'd publish an empty site. Pick one:

- **Recommended — make `main` the real site** (do this once):
  ```bash
  git checkout main
  git merge branch1
  git push origin main
  git checkout branch1     # optional: go back to where you were
  ```
- **Or** leave the branches as-is and set Netlify's deploy branch to `branch1`
  (Netlify: *Site configuration → Build & deploy → Branches → Production branch*).

Not an issue if you use the drag-and-drop method (Option A) — that uploads your
local folder and ignores git entirely.

---

## Before you deploy — status

Already done ✅
- Real menu, pricing, and the Tropical Trio package
- WhatsApp booking form — number is set (+961 70 579 780) and tested working
- Social share image (`assets/og-image.png`) wired into all 3 pages
- Favicon, Google Maps embed, hours, phone, Instagram (`@_roots.lb_`)
- SEO: meta tags, canonical URLs, structured data, `sitemap.xml`, `robots.txt`
- All URLs point at `https://roots-cocktails.com`

Still open
- [ ] **Google Analytics ID** — replace `G-XXXXXXXXXX` in `js/analytics.js`.
      Until then the script no-ops (no tracking, no cookies). The site works fine
      without it. See "After go-live" below for where to get the ID.
- [ ] **Bar photo (optional)** — there is no `assets/bar.jpg`. The photo slots on
      the home and events pages are currently **hidden**, so nothing looks broken.
      To turn them back on: add `assets/bar.jpg`, then in `index.html` and
      `events.html` uncomment the image block and change that section's
      `class="container"` back to `class="container grid grid-2"`.
- [ ] Click through all 3 pages once locally before shipping.

To preview locally:
```bash
npx -y serve -l 8000 .
# then open http://localhost:8000
```

---

## Option A — Netlify drag-and-drop (fastest, ~5 min)

1. Go to https://app.netlify.com and sign up (free — use email or GitHub).
2. Click **Add new site → Deploy manually**.
3. Drag the **entire `Roots` folder** onto the upload area.
4. Netlify gives you a live URL instantly, e.g. `https://random-name-123.netlify.app`.
   Open it and confirm everything works.

### Updating the site later
Re-drag the folder onto the same site (Deploys tab → drag-and-drop).

---

## Option B — GitHub + Netlify (auto-deploy on every change)

The repo already exists at **https://github.com/amr-abh/Roots.git** and `origin`
is already configured — no `git init` needed.

1. Push your latest work:
   ```bash
   git push origin branch1
   ```
   (And handle the branch question above — merge into `main`, or point Netlify at `branch1`.)
2. In Netlify: **Add new site → Import an existing project → GitHub** → pick the `Roots` repo.
3. Build settings:
   - Build command: **leave empty**
   - Publish directory: **`.`** (the root)
   - Production branch: **`main`** (or `branch1` — see the warning above)
4. Deploy. Every `git push` to that branch now redeploys automatically.

---

## Connect your domain (roots-cocktails.com)

Works the same for either option.

1. Buy the domain if you haven't (Namecheap, GoDaddy, Cloudflare, etc.).
2. In Netlify: **Site configuration → Domain management → Add a domain** →
   type `roots-cocktails.com`.
3. Netlify shows you DNS records to set. Two common paths:
   - **Easiest:** change your domain's **nameservers** to Netlify's (Netlify shows
     them). Do this at your registrar. Propagation takes 15 min–24 hrs.
   - **Or** keep your registrar's DNS and add the records Netlify lists
     (an `A` record for the apex + a `CNAME` for `www`).
4. Also add `www.roots-cocktails.com` and set one as primary (a redirect is created
   automatically). Netlify provisions HTTPS/SSL for free once DNS resolves.

> The site's meta tags, sitemap and structured data all hardcode
> `https://roots-cocktails.com`. Social previews and SEO only work correctly once
> that domain is actually pointing at the site.

---

## After go-live

1. **Google Analytics** — https://analytics.google.com → create an account, then a
   property, then a **Web** data stream for `https://roots-cocktails.com`. Copy the
   **Measurement ID** (`G-XXXXXXXXXX`) into `js/analytics.js`, redeploy, then check
   GA4 → **Reports → Realtime** shows your own visit.
2. **Google Search Console** — https://search.google.com/search-console
   Add `roots-cocktails.com`, verify ownership (Netlify supports the DNS/TXT method),
   then submit your sitemap: `https://roots-cocktails.com/sitemap.xml`.
3. **Google Business Profile** — https://business.google.com
   Create a free listing so Roots shows up on Google Maps and local search.
   Add the website, hours (11 AM–Midnight daily), phone (+961 70 579 780) and photos.
   This is the single highest-impact thing for "cocktails Batroun" type searches.
4. **Test social previews** — paste your URL into
   https://developers.facebook.com/tools/debug/ and click "Scrape Again" to refresh
   the WhatsApp/Facebook link card.
5. **Test the booking form** on the live site — submit it and confirm WhatsApp opens
   with the message pre-filled.

---

## Files & structure

```
Roots/
├── index.html         # landing page
├── menu.html          # menu (cocktails, mocktails, shots, Tropical Trio)
├── events.html        # booking page + WhatsApp form
├── css/styles.css     # all styling
├── js/
│   ├── main.js        # nav, scroll animations, booking form → WhatsApp
│   └── analytics.js   # Google Analytics (add your GA4 ID here)
├── assets/
│   ├── roots_plain_logo_transparent.png   # hero + footer logo
│   ├── roots_favicon.png                  # browser tab / apple-touch icon
│   ├── light-bg.jpg                       # hero + page-header background
│   ├── og-image.png                       # social share card image
│   └── pineapple-icon.png                 # tagline accent icon
├── robots.txt         # search-engine crawl rules
├── sitemap.xml        # page list for Google
└── DEPLOY.md          # this file
```

Unused assets currently kept in `assets/` (safe to delete anytime, not referenced
by any page): `coconut-icon.png`, `watermelon-icon.png`, `fruit_illustration.png`,
`light-bg2.png` (duplicate of `og-image.png`), `roots_logo_transparent.png`.
