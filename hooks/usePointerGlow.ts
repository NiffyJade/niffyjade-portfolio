"use client";

import { useEffect } from "react";

/**
 * Hover-capable devices only. Feeds two CSS variables from the pointer:
 *  - --bx / --by on <html>: the ambient background glow
 *  - --mx / --my on the hovered `.card`: the card spotlight
 * Writes are batched into one requestAnimationFrame per frame.
 */
export function usePointerGlow() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const root = document.documentElement;
    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      root.style.setProperty("--bx", `${last.clientX}px`);
      root.style.setProperty("--by", `${last.clientY}px`);
      const card = (last.target as Element | null)?.closest<HTMLElement>(".card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${last.clientX - r.left}px`);
        card.style.setProperty("--my", `${last.clientY - r.top}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
