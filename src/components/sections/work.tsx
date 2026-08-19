"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "../reveal";
import { Arrow, Section, SectionHead } from "../primitives";
import { AnimatedNumber, ClipReveal, EASE, Parallax } from "../motion";
import type { CaseStudy, Metric, SiteContent } from "@/content";

type PipelineSpec = NonNullable<CaseStudy["pipeline"]>;

function Metrics({ metrics }: { metrics: Metric[] }) {
  if (metrics.length === 0) return null;

  // One row, always. Wrapping split "3.1x / <4 hrs / 4.9" across lines and the
  // group stopped reading as one result set, so the columns are fixed and the
  // value type scales with the count instead of reflowing.
  const cols = ["", "grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"][metrics.length] ?? "grid-cols-4";
  const size =
    metrics.length > 3
      ? "text-[clamp(1.25rem,0.7rem+1.5vw,2rem)]"
      : "text-[clamp(1.4rem,0.8rem+1.6vw,2.25rem)]";

  return (
    <dl className={`mt-8 grid ${cols} gap-x-4 border-t border-line pt-7 sm:gap-x-6`}>
      {metrics.map((m) => (
        <div key={m.label} className="min-w-0">
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <span
              className={`block ${size} font-display leading-none font-bold tracking-tight whitespace-nowrap ${
                m.highlight ? "text-yield" : "text-signal"
              }`}
            >
              <AnimatedNumber value={m.value} />
            </span>
            <span className="mt-2 block text-xs leading-snug text-muted">{m.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Agent-orchestration pipeline. Technical diagram-style line work — the
 *  visual is the evidence. Stages arrive left to right, like execution. */
function Pipeline({ pipeline }: { pipeline: PipelineSpec }) {
  const reduced = useReducedMotion();

  return (
    <motion.ol
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "shown"}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.09 } } }}
    >
      {pipeline.stages.map((stage) => {
        const highlight = "highlight" in stage && stage.highlight;
        return (
          <motion.li
            key={stage.label}
            variants={
              reduced
                ? undefined
                : {
                    hidden: { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
                    shown: {
                      opacity: 1,
                      y: 0,
                      clipPath: "inset(0 0 0% 0)",
                      transition: { duration: 0.6, ease: EASE },
                    },
                  }
            }
            className={`ticked flex flex-col p-5 ${
              highlight ? "border border-yield/50 bg-yield/[0.04]" : "panel"
            }`}
          >
            <p
              className={`font-mono text-[0.625rem] leading-snug tracking-[0.14em] uppercase ${
                highlight ? "text-yield" : "text-muted"
              }`}
            >
              {stage.label}
            </p>
            <ul className="mt-4 flex flex-col gap-2 border-t border-line-soft pt-4">
              {stage.items.map((item) => (
                <li key={item} className="text-xs leading-snug text-signal/85">
                  {item}
                </li>
              ))}
            </ul>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

function CaseBlock({
  entry,
  index,
  labels,
  anonymised,
  onActive,
}: {
  entry: CaseStudy;
  index: number;
  labels: SiteContent["work"]["labels"];
  anonymised: string;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  // -45% top / -45% bottom keeps exactly one case "current" at a time.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const wide = entry.images.length !== 1;

  const evidence =
    entry.pipeline ? (
      <Pipeline pipeline={entry.pipeline} />
    ) : entry.images.length > 0 ? (
      <div className={`grid gap-4 ${entry.images.length > 1 ? "lg:grid-cols-2" : ""}`}>
        {entry.images.map((img, i) => (
          <ClipReveal
            key={img.src}
            direction={i % 2 === 0 ? "up" : "left"}
            delay={i * 0.12}
            className="overflow-hidden border border-line bg-surface/40"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1600}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
            />
          </ClipReveal>
        ))}
      </div>
    ) : null;

  return (
    <article
      ref={ref}
      className="border-t border-line py-16 first:border-t-0 first:pt-0 md:py-24"
    >
      <div className={`grid gap-10 ${wide ? "" : "lg:grid-cols-[1fr_0.9fr] lg:gap-14"}`}>
        <div>
          <Reveal className="flex flex-wrap items-center gap-3">
            <span className="kicker text-yield">[{String(index + 1).padStart(2, "0")}]</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span className="kicker">{entry.sector}</span>
          </Reveal>

          <Reveal delay={60}>
            <h3 className="h-display mt-6 text-[clamp(2rem,1.1rem+3.2vw,3.75rem)]">
              {entry.headline}
            </h3>
          </Reveal>

          <Reveal delay={110}>
            <p className="mono-note mt-5">{entry.client}</p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
              <div className="border-l border-line pl-5">
                <p className="kicker">{labels.hard}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{entry.hard}</p>
              </div>
              <div className="border-l border-line-strong pl-5">
                <p className="kicker">{labels.shipped}</p>
                <p className="mt-3 text-sm leading-relaxed text-signal/90">{entry.shipped}</p>
              </div>
            </div>
          </Reveal>

          {entry.flow ? (
            <Reveal delay={190}>
              <ol className="mt-8 flex flex-wrap items-center gap-3">
                {entry.flow.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    {i > 0 ? <Arrow className="h-3.5 w-3.5 text-yield" /> : null}
                    <span className="font-display text-base">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}

          <Reveal delay={220}>
            <div>
              <p className="kicker mt-8">{labels.moved}</p>
              <Metrics metrics={entry.metrics} />
              {entry.note ? <p className="mono-note mt-6">{entry.note}</p> : null}
              <p className="mono-note mt-6 flex items-center gap-2">
                <span aria-hidden className="inline-block h-1.5 w-1.5 bg-line-strong" />
                {anonymised}
              </p>
            </div>
          </Reveal>
        </div>

        {evidence ? (
          <div className={wide ? "mt-2" : "self-start"}>
            {wide ? evidence : <Parallax distance={26}>{evidence}</Parallax>}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function Work({ work }: { work: SiteContent["work"] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <Section id={work.id}>
      <SectionHead kicker={work.kicker} headline={work.headline} lead={work.lead} />

      {/* The one pinned element on the page: a sticky case index that tracks
          which study you are reading. Guidance is 1–2 pinned regions max —
          this is the one that earns it. */}
      <div className="mt-16 lg:grid lg:grid-cols-[188px_1fr] lg:gap-14">
        <nav aria-label="Case studies" className="hidden lg:block">
          <ol className="sticky top-28 flex flex-col gap-px border-l border-line">
            {work.cases.map((entry, i) => {
              const on = i === active;
              return (
                <li key={entry.headline} className="relative pl-5">
                  {on && !reduced ? (
                    <motion.span
                      layoutId="case-marker"
                      className="absolute top-0 bottom-0 -left-px w-px bg-yield"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  ) : null}
                  <span
                    className={`block py-3 font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-colors duration-300 ${
                      on ? "text-signal" : "text-muted/60"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} · {entry.sector}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        <div>
          {work.cases.map((entry, i) => (
            <CaseBlock
              key={entry.headline}
              entry={entry}
              index={i}
              labels={work.labels}
              anonymised={work.anonymised}
              onActive={setActive}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-line pt-14">
        <Reveal>
          <p className="kicker">{work.moreLabel}</p>
        </Reveal>

        <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {work.more.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 60}
              className="group flex flex-col bg-ink transition-colors duration-300 hover:bg-surface/50"
            >
              {/* Source screenshots vary in aspect ratio — lock the frame so
                  the grid reads as one system, not a ragged collage. */}
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-surface/40">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-base font-medium">{item.title}</h3>
                <p className="mt-3 font-display text-xl leading-none font-bold tracking-tight transition-colors duration-300 group-hover:text-yield">
                  {item.metric}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mono-note mt-6">{work.anonymised} · white-label engagements</p>
        </Reveal>
      </div>
    </Section>
  );
}
