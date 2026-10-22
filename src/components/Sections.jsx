import { useState } from "react";
import { BRANDS } from "../data/brands";
import { REVIEWS } from "../data/reviews";
import { PHOTOS, SETS, REEL_ORDER } from "../data/photos";
import { EMAIL, MAPS_URL, MAP_EMBED, REVIEWS_URL, TEL, whatsappLink } from "../data/site";
import { Count, Ic, Photo, Star } from "../ui";
import { isIOS } from "../utils";
 
const RIBBON_1 = ["100% Genuine", "Flat 50% Off", "1 Year Footwear Warranty", "Footwear", "Clothing", "GST Billed", "Walk in, try on"];
const RIBBON_2 = ["Genuine products", "Footwear", "Sale on top brands", "Clothing", "1 Year Footwear Warranty", "Flat 50% Off", "Visit the store"];
const FOUR = [0, 1, 2, 3];
const Mark = () => <img src="/logo.webp" alt="" width="512" height="512" aria-hidden="true" decoding="async" />;
 
const Logos = () => (
  <>
    {BRANDS.map((b) => (
      <span className="lg" key={b.name}>
        <img src={b.src} width={b.width} height={b.height} alt={b.name} decoding="async" />
      </span>
    ))}
    <span className="lg more">and more</span>
  </>
);
 
export function Brands() {
  return (
    <section className="brands" aria-label="Brands in store">
      <div className="bh">
        <h2>
          The big names, <em>all on one platform.</em>
        </h2>
        <p>Discover premium footwear and apparel from the world's leading brands.</p>
      </div>
      <div className="bm" aria-hidden="true">
        <div className="tr">
          {FOUR.map((k) => (
            <Logos key={k} />
          ))}
        </div>
      </div>
      <ul className="vh">
        {BRANDS.map((b) => (
          <li key={b.name}>{b.name}</li>
        ))}
      </ul>
    </section>
  );
}
 
const Ribbon = ({ words, cls }) => (
  <div className={`rb ${cls}`}>
    <div className="tr">
      {FOUR.flatMap((k) =>
        words.map((w) => (
          <span key={`${k}-${w}`}>
            {w}
            <Mark />
          </span>
        )),
      )}
    </div>
  </div>
);
 
export const Ribbons = () => (
  <div className="rbs" aria-hidden="true">
    <Ribbon words={RIBBON_1} cls="rb1" />
    <Ribbon words={RIBBON_2} cls="rb2" />
  </div>
);
 
const TICKS = [
  "6+ years of happy customers",
  "Top brands in footwear and fashion",
  "Quality you can see and feel",
  "1-year warranty on all branded footwear",
];
 
