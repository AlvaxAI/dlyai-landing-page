"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../reveal";
import { Section, SectionHead } from "../primitives";
import { AnimatedNumber, EASE, ScanSweep } from "../motion";
import type { SiteContent } from "@/content";

export function Proof({ proof }: { proof: SiteContent["proof"] }) {
  const reduced = useReducedMotion();

  return (
    <Section id={proof.id}>
      <SectionHead kicker={proof.kicker} headline={proof.headline} />

      <div className="relative mt-16">
        <ScanSweep />
        <dl className="grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {proof.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="group bg-ink px-6 py-10">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  // nowrap + a conservative cap so multi-token values like
                  // "1.8 mo" never break across two lines in a narrow column.
                  className={`block font-display text-[clamp(2.25rem,1.2rem+2.9vw,3.5rem)] leading-none font-bold tracking-tight whitespace-nowrap ${
                    stat.highlight ? "text-yield" : "text-signal"
                  }`}
                >
                  <AnimatedNumber value={stat.value} />
                </span>
                <span className="mt-4 block text-sm text-signal/85">{stat.label}</span>
                <span className="kicker mt-6 block">[{String(i + 1).padStart(2, "0")}]</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <Reveal delay={100}>
        <div className="flex flex-col gap-4 border-b border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold tracking-tight">
              <AnimatedNumber value={proof.network.value} />
            </span>
            <span className="text-sm text-muted">{proof.network.label}</span>
          </p>
          <p className="mono-note ticked border border-line px-4 py-2">{proof.recent}</p>
        </div>
      </Reveal>

      {/* Domain spectrum — breadth as a measured line that draws itself,
          not a logo wall. */}
      <div className="mt-12">
        <Reveal>
          <p className="kicker">Delivery span</p>
        </Reveal>

        <motion.ol
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-4"
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "shown"}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07 } } }}
        >
          {proof.spectrum.map((domain, i) => {
            const last = i === proof.spectrum.length - 1;
            return (
              <motion.li
                key={domain}
                className="flex items-center gap-3"
                variants={
                  reduced
                    ? undefined
                    : {
                        hidden: { opacity: 0, x: -12 },
                        shown: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
                      }
                }
              >
                {i > 0 ? <span aria-hidden className="h-px w-6 bg-line-strong sm:w-10" /> : null}
                <span
                  className={`font-mono text-[0.6875rem] tracking-[0.12em] uppercase ${
                    last ? "text-signal" : "text-muted"
                  }`}
                >
                  {domain}
                </span>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </Section>
  );
}
