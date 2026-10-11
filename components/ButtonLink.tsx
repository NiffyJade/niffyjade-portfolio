"use client";

import type { ReactNode } from "react";
import { isExternal } from "@/lib/config";
import { useMagnetic } from "@/hooks/useMagnetic";

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "secondary";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

/** Pill link-button with the magnetic pointer effect and arrow nudge. */
export function ButtonLink({
  href,
  variant = "secondary",
  arrow = false,
  className = "",
  children,
}: ButtonLinkProps) {
  const magnetic = useMagnetic<HTMLAnchorElement>();
  const external = isExternal(href);
  return (
    <a
      {...magnetic}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`btn ${variant === "primary" ? "btn-primary" : ""} ${className}`}
    >
      {children}
      {arrow && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
