"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { nav, site } from "@/content/site";
import { bookingUrl } from "@/lib/config";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ButtonLink } from "./ButtonLink";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = nav.map((n) => n.href.slice(1));

/** NJ monogram (from public/logo.svg) in the accent gradient, same as the favicon. */
function Mark() {
  return (
    <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="mark-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)" }} />
          <stop offset="1" style={{ stopColor: "var(--accent2)" }} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="var(--bg2)" stroke="var(--line)" strokeWidth="2" />
      <g fill="url(#mark-gradient)" transform="translate(10 10) scale(0.0786) translate(-232 -271)">
        <path d="M270 300 H354 L614 552 V694 L354 444 V724 H270 Z" />
        <path d="M654 300 H754 V650 C754 747 700 802 616 802 C560 802 518 771 496 718 L557 659 C569 691 589 710 617 710 C643 710 654 688 654 650 Z" />
      </g>
    </svg>
  );
}

export function Header() {
  const active = useActiveSection(sectionIds);
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Tighten and lift the pill once the page has scrolled
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => header.setAttribute("data-scrolled", String(window.scrollY > 24));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Move the sliding indicator under the active link (re-measured on resize)
  useLayoutEffect(() => {
    const place = () => {
      const list = listRef.current;
      const indicator = indicatorRef.current;
      if (!list || !indicator) return;
      const link = list.querySelector<HTMLElement>('[aria-current="true"]');
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.opacity = "1";
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <header ref={headerRef} className="site-header" data-scrolled="false">
      <nav aria-label="Main" className="nav-shell">
        <a href="#top" className="brand" aria-label={`${site.alias}, back to top`}>
          <Mark />
          {site.alias}
        </a>
        {/* Nav links hide under 860px; logo, theme toggle and CTA stay */}
        <ul ref={listRef} className="nav-links hidden min-[861px]:flex">
          <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link"
                aria-current={active === item.href.slice(1) ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href={bookingUrl} variant="primary" arrow className="btn-sm">
            Book a call
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
