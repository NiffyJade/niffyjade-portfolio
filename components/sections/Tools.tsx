import { tools } from "@/content/site";
import { BrandIcon } from "../BrandIcon";
import { Reveal } from "../Reveal";

export function Tools() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <Reveal as="h2">Tools I work in</Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
          {tools.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.1} className="card">
              <div className="mb-4 flex gap-3">
                {t.brands.map((b) => (
                  <BrandIcon key={b} name={b} size={26} />
                ))}
              </div>
              <h3>{t.title}</h3>
              <p className="text-muted">{t.items}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
