import type { CSSProperties } from "react";
import { hero } from "@/content/site";
import { bookingUrl } from "@/lib/config";
import { ButtonLink } from "../ButtonLink";
import { HeroDiagram } from "../HeroDiagram";

interface Word {
  text: string;
  index: number;
}
interface Segment {
  marked: boolean;
  words: Word[];
}

/** Splits the headline into plain and highlighted runs of words, keeping each word's global index for the stagger. */
function headlineSegments(): Segment[] {
  const start = hero.headline.indexOf(hero.gradientPhrase);
  const end = start + hero.gradientPhrase.length;
  const segments: Segment[] = [];
  [...hero.headline.matchAll(/\S+/g)].forEach((m, index) => {
    const marked = start >= 0 && m.index >= start && m.index < end;
    const last = segments[segments.length - 1];
    if (last && last.marked === marked) last.words.push({ text: m[0], index });
    else segments.push({ marked, words: [{ text: m[0], index }] });
  });
  return segments;
}

export function Hero() {
  const segments = headlineSegments();

  return (
    <div className="wrap hero">
      <div className="hero-dots" aria-hidden="true" />
      <div className="badge">
        <i aria-hidden="true" />
        {hero.badge}
      </div>
      <h1>
        {segments.map((seg, s) => (
          // The highlighted phrase stays on one line (see .phrase) so its band is never split
          <span key={s} className={seg.marked ? "phrase" : undefined}>
            {seg.words.map((w, i) => {
              const first = seg.marked && i === 0;
              const last = seg.marked && i === seg.words.length - 1;
              return (
                <span key={w.index}>
                  <span className="word">
                    <span
                      className={seg.marked ? `word-mark ${first ? "first" : ""} ${last ? "last" : ""}` : undefined}
                      style={{ "--i": w.index } as CSSProperties}
                    >
                      {/* Inside the band, each word carries its trailing space so the strip stays continuous */}
                      {seg.marked && !last ? `${w.text} ` : w.text}
                    </span>
                  </span>
                  {seg.marked && !last ? null : " "}
                </span>
              );
            })}
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
      <div className="hero-viz">
        <HeroDiagram />
      </div>
    </div>
  );
}
