import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { AnimatedHeadline } from "./motion";

/* --------------------------------------------------------------------------
   Logo — Signal White lockup, placed directly on Deep Ink.
   No capsule, no border, no shadow, no glow. Never recolour the wordmark.
   -------------------------------------------------------------------------- */

export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/dly-logo-lockup.svg"
      alt="DLY AI"
      width={334}
      height={102}
      priority
      className={className}
    />
  );
}

/* --------------------------------------------------------------------------
   Section shell — mono index + kicker, display headline, optional lead.
   -------------------------------------------------------------------------- */

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-line px-6 py-20 sm:px-10 md:py-28 lg:px-16 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}

export function SectionHead({
  kicker,
  headline,
  lead,
  className = "",
}: {
  kicker: string;
  headline: string;
  lead?: string;
  className?: string;
}) {
  return (
    <header className={`max-w-3xl ${className}`}>
      <Reveal className="flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span className="kicker">{kicker}</span>
      </Reveal>

      <AnimatedHeadline text={headline} as="h2" className="h-section mt-6" delay={0.06} />

      {lead ? (
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
        </Reveal>
      ) : null}
    </header>
  );
}

/* --------------------------------------------------------------------------
   Buttons — exactly one Yield-filled CTA per view. Everything else is a
   hairline ghost.
   -------------------------------------------------------------------------- */

export function YieldButton({
  href,
  children,
  className = "",
  target,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  target?: "_blank";
}) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`group inline-flex cursor-pointer items-center justify-between gap-4 bg-yield px-6 py-3.5 text-left font-display text-sm font-medium text-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-signal focus-visible:bg-signal ${className}`}
    >
      {children}
      <Arrow className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex cursor-pointer items-center justify-between gap-4 border border-line-strong px-6 py-3.5 text-left font-display text-sm font-medium text-signal transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-signal hover:bg-signal/5 ${className}`}
    >
      {children}
      <Arrow className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

/* --------------------------------------------------------------------------
   Icons — geometric line work, single consistent stroke. SVG only, no emoji.
   -------------------------------------------------------------------------- */

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}

export function Plus({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * WhatsApp mark. The one filled glyph in an otherwise line-drawn icon set —
 * a third-party brand has to stay recognisable to be clickable. Rendered in
 * currentColor so it still obeys the palette.
 */
export function WhatsAppMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

/** Envelope — geometric line work, single stroke, matching the icon set. */
export function MailMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="2" y="5" width="20" height="14" stroke="currentColor" strokeWidth="1.75" />
      <path d="m2 6 10 7 10-7" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}
