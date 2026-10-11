"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section crossing the upper-middle band of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  const key = ids.join(",");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
        // Scrolled back above every section (hero): clear the highlight
        if (window.scrollY < 200) setActive("");
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    key.split(",").forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [key]);

  return active;
}
