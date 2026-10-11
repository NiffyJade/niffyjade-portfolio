# Portfolio Build Spec: NiffyJade

You are a senior product designer and front-end engineer. Build the personal portfolio site described below. Make smart decisions without asking me questions first. Mark every assumption in `ASSUMPTIONS.md`. Deliver complete, working code.

If `reference/portfolio.html` exists in this repo, it is a working prototype of this design. Treat it as the visual and motion reference, and rebuild it properly in the stack below. Do not copy it as a single file.

---

## 1. Owner

- **Name:** Oluwanifemi Adefisayo (goes by NiffyJade)
- **Role:** Full-Stack Developer and Automation Engineer
- **Location:** Ile-Ife, Nigeria, working remotely with international clients
- **What I do:** I design, build and maintain multi-system automation infrastructure, mainly in n8n (workflow design, debugging, documentation, client delivery), plus full-stack web development. I connect CRMs, AI/LLMs, voice agents, SMS, Google Workspace and data-enrichment tools into reliable production systems.
- **Positioning:** Automation systems that run the busywork so people can focus on the work only they can do.

## 2. Goals

1. Win high-quality freelance and contract work (Upwork, LinkedIn, direct clients).
2. A visitor understands within 5 seconds what I do and who I do it for.
3. Prove credibility with case studies that show outcomes, not just tool logos.
4. One primary action everywhere: **Book a call**.

## 3. Audience

Founders, agency owners, coaches and operations leads at small and mid-size businesses who need AI and workflow automation (lead gen, CRM pipelines, call-transcript processing, AI voice callers, reporting, SOP systems) but have no technical team.

---

## 4. Tech stack

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS, with design tokens defined as CSS variables in `globals.css`
- **Motion:** CSS animations, IntersectionObserver and small custom hooks. Do not add a heavy animation library. Framer Motion is allowed only if a specific effect cannot be done cleanly without it.
- **Fonts:** `next/font/google` for Sora (500, 700) and Inter Tight (400, 500)
- **Content:** all copy in a single typed file, `content/site.ts`, so I can edit text without touching components
- **Deploy:** Vercel
- **Contact form:** POST JSON to my n8n webhook (`NEXT_PUBLIC_FORM_ENDPOINT`, default `https://niffyjade-n8n-free.hf.space/webhook/[PATH]`). Fields: `name`, `email`, `details`.
- **Env vars:** `NEXT_PUBLIC_BOOKING_URL`, `NEXT_PUBLIC_FORM_ENDPOINT`, `NEXT_PUBLIC_SITE_URL`
- **Rules:** no unnecessary dependencies, no localStorage except the theme preference (wrapped in try/catch), clean commented code

---

## 5. Design system

### Direction

Premium, calm and confident. Deep ink background, one warm gold-to-coral accent, strong typography, generous whitespace. A subtle "systems flow" motif (nodes and connecting lines) is the signature element. Do not overdo it.

Avoid: stock-photo feel, generic gradient blobs, identical rounded-card walls, tracked-out all-caps eyebrow labels above every heading, numbered markers on content that is not a sequence, template-looking layouts.

### Color tokens (dark is default)

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#070a12` | `#f6f4ef` |
| `--bg2` | `#0c1120` | `#ece9e1` |
| `--surface` | `rgba(255,255,255,.035)` | `rgba(255,255,255,.7)` |
| `--line` | `rgba(255,255,255,.09)` | `rgba(20,26,43,.12)` |
| `--text` | `#eef1f8` | `#12172a` |
| `--muted` | `#9aa5bf` | `#4b556d` |
| `--accent` | `#f2c26b` | `#a8650a` |
| `--accent2` | `#ff8a5c` | `#c2410c` |
| `--on-accent` | `#1a1100` | `#ffffff` |
| `--glow` | `rgba(242,194,107,.16)` | `rgba(168,101,10,.14)` |

