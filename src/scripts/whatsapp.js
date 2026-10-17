/** Fills in the WhatsApp links that carry a pre-written message. */

import { WHATSAPP_MESSAGES, whatsappLink } from "../config/siteConfig.js";
import { $ } from "./utils.js";

export function initWhatsApp() {
  const set = (sel, msg) => {
    const el = $(sel);
    if (el) el.href = whatsappLink(msg);
  };
  set("#heroWa", WHATSAPP_MESSAGES.general);
  set("#fab", WHATSAPP_MESSAGES.general);
  set("#careWa", WHATSAPP_MESSAGES.shoeCare);
}
