"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHead } from "../primitives";
import { EASE } from "../motion";
import type { SiteContent } from "@/content";

export function Stack({ stack }: { stack: SiteContent["stack"] }) {
  const reduced = useReducedMotion();

  return (
    <Section id={stack.id}>
      <SectionHead kicker={stack.kicker} headline={stack.headline} />

      {/* Six-layer cross-section. Layers slide in from alternating sides and
          settle, so the stack reads as being assembled. The application layer
          is the one Yield moment. */}
      <motion.ol
        className="mt-16 flex flex-col gap-3"
        initial={reduced ? undefined : "hidden"}
        whileInView={reduced ? undefined : "shown"}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09 } } }}
      >
        {stack.layers.map((layer, i) => {
          const highlight = layer.highlight;
          return (
            <motion.li
              key={layer.n}
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0, x: i % 2 === 0 ? -48 : 48 },
                      shown: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
                    }
              }
            >
              <div
                className={`ticked group flex flex-col gap-5 p-5 transition-[transform,border-color] duration-300 md:flex-row md:items-center md:gap-8 md:p-6 ${
                  highlight
                    ? "border border-yield/60 bg-yield/[0.05]"
                    : "panel hover:translate-x-2 hover:border-line-strong"
                }`}
              >
                <div className="flex items-center gap-5 md:w-[300px] md:shrink-0">
                  <span
                    className={`font-display text-3xl leading-none font-bold tracking-tight tabular-nums md:text-4xl ${
                      highlight ? "text-yield" : "text-signal"
                    }`}
                  >
                    {layer.n}
                  </span>
                  <span aria-hidden className="h-8 w-px bg-line-strong" />
                  <h3
                    className={`font-display text-base font-medium md:text-lg ${
                      highlight ? "text-yield" : "text-signal"
                    }`}
                  >
                    {layer.name}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className={`border px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide transition-colors duration-200 ${
                        highlight
                          ? "border-yield/40 text-yield"
                          : "border-line text-signal/85 group-hover:border-line-strong"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

      <p className="mono-note mt-8">{stack.lead}</p>
    </Section>
  );
}
