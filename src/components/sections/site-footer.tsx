import { Logo } from "../primitives";
import type { SiteContent } from "@/content";

export function SiteFooter({ footer }: { footer: SiteContent["footer"] }) {
  const year = 2026;

  return (
    <footer className="relative z-10 border-t border-line bg-ink px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo className="h-6 w-auto" />
          <p className="mono-note mt-6 tracking-[0.14em] text-signal/80">{footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <p className="mono-note tracking-[0.14em]">{footer.locations}</p>
          <p className="mono-note">
            © {year} {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
