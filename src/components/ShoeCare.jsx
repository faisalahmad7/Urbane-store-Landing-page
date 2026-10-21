import { useState } from "react";
import { WHATSAPP_MESSAGES, whatsappLink } from "../data/site";

const UPPER = "M44 176 C38 134 44 104 62 90 C80 80 106 84 120 96 C134 82 152 66 170 64 C178 76 192 100 218 108 C250 116 292 112 326 122 C364 134 392 152 392 176 Z";
const SOLE = "M26 176 H396 Q408 176 406 192 Q402 214 366 214 H72 Q34 214 26 192 Z";

// Seeded pseudo-random so the mud looks the same on every load.
const SPOTS = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: 52 }, () => ({
    x: (50 + rnd() * 340).toFixed(0),
    y: (80 + rnd() * 135).toFixed(0),
    r: (2 + rnd() * 9).toFixed(1),
    o: (0.25 + rnd() * 0.5).toFixed(2),
  }));
})();

/** The illustrated low-top sneaker. `id` keeps the SVG gradient/clip ids unique per copy. */
function Sneaker({ id, upper, sole, dirt }) {
  const accent = "#151515";
  const ref = (n) => `url(#${id}${n})`;
  return (
    <svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".3" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".3" />
        </linearGradient>
        <clipPath id={`${id}h`}><path d="M0 0 H96 C84 70 96 130 112 250 H0 Z" /></clipPath>
        <clipPath id={`${id}t`}><path d="M314 80 H430 V230 H338 C322 170 320 120 314 80 Z" /></clipPath>
        <clipPath id={`${id}all`}><path d={UPPER} /><path d={SOLE} /></clipPath>
        <filter id={`${id}b`}><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <ellipse cx="214" cy="228" rx="175" ry="9" fill="#000" opacity=".35" filter={ref("b")} />
      <path d={SOLE} fill={sole} />
      <path d={SOLE} fill={ref("s")} />
      <path d="M34 192 H400" stroke="#000" strokeOpacity=".14" strokeWidth="3" />
      <path d="M150 66 C156 40 176 30 188 42 C192 56 180 66 170 64 Z" fill={upper} stroke="#000" strokeOpacity=".3" strokeWidth="2" />
      <path d={UPPER} fill={upper} />
      <path d={UPPER} fill={accent} clipPath={ref("h")} />
      <path d={UPPER} fill="#F7F7F5" clipPath={ref("t")} />
      <path d="M118 170 C150 150 196 142 250 142" stroke={accent} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M62 90 C80 80 106 84 120 96 C110 106 90 106 76 100Z" fill="#000" fillOpacity=".45" />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 176 + i * 10.5;
        const y = 68 + i * 11;
        return <path key={i} d={`M${x - 16} ${y + 16} L${x + 6} ${y - 6}`} stroke={accent} strokeWidth="5" strokeLinecap="round" />;
      })}
      <path d={UPPER} fill={ref("s")} />
      {dirt && (
        <g clipPath={ref("all")}>
          {SPOTS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#5b3f24" opacity={s.o} />
          ))}
          <rect x="0" y="170" width="420" height="60" fill="#8a6a3b" opacity=".3" />
        </g>
      )}
    </svg>
  );
}

export default function ShoeCare() {
  const [p, setP] = useState(50);
  return (
    <section id="care" className="sec">
      <div className="wrap care">
        <div>
          <span className="excl">Exclusive to urbané</span>
          <h2 className="big">
            Premium shoe care, <span className="y">hard to find anywhere else.</span>
          </h2>
          <p className="lead">
            Most stores sell you the pair and stop there. We also look after premium shoes with careful cleaning and
            restoration you won’t find at other shoe stores around here. Drag the slider to see the difference.
          </p>
          <ul>
            <li>Deep cleaning for premium pairs</li>
            <li>Repair and restoration</li>
            <li>Just drop it at the store</li>
          </ul>
          <a className="btn y" href={whatsappLink(WHATSAPP_MESSAGES.shoeCare)} target="_blank" rel="noopener">Ask about shoe care</a>
        </div>
        <div className="ba" style={{ "--p": `${p}%` }}>
          <div className="lay"><Sneaker id="c" upper="#F7F7F5" sole="#fff" /></div>
          <div className="lay dirty"><Sneaker id="d" upper="#e8e2d0" sole="#e4d9b4" dirt /></div>
          <span className="tag l">Before</span>
          <span className="tag r">After</span>
          <input type="range" min="0" max="100" value={p} onChange={(e) => setP(e.target.value)} aria-label="Before and after slider" />
          <div className="hdl"></div>
        </div>
      </div>
    </section>
  );
}
