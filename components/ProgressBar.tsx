"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** 2px gradient bar fixed to the top; its scaleX follows page scroll. */
export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, "page");
  return <div ref={ref} className="progress" aria-hidden="true" />;
}
