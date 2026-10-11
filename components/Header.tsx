"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { nav, site } from "@/content/site";
import { bookingUrl } from "@/lib/config";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ButtonLink } from "./ButtonLink";
import { Mark } from "./Mark";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = nav.map((n) => n.href.slice(1));

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
          <Mark id="header-mark" />
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
