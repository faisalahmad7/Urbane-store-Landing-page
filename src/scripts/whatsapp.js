/** Fills in the WhatsApp links that carry a pre-written message. */

import { WHATSAPP_MESSAGES, whatsappLink } from "../config/siteConfig.js";
import { $ } from "./utils.js";

export function initWhatsApp() {
  $("#heroWa").href = whatsappLink(WHATSAPP_MESSAGES.general);
  $("#fab").href = whatsappLink(WHATSAPP_MESSAGES.general);
  $("#careWa").href = whatsappLink(WHATSAPP_MESSAGES.shoeCare);
}
