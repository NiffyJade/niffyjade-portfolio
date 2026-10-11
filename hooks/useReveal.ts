"use client";

import { useEffect, useRef } from "react";

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Sets `data-in` on the element the first time it enters the viewport.
 * CSS does the animating. A data attribute (not a class) is used so React
 * re-renders never wipe the state.
 */
export function useReveal<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px",
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.in = "";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "";
          io.disconnect(); // fire once
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
