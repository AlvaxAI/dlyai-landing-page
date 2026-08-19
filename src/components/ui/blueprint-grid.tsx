"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Blueprint grid — the "engineered on a grid" principle made literal.
 * A fixed hairline lattice behind everything, drifting a few pixels as the
 * page scrolls so the page feels like it sits on a surveyed plane rather than
 * a flat sheet. Purely decorative, so it never enters the a11y tree.
 */
export function BlueprintGrid() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{
          y: reduced ? 0 : y,
          backgroundImage:
            "linear-gradient(to right, rgb(245 247 250 / 0.045) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgb(245 247 250 / 0.045) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(120% 90% at 50% 30%, #000 15%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 30%, #000 15%, transparent 80%)",
        }}
        className="absolute -inset-y-24 inset-x-0"
      />
    </div>
  );
}
