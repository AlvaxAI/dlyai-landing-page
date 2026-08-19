"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

// useLayoutEffect warns when React renders on the server; fall back to
// useEffect there (nothing to measure before paint in that environment).
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ==========================================================================
   Scroll progress — a single vertical Yield rule on the left edge. One
   indicator, not two: a bar reads position at a glance where a numeric
   readout asked you to parse it.
   ========================================================================== */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div
      aria-hidden
      className="fixed top-32 bottom-16 left-6 z-[70] hidden w-px bg-line lg:block"
    >
      <motion.span style={{ scaleY }} className="block h-full w-px origin-top bg-yield" />
    </div>
  );
}

/* ==========================================================================
   Scramble/decode headline. Mono glyphs churn, then resolve left to right —
   the geekiest possible way to say "Deploy. Learn. Yield."

   Accessibility: the real string is always in the DOM for assistive tech and
   crawlers; only the churning copy is aria-hidden. Reduced motion skips it.
   ========================================================================== */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#";

export function ScrambleText({
  text,
  className = "",
  delay = 0,
  speed = 34,
  play = true,
}: {
  text: string;
  className?: string;
  /** ms before the decode starts */
  delay?: number;
  /** ms per frame */
  speed?: number;
  play?: boolean;
}) {
  const reduced = useReducedMotion();
  const host = useRef<HTMLSpanElement>(null);
  const out = useRef<HTMLSpanElement>(null);
  // Decode when the text actually reaches the reader — running it on mount
  // means everything below the fold has already resolved by the time you
  // scroll to it.
  const inView = useInView(host, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const node = out.current;
    if (!node || reduced || !play || !inView) return;

    let frame = 0;
    let raf = 0;
    let last = 0;
    // Each character resolves after its own threshold, so the word decodes
    // left to right instead of all at once.
    const settleAt = text.split("").map((_, i) => i * 1.6 + 6);
    const total = settleAt[settleAt.length - 1] + 4;

    const tick = (now: number) => {
      if (now - last >= speed) {
        last = now;
        frame += 1;
        node.textContent = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (frame >= settleAt[i]) return char;
            return GLYPHS[(frame * 7 + i * 13) % GLYPHS.length];
          })
          .join("");
      }
      if (frame < total) raf = requestAnimationFrame(tick);
      else node.textContent = text;
    };

    node.textContent = text.replace(/\S/g, " ");
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      if (node) node.textContent = text;
    };
  }, [text, delay, speed, reduced, play, inView]);

  return (
    <span ref={host} className={className}>
      <span className="sr-only">{text}</span>
      <span ref={out} aria-hidden>
        {text}
      </span>
    </span>
  );
}

/* ==========================================================================
   Word-by-word headline. Type arrives the way it's read.
   Capped at 8 words of stagger per the motion guidance — beyond that the tail
   reads as lag rather than rhythm.
   ========================================================================== */

const wordContainer: Variants = {
  hidden: {},
  shown: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: "0.55em", rotateX: -55 },
  shown: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: EASE } },
};

