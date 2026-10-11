import { testimonials } from "@/content/site";
import { Reveal } from "../Reveal";

export function Testimonials() {
  return (
    <section id="proof" className="section">
      <div className="wrap">
        <Reveal as="h2">What clients say</Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
          {testimonials.map((t, i) => (
            <Reveal as="figure" key={t.quote} delay={i * 0.1} className="card m-0">
              <blockquote className="m-0">
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-3 text-[.9rem] text-muted">{t.author}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
