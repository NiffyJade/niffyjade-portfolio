"use client";

import { useState } from "react";
import { sections, services } from "@/content/site";
import { Reveal } from "../Reveal";

const COLUMNS = [
  ["Problem", "problem"],
  ["I build", "build"],
  ["Outcome", "outcome"],
] as const;

/** Numbered list: one service open at a time, first open by default. */
export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="section">
      <div className="wrap grid gap-12 min-[861px]:grid-cols-[.8fr_1.2fr] min-[861px]:gap-16">
        <div className="min-[861px]:sticky min-[861px]:top-28 min-[861px]:self-start">
          <Reveal>
            <span className="pill">{sections.services.pill}</span>
            <h2>
              What I build <span className="mark">for you</span>
            </h2>
            <p className="text-muted">{sections.services.intro}</p>
          </Reveal>
        </div>

        <Reveal className="svc-list">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <div key={s.title} className="svc" data-open={isOpen}>
                <button
                  type="button"
                  className="svc-trigger"
                  id={`svc-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`svc-pane-${i}`}
                  // Clicking the open row closes it; clicking another switches
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="svc-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="svc-title">{s.title}</h3>
                  <span className="plus" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M8 2v12M2 8h12" />
                    </svg>
                  </span>
                </button>
                {/* inert keeps collapsed content out of the tab order and screen readers */}
                <div className="pane" id={`svc-pane-${i}`} role="region" aria-labelledby={`svc-btn-${i}`} inert={!isOpen}>
                  <div>
                    <div className="svc-body">
                      {COLUMNS.map(([label, key]) => (
                        <div key={key}>
                          <h4>{label}</h4>
                          <p>{s[key]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