export function AnimatedHeadline({
  text,
  as: Tag = "h2",
  className = "",
  stagger = 0.05,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.h2;
  const words = text.split(" ");

  return (
    <MotionTag
      className={className}
      style={{ perspective: 800 }}
      variants={wordContainer}
      custom={stagger}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ delayChildren: delay }}
    >
      {words.map((word, i) => (
        // Two spans: the outer clips, the inner rotates up out of the clip.
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={wordItem} className="inline-block origin-bottom">
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ==========================================================================
   Animated proof numbers. Splits "−76%" / "3.1×" / "1.8 mo" into
   prefix + number + suffix and counts only the number, so units and signs
   stay put.
   ========================================================================== */

const NUMBER_RE = /^(\D*?)(\d+(?:\.\d+)?)([\s\S]*)$/;

export function AnimatedNumber({ value, className = "" }: { value: string; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const out = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const match = value.match(NUMBER_RE);
  const target = match ? Number.parseFloat(match[2]) : Number.NaN;
  const decimals = match?.[2].includes(".") ? (match[2].split(".")[1]?.length ?? 0) : 0;
  const animatable = Boolean(match) && !Number.isNaN(target);

  // The markup ships the FINAL value, so SSR, no-JS and reduced-motion all
  // agree and there is no hydration mismatch. The ticker is written straight
  // to the DOM node instead of through state — the reset happens before paint,
  // so the number never visibly flashes.
  useIsomorphicLayoutEffect(() => {
    if (!animatable || reduced || inView || !out.current || !match) return;
    out.current.textContent = `${match[1]}${(0).toFixed(decimals)}${match[3]}`;
  }, [animatable, reduced, inView, match, decimals]);

  useEffect(() => {
    if (!animatable || reduced || !inView || !out.current || !match) return;

    const node = out.current;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = `${match[1]}${latest.toFixed(decimals)}${match[3]}`;
      },
      onComplete: () => {
        node.textContent = value;
      },
    });
    return () => controls.stop();
  }, [animatable, reduced, inView, match, target, decimals, value]);

  if (!animatable) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {/* Assistive tech reads the real value, never the ticking one. */}
      <span className="sr-only">{value}</span>
      <span ref={out} aria-hidden className="tabular-nums">
        {value}
      </span>
    </span>
  );
}

/* ==========================================================================
   Score bar that fills segment by segment.
   ========================================================================== */

export function AnimatedScore({ score, highlight }: { score: number; highlight?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      className="flex gap-1.5"
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "shown"}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.08 } } }}
    >
      {[1, 2, 3, 4].map((step) => {
        const on = step <= score;
        return (
          <motion.span
            key={step}
            variants={
              reduced
                ? undefined
                : {
                    hidden: { scaleX: 0, opacity: 0.15 },
                    shown: { scaleX: 1, opacity: 1, transition: { duration: 0.45, ease: EASE } },
                  }
            }
            className={`h-[3px] w-6 origin-left ${
              on ? (highlight ? "bg-yield" : "bg-signal") : "bg-signal/15"
            }`}
          />
        );
      })}
    </motion.span>
  );
}

/* ==========================================================================
   Clip-path wipe. Evidence doesn't fade in — it gets uncovered, like a
   plotter drawing a sheet.
   ========================================================================== */

export function ClipReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const from =
    direction === "left"
      ? "inset(0 100% 0 0)"
      : direction === "right"
        ? "inset(0 0 0 100%)"
        : "inset(100% 0 0 0)";

  return (
    <motion.div
      className={className}
      initial={{ clipPath: from }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.05, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   Scan line — a Yield rule that sweeps a block once as it enters view.
   ========================================================================== */

export function ScanSweep({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 h-px bg-yield/70 ${className}`}
      initial={{ top: "0%", opacity: 0 }}
      whileInView={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 1.4, ease: "easeInOut", times: [0, 0.08, 0.85, 1] }}
    />
  );
}

/* ==========================================================================
   Staggered list container.
   ========================================================================== */

export function Stagger({
  children,
  as: Tag = "div",
  className = "",
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <Tag className={className}>{children}</Tag>;

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={`reveal-group ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </MotionTag>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <Tag className={className}>{children}</Tag>;

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag className={`reveal ${className}`} variants={staggerItem}>
      {children}
    </MotionTag>
  );
}

/* ==========================================================================
   Parallax. Small offsets only — restrained brand, not a scroll-jacker.
   ========================================================================== */

export function Parallax({
  children,
  distance = 36,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ==========================================================================
   Magnetic — the CTA leans toward the pointer, then springs back. Pointer
   only; touch and reduced motion get a plain element.
   ========================================================================== */

export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   Pointer parallax for hero art. Returns spring-smoothed motion values that
   stay at 0 on touch devices and under reduced motion.
   ========================================================================== */

export function usePointerParallax(strength = 18): { x: MotionValue<number>; y: MotionValue<number> } {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      x.set(((event.clientX / window.innerWidth) * 2 - 1) * strength);
      y.set(((event.clientY / window.innerHeight) * 2 - 1) * strength);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, strength, reduced]);

  return { x: sx, y: sy };
}
