"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../reveal";
import { Arrow, MailMark, Plus, Section, WhatsAppMark } from "../primitives";
import { AnimatedHeadline, EASE, Magnetic } from "../motion";
import type { SiteContent } from "@/content";

export function Contact({ contact }: { contact: SiteContent["contact"] }) {
  const reduced = useReducedMotion();

  return (
    <Section id={contact.id} className="pb-28 md:pb-36">
      <Reveal className="flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span className="kicker">{contact.kicker}</span>
      </Reveal>

      <AnimatedHeadline
        text={contact.headline}
        as="h2"
        className="h-display mt-8 max-w-5xl text-[clamp(2.5rem,1.2rem+5.4vw,6rem)]"
        delay={0.05}
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal delay={120}>
          <ul className="flex flex-col gap-4">
            {contact.points.map((point) => (
              <li key={point} className="flex items-start gap-4">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-muted" />
                <span className="text-base leading-relaxed sm:text-lg">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The one loud thing on this screen. */}
        <Reveal delay={180}>
          <Magnetic strength={0.14}>
            <motion.a
              href={contact.cta.href}
              className="group ticked flex cursor-pointer items-center justify-between gap-6 border border-yield p-8 transition-colors duration-300 hover:bg-yield sm:p-10"
              whileHover={reduced ? undefined : { scale: 1.015 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <span className="font-display text-xl leading-snug font-bold text-yield transition-colors duration-300 group-hover:text-ink sm:text-2xl">
                {contact.cta.label}
              </span>
              <Arrow className="h-7 w-7 shrink-0 text-yield transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-ink" />
            </motion.a>
          </Magnetic>
        </Reveal>
      </div>

      <Reveal delay={220}>
        <dl className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {contact.details.map((detail) => (
            <div key={detail.label} className="bg-ink px-5 py-7 transition-colors duration-300 hover:bg-surface/50">
              <dt className="kicker">{detail.label}</dt>
              <dd className="mt-3 text-sm leading-snug">
                {detail.icon && detail.href ? (
                  // Contact channels are actions, not strings to read: the
                  // icon carries the tap, the label names the channel, and
                  // aria-label is what assistive tech announces. 44x44 target.
                  <a
                    href={detail.href}
                    {...(detail.icon === "whatsapp"
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={detail.value}
                    className="-m-2.5 inline-flex h-11 w-11 cursor-pointer items-center justify-center text-signal transition-colors duration-200 hover:text-yield"
                  >
                    {detail.icon === "whatsapp" ? (
                      <WhatsAppMark className="h-6 w-6" />
                    ) : (
                      <MailMark className="h-6 w-6" />
                    )}
                  </a>
                ) : detail.href ? (
                  <a
                    href={detail.href}
                    className="cursor-pointer underline decoration-line-strong underline-offset-4 transition-colors duration-200 hover:text-yield hover:decoration-yield"
                  >
                    {detail.value}
                  </a>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
