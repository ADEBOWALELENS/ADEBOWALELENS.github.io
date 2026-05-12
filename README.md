# Emmanuel Adebowale — Personal Portfolio

Live site: **https://ADEBOWALELENS.github.io**

A fully responsive personal portfolio built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks, no build steps, deploy instantly to GitHub Pages.

---

## Features

- Animated star/particle hero background
- Typing effect cycling through titles
- GitHub API integration (live repo cards + stats)
- Glassmorphism cards with hover lift effects
- Vertical experience timeline
- Inline PDF CV preview
- Contact form via Formspree
- Dark / Light mode toggle (saved to localStorage)
- Scroll-spy navbar with active link highlighting
- Mobile hamburger menu
- Scroll-to-top floating button
- Copy-to-clipboard email with toast notification
- Fully responsive, mobile-first
- SEO + Open Graph meta tags
- GitHub Actions auto-deploy on push to `main`

---

## Project Structure

```
portfolio/
├── index.html                  ← Single-page app
├── css/
│   └── style.css               ← All styles (dark/light theme, animations)
├── js/
│   ├── config.js               ← All personalisation variables — edit here
│   ├── github.js               ← GitHub API module
│   └── main.js                 ← Animations, navbar, form, interactions
├── assets/
│   ├── cv/
│   │   ├── README.md           ← Instructions for adding your CV
│   │   └── resume.pdf          ← ← ADD YOUR CV HERE
│   └── images/                 ← Optional: local images
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Auto-deploys on every push to main
└── README.md
```

---

## Quick Setup

### 1. Add your CV

Drop your CV as `assets/cv/resume.pdf`. The portfolio will auto-detect it and show the inline preview.

### 2. Set up Formspree (contact form)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — copy your Form ID (looks like `xpzvwkqb`)
3. Open `js/config.js` and replace `YOUR_FORM_ID`:
   ```js
   formspreeId: "xpzvwkqb",
   ```

### 3. Edit any personal details

All personalisation lives in `js/config.js`. Edit names, links, experience, education — everything updates automatically.

---

## Deployment to GitHub Pages

### First-time setup

```bash
# 1. Initialise git in the portfolio folder
git init

# 2. Stage all files
git add .

# 3. Create the first commit
git commit -m "Initial portfolio commit"

# 4. Add your GitHub remote
git remote add origin https://github.com/ADEBOWALELENS/ADEBOWALELENS.github.io.git

# 5. Push to main
git branch -M main
git push -u origin main
```

### Enable GitHub Pages

1. Go to your repo: `https://github.com/ADEBOWALELENS/ADEBOWALELENS.github.io`
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` will handle every future deploy automatically

Your site will be live at: **https://ADEBOWALELENS.github.io**

---

## Updating the site

```bash
# Make your changes, then:
git add .
git commit -m "Update portfolio"
git push
```

GitHub Actions deploys automatically — typically live within 60 seconds.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, glassmorphism, grid, animations |
| Scripting | Vanilla JavaScript (ES2020+) |
| Icons | Font Awesome 6, Devicons CDN |
| Fonts | Google Fonts — Inter + Fira Code |
| API | GitHub REST API v3 |
| Form | Formspree |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

---

© 2025 Emmanuel Adebowale
