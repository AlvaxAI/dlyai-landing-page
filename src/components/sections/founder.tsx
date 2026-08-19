"use client";

import { Reveal } from "../reveal";
import { Section } from "../primitives";
import { AnimatedHeadline } from "../motion";
import type { SiteContent } from "@/content";

/**
 * Founder — voice only. No portrait, no credential list: the section earns
 * its place through the origin claim, and the two mono lines at the end carry
 * the attribution in the same register.
 */
export function Founder({ founder }: { founder: SiteContent["founder"] }) {
  return (
    <Section id={founder.id}>
      <div className="max-w-4xl">
        <Reveal className="flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          <span className="kicker">{founder.kicker}</span>
        </Reveal>

        <AnimatedHeadline text={founder.headline} as="h2" className="h-section mt-6" delay={0.06} />

        {/* The single Yield word in this view. */}
        <Reveal delay={110}>
          <p className="mt-8 font-display text-2xl leading-snug font-medium sm:text-3xl">
            {founder.pull.before}
            <span className="text-yield">{founder.pull.accent}</span>
            {founder.pull.after}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-8 max-w-2xl space-y-5 border-t border-line pt-8">
            {founder.story.map((para) => (
              <p key={para.slice(0, 24)} className="text-sm leading-relaxed text-muted sm:text-base">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col gap-2">
            <p className="mono-note tracking-[0.16em]">{founder.disciplines}</p>
            <p className="mono-note tracking-[0.16em]">{founder.signoff}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
