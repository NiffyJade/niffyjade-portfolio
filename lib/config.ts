/** Runtime config read from env vars (NEXT_PUBLIC_* are inlined at build time). */

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Falls back to the contact section until a booking link is set. */
export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "#contact";

export const formEndpoint =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
  "https://niffyjade-n8n-free.hf.space/webhook/contact-form";

export const isExternal = (href: string) => /^https?:\/\//.test(href);
