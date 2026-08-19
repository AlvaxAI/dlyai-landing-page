"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Subscribe to the pointer capability directly instead of syncing it into
 *  state from an effect — no cascading render, and it stays correct if the
 *  user plugs in a mouse mid-session. */
function useFinePointer() {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(FINE_POINTER);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false, // server: assume touch, so the native cursor is never hidden
  );
}

/**
 * Crosshair cursor — a surveyor's reticle instead of an arrow. The most
 * on-brand pointer this company could have: geometric, technical, restrained.
 *
 * Guardrails:
 *   - only on devices with a real hovering pointer (never touch)
 *   - disabled entirely under prefers-reduced-motion (native cursor returns)
 *   - the native cursor is only hidden once this component is actually
 *     running, so a JS failure can never leave a page with no pointer
 *   - keyboard focus rings are untouched
 */
export function CrosshairCursor() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduced;

  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.25 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.dataset.cursor = "crosshair";

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setInteractive(
        Boolean(target?.closest("a, button, [role='button'], input, summary")),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      delete document.documentElement.dataset.cursor;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.svg
        viewBox="0 0 48 48"
        width="48"
        height="48"
        fill="none"
        className="-translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: interactive ? 45 : 0, scale: interactive ? 1.3 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M24 6v9M24 33v9M6 24h9M33 24h9" stroke="#F5F7FA" strokeWidth="1" />
        <motion.rect
          x="16"
          y="16"
          width="16"
          height="16"
          stroke="#F5F7FA"
          strokeWidth="1"
          animate={{ opacity: interactive ? 1 : 0.45 }}
          transition={{ duration: 0.25 }}
        />
        <circle cx="24" cy="24" r="1.5" fill="#F5F7FA" />
      </motion.svg>
    </motion.div>
  );
}