- Gradient accent: `linear-gradient(100deg, var(--accent), var(--accent2))`
- Radius: `18px` for cards, pill (`999px`) for buttons
- Theme: dark by default, light via a toggle in the header, stored in localStorage
- All text must meet WCAG AA contrast in both themes

### Typography

- **Display:** Sora 700 for headings. Letter-spacing `-0.03em`, line-height `1.08`.
- **Body:** Inter Tight 400/500 at `1.0625rem`, line-height `1.65`.
- **Scale:** `h1: clamp(2.5rem, 6.8vw, 4.9rem)`, `h2: clamp(1.9rem, 4.2vw, 3rem)`, `h3: 1.15rem`
- Line length under 65 characters for body copy
- Use the gradient on a short phrase in the hero headline and in two section headings only. Not everywhere.

### Atmosphere

- Fixed background with a soft radial glow that follows the pointer (desktop only), plus a faint coral glow bottom-left
- Very light film grain overlay (about 5% opacity, SVG feTurbulence), non-interactive
- Sticky header with backdrop blur and a bottom hairline

---

## 6. Motion spec

One orchestrated load sequence, then restrained interaction motion. Everything below must be disabled under `prefers-reduced-motion: reduce` (final state shown immediately, no transitions).

### Page load (hero)

1. Header drops in (0.1s delay, 0.9s)
2. Status badge fades in (0.3s)
3. Headline rises word by word: each word is wrapped in an `overflow: hidden` mask and animates `translateY(110% to 0)` over 0.95s, staggered 70ms per word, starting at 0.35s. Easing `cubic-bezier(.2,.8,.2,1)`.
4. Subcopy fades in (1.1s), then CTAs (1.3s)
5. Hero diagram draws itself (see below), starting at about 0.6s

### Hero workflow diagram (SVG, signature element)

Four nodes joined by three curved edges: **New lead, AI research, Outreach, Call booked**.

- Edges draw on with `stroke-dasharray` and `stroke-dashoffset`, staggered (1.0s, 1.6s, 2.2s), stroke uses the accent gradient
- Nodes fade in one by one, in step with their edges
- The final node ("Call booked") gets an accent stroke and a slow pulsing glow
- After the draw finishes (about 3s), a glowing dot travels the full path in a 5s loop using `animateMotion`
- Faint grid lines behind the diagram
- The whole diagram floats gently (`translateY` 0 to -8px, 6s ease-in-out loop)
- Include `role="img"` and a descriptive `aria-label`

### Scroll behavior

- **Progress bar:** 2px gradient bar fixed to the top, `scaleX` bound to page scroll
- **Section reveals:** elements fade and rise 28px over 0.9s when 15% visible, with a small stagger (0.1s steps) for cards in the same row. Fire once.
- **Stat counters:** numbers count up over 1.6s with ease-out-quart when the stats strip enters view
- **Process timeline:** a vertical line fills with the accent gradient as the section scrolls, and each step marker lights up (accent border plus soft ring) when its step enters view
- **Active nav link:** highlights the section currently in view
- **Tool marquee:** infinite horizontal scroll of tool names (32s loop), edge-faded with a mask, pauses on hover

### Pointer interactions (hover-capable devices only)

- **Card spotlight:** a radial gradient follows the cursor inside each card (`--mx`, `--my` CSS variables), card lifts 4px and its border shifts toward the accent
- **Magnetic buttons:** primary and secondary CTAs shift slightly toward the cursor (about 20% horizontally, 30% vertically) and reset on leave
- **Arrow nudge:** the arrow in CTAs moves 4px right on hover

### Accordion (case studies)

- Smooth height animation using `grid-template-rows: 0fr to 1fr` over 0.6s
- Only one case study open at a time, first one open by default
- The plus icon rotates 135 degrees when open, and the card border picks up the accent
- Header is a real `<button>` with `aria-expanded` and `aria-controls`

---

## 7. Page structure (single page, smooth-scroll anchors)

Header: logo ("NiffyJade"), nav (Services, Work, Process, About, Contact), theme toggle, primary CTA "Book a call".

