"use client";

import { useEffect, useState } from "react";
import { Logo } from "./primitives";
import type { SiteContent } from "@/content";

export function SiteNav({ nav }: { nav: SiteContent["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink/85 backdrop-blur-sm" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
      >
        <a href="#top" className="cursor-pointer" aria-label="DLY AI — back to top">
          <Logo className="h-6 w-auto sm:h-7" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="cursor-pointer font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors duration-200 hover:text-signal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={nav.cta.href}
            className="hidden cursor-pointer border border-line-strong px-4 py-2 font-display text-xs font-medium tracking-wide transition-colors duration-200 hover:border-signal hover:bg-signal/5 sm:inline-block"
          >
            {nav.cta.label}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line-strong md:hidden"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.75" />
              ) : (
                <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.75" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-ink md:hidden">
          <ul className="mx-auto flex w-full max-w-[1200px] flex-col px-6 py-2 sm:px-10">
            {[...nav.links, nav.cta].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block cursor-pointer border-b border-line-soft py-4 font-display text-base transition-colors duration-200 hover:text-yield"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
