/**
 * All site copy lives here. Edit text freely; components only render it.
 * Anything wrapped in [brackets] is a placeholder (see PLACEHOLDERS.md).
 */

export interface Service {
  title: string;
  problem: string;
  build: string;
  outcome: string;
}

export interface CaseStudy {
  title: string;
  context: string;
  problem: string;
  built: string;
  tools: string;
  /** Keys into content/brands.ts */
  brands: string[];
  result: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface ToolChip {
  /** Key into content/brands.ts */
  brand: string;
  label: string;
}

export interface ToolGroup {
  title: string;
  items: string;
  chips: ToolChip[];
  /** The base layer that connects every other layer */
  hub?: boolean;
}

export interface Quote {
  quote: string;
  author: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const site = {
  name: "Oluwanifemi Adefisayo",
  alias: "NiffyJade",
  role: "Full-Stack Developer and Automation Engineer",
  location: { city: "Ile-Ife", country: "NG" },
  title: "NiffyJade | n8n Automation Engineer and Full-Stack Developer",
  description:
    "I build AI and workflow automation for founders, coaches and agencies: lead research, CRM pipelines, call-transcript systems and AI voice callers.",
  ogDescription:
    "Automation systems that run the busywork so people can focus on the work only they can do.",
  year: new Date().getFullYear(),
};

/** Small pill labels and one-line intros that sit above section headings. */
export const sections = {
  services: { pill: "Services", intro: "Six kinds of systems I build and maintain. Start with the problem that costs you the most time." },
  work: { pill: "Case studies" },
  process: { pill: "Process", intro: "Five steps from first call to a system your team can run without me." },
  tools: { pill: "Tools", intro: "The stack behind every system I build, with n8n as the layer that connects it all." },
  about: { pill: "About" },
  testimonials: { pill: "Kind words" },
  contact: { pill: "Contact" },
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  badge: "Open for new automation projects",
  headline: "Automation that runs your business, while you do the real work.",
  gradientPhrase: "runs your business",
  subcopy:
    "I'm NiffyJade, an n8n automation engineer and full-stack developer. I connect your CRM, AI, voice, SMS and spreadsheets into systems that work every day without babysitting.",
  primaryCta: "Book a call",
  secondaryCta: "See my work",
  diagramLabel:
    "Workflow diagram: a new lead flows through AI research and outreach to a booked call",
};

export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "automations shipped" },
  { value: 3, suffix: "+ yrs", label: "building in n8n" },
  { value: 15, suffix: "+", label: "clients served" },
];

export const marquee: { name: string; brand: string }[] = [
  { name: "n8n", brand: "n8n" },
  { name: "OpenAI", brand: "openai" },
  { name: "HubSpot", brand: "hubspot" },
  { name: "Freshsales", brand: "freshsales" },
  { name: "Google Workspace", brand: "googleworkspace" },
  { name: "Apify", brand: "apify" },
  { name: "Apollo", brand: "apollo" },
  { name: "Airtable", brand: "airtable" },
  { name: "Twilio", brand: "twilio" },
  { name: "React", brand: "react" },
  { name: "Node", brand: "nodejs" },
];

export const services: Service[] = [
  {
    title: "AI lead research and outreach",
    problem: "Finding and qualifying prospects by hand is slow.",
    build:
      "Pipelines that pull leads, research each company with AI and draft personalized outreach.",
    outcome: "More qualified conversations, less manual research.",
  },
  {
    title: "CRM and pipeline automation",
    problem: "Leads fall through gaps between tools.",
    build: "Triggers and follow-up sequences in HubSpot, Freshsales and similar CRMs.",
    outcome: "Faster follow-up and fewer no-shows.",
  },
  {
    title: "Call-transcript and SOP systems",
    problem: "Knowledge stays locked inside recorded calls.",
    build: "Workflows that turn transcripts into summaries, SOPs and searchable knowledge.",
    outcome: "Calls become documentation automatically.",
  },
  {
    title: "AI voice callers and SMS",
    problem: "Reminders and first-contact calls eat staff time.",
    build: "Voice agents and SMS sequences connected to your calendar and CRM.",
    outcome: "Consistent outreach without extra headcount.",
  },
  {
    title: "Reporting and dashboards",
    problem: "Weekly numbers take hours to compile.",
    build: "Automated reports pulled from your tools into Sheets or Slack.",
    outcome: "Accurate numbers, delivered on schedule.",
  },
  {
    title: "Full-stack web apps",
    problem: "Off-the-shelf tools don't fit your process.",
    build: "Custom React and Node apps that plug into your automations.",
    outcome: "Software shaped around how you work.",
  },
];

