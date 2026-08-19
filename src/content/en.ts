/**
 * DLY AI — site copy (English).
 *
 * Every line here traces back to Brand/*.md and the approved Global Client
 * Deck v2 outline. Voice rules that apply to anything added later:
 *   - short sentences, one idea each, active voice, contractions
 *   - sentence case; "Deploy. Learn. Yield." stays capitalised
 *   - numerals for proof; specifics over adjectives
 *   - we are a TEAM (never a platform/tool/solution); they are CLIENTS
 *   - banned: revolutionary, cutting-edge, leverage, synergy, empower,
 *     seamless, robust, disrupt, unlock, "AI transformation journey"
 *   - client names stay anonymised until written permission exists
 */

import type { SiteContent } from "./types";

/**
 * Single booking destination for the whole funnel: free assessment → paid
 * technical discovery → build. Swap this one constant for the Calendly link
 * and every CTA on the page follows.
 */
export const BOOKING_URL = "mailto:contact@dlyai.com?subject=Free%20AI%20deployment%20assessment";

export const en: SiteContent = {
  meta: {
    title: "DLY AI — Deploy. Learn. Yield.",
    description:
      "DLY AI is a forward-deployed AI engineering team. Senior engineers embed with your team and take complex AI from idea to production — across consumer products, enterprise systems and semiconductor-grade engineering.",
    locale: "en",
  },

  brand: {
    name: "DLY AI",
    tagline: "Deploy. Learn. Yield.",
    locations: "UK · US",
  },

  nav: {
    links: [
      { label: "The gap", href: "#gap" },
      { label: "How we work", href: "#approach" },
      { label: "Track record", href: "#proof" },
      { label: "Work", href: "#work" },
      { label: "Stack", href: "#stack" },
    ],
    cta: { label: "Let's talk", href: "#contact" },
  },

  hero: {
    kicker: "Forward-deployed AI engineering · UK · US",
    // Names the buyer's own words back to them (brand-context Key Problem:
    // "招不到人 / 招人太慢"). The slogan moves to `signature` — it is a brand
    // mnemonic, and a stranger cannot buy from a mnemonic.
    headline: ["The AI problem", "you can't hire for."],
    lead: "We're the senior engineering team that embeds with you and ships it — including the problems most AI firms decline.",
    sub: "From consumer products to semiconductor EDA. In production, tied to a number.",
    proof: [
      { value: "30+", label: "production systems" },
      { value: "93%", label: "repeat engagement" },
      { value: "1.8 mo", label: "average delivery" },
    ],
    primaryCta: { label: "Book a free assessment", href: BOOKING_URL },
    ctaNote: "30 minutes, no cost. You leave knowing where AI pays off first — and what it takes to ship it.",
    secondaryCta: { label: "What we shipped", href: "#work" },
    signature: "Deploy. Learn. Yield.",
  },

  gap: {
    id: "gap",
    kicker: "The gap",
    headline: "AI ambition is everywhere. Deployment is not.",
    lead: "The ideas already exist. So does the data. What's missing is the senior AI capability to land it inside a real business.",
    failures: [
      {
        title: "Hiring takes months.",
        body: "And it costs heavily, then often lands you a team that's narrow in exactly the wrong direction.",
      },
      {
        title: "Tools rarely fit the stack.",
        body: "Off-the-shelf AI doesn't know your business, your constraints, or the system it has to live inside.",
      },
      {
        title: "Outsourcing executes tickets.",
        body: "Capacity is easy to buy. Owning the hard AI problem is not what a ticket queue does.",
      },
      {
        title: "Consulting stops at strategy.",
        body: "The deck arrives on time. The working system doesn't arrive at all.",
      },
    ],
    from: "AI ambition & existing data",
    to: "Production value",
  },

  approach: {
    id: "approach",
    kicker: "The answer",
    headline: "Bring in the team that ships it.",
    lead: "We don't sell you a tool and wish you luck. We put senior AI engineers inside your team and own the path to production.",
    flow: [
      {
        label: "Your business context",
        items: ["Data & systems", "Applications", "Team & domain expertise", "Goals & constraints"],
      },
      {
        label: "DLY AI FDE team",
        items: ["Senior AI engineers", "Full-stack capability", "Product & domain savvy", "Embedded & accountable"],
      },
      {
        label: "Production system",
        items: ["Shipped", "Reliable", "Measurable"],
      },
      {
        label: "Live learning loop",
        items: ["Deploy", "Observe", "Learn", "Improve"],
      },
    ],
    principles: [
      "Senior AI engineers. Embedded.",
      "Remote by default. On-site when needed.",
      "Inside your stack. Owning the outcome.",
      "Discovery → deployment → iteration.",
    ],
    mission: "Give every company a world-class AI engineering team.",
  },

  comparison: {
    id: "compare",
    kicker: "The alternatives",
    headline: "Faster than in-house. Deeper than outsourcing.",
    lead: "Four ways to get AI built. Only one of them is senior, embedded and end-to-end.",
    columns: [
      { name: "In-house", note: "control, but slow and narrow." },
      { name: "Outsourcing", note: "capacity, but ticket-led." },
      { name: "Big consulting", note: "access, but strategy-heavy." },
      { name: "DLY FDE", note: "senior, embedded, end-to-end.", highlight: true },
    ],
    rows: [
      { label: "Speed", scores: [1, 2, 1, 4] },
      { label: "AI depth", scores: [2, 1, 3, 4] },
      { label: "Embedded context", scores: [3, 1, 2, 4] },
      { label: "Production ownership", scores: [3, 1, 1, 4] },
    ],
    conclusion: "DLY FDE is a distinct category. Senior. Embedded. End-to-end.",
  },

  proof: {
    id: "proof",
    kicker: "Track record",
    headline: "Real systems. Across hard domains.",
    stats: [
      { value: "20+", label: "domains" },
      { value: "30+", label: "production systems" },
      { value: "93%", label: "repeat engagement", highlight: true },
      { value: "1.8 mo", label: "average delivery cycle" },
    ],
    network: { value: "100+", label: "senior engineers · expert network" },
    recent: "H1 2025: 10+ mid-to-large engagements",
    spectrum: [
      "Consumer products",
      "Fintech",
      "Healthcare",
      "Industrial",
      "Enterprise SaaS",
      "Space systems",
      "Semiconductor EDA & scientific systems",
    ],
  },

  work: {
    id: "work",
    kicker: "What we shipped",
    headline: "The hard part, shipped.",
    lead: "Every engagement targets a working system tied to a number. Client identities stay anonymous; the outcomes are real.",
    anonymised: "Client anonymised",
    labels: { hard: "The hard part", shipped: "What we shipped", moved: "What it moved" },
    cases: [
      {
        sector: "Enterprise research",
        headline: "An enterprise research workflow, rebuilt around AI.",
        client: "An enterprise market-intelligence organisation",
        hard: "Sources, analysis and reporting lived in three disconnected places. Every study restarted the work from zero.",
        shipped:
          "One AI research workspace joining data sources, analysis tasks, knowledge assets and structured report generation — plus management visibility across all of it.",
        metrics: [],
        note: "No unverified performance metric shown.",
        images: [
          { src: "/cases/enterprise-research-home.png", alt: "Enterprise AI research platform home dashboard" },
          { src: "/cases/enterprise-research-workspace.png", alt: "Enterprise AI research analysis workspace with report generation" },
        ],
        flow: ["Data", "Analysis", "Reports"],
      },
      {
        sector: "Legal tech",
        headline: "From legal search to booked counsel.",
        client: "A legal-tech platform",
        hard: "Users didn't know which lawyer they needed. Only 1 in 5 visitors ever completed a booking.",
        shipped: "An AI intake, lawyer-ranking and appointment-booking workflow that turns a vague problem into the right specialist.",
        metrics: [
          { value: "3.1×", label: "booking conversion", highlight: true },
          { value: "<4 hrs", label: "to first booking" },
          { value: "4.9", label: "star average · 500+ reviews" },
        ],
        images: [{ src: "/cases/legal-booking.png", alt: "AI legal consultation booking product on mobile" }],
      },
      {
        sector: "Travel tech",
        headline: "From 12-minute activation to 90 seconds.",
        client: "A global travel-tech company",
        hard: "Plan confusion, manual APN setup and invisible overseas usage created friction — and a support queue.",
        shipped: "Itinerary-based eSIM recommendation, automated activation and live usage management.",
        metrics: [
          { value: "90 sec", label: "activation, from 12 min", highlight: true },
          { value: "−76%", label: "support tickets" },
          { value: "58%", label: "repeat purchase" },
        ],
        images: [{ src: "/cases/esim-travel.png", alt: "eSIM purchase and management product on mobile" }],
      },
      {
        sector: "Engineering manufacturer",
        headline: "134 minutes to 7.",
        client: "A specialised engineering manufacturer",
        hard: "Drawing correction, process routing and SAP hand-offs all depended on repetitive work and senior-engineer knowledge that lived in people's heads.",
        shipped:
          "Agent-executable engineering workflows connecting drawing recognition, geometry and tolerance validation, process-route optimisation and the systems of record.",
        metrics: [
          // No highlight: this case spends its one Yield moment on the
          // optimised-output stage in the pipeline diagram (as in the deck).
          { value: "7 min", label: "per drawing, from 134" },
          { value: "96.5%+", label: "accuracy" },
          { value: "−89%", label: "rework" },
          { value: "150+", label: "manual steps eliminated" },
        ],
        images: [],
        pipeline: {
          stages: [
            { label: "Engineering drawings", items: ["PDF", "DWG", "TIFF", "STEP"] },
            { label: "Drawing recognition", items: ["OCR / CAD parse", "Feature extraction"] },
            { label: "Agent orchestration", items: ["Geometry & tolerance validation", "Correction & normalisation", "Process routing optimisation", "BOM & operation mapping", "Quality & manufacturability checks"] },
            { label: "Optimised output", items: ["DWG", "PDF", "STEP"], highlight: true },
            { label: "Systems", items: ["BOM", "Route", "Operations"] },
          ],
        },
      },
    ],
    moreLabel: "Also shipped",
    more: [
      {
        title: "AI health companion",
        metric: "64% 7-day retention",
        detail: "1.9× daily check-ins · zero missed safety escalations in a 90-day audit",
        image: { src: "/cases/health-companion.png", alt: "AI health companion app" },
      },
      {
        title: "AI fitness coach",
        metric: "72% workout completion",
        detail: "form-related injury reports down 58% · 30-day renewal up 22%",
        image: { src: "/cases/fitness-coach.png", alt: "Online AI fitness coach app" },
      },
      {
        title: "AI matching",
        metric: "2.7× match-to-conversation",
        detail: "first-week churn down 34% · first message under 2 minutes",
        image: { src: "/cases/social-matching.png", alt: "AI social matching app" },
      },
      {
        title: "Privacy-first people map",
        metric: "3× in-person meetups",
        detail: "zero location-privacy complaints · 30-day retention up 19 points",
        image: { src: "/cases/people-map.png", alt: "Privacy-first people map app" },
      },
      {
        title: "AI personal shopper",
        metric: "+38% conversion",
        detail: "size-related returns down 27% · average order value up 15%",
        image: { src: "/cases/commerce-shopper.png", alt: "AI personal shopper commerce app" },
      },
      {
        title: "AI wallet safety layer",
        metric: "−91% mis-sent transactions",
        detail: "swap volume up 2.4× · onboarding under 3 minutes",
        image: { src: "/cases/crypto-wallet.png", alt: "AI crypto wallet app" },
      },
    ],
  },

  path: {
    id: "path",
    kicker: "How we start",
    headline: "Start with the deployment path.",
    lead: "The first step costs you nothing and ends with a straight answer: where AI can be deployed in your business, and what to do first.",
    phases: ["Deploy", "Learn", "Yield"],
    boundary: "Free → paid",
    stages: [
      { n: "01", title: "Free AI assessment", body: "Where AI can be deployed, and what's worth shipping first.", free: true },
      { n: "02", title: "Paid discovery + solution design", body: "The problem, the architecture, the delivery plan and the commercial scope." },
      { n: "03", title: "Build + deploy", body: "Design, engineer, test and ship the working system." },
      { n: "04", title: "Embedded iteration", body: "Learn from real use. Improve the system. Extend the value." },
      { n: "05", title: "Handover or keep scaling", body: "Documentation, training and continued support — as much or as little as you need." },
    ],
    footnote: "Paid work begins with technical discovery. The boundary is explicit, always.",
  },

  stack: {
    id: "stack",
    kicker: "Underneath",
    headline: "The stack underneath the work.",
    lead: "Representative delivery stack, adapted to the client environment.",
    layers: [
      { n: "06", name: "AI applications", items: ["consumer", "enterprise", "research", "automation"], highlight: true },
      { n: "05", name: "Agent platform", items: ["agents", "RAG", "workflow", "memory", "tool calling"] },
      { n: "04", name: "Model infrastructure", items: ["LLM gateway", "routing", "controls"] },
      { n: "03", name: "Data + knowledge", items: ["vectors", "search", "knowledge bases", "pipelines"] },
      { n: "02", name: "Distributed services", items: ["Go", "Java", "Python", "TypeScript", "microservices"] },
      { n: "01", name: "Cloud infrastructure", items: ["Kubernetes", "private cloud", "on-prem"] },
    ],
  },

  founder: {
    id: "founder",
    kicker: "Who you get",
    headline: "We start where the problem gets hard.",
    pull: { before: "The ", accent: "hard", after: " part cannot be hand-waved." },
    story: [
      "I came to AI from physics — the world of problems you can't hand-wave. What I found in the field was a gap: enormous efficiency and R&D problems sitting undone, because the people who can solve the hard part and the people who understand the business are almost never the same. So we stopped selling tools and started bringing the team.",
    ],
    disciplines: "Physics. Engineering. Software. AI. UX.",
    signoff: "From the founder of DLY AI.",
  },

  contact: {
    id: "contact",
    kicker: "Next step",
    headline: "Find the first AI deployment worth shipping.",
    points: [
      "Book a 30-minute technical consultation.",
      "Get a free assessment of where AI can be deployed.",
      "Leave knowing what should happen first.",
      "Paid discovery and solution design comes next.",
    ],
    cta: { label: "Book a free assessment", href: BOOKING_URL },
    details: [
      { label: "WhatsApp", value: "Message us on WhatsApp", href: "https://wa.me/447410947777", icon: "whatsapp" },
      { label: "Email", value: "Email contact@dlyai.com", href: "mailto:contact@dlyai.com", icon: "email" },
      { label: "UK", value: "London" },
      { label: "US", value: "San Francisco" },
    ],
  },

  footer: {
    tagline: "Deploy. Learn. Yield.",
    locations: "UK · US",
    rights: "DLY AI. All rights reserved.",
  },
};
