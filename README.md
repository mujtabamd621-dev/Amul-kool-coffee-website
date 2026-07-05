# Amul Kool Café — Premium Experience Website

A premium, fully responsive multi-page website for Amul Kool Café, built using vanilla HTML, CSS, and JavaScript. Designed with a luxury "Cinematic Minimalism" aesthetic featuring glassmorphism, a scroll-driven product animation, and elegant typography.

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero with scroll-driven product animation, feature highlights |
| Product | `/product` | Product spotlight, ingredients, nutrition, benefits |
| Story | `/about` | Brand timeline, store locator |
| Gallery | `/gallery` | Lifestyle gallery, FAQs, legal |

## Features

- 🎬 **Scroll-driven animation** — 271-frame product rotation synced to user scroll
- 🌟 **Glassmorphism UI** — Premium blurred glass-panel cards, nav, and overlays
- 📱 **Fully Responsive** — Hamburger mobile menu drawer, fluid typography
- ✨ **Micro-animations** — Scroll reveals, floating badges, hover transitions
- 🖋️ **Premium Typography** — Bodoni Moda for display, Montserrat for body
- 🌐 **WebGL Background Shader** — Animated coffee particle shader in hero
- 🍵 **Velvet Roast Design System** — Custom curated color palette and design tokens

## Design System

- **Primary**: `#0c0301` (Deep Coffee Black)
- **Secondary**: `#885210` (Warm Caramel)
- **Accent**: `#ffe088` (Gold)
- **Background**: `#faf9f6` (Cream Off-White)
- **Fonts**: Bodoni Moda + Montserrat (via Google Fonts)

## Deployment

### Vercel (Recommended)

1. Import this repository into [Vercel](https://vercel.com).
2. Vercel auto-detects the static site from `vercel.json`.
3. No build step required — click **Deploy**.

### Local Development

Run the included PowerShell server (no Node.js/Python required):

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Then open **http://localhost:8080/** in your browser.

## File Structure

```
/
├── index.html          # Home page — Hero + Scroll Animation
├── product.html        # Product detail & nutrition
├── about.html          # Brand story & store locator
├── gallery.html        # Lifestyle gallery, FAQs, legal
├── vercel.json         # Vercel routing & cache config
├── serve.ps1           # Local static file server (PowerShell)
├── package.json        # Optional: Vite dev server config
└── assets/
    ├── css/
    │   └── style.css   # Shared premium design system CSS
    ├── js/
    │   └── main.js     # Shared animations, mobile menu, scroll logic
    └── frames/
        └── ezgif-frame-001.jpg ... ezgif-frame-271.jpg
```
