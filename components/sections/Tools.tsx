import { sections, tools } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { Reveal } from "../Reveal";

/** Light panel: a bold lead tile followed by one tile per tool group. */
export function Tools() {
  return (
    <section id="stack" className="panel tone-alt">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        <Reveal className="card inverse flex flex-col justify-end">
          <span className="pill border-white/20! bg-white/10! text-inherit! self-start">{sections.tools.pill}</span>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]!">Tools I work in</h2>
          <p className="mb-0! opacity-75">{sections.tools.intro}</p>
        </Reveal>
        {tools.map((t, i) => (
          <Reveal key={t.title} delay={((i + 1) % 3) * 0.1} className="card flex flex-col">
            <h3>{t.title}</h3>
            <p className="text-muted">{t.items}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              {t.brands.map((b) => (
                <span key={b} className="brand-chip">
                  <BrandIcon name={b} size={20} />
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
