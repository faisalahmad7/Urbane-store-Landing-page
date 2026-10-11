# urbané — Landing Page

Landing page for urbané, a genuine footwear and clothing store in Kausar Baugh, Pune.
Plain HTML, CSS and JavaScript, set up with Vite so it runs the same way as the Xpert site.

## Run it

```
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Where to edit things

| What                                         | File                                            |
| -------------------------------------------- | ----------------------------------------------- |
| Text, sections, links, address               | `index.html`                                    |
| Phone number and WhatsApp messages           | `src/config/siteConfig.js` (and `index.html`)   |
| Photo list, sizes and captions               | `src/data/photos.js`                            |
| Brand logos in the moving strip              | `src/data/brands.js`                            |
| Google reviews                               | `src/data/reviews.js`                           |
| Colours, fonts, spacing (tokens at the top)  | `src/styles/base.css`                           |
| One section's styles                         | `src/styles/<section>.css`                      |
| Phone and tablet layout                      | `src/styles/responsive.css`                     |
| Photo viewer, menu, animations, slider logic | `src/scripts/`                                  |

## Project layout

```
index.html              page markup
public/                 files served as-is (/images/..., favicon)
  images/logos/         brand logos
  images/photos/        store photos
src/
  main.js               entry point, starts each feature
  config/siteConfig.js  phone number, WhatsApp messages
  data/                 photos, brands, reviews
  scripts/              one file per feature (nav, lightbox, reveal, ...)
  styles/               one file per section; main.css imports them all
```

Style order matters: `src/styles/main.css` lists the files in the order they load.

## Common jobs

- **Change the phone number:** edit `PHONE` in `src/config/siteConfig.js`, and search
  `9096664198` in `index.html` for the call links.
- **Swap a photo:** replace the file in `public/images/photos/` with a new one of the same
  name. If the shape changes, update its `width` and `height` in `src/data/photos.js`.
- **Add a brand logo:** put a `.webp` in `public/images/logos/`, then add a row in
  `src/data/brands.js`.
- **Add a review:** add a row in `src/data/reviews.js`.

## Build for hosting

```
npm run build
```

Outputs static files to `dist/`, which you can upload to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, cPanel, etc.).

## Formatting

The project includes Prettier and EditorConfig settings. In VS Code, install the
recommended extensions when prompted and files format on save, or run `npm run format`.

Fonts (Bricolage Grotesque, Outfit) load from Google Fonts, so the page needs internet the first time.
