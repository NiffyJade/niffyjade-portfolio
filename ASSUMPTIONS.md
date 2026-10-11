# Assumptions

- **Gradient phrase:** the spec says "words 5 to 7" but also "runs your business" (words 3 to 5). I followed the phrase. The prototype's indices highlighted "your business, while".
- **Gradient per word:** each gradient word is masked separately, so the gradient restarts on each word.
- **Stack versions:** latest Next.js (16), React 19, Tailwind CSS v4 (CSS-first config, tokens exposed via `@theme inline`), TypeScript.
- **`--accent-text` token (added):** light-theme `--accent` (#a8650a) is about 4.2:1 on the background, under AA for small text. Small accent text (case labels, step numbers) uses `#8f5408` in light. Large gradient text and all spec tokens are unchanged.
- **Service cards:** the prototype's 1 to 6 numbers broke the "no numbered markers" rule, so I used small line icons.
- **Reveal gating:** hidden reveal state only applies once a tiny inline script adds `js` to `<html>`, so the page stays readable without JavaScript. That script also applies the saved theme before paint (no flash).
- **Reduced motion:** also stops the marquee (shown as wrapped static list) and hides the travelling dot.
- **Accordion:** clicking the open case closes it (spec says one open at a time; zero open is allowed). Collapsed panes are `inert`.
- **Stats:** SSR renders final numbers; with JS they reset to 0 and count up when in view.
- **Contact links:** WhatsApp (wa.me link), LinkedIn and GitHub only; no email or Upwork. The form's failure message points to WhatsApp instead of email, and the social URLs also feed the JSON-LD `sameAs`.
- **Form:** posts `{name, email, details}`; any non-2xx or network error shows the failure message. No spam protection beyond what the webhook does.
- **OG image:** generated with `next/og` using default font; Twitter card points to the same image.
- **Footer year:** computed at build time.
- **Photo:** set `hasPhoto: true` in `content/site.ts` after adding `public/photo.jpg`.
- **Lighthouse and 360px/768px checks:** structure and CSS follow the requirements, but I only visually checked 1280px and 500px here and did not run Lighthouse.
- **Brand logos:** `content/brands.ts` holds the marks (simple-icons CC0 for n8n, HubSpot, Airtable, React, Node, Gmail (hero diagram), WhatsApp, GitHub, LinkedIn, OpenAI, Twilio, Google Sheets; Apify and Apollo.io from their public marks; Google "G" stands in for Google Workspace). Freshsales has no available official mark, so it shows a neutral "F" tile; drop its SVG into `brands.ts` under `freshsales` to replace it. Logos are decorative nominative use; trademarks belong to their owners.
- **Contact form workflow:** `workflows/contact-form.n8n.json` (webhook path `contact-form`, Gmail nodes, 400 for invalid input). Contact links are logo-only with aria-labels.
