import { EMAIL, INSTAGRAM, MAPS_URL, REVIEWS_URL, TEL, WHATSAPP_MESSAGES, whatsappLink } from "../data/site";
import { Ic, Star, Wa } from "../ui";
import { go } from "../utils";

const EXPLORE = [
  ["why", "Why urbané"],
  ["footwear", "Footwear"],
  ["clothing", "Clothing"],
  ["store", "Inside the store"],
  ["care", "Shoe care"],
  ["visit", "Visit"],
];
const PHONE_ICON = "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="ft">
          <div className="fb">
            <div className="big-u">
              <img src="/logo.webp" alt="" width="512" height="512" aria-hidden="true" decoding="async" />
              urbané
            </div>
            <p>Footwear | Clothing | Apparel. Discover your style, find your fit, and walk out with confidence. Visit Urbane Store today.</p>
            <div className="acts">
              <a className="btn y sm" href={whatsappLink(WHATSAPP_MESSAGES.hello)} target="_blank" rel="noopener">
                <Wa className="bi" />
                WhatsApp us
              </a>
              <a className="btn o sm" href={TEL}>
                <Ic d={PHONE_ICON} className="bi" />
                Call
              </a>
            </div>
          </div>
          <div>
            <h4>Visit us</h4>
            <div className="cr">
              <Ic className="ci">
                <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </Ic>
              <address>
                No. 3, Opposite Zam Zam Hotel,<br />
                Sahil Residency, Kausar Baugh Rd,<br />
                behind Sana Hospital,<br />
                Pune, Maharashtra 411048
              </address>
            </div>
            <a className="cr fl2" href={MAPS_URL} target="_blank" rel="noopener">
              <Ic className="ci" d="M5 12h14M13 6l6 6-6 6" />
              <span>Get directions</span>
            </a>
            <div className="cr hrs">
              <Ic className="ci">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </Ic>
              <span>Open daily · 11:00 AM – 10:30 PM</span>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <a className="cr" href={TEL}>
              <Ic className="ci" d={PHONE_ICON} />
              <span>90966 64198</span>
            </a>
            <a className="cr" href={whatsappLink()} target="_blank" rel="noopener">
              <Wa className="ci" />
              <span>WhatsApp chat</span>
            </a>
            <a className="cr" href={`mailto:${EMAIL}`}>
              <Ic className="ci">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="M3.5 7l8.5 6 8.5-6" />
              </Ic>
              <span>{EMAIL}</span>
            </a>
            <a className="cr" href={INSTAGRAM} target="_blank" rel="noopener">
              <Ic className="ci">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </Ic>
              <span>@urbanespot on Instagram</span>
            </a>
            <a className="cr" href={REVIEWS_URL} target="_blank" rel="noopener">
              <span className="ci"><Star /></span>
              <span>Google reviews</span>
            </a>
          </div>
          <nav aria-label="Footer">
            <h4>Explore</h4>
            {EXPLORE.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={go}>{label}</a>
            ))}
          </nav>
        </div>
        <div className="fbt">
          <span>&copy; urbané, Pune</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
