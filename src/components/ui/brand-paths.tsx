"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * DLY-tuned variant of `background-paths`.
 *
 * Same flowing-path idea, rebuilt against the brand book: Deep Ink canvas,
 * Signal White hairlines, exactly one Yield strand, no gradients, no glass,
 * no glow. Runs as a background layer behind real content rather than as a
 * standalone hero.
 *
 * Durations are derived from the path index (never Math.random) so server and
 * client agree, and the whole thing renders as a still frame under
 * prefers-reduced-motion.
 */

const PATH_COUNT = 16;

function pathData(i: number, position: number) {
  const x = i * 5 * position;
  return (
    `M-${380 - x} -${189 + i * 6}` +
    `C-${380 - x} -${189 + i * 6} -${312 - x} ${216 - i * 6} ${152 - x} ${343 - i * 6}` +
    `C${616 - x} ${470 - i * 6} ${684 - x} ${875 - i * 6} ${684 - x} ${875 - i * 6}`
  );
}

function PathField({ position, accentAt }: { position: number; accentAt?: number }) {
  const reduced = useReducedMotion();

  // preserveAspectRatio="none" stretches the field across the whole hero.
  // "meet" would letterbox it; "slice" crops the viewBox down to a sliver.
  return (
    <svg
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute inset-0 h-full w-full"
    >
      {Array.from({ length: PATH_COUNT }, (_, i) => {
        const accent = i === accentAt;
        // Deterministic spread: 24s → 40s, varied but stable across renders.
        const duration = 24 + ((i * 7) % 17);

        return (
          <motion.path
            key={i}
            d={pathData(i, position)}
            stroke={accent ? "var(--color-yield)" : "var(--color-signal)"}
            strokeWidth={accent ? 1.3 : 0.45 + i * 0.03}
            strokeOpacity={accent ? 0.7 : 0.1 + i * 0.026}
            initial={reduced ? undefined : { pathLength: 0.55 }}
            animate={
              reduced
                ? undefined
                : { pathLength: [0.55, 1, 0.55], pathOffset: [0, 1, 0] }
            }
            transition={
              reduced
                ? undefined
                : { duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
            }
          />
        );
      })}
    </svg>
  );
}

const MASK = [
  "radial-gradient(125% 130% at 78% 55%, #000 0%, rgba(0,0,0,0.85) 34%, rgba(0,0,0,0.35) 62%, transparent 86%)",
  "linear-gradient(to bottom, #000 0%, #000 62%, transparent 97%)",
].join(", ");

export function BrandPaths({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        // Two masks, intersected: the radial keeps the field in the empty
        // right half (away from the headline column), the linear feathers the
        // bottom so the lines never end on the section's border.
        maskImage: MASK,
        WebkitMaskImage: MASK,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <div className="absolute inset-0 -scale-x-100">
        {/* No lime strand here: the hero already spends its one Yield moment
            on the CTA and the ladder's terminal node. */}
        <PathField position={1} />
        <PathField position={-1} />
      </div>
    </div>
  );
}
