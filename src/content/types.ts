/**
 * Content contract for the DLY AI site.
 *
 * Every locale file must satisfy `SiteContent`, so adding Chinese can never
 * silently drop a section — the compiler enforces the shape.
 */

export type Link = { label: string; href: string };

export type Metric = { value: string; label: string; highlight?: boolean };

export type ImageAsset = { src: string; alt: string };

export type CaseStudy = {
  sector: string;
  headline: string;
  /** Anonymised descriptor. Never a real client name without written permission. */
  client: string;
  hard: string;
  shipped: string;
  metrics: Metric[];
  images: ImageAsset[];
  /** Shown when a case has no verified outcome metric to publish. */
  note?: string;
  /** Short inline flow, e.g. Data → Analysis → Reports. */
  flow?: string[];
  /** Technical diagram used in place of a product screenshot. */
  pipeline?: { stages: { label: string; items: string[]; highlight?: boolean }[] };
};

export type SiteContent = {
  meta: { title: string; description: string; locale: string };
  brand: { name: string; tagline: string; locations: string };
  nav: { links: Link[]; cta: Link };
  hero: {
    kicker: string;
    headline: string[];
    lead: string;
    sub: string;
    /** Proof lifted above the fold — a stranger should see evidence, not just claims. */
    proof: Metric[];
    primaryCta: Link;
    /** Risk-reversal microcopy. The free assessment only works if the ask is explicit. */
    ctaNote: string;
    secondaryCta: Link;
    /** The locked slogan, demoted from headline to signature. */
    signature: string;
  };
  gap: {
    id: string;
    kicker: string;
    headline: string;
    lead: string;
    failures: { title: string; body: string }[];
    from: string;
    to: string;
  };
  approach: {
    id: string;
    kicker: string;
    headline: string;
    lead: string;
    flow: { label: string; items: string[] }[];
    principles: string[];
    mission: string;
  };
  comparison: {
    id: string;
    kicker: string;
    headline: string;
    lead: string;
    columns: { name: string; note: string; highlight?: boolean }[];
    rows: { label: string; scores: number[] }[];
    conclusion: string;
  };
  proof: {
    id: string;
    kicker: string;
    headline: string;
    stats: Metric[];
    network: { value: string; label: string };
    recent: string;
    spectrum: string[];
  };
  work: {
    id: string;
    kicker: string;
    headline: string;
    lead: string;
    anonymised: string;
    labels: { hard: string; shipped: string; moved: string };
    cases: CaseStudy[];
    moreLabel: string;
    more: { title: string; metric: string; detail: string; image: ImageAsset }[];
  };
  path: {
    id: string;
    kicker: string;
    headline: string;
    lead: string;
    phases: string[];
    boundary: string;
    stages: { n: string; title: string; body: string; free?: boolean }[];
    footnote: string;
  };
  stack: {
    id: string;
    kicker: string;
    headline: string;
    lead: string;
    layers: { n: string; name: string; items: string[]; highlight?: boolean }[];
  };
  founder: {
    id: string;
    kicker: string;
    headline: string;
    pull: { before: string; accent: string; after: string };
    story: string[];
    disciplines: string;
    /** Closing attribution, set in the same mono voice as `disciplines`. */
    signoff: string;
  };
  contact: {
    id: string;
    kicker: string;
    headline: string;
    points: string[];
    cta: Link;
    details: {
      label: string;
      value: string;
      href?: string;
      /** Render as an icon link instead of exposing the raw value. */
      icon?: "whatsapp" | "email";
    }[];
  };
  footer: { tagline: string; locations: string; rights: string };
};
