"use client";

import { useEffect } from "react";

export function NotFoundRedirect() {
  useEffect(() => {
    const timer = window.setTimeout(() => window.location.replace("/"), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <p className="mono-note mt-8" aria-live="polite">
      Redirecting to the homepage in 4 seconds.
    </p>
  );
}
