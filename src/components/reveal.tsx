"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger within a group, in ms. Keep it small — restraint is the system. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0 },
};

/**
 * Scroll reveal. Motion here carries meaning (content arriving in reading
 * order), never decoration.
 *
 * Degradation, in order:
 *   - prefers-reduced-motion  → renders in its final state, no transition
 *   - no JavaScript at all    → <noscript> rule in layout keeps `.reveal` visible
 * The markup is always present in the HTML, so crawlers see full content.
 */
export function Reveal({ children, delay = 0, as = "div", className = "" }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={`reveal-static ${className}`}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={`reveal ${className}`}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </MotionTag>
  );
}
