"use client";

import { Reveal } from "../reveal";
import { Arrow, Section, SectionHead } from "../primitives";
import { AnimatedScore, ScanSweep } from "../motion";
import type { SiteContent } from "@/content";

export function Comparison({ comparison }: { comparison: SiteContent["comparison"] }) {
  return (
    <Section id={comparison.id}>
      <SectionHead
        kicker={comparison.kicker}
        headline={comparison.headline}
        lead={comparison.lead}
      />

      {/* A Yield rule sweeps the matrix once as it enters view — the bars fill
          in its wake, so the table reads as being measured rather than drawn. */}
      <Reveal delay={80} className="relative mt-16 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
        <ScanSweep />
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            How DLY&apos;s forward-deployed model compares with building in-house, traditional
            outsourcing and big consulting, scored out of 4.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[180px] p-0" />
              {comparison.columns.map((col) => (
                <th
                  key={col.name}
                  scope="col"
                  className={`align-bottom px-5 pb-5 ${
                    col.highlight ? "border-x border-t border-yield/50 bg-yield/[0.03]" : ""
                  }`}
                >
                  <span
                    className={`block font-display text-lg font-bold tracking-wide uppercase ${
                      col.highlight ? "text-yield" : "text-signal"
                    }`}
                  >
                    {col.name}
                  </span>
                  <span
                    className={`mt-1.5 block text-xs leading-snug font-normal normal-case ${
                      col.highlight ? "text-yield/80" : "text-muted"
                    }`}
                  >
                    {col.note}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th
                  scope="row"
                  className="py-7 pr-6 align-middle font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase"
                >
                  {row.label}
                </th>
                {row.scores.map((score, i) => {
                  const col = comparison.columns[i];
                  return (
                    <td
                      key={col.name}
                      className={`px-5 py-7 align-middle ${
                        col.highlight ? "border-x border-yield/50 bg-yield/[0.03]" : ""
                      }`}
                    >
                      <AnimatedScore score={score} highlight={col.highlight} />
                      <span className="sr-only">
                        {col.name}: {score} out of 4
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr aria-hidden>
              <td />
              {comparison.columns.map((col) => (
                <td
                  key={col.name}
                  className={col.highlight ? "h-0 border-x border-b border-yield/50" : "h-0"}
                />
              ))}
            </tr>
          </tbody>
        </table>
      </Reveal>

      <Reveal delay={140}>
        <p className="mt-10 flex items-start gap-3 font-display text-lg sm:text-xl">
          <Arrow className="mt-1.5 h-4 w-4 shrink-0 text-yield" />
          {comparison.conclusion}
        </p>
      </Reveal>
    </Section>
  );
}
