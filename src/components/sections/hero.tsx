"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GhostButton, YieldButton } from "../primitives";
import { DeploymentField } from "../ui/deployment-field";
import { AnimatedNumber, EASE, Magnetic, ScrambleText, usePointerParallax } from "../motion";
import type { SiteContent } from "@/content";

/** The headline arrives one line at a time, decoding as it lands. */
function Headline({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion();

  return (
    <h1 className="h-display mt-5 text-[clamp(2.5rem,1.1rem+5.2vw,5rem)]">
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduced ? undefined : { y: "110%" }}
            animate={reduced ? undefined : { y: 0 }}
            transition={reduced ? undefined : { duration: 0.85, ease: EASE, delay: 0.04 + i * 0.1 }}
          >
            <ScrambleText text={line} delay={170 + i * 130} speed={24} />
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const pointer = usePointerParallax(14);

  // Scroll-out: the hero recedes rather than simply scrolling away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, ease: EASE, delay },
        };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[86vh] items-center overflow-hidden px-6 pt-24 pb-16 sm:px-10 md:pt-28 md:pb-20 lg:px-16"
    >
      {/* The field sits behind the copy and bleeds off the right edge — it is
          the argument, not a border ornament. */}
      <motion.div
        style={reduced ? undefined : { x: pointer.x, y: pointer.y, scale: artScale }}
        className="absolute inset-y-0 -right-[22%] hidden w-[82%] items-center md:flex lg:-right-[6%] lg:w-[58%]"
      >
        <DeploymentField
          className="w-full [mask-image:radial-gradient(85%_85%_at_62%_45%,#000_18%,transparent_78%)] [-webkit-mask-image:radial-gradient(85%_85%_at_62%_45%,#000_18%,transparent_78%)]"
        />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative mx-auto w-full max-w-[1200px]"
      >
        <div className="max-w-3xl">
          <motion.p className="kicker" {...fade(0)}>
            <ScrambleText text={hero.kicker} delay={110} speed={20} />
          </motion.p>

          <Headline lines={hero.headline} />

          <motion.p
            className="mt-6 max-w-2xl font-display text-lg leading-snug sm:text-xl"
            {...fade(0.44)}
          >
            {hero.lead}
          </motion.p>

          <motion.p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base" {...fade(0.52)}>
            {hero.sub}
          </motion.p>

          {/* Evidence above the fold. A stranger should not have to scroll to
              find out whether this team has actually done anything. */}
          <motion.dl
            className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-4"
            {...fade(0.6)}
          >
            {hero.proof.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl leading-none font-bold tracking-tight">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  <span className="mono-note mt-1.5 block">{stat.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            {...fade(0.68)}
          >
            <Magnetic strength={0.22}>
              <YieldButton href={hero.primaryCta.href}>{hero.primaryCta.label}</YieldButton>
            </Magnetic>
            <Magnetic strength={0.16}>
              <GhostButton href={hero.secondaryCta.href}>{hero.secondaryCta.label}</GhostButton>
            </Magnetic>
          </motion.div>

          <motion.p className="mt-4 max-w-lg text-sm leading-relaxed text-muted" {...fade(0.76)}>
            {hero.ctaNote}
          </motion.p>

          <motion.p className="mono-note mt-8 tracking-[0.2em] text-signal/70" {...fade(0.84)}>
            {hero.signature}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