1. **Hero:** status badge ("Open for new automation projects"), headline, subcopy, two CTAs (Book a call, See my work), animated diagram on the right (stacked below on mobile)
2. **Proof strip:** three counters plus the tool marquee
3. **Services:** six cards, each with problem / what I build / outcome
4. **Selected work:** four accordion case studies
5. **Process:** five-step timeline
6. **Tools:** five grouped cards
7. **About:** portrait placeholder plus three short paragraphs
8. **Testimonials:** three quote cards
9. **Contact:** headline, "what happens next" line, email and social links, and the form
10. **Footer:** minimal, copyright

---

## 8. Content (put this in `content/site.ts`)

### Hero

- **Headline:** Automation that runs your business, while you do the real work.
- **Gradient phrase:** "runs your business" (words 5 to 7)
- **Subcopy:** I'm NiffyJade, an n8n automation engineer and full-stack developer. I connect your CRM, AI, voice, SMS and spreadsheets into systems that work every day without babysitting.

### Stats (placeholders, I will replace with real figures)

- 50+ automations shipped
- 3+ yrs building in n8n
- 15+ clients served

### Tool marquee

n8n, OpenAI, HubSpot, Freshsales, Google Workspace, Apify, Apollo, Airtable, Twilio, React, Node

### Services

| Title | Problem | I build | Outcome |
|---|---|---|---|
| AI lead research and outreach | Finding and qualifying prospects by hand is slow. | Pipelines that pull leads, research each company with AI and draft personalized outreach. | More qualified conversations, less manual research. |
| CRM and pipeline automation | Leads fall through gaps between tools. | Triggers and follow-up sequences in HubSpot, Freshsales and similar CRMs. | Faster follow-up and fewer no-shows. |
| Call-transcript and SOP systems | Knowledge stays locked inside recorded calls. | Workflows that turn transcripts into summaries, SOPs and searchable knowledge. | Calls become documentation automatically. |
| AI voice callers and SMS | Reminders and first-contact calls eat staff time. | Voice agents and SMS sequences connected to your calendar and CRM. | Consistent outreach without extra headcount. |
| Reporting and dashboards | Weekly numbers take hours to compile. | Automated reports pulled from your tools into Sheets or Slack. | Accurate numbers, delivered on schedule. |
| Full-stack web apps | Off-the-shelf tools don't fit your process. | Custom React and Node apps that plug into your automations. | Software shaped around how you work. |

### Case studies (results in `[X]` are placeholders)

1. **AI B2B lead research and outreach system**
   - Context: A B2B services company
   - Problem: Prospecting took hours of manual research per lead.
   - Built: Apollo and Apify collect leads, an LLM researches each company, and drafts land in Sheets for review.
   - Tools: n8n, Apollo, Apify, Google Sheets, LLM
   - Result: [X] leads researched per week; [X] hours saved
2. **Call-transcript to SOP pipeline**
   - Context: A coaching and advisory business
   - Problem: Valuable call content was never turned into documentation.
   - Built: Transcripts are captured, summarized and converted into SOPs and reports in a central knowledge base.
   - Tools: n8n, LLM, Google Drive, Sheets
   - Result: [X] SOPs generated; [X] hours saved per week
3. **AI voice caller and SMS reminders**
   - Context: A community organization
   - Problem: Volunteers spent evenings calling and texting reminders.
   - Built: Scheduled SMS plus an AI voice caller that confirms attendance and logs results.
   - Tools: n8n, Twilio, voice AI, Google Sheets
   - Result: [X]% attendance confirmed automatically
4. **CRM-triggered AI content generation**
   - Context: A luxury boat and yacht dealer
   - Problem: Marketing content waited on manual briefs.
   - Built: A CRM event triggers AI content drafts matched to the lead and product.
   - Tools: n8n, Freshsales, LLM
   - Result: [X] pieces per month; turnaround cut from [X] to [X]

Keep client details anonymized.

### Process

