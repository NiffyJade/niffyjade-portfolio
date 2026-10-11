"use client";

import { type RefObject, useEffect } from "react";

/**
 * Writes scroll progress (0 to 1) to a `--p` CSS variable on `ref`, no re-renders.
 *  - "page": how far the whole page is scrolled
 *  - "element": how far the element has travelled up past 60% of the viewport
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  mode: "page" | "element",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      let p: number;
      if (mode === "page") {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        p = max > 0 ? window.scrollY / max : 0;
      } else {
        const r = el.getBoundingClientRect();
        p = (window.innerHeight * 0.6 - r.top) / r.height;
      }
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, p))));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [ref, mode]);
}
