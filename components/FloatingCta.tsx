"use client";

import { useEffect, useRef } from "react";
import { bookingUrl, isExternal } from "@/lib/config";

/**
 * Spinning "Book a call" badge, desktop only. Appears once the visitor has
 * scrolled past the hero, and hides over the contact section (toggles data-show; CSS fades it).
 */
export function FloatingCta() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let atContact = false;
    const update = () => el.setAttribute("data-show", String(window.scrollY > 700 && !atContact));
    update();
    window.addEventListener("scroll", update, { passive: true });
    // The contact form is the destination, so the badge steps aside while it is on screen
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver(([entry]) => {
      atContact = entry.isIntersecting;
      update();
    });
    if (contact) io.observe(contact);
    return () => {
      window.removeEventListener("scroll", update);
      io.disconnect();
    };
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
