# NiffyJade Portfolio

**Design rationale.** A deep-ink canvas with a single warm gold-to-coral accent keeps the page calm and premium. The hero's self-drawing workflow diagram (lead, research, outreach, booked call) is the one signature motif: it shows what I build in five seconds. Motion is one orchestrated load sequence, then restrained scroll reveals and pointer effects, all disabled under reduced motion. Cards are used only where content is parallel; case studies sit in an accordion so outcomes stay scannable. One primary action, "Book a call", repeats in the header, hero and contact.

## Stack
Next.js (App Router) · TypeScript · Tailwind CSS v4 · `next/font` (Sora, Inter Tight). No animation library.

## Local setup
```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run typecheck
npm run build
```

## Environment variables
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BOOKING_URL` | Target of every "Book a call" button (falls back to `#contact`) |
| `NEXT_PUBLIC_FORM_ENDPOINT` | n8n webhook receiving `{name, email, details}` as JSON |
| `NEXT_PUBLIC_SITE_URL` | Production URL for canonical, sitemap, Open Graph |

## Deploy to Vercel
1. Push the repo to GitHub.
2. In Vercel, **Add New Project**, import the repo (framework auto-detects as Next.js).
3. Add the three env vars above under Settings, Environment Variables.
4. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

## Editing content
All copy is in `content/site.ts`. See `PLACEHOLDERS.md` for what to replace and `ASSUMPTIONS.md` for decisions made.

## Layout
`app/` pages, metadata, sitemap, robots, OG image · `components/sections/` one file per section · `hooks/` `useReveal`, `useCountUp`, `usePointerGlow`, `useScrollProgress` (plus `useMagnetic`, `useActiveSection`) · `content/site.ts` copy.

## Suggested next improvements
1. Individual case-study pages with fuller write-ups and diagrams.
2. Inline Calendly (or Cal.com) embed instead of an outbound link.
3. A blog for n8n tutorials and teardowns (SEO and credibility).