export const work = {
  heading: "Selected work",
  intro: "Client details are anonymized.",
  cases: [
    {
      title: "AI B2B lead research and outreach system",
      context: "A B2B services company",
      problem: "Prospecting took hours of manual research per lead.",
      built:
        "Apollo and Apify collect leads, an LLM researches each company, and drafts land in Sheets for review.",
      tools: "n8n, Apollo, Apify, Google Sheets, LLM",
      brands: ["n8n", "apollo", "apify", "googlesheets", "openai"],
      result: "[X] leads researched per week; [X] hours saved",
    },
    {
      title: "Call-transcript to SOP pipeline",
      context: "A coaching and advisory business",
      problem: "Valuable call content was never turned into documentation.",
      built:
        "Transcripts are captured, summarized and converted into SOPs and reports in a central knowledge base.",
      tools: "n8n, LLM, Google Drive, Sheets",
      brands: ["n8n", "openai", "googledrive", "googlesheets"],
      result: "[X] SOPs generated; [X] hours saved per week",
    },
    {
      title: "AI voice caller and SMS reminders",
      context: "A community organization",
      problem: "Volunteers spent evenings calling and texting reminders.",
      built: "Scheduled SMS plus an AI voice caller that confirms attendance and logs results.",
      tools: "n8n, Twilio, voice AI, Google Sheets",
      brands: ["n8n", "twilio", "googlesheets"],
      result: "[X]% attendance confirmed automatically",
    },
    {
      title: "CRM-triggered AI content generation",
      context: "A luxury boat and yacht dealer",
      problem: "Marketing content waited on manual briefs.",
      built: "A CRM event triggers AI content drafts matched to the lead and product.",
      tools: "n8n, Freshsales, LLM",
      brands: ["n8n", "freshsales", "openai"],
      result: "[X] pieces per month; turnaround cut from [X] to [X]",
    },
  ] satisfies CaseStudy[],
};

export const processSteps: Step[] = [
  {
    title: "Discovery",
    body: "We map how work moves through your business today and pick the one process worth automating first.",
  },
  {
    title: "Architecture",
    body: "I design the system on paper: triggers, data, tools, failure points. You approve before I build.",
  },
  {
    title: "Build",
    body: "I build in n8n with native nodes wherever possible, so your team can read and maintain it.",
  },
  {
    title: "Test and document",
    body: "I run real data through it, add error alerts, and write plain-English documentation.",
  },
  {
    title: "Handover and support",
    body: "You get a walkthrough, and I stay on call to fix and extend what we built.",
  },
];

/** Listed top to bottom as a stack: what people see, down to the automation layer that wires it all together. */
export const tools: ToolGroup[] = [
  {
    title: "Frontend and backend",
    items: "React, Node, REST APIs",
    chips: [
      { brand: "react", label: "React" },
      { brand: "nodejs", label: "Node" },
    ],
  },
  {
    title: "AI and LLM",
    items: "OpenAI and other LLMs, voice agents, prompt design",
    chips: [{ brand: "openai", label: "OpenAI" }],
  },
  {
    title: "CRM and marketing",
    items: "HubSpot, Freshsales, Apollo, Apify",
    chips: [
      { brand: "hubspot", label: "HubSpot" },
      { brand: "freshsales", label: "Freshsales" },
      { brand: "apollo", label: "Apollo" },
      { brand: "apify", label: "Apify" },
    ],
  },
  {
    title: "Data",
    items: "Google Sheets, Airtable, Google Workspace",
    chips: [
      { brand: "googlesheets", label: "Google Sheets" },
      { brand: "airtable", label: "Airtable" },
      { brand: "googleworkspace", label: "Google Workspace" },
    ],
  },
  {
    title: "Automation",
    items: "n8n, webhooks, API integrations",
    chips: [{ brand: "n8n", label: "n8n" }],
    hub: true,
  },
];

export const about = {
  heading: "About me",
  photoSrc: "/photo.jpg",
  photoAlt: "Portrait of Oluwanifemi Adefisayo",
  role: "Automation Engineer, Ile-Ife, Nigeria",
  points: [
    "Based in Ile-Ife, Nigeria, working remotely with teams abroad",
    "Overlaps your working hours",
    "Written progress updates, and problems flagged early",
    "Documented, observable systems that are easy to hand over",
  ],
  paragraphs: [
    "I'm Oluwanifemi Adefisayo, known as NiffyJade, a full-stack developer and automation engineer based in Ile-Ife, Nigeria. I work remotely with teams abroad, mostly coaching and advisory businesses, agencies and service companies.",
    "My day-to-day is building and maintaining multi-system automation: call-transcript pipelines, SOP systems, AI lead research and voice callers. I care about systems that are documented, observable and easy to hand over.",
    "I overlap with your working hours, report progress in writing, and flag problems early.",
  ],
};

export const testimonials: Quote[] = [
  {
    quote: "[Short quote about reliability and communication]",
    author: "[Name, Role, Company]",
  },
  { quote: "[Short quote about results delivered]", author: "[Name, Role, Company]" },
  {
    quote: "[Short quote about documentation and handover]",
    author: "[Name, Role, Company]",
  },
];

export const contact = {
  headline: "Tell me what you want to",
  gradientWord: "automate",
  body: "Send a few lines about the process that eats your time. I reply within one business day with questions or a rough plan.",
  nextHeading: "What happens next",
  nextSteps: ["A short call", "A written proposal with scope and price", "Your build start date"],
  reachHeading: "Or reach me directly",
  form: {
    name: "Name",
    email: "Email",
    details: "What do you want to automate?",
    submit: "Send message",
    states: {
      invalid: "Enter your name, a valid email and a few lines about your project.",
      sending: "Sending...",
      success: "Sent. I'll reply within one business day.",
      failure: "Couldn't send. Message me on WhatsApp using the icon on the left.",
    },
  },
};

/** Logo-only contact links, shared by the About, Contact and Footer sections. */
export const socials = [
  { label: "WhatsApp", brand: "whatsapp", href: "https://wa.me/2348108369009" },
  { label: "LinkedIn", brand: "linkedin", href: "https://www.linkedin.com/in/oluwanifemi-adefisayo/" },
  { label: "GitHub", brand: "github", href: "https://github.com/NiffyJade" },
];
