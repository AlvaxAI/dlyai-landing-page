"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../reveal";
import { Arrow, Section, SectionHead } from "../primitives";
import { EASE } from "../motion";
import type { SiteContent } from "@/content";

/** A lime pulse travelling along a connector — work moving down the line. */
function Connector({ index }: { index: number }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="relative hidden items-center justify-center px-1 lg:flex">
      <Arrow className="h-4 w-4 text-line-strong" />
      {reduced ? null : (
        <motion.span
          className="absolute h-1 w-1 bg-yield"
          initial={{ x: -14, opacity: 0 }}
          animate={{ x: 14, opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2.4,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
      )}
    </div>
  );
}

export function Approach({ approach }: { approach: SiteContent["approach"] }) {
  const reduced = useReducedMotion();

  return (
    <Section id={approach.id}>
      <SectionHead
        kicker={approach.kicker}
        headline={approach.headline}
        lead={approach.lead}
      />

      {/* Your context and our team converge into one delivery unit — then the
          loop keeps running. The production system is the single accent. */}
      <motion.div
        className="mt-16 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-3"
        initial={reduced ? undefined : "hidden"}
        whileInView={reduced ? undefined : "shown"}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.13 } } }}
      >
        {approach.flow.map((node, i) => {
          const isProduction = i === 2;
          return (
            <motion.div
              key={node.label}
              className="contents"
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0 },
                      shown: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
                    }
              }
            >
              <motion.div
                className={`ticked flex flex-col p-6 ${
                  isProduction ? "border border-yield/50 bg-yield/[0.05]" : "panel"
                }`}
                variants={
                  reduced
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 26, clipPath: "inset(0 0 100% 0)" },
                        shown: {
                          opacity: 1,
                          y: 0,
                          clipPath: "inset(0 0 0% 0)",
                          transition: { duration: 0.7, ease: EASE },
                        },
                      }
                }
              >
                <p
                  className={`font-mono text-[0.6875rem] tracking-[0.16em] uppercase ${
                    isProduction ? "text-yield" : "text-muted"
                  }`}
                >
                  {node.label}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5 border-t border-line-soft pt-5">
                  {node.items.map((item) => (
                    <li key={item} className="text-sm leading-snug text-signal/90">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {i < approach.flow.length - 1 ? <Connector index={i} /> : null}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {approach.principles.map((principle, i) => (
          <Reveal key={principle} delay={i * 70} className="bg-ink px-6 py-6">
            <p className="font-display text-sm leading-snug">{principle}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mono-note mt-10 tracking-[0.14em]">{approach.mission}</p>
      </Reveal>
    </Section>
  );
}
