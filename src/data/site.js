/** Store contact details used across the page. */
export const PHONE = "919096664198";
export const TEL = `tel:+${PHONE}`;
export const EMAIL = "support@urbanefca.in";
export const INSTAGRAM = "https://www.instagram.com/urbanespot/";
export const REVIEWS_URL =
  "https://www.google.com/search?sxsrf=APpeQnui0nQNRzdR-w1o0rrI6V3Rr_NLlw:1791917362031&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_5T9_fyQgZqZRI_BSocSgAyvmx5vhY9X38SzGIo53PyBDsupO3dP_2NNlkwhEQFt7Hat7R2QRevuCtz0gQm12LnRihwI&q=urban%C3%A9+Reviews";
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=urban%C3%A9%20Shoe%20store%20Kausar%20Baugh%20Pune";
export const MAP_EMBED = "https://maps.google.com/maps?q=urban%C3%A9%20Shoe%20store%20Kausar%20Baugh%20Pune&z=17&hl=en&output=embed";

export const whatsappLink = (text) => `https://wa.me/${PHONE}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const WHATSAPP_MESSAGES = {
  general: "Hi urbané! I saw your website and have a question.",
  shoeCare: "Hi urbané! I'd like to ask about shoe cleaning and restoration.",
  hello: "Hi urbané!",
};
