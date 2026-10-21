# urbané React rebuild: hand-off

React 18 + Vite 6, plain JSX, `react` and `react-dom` only. One page, no router. Cloudflare deploy.

## 1. Copy your media (once)
Copy the old repo's `public/` folder into this project's `public/` (same paths: `images/logos`, `images/photos`, `images/thumbs`, `videos`, `logo.webp`, favicons). Then delete `public/videos/hero.webm` and `public/videos/hero-m.webm` (the site now uses MP4 only; saves ~20 MB).

Windows: `xcopy /E /I "path\to\Urbane-store-Landing-page\public" public`
Mac: `cp -R path/to/Urbane-store-Landing-page/public ./public`

## 2. Run and deploy
```
npm install
npm run dev        # local
npm run deploy     # vite build && wrangler deploy
```

## 3. Video check (iPhone fix)
The 4 video files must be: /videos/hero.mp4, /videos/hero-m.mp4, /videos/hero-poster.jpg, /videos/hero-m-poster.jpg.
Each MP4 must be H.264, yuv420p, even width/height, no audio, faststart. If one is not:
`ffmpeg -i in.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -an out.mp4`
After deploying, test: `curl -I -H "Range: bytes=0-1" https://<your-site>/videos/hero.mp4` -> must say 206.
If it says 206 even with the Worker disabled, delete `src/worker`, `main` and `run_worker_first` from wrangler.toml.
iPhone Low Power Mode blocks autoplay for every site: the poster shows and a tap starts the video.

## 4. What changed vs the old site (behaviour and look are meant to be identical)
- Hero poster is always set (old code left a black hero for Reduce Motion / Data Saver). Video streams normally; the fetch-to-blob trick runs only if an iPhone reports a video error.
- WebM removed; MP4 for every device.
- 21 CSS files merged into `src/index.css` in the same cascade order. Dead rules removed (collage, steps, .pf, .owner, toast, lenis, kb animation, duplicate hero rules, overridden breakpoint rules).
- Worker now asks the asset store for the Range first and only slices the file itself if needed (the old one loaded the whole video on every request).
- Removed: apply-about-reviews.mjs, apply-hero.mjs, README.txt, the hero collage parallax.
- Custom domain (old commented block): urbanefca.in. Add `routes = [{ pattern = "urbanefca.in", custom_domain = true }, { pattern = "www.urbanefca.in", custom_domain = true }]` above `[assets]` in wrangler.toml once the domain shows Active in Cloudflare.

## 5. Not covered
- `data-px` scroll parallax was not ported (no element in the supplied JSX used it).
- Not run against real photos/videos (placeholders only) and not run through `vite build` itself (see chat summary).
