// Run once from the repo root:  node apply-hero.mjs
// Replaces only the hero <section> in index.html. Everything else is untouched.
import { readFileSync, writeFileSync } from "node:fs";

const file = "index.html";
const html = readFileSync(file, "utf8");
const nl = html.includes("\r\n") ? "\r\n" : "\n";

const start = html.indexOf('<section class="hero" id="hero">');
const end = html.indexOf("<!-- brands -->");
if (start === -1 || end === -1 || end < start) {
  console.error("Could not find the hero section markers in index.html. Nothing changed.");
  process.exit(1);
}

const hero = `<section class="hero" id="hero">
        <div class="hbg">
          <img data-i="15" alt="The urbané storefront in Kausar Baugh, Pune">
          <video id="heroVideo" muted loop playsinline preload="auto" aria-hidden="true" tabindex="-1" data-src-d="/videos/hero.mp4" data-src-m="/videos/hero-m.mp4"></video>
        </div>
        <div class="hcopy">
          <p class="eyebrow"><i></i>Walk-in store, Kausar Baugh</p>
          <h1 aria-label="Genuine brands. Real savings.">
            <span class="ln"><span style="--i:0">Genuine brands.</span></span>
            <span class="ln y"><span style="--i:1">Real savings.</span></span>
          </h1>
          <div class="cta">
            <a class="btn y" href="#visit" data-go>Visit the store</a>
            <ul class="deals">
              <li class="off"><b>Flat 50% off</b><small>on genuine brands</small></li>
              <li><b>1-year warranty</b><small>on footwear</small></li>
            </ul>
          </div>
        </div>
      </section>
      `.replace(/\n/g, nl);

writeFileSync(file, html.slice(0, start) + hero + html.slice(end));
console.log("Hero section updated.");
