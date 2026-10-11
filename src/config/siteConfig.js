/** Store contact details. Change the phone number here (and in index.html). */

export const PHONE = "919096664198";

export const whatsappLink = (text) => `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_MESSAGES = {
  general: "Hi urbané! I saw your website and have a question.",
  shoeCare: "Hi urbané! I'd like to ask about shoe cleaning and restoration.",
};
