"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Deployment field — the hero's argument, drawn.
 *
 * A lattice of survey nodes with a wave propagating diagonally through it:
 * systems coming online one after another, converging on a single node that
 * resolves. It is the literal picture of "deploy", which is why it replaced
 * the drifting path field — that one was atmosphere, this one is the claim.
 *
 * The wave is pure CSS (`animation-delay` derived from each node's diagonal
 * index), so ~100 nodes cost one composited layer each instead of a JS frame
 * loop. Everything is deterministic — no Math.random, so SSR and client agree.
 */

const COLS = 9;
const ROWS = 7;
const GAP = 58;
const PAD = 34;

const W = PAD * 2 + (COLS - 1) * GAP;
const H = PAD * 2 + (ROWS - 1) * GAP;

// Where the wave resolves: the node the whole field is heading toward.
const TARGET = { col: COLS - 2, row: 1 };

export function DeploymentField({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  const nodes = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      nodes.push({ col, row, x: PAD + col * GAP, y: PAD + row * GAP });
    }
  }

  const maxDiag = COLS + ROWS - 2;

  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="h-auto w-full">
        <defs>
          <style>{`
            @keyframes dly-node {
              0%, 100% { opacity: .2 }
              8%       { opacity: 1 }
              26%      { opacity: .2 }
            }
            @keyframes dly-link {
              0%, 100% { opacity: 0 }
              8%       { opacity: .7 }
              30%      { opacity: 0 }
            }
            .dly-n { opacity: .2 }
            .dly-l { opacity: 0 }
            @media (prefers-reduced-motion: no-preference) {
              .dly-n { animation: dly-node 5.2s linear infinite }
              .dly-l { animation: dly-link 5.2s linear infinite }
            }
          `}</style>
        </defs>

        {/* Links run only rightward and downward, so the lattice reads as flow
            rather than as a decorative mesh. */}
        {nodes.map(({ col, row, x, y }) => {
          const delay = ((col + row) / maxDiag) * 3.4;
          return (
            <g key={`l-${col}-${row}`}>
              {col < COLS - 1 ? (
                <line
                  x1={x + 7}
                  y1={y}
                  x2={x + GAP - 7}
                  y2={y}
                  stroke="var(--color-signal)"
                  strokeWidth="0.9"
                  className="dly-l"
                  style={{ animationDelay: `${delay}s` }}
                />
              ) : null}
              {row < ROWS - 1 ? (
                <line
                  x1={x}
                  y1={y + 7}
                  x2={x}
                  y2={y + GAP - 7}
                  stroke="var(--color-signal)"
                  strokeWidth="0.9"
                  className="dly-l"
                  style={{ animationDelay: `${delay}s` }}
                />
              ) : null}
            </g>
          );
        })}

        {nodes.map(({ col, row, x, y }) => {
          const isTarget = col === TARGET.col && row === TARGET.row;
          const delay = ((col + row) / maxDiag) * 3.4;

          if (isTarget) return null;

          return (
            <path
              key={`n-${col}-${row}`}
              d={`M ${x - 4} ${y} H ${x + 4} M ${x} ${y - 4} V ${y + 4}`}
              stroke="var(--color-signal)"
              strokeWidth="1.15"
              className="dly-n"
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}

        {/* The node that resolved. One Yield moment, and it is the point of
            the whole picture: something actually shipped. */}
        <g>
          <rect
            x={PAD + TARGET.col * GAP - 11}
            y={PAD + TARGET.row * GAP - 11}
            width="22"
            height="22"
            stroke="var(--color-yield)"
            strokeWidth="1.25"
          />
          <rect
            x={PAD + TARGET.col * GAP - 3.5}
            y={PAD + TARGET.row * GAP - 3.5}
            width="7"
            height="7"
            fill="var(--color-yield)"
          />
          {reduced ? null : (
            <motion.rect
              x={PAD + TARGET.col * GAP - 11}
              y={PAD + TARGET.row * GAP - 11}
              width="22"
              height="22"
              stroke="var(--color-yield)"
              strokeWidth="1"
              style={{
                transformOrigin: `${PAD + TARGET.col * GAP}px ${PAD + TARGET.row * GAP}px`,
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
              transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
