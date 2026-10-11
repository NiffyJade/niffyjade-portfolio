import Image from "next/image";
import { about } from "@/content/site";
import { Reveal } from "../Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap grid items-start gap-14 min-[861px]:grid-cols-[300px_1fr]">
        <Reveal className="max-[860px]:max-w-[280px]">
          {about.hasPhoto ? (
            <Image
              src={about.photoSrc}
              alt={about.photoAlt}
              width={600}
              height={750}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[18px] border border-line object-cover object-[50%_18%]"
            />
          ) : (
            <div className="photo" role="img" aria-label="Photo placeholder">
              <span>
                [PHOTO]
                <br />
                {about.photoNote}
              </span>
            </div>
          )}
        </Reveal>
        <Reveal delay={0.15}>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
