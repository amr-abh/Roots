# Deploying Roots Tropical Cocktails

This is a **static site** (plain HTML/CSS/JS) — no build step, no server code.
You just upload the folder to a static host and point your domain at it.

Recommended host: **Netlify** (free, free SSL, custom domains, drag-and-drop).
Alternatives that work the same way: Cloudflare Pages, Vercel, GitHub Pages.

---

## Before you deploy — final checklist

- [ ] Add a real bar photo at `assets/bar.jpg`
- [ ] Set your Google Analytics ID in `js/analytics.js` (replace `G-XXXXXXXXXX`)
- [ ] (Optional) Add a share image at `assets/og-image.jpg` (1200×630) and point the
      `og:image` / `twitter:image` tags at it in all 3 HTML files
- [ ] Open `index.html`, `menu.html`, `events.html` locally and click every link once

---

## Option A — Netlify drag-and-drop (fastest, ~5 min)

1. Go to https://app.netlify.com and sign up (free — use email or GitHub).
2. Click **Add new site → Deploy manually**.
3. Drag the **entire `Roots` folder** onto the upload area.
4. Netlify gives you a live URL instantly, e.g. `https://random-name-123.netlify.app`.
   Open it and confirm everything works.

### Connect your domain (roots-cocktails.com)

5. First, buy the domain if you haven't (Namecheap, GoDaddy, Cloudflare, etc.).
6. In Netlify: **Site configuration → Domain management → Add a domain** →
   type `roots-cocktails.com`.
7. Netlify shows you DNS records to set. Two common paths:
   - **Easiest:** change your domain's **nameservers** to Netlify's (Netlify shows them).
     Do this at your domain registrar. Propagation takes 15 min–24 hrs.
   - **Or** keep your registrar's DNS and add the records Netlify lists
     (an `A` record for the apex + a `CNAME` for `www`).
8. Also add `www.roots-cocktails.com` and set one as primary (a redirect is created
   automatically). Netlify provisions HTTPS/SSL for free once DNS resolves.

### Updating the site later
Re-drag the folder onto the same site (Deploys tab → drag-and-drop), or connect a
GitHub repo so it redeploys automatically on every push.

---

## Option B — GitHub + Netlify (auto-deploy on every change)

1. Create a GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/roots.git
   git push -u origin main
   ```
2. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repo.
3. Build settings: **leave build command empty**, **publish directory = `.`** (root).
4. Deploy. Every `git push` now redeploys automatically.
5. Connect the domain exactly as in Option A, steps 5–8.

---

## After go-live

1. **Google Search Console** — https://search.google.com/search-console
   Add `roots-cocktails.com`, verify ownership (Netlify supports the DNS/TXT method),
   then submit your sitemap: `https://roots-cocktails.com/sitemap.xml`.
2. **Google Business Profile** — https://business.google.com
   Create a free listing for Roots so you show up on Google Maps and local search.
   Add the website, hours (11 AM–Midnight), phone (+961 70 579 780) and photos.
3. **Test social previews** — paste your URL into
   https://developers.facebook.com/tools/debug/ and click "Scrape Again" to refresh
   the WhatsApp/Facebook link card.
4. **Confirm analytics** — after setting your GA ID, open the live site and check
   GA4 → Reports → Realtime shows your visit.

---

## Files & structure (for reference)

```
Roots/
├── index.html         # landing page
├── menu.html          # menu
├── events.html        # booking page
├── css/styles.css     # all styling
├── js/
│   ├── main.js        # nav, scroll animations, booking form → WhatsApp
│   └── analytics.js   # Google Analytics (add your ID here)
├── assets/            # logo, favicon, backgrounds, bar.jpg
├── robots.txt         # search-engine crawl rules
├── sitemap.xml        # page list for Google
└── DEPLOY.md          # this file
```
