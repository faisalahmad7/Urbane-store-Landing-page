<div align="center">

# urbané

**Genuine footwear and clothing. Kausar Baugh, Pune.**

A fast, animated, mobile-first landing page for the urbané walk-in store.

![Vite](https://img.shields.io/badge/built%20with-Vite-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/vanilla-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/styles-plain%20CSS-1572B6?logo=css3&logoColor=white)
![No framework](https://img.shields.io/badge/runtime%20dependencies-0-brightgreen)

</div>

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Customising the site](#customising-the-site)
- [Deployment](#deployment)
- [Accessibility and performance](#accessibility-and-performance)
- [Code style](#code-style)
- [Credits](#credits)
- [License](#license)

## Overview

urbané is a walk-in store selling genuine branded footwear and clothing (1-year footwear
warranty, GST billed, flat 50% off). This site is a single landing page that sells the store's
promise, shows the shop floor, and gets people to visit, call or WhatsApp.

There is no framework and no runtime dependency. Vite is used only for the dev server and
the production build.

## Features

- **Animated intro:** a drawn logo loader that slides away.
- **Hero collage:** full-bleed storefront photo with floating photo cards that follow the
  mouse on desktop.
- **Moving brand strip and ribbons:** Nike, adidas, Puma, Reebok, Fila, New Balance,
  Skechers and Crocs.
- **Scroll reveals and count-up stats:** 100% genuine, 1-year footwear warranty, flat 50% off,
  4.9 on Google.
- **Footwear and clothing panels:** each opens its own photo set.
- **"Inside urbané" photo reels:** two endlessly scrolling rows of real store photos.
- **Photo viewer:** keyboard arrows, Escape to close, swipe on touch screens, captions and
  focus return.
- **Shoe-care before/after slider:** a drag slider over an illustrated sneaker.
- **Google reviews:** two looping rows of customer quotes.
- **FAQ, address, hours and map:** with direct links to Google Maps.
- **WhatsApp and call buttons:** pre-filled WhatsApp messages and a floating chat button.
- **Side menu with smooth anchor scrolling.**
- **Respects `prefers-reduced-motion`:** animations are skipped for people who ask for it.

## Tech stack

| Layer     | Choice                                              |
| --------- | --------------------------------------------------- |
| Markup    | Semantic HTML5                                      |
| Styling   | Plain CSS with custom properties, split by section  |
| Behaviour | Vanilla JavaScript (ES modules), one file per feature |
| Tooling   | [Vite](https://vite.dev) 6, Prettier, EditorConfig  |
| Fonts     | Bricolage Grotesque and Outfit (Google Fonts)       |
| Images    | WebP                                                |

## Getting started

**Requirements:** [Node.js](https://nodejs.org) 18 or newer.

```bash
# 1. Install
npm install

# 2. Start the dev server
npm run dev
```

Open the URL Vite prints, usually <http://localhost:5173>. Changes reload instantly.

> The page uses ES modules, so open it through `npm run dev`. Double-clicking
> `index.html` will not work.

## Scripts

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload           |
| `npm run build`   | Create the production build in `dist/`         |
| `npm run preview` | Serve the production build locally             |
| `npm run format`  | Format every file with Prettier                |

## Project structure

```text
urbane-landing/
├── index.html                 Page markup
├── package.json
├── vite.config.js
├── public/                    Served as-is
│   ├── logo.webp              Urbané badge logo, used everywhere the logo appears
│   ├── favicon.svg            Same badge as the tab icon (plus favicon-48/192.png, apple-touch-icon.png)
│   └── images/
│       ├── logos/             Brand logos (.webp)
│       └── photos/            Store photos (.webp)
└── src/
    ├── main.js                Entry point: starts each feature
    ├── config/
    │   └── siteConfig.js      Phone number and WhatsApp messages
    ├── data/
    │   ├── photos.js          Photo paths, sizes, captions, photo sets
    │   ├── brands.js          Brand logo strip
    │   └── reviews.js         Google reviews
    ├── scripts/               One file per feature
    │   ├── nav.js             Header, side menu, smooth anchors
    │   ├── reels.js           Photo reels and image loading
    │   ├── ribbons.js         Ribbons and brand strip
    │   ├── reveal.js          Scroll reveal and counters
    │   ├── parallax.js        Hero and scroll parallax
    │   ├── lightbox.js        Photo viewer
    │   ├── shoe-care.js       Before/after slider
    │   ├── sneaker.js         Sneaker illustration (SVG)
    │   ├── reviews.js         Review rows
    │   ├── whatsapp.js        WhatsApp links
    │   ├── cursor.js          Desktop cursor ring
    │   └── utils.js           Shared helpers and scroll lock
    └── styles/                One file per section
        ├── main.css           Imports everything, in order
        ├── base.css           Colours, fonts, reset
        ├── responsive.css     Tablet and phone overrides
        └── ...                hero, footer, menu, lightbox and more
```

CSS load order matters. `src/styles/main.css` lists the files in the order they apply, and
`responsive.css` stays last so it can override the rest.

## Customising the site

| I want to change...                      | Edit                                               |
| ---------------------------------------- | -------------------------------------------------- |
| Headlines, copy, FAQ, address, links     | `index.html`                                       |
| Phone number                             | `src/config/siteConfig.js` and the `tel:` links in `index.html` |
| Email address                            | Search `support@urbane.in` in `index.html` (visit section and footer) |
| "View all reviews" link                  | Search `Shoe+store+Kausar+Baugh+Pune+reviews` in `index.html` |
| WhatsApp message text                    | `src/config/siteConfig.js`                         |
| Brand colours, fonts, spacing            | `:root` tokens in `src/styles/base.css`            |
| One section's look                       | `src/styles/<section>.css`                         |
| Photo captions or which photos appear    | `src/data/photos.js`                               |
| Brand logos                              | `src/data/brands.js`                               |
| Customer reviews                         | `src/data/reviews.js`                              |

### Common jobs

**Change the phone number**
1. Update `PHONE` in `src/config/siteConfig.js` (country code first, no `+`).
2. Search `9096664198` in `index.html` and replace the call and WhatsApp links.

**Swap a photo**
Replace the file in `public/images/photos/` with a new one of the same name. If its shape
changes, update its `width` and `height` in `src/data/photos.js`.

**Add a brand logo**
1. Put a `.webp` (about 120 px tall) in `public/images/logos/`.
2. Add a row to `src/data/brands.js`.
3. Also add the brand name to the hidden list under the strip in `index.html`, which
   screen readers use.

**Add a review**
Add `{ text: "...", author: "..." }` to `src/data/reviews.js`.

## Deployment

```bash
npm run build
```

This writes a static site to `dist/`. Any static host works.

| Host             | Setup                                                                |
| ---------------- | -------------------------------------------------------------------- |
| Cloudflare Pages | Connect the repo, build command `npm run build`, output `dist`       |
| Netlify          | Connect the repo, build command `npm run build`, publish dir `dist`  |
| Vercel           | Import the repo, framework preset "Vite"                             |
| Any web host     | Upload the contents of `dist/`                                       |

**GitHub Pages:** the site lives at `/<repo-name>/`, so set `base: "/urbane-landing/"` in
`vite.config.js` and change the absolute `/images/...` paths in `src/data/*.js` to start
with `import.meta.env.BASE_URL`. A custom domain or any host above avoids this.

## Accessibility and performance

- Semantic landmarks, labelled buttons and a focus ring on every interactive element.
- The photo viewer traps scroll, supports keyboard and returns focus when it closes.
- Motion is reduced automatically when the visitor's device asks for it.
- WebP images, lazy-loaded reels, and explicit image sizes to avoid layout shift.
- Safe-area padding for phones with notches.

## Code style

Prettier and EditorConfig are configured. In VS Code, install the recommended extensions
when prompted and files format on save, or run `npm run format`.

## Credits

- Shelf and rail photos are from the urbané store.
- The storefront and one interior view are AI-retouched, and the shoe-care graphic is an
  illustration.
- Brand names and logos belong to their respective owners and are shown to indicate which
  brands the store stocks.
- Fonts: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) and
  [Outfit](https://fonts.google.com/specimen/Outfit), via Google Fonts.

## License

© urbané, Pune. All rights reserved.
