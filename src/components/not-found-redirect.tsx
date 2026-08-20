"use client";

import { useEffect, useState } from "react";

const REDIRECT_SECONDS = 4;

/**
 * The site is a static export, so a bad URL is served by the host's 404 page
 * rather than a server redirect. Counting down in the client keeps the visitor
 * moving without hiding what happened: the copy and the "Return home" link
 * both stay usable if JS never runs.
 */
export function NotFoundRedirect() {
  const [remaining, setRemaining] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (remaining <= 0) {
      window.location.replace("/");
      return;
    }

    const timer = window.setTimeout(() => setRemaining((n) => n - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [remaining]);

  return (
    <p aria-live="polite" className="mono-note mt-8">
      {`Redirecting to the homepage in ${remaining} second${remaining === 1 ? "" : "s"}.`}
    </p>
  );
}