1. **Discovery:** We map how work moves through your business today and pick the one process worth automating first.
2. **Architecture:** I design the system on paper: triggers, data, tools, failure points. You approve before I build.
3. **Build:** I build in n8n with native nodes wherever possible, so your team can read and maintain it.
4. **Test and document:** I run real data through it, add error alerts, and write plain-English documentation.
5. **Handover and support:** You get a walkthrough, and I stay on call to fix and extend what we built.

### Tools (grouped)

- **Automation:** n8n, webhooks, API integrations
- **AI and LLM:** OpenAI and other LLMs, voice agents, prompt design
- **CRM and marketing:** HubSpot, Freshsales, Apollo, Apify
- **Frontend and backend:** React, Node, REST APIs
- **Data:** Google Sheets, Airtable, Google Workspace

### About

I'm Oluwanifemi Adefisayo, known as NiffyJade, a full-stack developer and automation engineer based in Ile-Ife, Nigeria. I work remotely with teams abroad, mostly coaching and advisory businesses, agencies and service companies.

My day-to-day is building and maintaining multi-system automation: call-transcript pipelines, SOP systems, AI lead research and voice callers. I care about systems that are documented, observable and easy to hand over.

I overlap with your working hours, report progress in writing, and flag problems early.

Photo: placeholder box (4:5 ratio, dashed border) until I supply `public/photo.jpg`.

### Testimonials (placeholders)

Three quote cards, each with a quote and "Name, Role, Company".

### Contact

- **Heading:** Tell me what you want to automate (gradient on "automate")
- **Body:** Send a few lines about the process that eats your time. I reply within one business day with questions or a rough plan.
- **What happens next:** a short call, a written proposal with scope and price, then a build start date.
- **Links:** email, LinkedIn, Upwork, GitHub (all placeholders)
- **Form states:**
  - Validation error: "Enter your name, a valid email and a few lines about your project."
  - Sending: "Sending..."
  - Success: "Sent. I'll reply within one business day."
  - Failure: "Couldn't send. Email me directly using the address on the left."

---

## 9. Requirements

### Responsive

Mobile-first. Verify at 360px, 768px and 1280px+. Under 860px: single-column layout, hide the nav links (keep the logo, theme toggle and CTA), reduce section padding. No horizontal scrolling on the body.

### Accessibility

Semantic HTML with a clean heading hierarchy, WCAG AA contrast in both themes, full keyboard navigation, visible focus rings (2px accent outline, 3px offset), alt text, `aria-live` on form status, and reduced-motion support everywhere.

### Performance

Lighthouse 90+ on all four categories. Lazy-load images, use `next/font` with swap, avoid layout shift, keep the JS bundle small.

### SEO

Page title, meta description, Open Graph and Twitter tags, JSON-LD `Person` schema (name, alternateName NiffyJade, jobTitle, address Ile-Ife NG), `sitemap.xml` and `robots.txt`, and a generated OG image.

### Code quality

Typed components, one component per section in `components/sections/`, hooks in `hooks/` (`useReveal`, `useCountUp`, `usePointerGlow`, `useScrollProgress`), no dead code, short comments where logic is not obvious.

---

## 10. Deliverables

1. The complete Next.js project, running with `npm run dev`
2. `README.md` with local setup, env vars, and Vercel deploy steps
3. `ASSUMPTIONS.md` listing every decision I did not specify
4. `PLACEHOLDERS.md`: a checklist of everything I must replace (stats, case-study results, links, email, photo, testimonials, booking URL, webhook path)
5. A short design rationale (under 150 words) at the top of `README.md`
6. Three suggested next improvements (individual case-study pages, Calendly embed, blog)

## 11. Working method

1. Scaffold the project and set up tokens, fonts and the theme toggle first.
2. Build the hero and its load sequence next, since it sets the quality bar.
3. Build the remaining sections in page order, using the shared reveal hooks.
4. Wire the form to the webhook with all four states.
5. Run a pass for accessibility, reduced motion, responsive layout and Lighthouse, and fix what it finds.
6. Do not ask me questions before starting. Decide, record the assumption, and continue.