export function Why() {
  return (
    <section id="why" className="sec">
      <div className="wrap">
        <div className="head2">
          <h2 className="big rv">Why people walk in, and come back</h2>
          <p className="lead rv" style={{ "--d": ".1s" }}>
            Shop the brands you love with complete confidence, backed by a 1-year warranty on all footwear.
          </p>
          <ul className="why-pts rv" style={{ "--d": ".18s" }}>
            <li>Try before you buy</li>
            <li>Warm, honest service</li>
          </ul>
        </div>
        <div className="stats">
          <div className="stat rv">
            <p className="lbl">
              <span>01</span>Authenticity
            </p>
            <div className="num word">The Original Standard</div>
            <h3>Your favourite brands, all on one platform.</h3>
          </div>
          <div className="stat y rv" style={{ "--d": ".08s" }}>
            <p className="lbl">
              <span>02</span>Assurance
            </p>
            <div className="num">
              <Count to={1} />
              <small>year warranty</small>
            </div>
            <h3>on any footwear you buy.</h3>
          </div>
          <div className="stat hl rv" style={{ "--d": ".16s" }}>
            <p className="lbl">
              <span>03</span>Value
            </p>
            <div className="num">
              <small className="fl">flat</small>
              <Count to={50} />%<small className="fl">off</small>
            </div>
            <h3>Real savings, every single day, 365 days a year.</h3>
          </div>
          <div className="stat rv" style={{ "--d": ".24s" }}>
            <p className="lbl">
              <span>04</span>Trust
            </p>
            <div className="num">
              <Count to={4.9} dec={1} />
              <small>/ 5 reviews</small>
            </div>
            <h3>Loved by the people we serve.</h3>
          </div>
        </div>
        <div className="wall">
          <figure className="wf rv" style={{ marginLeft: 0, marginRight: 0 }}>
            <div className="main">
              <Photo id={1} alt="Sneaker wall under the Original Guarantee sign" />
            </div>
            <span className="cap">Photo from our store</span>
            <div className="sub">
              <Photo id={2} alt="Sports shoe wall with the 1-Year Warranty sign above" />
            </div>
          </figure>
          <div className="wt rv" style={{ "--d": ".1s" }}>
            <h3>It’s written on our wall.</h3>
            <p>
              At Urbane, quality comes first. We bring you stylish footwear and clothing that combine comfort, lasting
              value, and a shopping experience worth coming back for.
            </p>
            <ul className="ticks">
              {TICKS.map((t) => (
                <li key={t}>
                  <Ic d="M5 12.5l4.5 4.5L19 7.5" w={2.4} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
 
const PANELS = [
  {
    id: "footwear",
    set: "foot",
    photo: 8,
    alt: "Wall of sneakers at urbané",
    no: "01",
    title: "Footwear",
    text: "Walls of sneakers, sports shoes, sliders and everyday shoes from genuine brands. Try every pair on before you decide.",
    chips: ["Sneakers", "Sports shoes", "Sliders and flip-flops", "Casual and formal"],
    btn: "See the footwear wall",
  },
  {
    id: "clothing",
    set: "cloth",
    photo: 10,
    alt: "Jackets and polos at urbané",
    no: "02",
    title: "Clothing",
    text: "Tees, polos, jackets, joggers and more, hung on the rails and ready to try. Genuine brands, priced to make you look twice.",
    chips: ["Tees and polos", "Jackets", "Joggers and trousers", "Sweaters"],
    btn: "See the clothing rails",
  },
];
 
export function Range({ open }) {
  return (
    <section id="range" className="sec range">
      <div className="wrap">
        <div className="head2">
          <h2 className="big rv">One-Stop Shop for Footwear & Fashion</h2>
          <p className="lead rv" style={{ "--d": ".1s" }}>
            Walk the walls. Everything is on display, so you can pick it up, try it on and decide.
          </p>
        </div>
        <div className="split">
          {PANELS.map((p, i) => (
            <article className="pan rv" id={p.id} key={p.id} style={i ? { "--d": ".1s" } : undefined}>
              <Photo id={p.photo} alt={p.alt} />
              <div className="pc">
                <p className="no">{p.no}</p>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul className="chips2">
                  {p.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <button className="btn y sm" onClick={() => open(p.set, SETS[p.set][0])}>
                  {p.btn}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
 
const thumb = (src) => src.replace("/images/photos/", "/images/thumbs/");
 
/** One endless reel. Copies after the first set are hidden from assistive tech; iOS gets a shorter strip. */
function Reel({ ids, set, open, rev }) {
  const sets = isIOS ? 2 : 4;
  return (
    <div className={"strip" + (rev ? " rv2" : "")}>
      {Array.from({ length: sets }).flatMap((_, k) =>
        ids.map((id) => {
          const p = PHOTOS[id];
          return (
            <button
              key={`${k}-${id}`}
              className="tile"
              type="button"
              onClick={() => open(set, id)}
              style={{ aspectRatio: `${p.width}/${p.height}` }}
              aria-label={`Open photo: ${p.caption}`}
              {...(k && { tabIndex: -1, "aria-hidden": true })}
            >
              <img
                src={isIOS ? thumb(p.src) : p.src}
                alt={k ? "" : p.caption}
                loading={isIOS ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="zi">
                <Ic w={2.2}>
                  <circle cx="11" cy="11" r="6" />
                  <path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5" />
                </Ic>
              </span>
            </button>
          );
        }),
      )}
    </div>
  );
}
 
export const Reels = ({ open }) => (
  <section id="store" className="sec flush">
    <div className="wrap">
      <div className="head2" style={{ marginBottom: 0 }}>
        <h2 className="big rv">Inside urbané.</h2>
        <p className="lead rv" style={{ "--d": ".1s" }}>
          Photos from the shop floor. Tap any photo to look closer.
        </p>
      </div>
    </div>
    <div className="strips">
      <Reel ids={REEL_ORDER.foot} set="foot" open={open} />
      <Reel ids={REEL_ORDER.cloth} set="cloth" open={open} rev />
    </div>
  </section>
);
 
const Row = ({ items, rev }) => (
  <div className={"rrow" + (rev ? " rrev" : "")}>
    {[0, 1].flatMap((k) =>
      items.map((r) => (
        <div className="rq" key={`${k}-${r.author}`}>
          <q>{r.text}</q>
          <small>{r.author}, Google review</small>
        </div>
      )),
    )}
  </div>
);
 
export const Reviews = () => (
  <section id="reviews" className="sec rev">
    <div className="wrap">
      <div className="rvh">
        <div className="rvh-main">
          <span className="rvh-tag rv">
            <Star />
            Customer reviews
          </span>
          <h2 className="big rv" style={{ "--d": ".08s" }}>
            Feedback from Our <span className="hl">Valued Customers</span>
          </h2>
        </div>
        <div className="rvh-side rv" style={{ "--d": ".16s" }}>
          <p>Every kind word from our customers means the world to us.</p>
          <p className="thx">Thank you for trusting urbané.</p>
        </div>
      </div>
    </div>
    <Row items={REVIEWS} />
    {/* Second row starts halfway through the list so the two rows never line up. */}
    <Row items={REVIEWS.slice(5).concat(REVIEWS.slice(0, 5))} rev />
    <div className="wrap rvall">
      <a className="btn k" href={REVIEWS_URL} target="_blank" rel="noopener">
        View all reviews on Google
      </a>
    </div>
  </section>
);
 
const FAQS = [
  [
    "Are the products genuine?",
    "Yes. We offer a carefully selected range of leading brands, bringing you quality, style, and confidence with every purchase.",
  ],
  [
    "Is there a warranty?",
    "All footwear comes with a 1-year warranty, giving you added peace of mind with every purchase. Visit us in-store for more details on warranty coverage and terms.",
  ],
  [
    "Do you sell online?",
    "No. urbané is a walk-in store, so you can see, touch and try everything before you buy. Call or WhatsApp us with a question, then come visit.",
  ],
  [
    "Do you clean and repair shoes?",
    "Premium shoe care is exclusive to urbané and hard to find at other shoe stores. Drop your pair at the store and ask Aman.",
  ],
  [
    "Where are you and when are you open?",
    "No. 3, opposite Zam Zam Hotel, Sahil Residency, Kausar Baugh Rd, behind Sana Hospital, Pune 411048. We're open until 10:30 pm.",
  ],
  [
    "Do you give a GST bill?",
    "Yes. Every purchase at urbané is GST billed.",
  ],
  [
    "Is there a footwear and clothing store in Kausar Baugh, Kondhwa?",
    "Yes. urbané is a footwear and clothing store on Kausar Baugh Road in Kondhwa Khurd, Pune. We stock genuine branded shoes, sneakers, sliders, jackets, polos, tees and trousers.",
  ],
  [
    "How can I contact urbané?",
    "Call or WhatsApp us on +91 90966 64198, or message us on Instagram @urbanespot. You can also walk in anytime during opening hours.",
  ],
];
 
const FAQ_SHOWN = 5;

export const Faq = () => {
  const [more, setMore] = useState(false);
  return (
    <section id="faq" className="sec">
      <div className="wrap faq-layout">
        <div className="faq-intro">
          <h2 className="big rv">Good to know.</h2>
          <a className="btn k" href={whatsappLink()} target="_blank" rel="noopener">
            Ask a Question
          </a>
        </div>
        <div className="faq rv">
          {FAQS.map(([q, a], i) => (
            <details key={q} hidden={!more && i >= FAQ_SHOWN}>
              <summary>
                {q}
                <span className="pm"></span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
          {FAQS.length > FAQ_SHOWN && (
            <button type="button" className="faq-more" onClick={() => setMore(!more)} aria-expanded={more}>
              {more ? "View less" : "View more"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
export const Visit = () => (
  <section id="visit" className="sec">
    <div className="wrap visit">
      <div>
        <h2 className="big">Walk in.</h2>
        <p className="lead">Try it on, ask anything. The team will help you find the right size.</p>
        <dl>
          <div>
            <dt>Address</dt>
            <dd>No. 3, Opposite Zam Zam Hotel, Sahil Residency, Kausar Baugh Rd, behind Sana Hospital, Pune 411048</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>Open daily · 11:00 AM – 10:30 PM</dd>
          </div>
        </dl>
        <div className="acts">
          <a className="btn y" href={MAPS_URL} target="_blank" rel="noopener">
            Get directions
          </a>
          <a className="btn o" href={TEL}>
            Call the store
          </a>
        </div>
      </div>
      <div className="map">
        <svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="520" fill="#141414" />
          <g fill="#1d1d1d">
            <rect x="40" y="40" width="190" height="130" rx="14" />
            <rect x="40" y="210" width="130" height="150" rx="14" />
            <rect x="380" y="30" width="190" height="160" rx="14" />
            <rect x="420" y="320" width="150" height="160" rx="14" />
            <rect x="60" y="400" width="240" height="90" rx="14" />
          </g>
          <path d="M-20 430 C140 380 260 300 340 250 S520 130 640 90" fill="none" stroke="#3a3a3a" strokeWidth="34" strokeLinecap="round" />
          <path d="M-20 430 C140 380 260 300 340 250 S520 130 640 90" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeDasharray="14 12" />
          <path d="M330 255 L400 500" stroke="#2c2c2c" strokeWidth="20" strokeLinecap="round" />
          <path d="M250 -10 L300 190" stroke="#2c2c2c" strokeWidth="18" strokeLinecap="round" />
          <g fontFamily="Bricolage Grotesque, sans-serif" fontSize="15" fill="#a9a9a9">
            <text x="70" y="115">Sana Hospital</text>
            <text x="430" y="115">Zam Zam Hotel</text>
            <text x="90" y="300" transform="rotate(-19 90 300)">Kausar Baugh Rd</text>
          </g>
          <circle className="pulse" cx="345" cy="250" r="26" fill="#FFC20E" />
          <image href="/logo.webp" x="317" y="222" width="56" height="56" />
          <text x="300" y="300" fontFamily="Outfit, sans-serif" fontWeight="600" fontSize="18" fill="#fff">urbané</text>
        </svg>
        <iframe title="urbané on Google Maps" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
        <a className="mapbtn btn y sm" href={MAPS_URL} target="_blank" rel="noopener">
          Open in Google Maps
        </a>
      </div>
    </div>
  </section>
);