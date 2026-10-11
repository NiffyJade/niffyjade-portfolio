"use client";

import { usePointerGlow } from "@/hooks/usePointerGlow";

/** Fixed background glow (follows the pointer on desktop) plus a light film-grain overlay. */
export function Atmosphere() {
  usePointerGlow();
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
