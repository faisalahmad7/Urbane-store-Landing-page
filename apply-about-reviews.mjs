// Run once from the repository root: node apply-about-reviews.mjs
// Updates only the About and Reviews content blocks described in this patch.
// It keeps the existing section wrappers, wall/photo content, review rows, and page structure.
import { readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";

const file = "index.html";
let html = readFileSync(file, "utf8");
const original = html;

function replaceBetweenOnce(source, start, end, replacement, label) {
  const a = source.indexOf(start);
  if (a < 0) throw new Error(`${label}: start marker not found; no files were changed.`);
  const b = source.indexOf(end, a + start.length);
  if (b < 0) throw new Error(`${label}: end marker not found; no files were changed.`);
  if (source.indexOf(start, a + start.length) >= 0) {
    throw new Error(`${label}: start marker appears more than once; no files were changed.`);
  }
  return source.slice(0, a) + replacement + source.slice(b);
}

// About heading/lead/pills: retain the existing .head2 wrapper and stats start.
const whyStart = '<h2 class="big rv">Why people walk in, and come back.</h2>';
const statsMarker = '<div class="stats">';
if (!html.includes(whyStart)) throw new Error('About heading not found; no files were changed.');
html = replaceBetweenOnce(
  html,
  whyStart,
  statsMarker,
  `<h2 class="big rv">6+ years of happy customers.</h2>
          <p class="lead rv" style="--d:.1s">
            Shop the brands you love with complete confidence, backed by a 1-year warranty on all footwear.
          </p>
          <ul class="why-pts rv" style="--d:.18s">
            <li>Try before you buy</li>
            <li>Warm, honest service</li>
          </ul>
        </div>
        `,
  'About intro'
);

// About cards: replace only the existing stats grid, stopping before the wall section.
const whySectionStart = html.indexOf('<section id="why"');
const reviewsSectionStart = html.indexOf('<section id="reviews"');
if (whySectionStart < 0 || reviewsSectionStart < 0 || whySectionStart > reviewsSectionStart) {
  throw new Error('Could not verify About/Reviews section boundaries; no files were changed.');
}
const statsStart = html.indexOf('<div class="stats">', whySectionStart);
const wallEnd = html.indexOf('<div class="wall">', statsStart);
if (statsStart < 0 || wallEnd < 0 || wallEnd > reviewsSectionStart) {
  throw new Error('Could not safely locate About stats grid; no files were changed.');
}
const statsHtml = `<div class="stats">
          <div class="stat rv">
            <p class="lbl"><span>01</span>Authenticity</p>
            <div class="num word">Authentic</div>
            <h3>The finest brands, thoughtfully selected.</h3>
          </div>
          <div class="stat y rv" style="--d:.08s">
            <p class="lbl"><span>02</span>Assurance</p>
            <div class="num"><span data-count="1">1</span><small>year</small></div>
            <h3>Peace of mind after you buy.</h3>
          </div>
          <div class="stat hl rv" style="--d:.16s">
            <p class="lbl"><span>03</span>Value</p>
            <div class="num"><small class="fl">flat</small><span data-count="50">50</span>%<small class="fl">off</small></div>
            <h3>Real savings, every single day.</h3>
          </div>
          <div class="stat rv" style="--d:.24s">
            <p class="lbl"><span>04</span>Trust</p>
            <div class="num"><span data-count="4.9" data-dec="1">4.9</span><small>/ 5</small></div>
            <h3>Loved by the people we serve.</h3>
          </div>
        </div>
        `;
html = html.slice(0, statsStart) + statsHtml + html.slice(wallEnd);

// Reviews heading: locate the wrapper inside #reviews by section boundaries, not whitespace indentation.
const revStart = html.indexOf('<section id="reviews"');
const revRows = html.indexOf('<div class="rrow" id="r1">', revStart);
const revWrap = html.indexOf('<div class="wrap">', revStart);
if (revStart < 0 || revRows < 0 || revWrap < 0 || revWrap > revRows) {
  throw new Error('Could not safely locate Reviews header; no files were changed.');
}
const reviewsHeader = `<div class="wrap">
        <div class="rvh">
          <div class="rvh-main">
            <span class="rvh-tag rv">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
              </svg>Customer reviews
            </span>
            <h2 class="big rv" style="--d:.08s">Feedback from Our <span class="hl">Valued Customers</span></h2>
          </div>
          <div class="rvh-side rv" style="--d:.16s">
            <p>Every kind word from our customers means the world to us.</p>
            <p class="thx">Thank you for trusting urbané.</p>
          </div>
        </div>
      </div>
      `;
html = html.slice(0, revWrap) + reviewsHeader + html.slice(revRows);

// Final safety checks: key section anchors and original surrounding content must remain.
for (const marker of [
  '<section id="why"', '<div class="wall">', '<section id="reviews"',
  '<div class="rrow" id="r1">', '<div class="rrow rrev" id="r2">',
  'View all reviews on Google'
]) {
  if (!html.includes(marker)) throw new Error(`Safety check failed (${marker}); no files were changed.`);
}
if ((html.match(/<section id="why"/g) || []).length !== 1 ||
    (html.match(/<section id="reviews"/g) || []).length !== 1) {
  throw new Error('Section count changed; no files were changed.');
}

if (html === original) throw new Error('No changes were made; check whether this patch was already applied.');
const backup = 'index.html.before-about-reviews.bak';
if (!existsSync(backup)) copyFileSync(file, backup);
writeFileSync(file, html, 'utf8');
console.log(`Updated ${file}. Backup: ${backup}`);
console.log('Kept existing wall/photo content, review rows, and Google reviews link.');
