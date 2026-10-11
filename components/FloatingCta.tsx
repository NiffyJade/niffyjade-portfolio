"use client";

import { useEffect, useRef } from "react";
import { bookingUrl, isExternal } from "@/lib/config";

/**
 * Spinning "Book a call" badge, desktop only. Appears once the visitor has
 * scrolled past the hero (toggles data-show; CSS does the fade).
 */
export function FloatingCta() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => el.setAttribute("data-show", String(window.scrollY > 700));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      ref={ref}
      href={bookingUrl}
      {...(isExternal(bookingUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="float-cta"
      data-show="false"
      aria-label="Book a call"
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path id="cta-ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text>
          <textPath href="#cta-ring" textLength="236" lengthAdjust="spacing">
            BOOK A CALL • BOOK A CALL •{" "}
          </textPath>
        </text>
      </svg>
      <span className="go" aria-hidden="true">
        →
      </span>
    </a>
  );
}
