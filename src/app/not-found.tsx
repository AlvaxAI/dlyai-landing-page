import Link from "next/link";
import { Logo } from "@/components/primitives";
import { NotFoundRedirect } from "@/components/not-found-redirect";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1200px]">
        <Link href="/" aria-label="DLY AI homepage" className="inline-block">
          <Logo />
        </Link>
        <p className="kicker mt-24 text-yield">[404]</p>
        <h1 className="h-display mt-6 max-w-3xl text-[clamp(3rem,1.2rem+6vw,6.5rem)]">
          This route doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          We&apos;ll take you back to the DLY AI homepage shortly.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex bg-yield px-6 py-3.5 font-display text-sm font-medium text-ink transition-colors hover:bg-signal"
        >
          Return home now
        </Link>
        <NotFoundRedirect />
      </div>
    </main>
  );
}
