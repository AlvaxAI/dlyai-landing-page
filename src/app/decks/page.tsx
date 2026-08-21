import type { Metadata } from "next";
import { Logo } from "@/components/primitives";
import { CrosshairCursor } from "@/components/ui/crosshair-cursor";
import { BlueprintGrid } from "@/components/ui/blueprint-grid";

export const metadata: Metadata = {
  title: "Client decks — DLY AI",
  description: "Download DLY AI client overview decks.",
};

const decks = [
  {
    index: "A",
    title: "Global client overview",
    description:
      "A concise introduction to DLY AI, how we work, and where we create value with clients.",
    href: "/decks/dly_ai_global_client_overview.pdf",
    filename: "dly_ai_global_client_overview.pdf",
  },
  {
    index: "B",
    title: "Global client overview — extended",
    description:
      "The expanded presentation with additional context for a more detailed conversation.",
    href: "/decks/dly_ai_global_client_overview_extended.pdf",
    filename: "dly_ai_global_client_overview_extended.pdf",
  },
] as const;

function DownloadMark() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4">
      <path d="M10 2v11m0 0 4-4m-4 4L6 9M3 17h14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function DecksPage() {
  return (
    <>
      <BlueprintGrid />
      <CrosshairCursor />

      <main className="relative z-10 flex min-h-svh flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-16">
        <header className="mx-auto w-full max-w-[1200px] border-b border-line pb-7">
          {/* A full document navigation intentionally avoids restoring the
              homepage's previous client-side scroll position. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" aria-label="Return to DLY AI homepage" className="inline-block">
            <Logo className="h-7 w-auto sm:h-8" />
          </a>
        </header>

        <section className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center py-16 sm:py-20 lg:py-24">
          <div className="mb-10 border-b border-line pb-10 sm:mb-12 sm:pb-12">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-yield" />
                <p className="kicker">DLY AI // Client materials</p>
              </div>
              <h1 className="h-display max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)]">
                Download the decks.
              </h1>
            </div>
          </div>

          <div className="grid border-t border-l border-line md:grid-cols-2">
            {decks.map((deck) => (
              <article
                key={deck.index}
                className="group relative flex min-h-[22rem] flex-col border-r border-b border-line bg-ink/55 p-6 transition-colors duration-300 hover:bg-surface/55 sm:p-8 lg:min-h-[25rem] lg:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="font-display text-5xl font-bold tracking-[-0.04em] text-line-strong transition-colors duration-300 group-hover:text-yield sm:text-6xl">
                    {deck.index}
                  </span>
                  <span className="mono-note pt-2">PDF</span>
                </div>

                <div className="mt-12 max-w-md sm:mt-16">
                  <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-signal sm:text-3xl">
                    {deck.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{deck.description}</p>
                </div>

                <div className="mt-auto flex justify-end border-t border-line pt-6">
                  <a
                    href={deck.href}
                    download={deck.filename}
                    className="inline-flex min-h-11 items-center justify-center gap-3 border border-line-strong px-5 py-3 font-display text-sm font-medium text-signal transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-yield hover:bg-yield hover:text-ink"
                    aria-label={`Download ${deck.title} PDF`}
                  >
                    Download
                    <DownloadMark />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-[1200px] items-center justify-between border-t border-line pt-6">
          <p className="mono-note">Deploy. Learn. Yield.</p>
          <p className="mono-note hidden sm:block">DLY AI © 2026</p>
        </footer>
      </main>
    </>
  );
}
