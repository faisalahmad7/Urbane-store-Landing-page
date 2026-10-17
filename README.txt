urbané hero video update

1. Unzip into the root of Urbane-store-Landing-page (say yes to overwrite).
2. In a terminal at the repo root run:   node apply-hero.mjs
   (it rewrites only the hero section of index.html, then you can delete apply-hero.mjs)
3. npm run dev  to check it, then commit and push:
   git add -A && git commit -m "Hero video, decluttered hero" && git push

Files:
  public/videos/hero.mp4      enhanced video, 1280x720, ~6.8 MB, no audio
  src/styles/hero.css         video background, lighter overlay, single-column hero
  src/scripts/parallax.js     safe without the collage, pauses video for reduced motion
  apply-hero.mjs              one-time edit of index.html
