import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import { bookingUrl } from "@/lib/config";
import { ButtonLink } from "../ButtonLink";
import { HeroDiagram } from "../HeroDiagram";

/** Splits the headline into words, flagging those inside the gradient phrase. */
function headlineWords() {
  const start = hero.headline.indexOf(hero.gradientPhrase);
  const end = start + hero.gradientPhrase.length;
  return [...hero.headline.matchAll(/\S+/g)].map((m) => ({
    text: m[0],
    gradient: start >= 0 && m.index >= start && m.index < end,
  }));
}

export function Hero() {
  const words = headlineWords();

  return (
    <div className="wrap">
      <div className="grid items-center gap-12 py-10 min-[861px]:py-[60px] min-[861px]:min-h-[calc(100svh-68px)] min-[861px]:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="badge">
            <i aria-hidden="true" />
            {hero.badge}
          </div>
          <h1>
            {words.map((w, i) => (
              <span key={i}>
                <span className="word">
                  <span style={{ "--i": i } as CSSProperties}>
                    {w.gradient ? <span className="grad">{w.text}</span> : w.text}
                  </span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="hero-sub">{hero.subcopy}</p>
          <div className="hero-cta">
            <ButtonLink href={bookingUrl} variant="primary" arrow>
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="#work">{hero.secondaryCta}</ButtonLink>
          </div>
        </div>
        <div className="hero-viz">
          <HeroDiagram />
        </div>
      </div>
    </div>
  );
}
