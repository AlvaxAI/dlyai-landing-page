"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../reveal";
import { Section, SectionHead } from "../primitives";
import { EASE } from "../motion";
import type { SiteContent } from "@/content";

export function Gap({ gap }: { gap: SiteContent["gap"] }) {
  const reduced = useReducedMotion();

  return (
    <Section id={gap.id}>
      <SectionHead kicker={gap.kicker} headline={gap.headline} lead={gap.lead} />

      {/* The deployment gap: ambition on one side, production value on the
          other, four broken spans in between. The span draws itself and then
          the breaks snap open. The destination is the one Yield moment. */}
      <div className="mt-20 hidden md:block">
        <div className="grid grid-cols-[minmax(0,1fr)_2.4fr_minmax(0,1fr)] items-center gap-6">
          <Reveal className="ticked panel px-5 py-9 text-center">
            <p className="font-display text-sm leading-snug tracking-wide uppercase">{gap.from}</p>
          </Reveal>

          <div aria-hidden className="relative py-9">
            <motion.div
              className="flex items-center"
              initial={reduced ? undefined : { scaleX: 0, opacity: 0 }}
              whileInView={reduced ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              style={{ transformOrigin: "left" }}
            >
              {gap.failures.map((f, i) => (
                <div key={f.title} className="flex flex-1 items-center">
                  <span className="h-px flex-1 border-t border-dashed border-line-strong" />
                  <motion.span
                    className="mx-1 block h-4 w-px rotate-[24deg] bg-line-strong"
                    initial={reduced ? undefined : { scaleY: 0 }}
                    whileInView={reduced ? undefined : { scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease: EASE, delay: 0.7 + i * 0.12 }}
                  />
                </div>
              ))}
              <svg viewBox="0 0 12 10" className="ml-1 h-2.5 w-3 text-line-strong" fill="none">
                <path d="M0 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </motion.div>
          </div>

          <motion.div
            className="ticked border border-yield/60 px-5 py-9 text-center"
            initial={reduced ? undefined : { opacity: 0, x: 28 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          >
            <p className="font-display text-sm leading-snug tracking-wide text-yield uppercase">
              {gap.to}
            </p>
          </motion.div>
        </div>
      </div>

      <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
        {gap.failures.map((failure, i) => (
          <Reveal
            as="li"
            key={failure.title}
            delay={i * 80}
            className="group bg-ink p-6 transition-colors duration-300 hover:bg-surface/50 lg:p-7"
          >
            <span className="kicker transition-colors duration-300 group-hover:text-yield">
              [{String(i + 1).padStart(2, "0")}]
            </span>
            <h3 className="mt-4 font-display text-lg leading-snug font-medium">{failure.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{failure.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
