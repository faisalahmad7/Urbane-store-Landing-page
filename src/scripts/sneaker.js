/**
 * Draws the illustrated sneaker used in the shoe-care before/after slider.
 * Returns an SVG string. Options: style ("low" | "high" | "runner" | "slide"),
 * upper, accent, sole, toe, lace (colours) and dirt (true adds mud splashes).
 */

const UP_LOW =
  "M44 176 C38 134 44 104 62 90 C80 80 106 84 120 96 C134 82 152 66 170 64 C178 76 192 100 218 108 C250 116 292 112 326 122 C364 134 392 152 392 176 Z";
const UP_HI =
  "M44 176 C38 120 44 60 64 34 C84 22 110 28 126 44 C140 52 160 54 176 58 C182 76 196 100 218 108 C250 116 292 112 326 122 C364 134 392 152 392 176 Z";

let uid = 0;
const nextId = () => "a" + ++uid;

export function renderSneaker(o) {
  const style = o.style || "low";
  const upper = o.upper || "#fff";
  const accent = o.accent || "#000";
  const sole = o.sole || "#fff";
  const toe = o.toe || accent;
  const lace = o.lace || "#fff";
  const id = nextId();

  if (style === "slide") return renderSlide(o, id);

  const hi = style === "high";
  const run = style === "runner";
  const up = hi ? UP_HI : UP_LOW;
  const mid = run
    ? "M20 170 H402 Q416 170 414 192 Q408 224 360 224 H72 Q28 224 20 194 Z"
    : "M26 176 H396 Q408 176 406 192 Q402 214 366 214 H72 Q34 214 26 192 Z";
  const by = run ? 224 : 214;
  const tongue = hi
    ? "M150 52 C154 14 180 2 196 22 C200 40 184 56 172 58 Z"
    : "M150 66 C156 40 176 30 188 42 C192 56 180 66 170 64 Z";

  let laces = "";
  for (let i = 0; i < 5; i++) {
    const x = 176 + i * 10.5;
    const y = 68 + i * 11;
    laces +=
      '<path d="M' + (x - 16) + " " + (y + 16) + " L" + (x + 6) + " " + (y - 6) +
      '" stroke="' + lace + '" stroke-width="5" stroke-linecap="round"/>';
  }

  let dirt = "";
  if (o.dirt) {
    // Seeded pseudo-random so the mud looks the same on every load.
    let seed = 7;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    let spots = "";
    for (let k = 0; k < 52; k++) {
      spots +=
        '<circle cx="' + (50 + rnd() * 340).toFixed(0) +
        '" cy="' + (80 + rnd() * 135).toFixed(0) +
        '" r="' + (2 + rnd() * 9).toFixed(1) +
        '" fill="#5b3f24" opacity="' + (0.25 + rnd() * 0.5).toFixed(2) + '"/>';
    }
    dirt =
      '<g clip-path="url(#' + id + 'all)">' + spots +
      '<rect x="0" y="170" width="420" height="60" fill="#8a6a3b" opacity=".3"/></g>';
  }

  return (
    '<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>' +
    '<linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>' +
    '<clipPath id="' + id + 'h"><path d="M0 0 H96 C84 70 96 130 112 250 H0 Z"/></clipPath>' +
    '<clipPath id="' + id + 't"><path d="M314 80 H430 V230 H338 C322 170 320 120 314 80 Z"/></clipPath>' +
    '<clipPath id="' + id + 'all"><path d="' + up + '"/><path d="' + mid + '"/></clipPath>' +
    '<filter id="' + id + 'b"><feGaussianBlur stdDeviation="5"/></filter></defs>' +
    '<ellipse cx="214" cy="' + (by + 14) + '" rx="175" ry="9" fill="#000" opacity=".35" filter="url(#' + id + 'b)"/>' +
    '<path d="' + mid + '" fill="' + sole + '"/><path d="' + mid + '" fill="url(#' + id + 's)"/>' +
    '<path d="M34 ' + (run ? 196 : 192) + ' H400" stroke="#000" stroke-opacity=".14" stroke-width="3"/>' +
    '<path d="' + tongue + '" fill="' + upper + '" stroke="#000" stroke-opacity=".3" stroke-width="2"/>' +
    '<path d="' + up + '" fill="' + upper + '"/>' +
    '<path d="' + up + '" fill="' + accent + '" clip-path="url(#' + id + 'h)"/>' +
    '<path d="' + up + '" fill="' + toe + '" clip-path="url(#' + id + 't)"/>' +
    '<path d="M118 170 C150 150 196 142 250 142" stroke="' + accent + '" stroke-width="9" stroke-linecap="round" fill="none"/>' +
    '<path d="' + (hi ? "M64 34 C84 22 110 28 126 44 C118 58 100 62 84 56Z" : "M62 90 C80 80 106 84 120 96 C110 106 90 106 76 100Z") + '" fill="#000" fill-opacity=".45"/>' +
    laces +
    '<path d="' + up + '" fill="url(#' + id + 's)"/>' +
    dirt +
    "</svg>"
  );
}

function renderSlide(o, id) {
  const { upper, accent, sole } = o;
  return (
    '<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>' +
    '<linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>' +
    '<filter id="' + id + 'b"><feGaussianBlur stdDeviation="5"/></filter></defs>' +
    '<ellipse cx="212" cy="236" rx="170" ry="9" fill="#000" opacity=".35" filter="url(#' + id + 'b)"/>' +
    '<path d="M40 192 H382 Q398 192 394 208 Q388 226 350 226 H76 Q40 226 36 208 Z" fill="' + sole + '"/>' +
    '<path d="M52 192 C80 168 140 160 200 158 C280 156 350 164 382 192 Z" fill="' + accent + '"/>' +
    '<path d="M104 190 C118 120 238 100 304 190 Z" fill="' + upper + '"/><path d="M104 190 C118 120 238 100 304 190 Z" fill="url(#' + id + 's)"/>' +
    '<path d="M128 190 C142 144 230 130 282 190" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="3"/></svg>'
  );
}
