"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../reveal";
import { Section, SectionHead } from "../primitives";
import { EASE } from "../motion";
import type { SiteContent } from "@/content";

export function Path({ path }: { path: SiteContent["path"] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Scrub-driven, not trigger-driven: the delivery line advances exactly as
  // far as you have scrolled through the section.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const railWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <Section id={path.id}>
      <SectionHead kicker={path.kicker} headline={path.headline} lead={path.lead} />

      {/* Deploy → Learn → Yield across the engagement. The free-to-paid
          boundary is a single lime rule at the 1/5 mark — drawn honestly, and
          the only Yield moment in this view. Keeping it as one absolutely
          positioned element means it can never collide with a stage's text. */}
      <div ref={ref} className="relative mt-16">
        <Reveal className="hidden grid-cols-5 gap-px border-b border-line pb-3 lg:grid">
          <span className="kicker col-span-1">{path.phases[0]}</span>
          <span className="kicker col-span-2 border-l border-line pl-5">{path.phases[1]}</span>
          <span className="kicker col-span-2 border-l border-line pl-5">{path.phases[2]}</span>
        </Reveal>

        {/* The rail that fills as you read. */}
        <div aria-hidden className="relative mt-10 hidden h-px w-full bg-line lg:block">
          <motion.span
            className="absolute inset-y-0 left-0 bg-signal"
            style={{ width: reduced ? "100%" : railWidth }}
          />
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[20%] hidden lg:block">
          <motion.span
            className="absolute inset-y-0 left-0 w-px origin-top bg-yield"
            initial={reduced ? undefined : { scaleY: 0 }}
            whileInView={reduced ? undefined : { scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          />
        </div>

        <ol className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:mt-0 lg:grid-cols-5 lg:gap-0 lg:bg-transparent">
          {path.stages.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.n}
              delay={i * 80}
              className={`bg-ink p-6 lg:pt-8 lg:pr-6 ${i === 1 ? "lg:pl-8" : "lg:pl-0"}`}
            >
              <span className="font-display text-4xl leading-none font-bold tracking-tight text-signal tabular-nums">
                {stage.n}
              </span>
              <motion.span
                aria-hidden
                className={`mt-5 block h-2.5 w-2.5 rounded-full border ${
                  stage.free ? "border-yield bg-yield" : "border-line-strong bg-ink"
                }`}
                initial={reduced ? undefined : { scale: 0 }}
                whileInView={reduced ? undefined : { scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.09 }}
              />
              <h3 className="mt-5 font-display text-base leading-snug font-medium">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted lg:pr-4">{stage.body}</p>
              {stage.free ? <p className="mono-note mt-4 text-yield">{path.boundary}</p> : null}
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal delay={140}>
        <p className="mono-note mt-12 border-t border-line pt-6">{path.footnote}</p>
      </Reveal>
    </Section>
  );
}
