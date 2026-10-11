import Image from "next/image";
import { about, sections, socials } from "@/content/site";
import { bookingUrl } from "@/lib/config";
import { BrandIcon } from "../BrandIcon";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M8 12.5l2.7 2.7L16 9.5" />
  </svg>
);

/** Founder block: story and checklist on the left, portrait card on the right. */
export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap grid items-center gap-12 min-[861px]:grid-cols-[1.1fr_.9fr] min-[861px]:gap-16">
        <Reveal>
          <span className="pill">{sections.about.pill}</span>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="text-muted">
              {p}
            </p>
          ))}
          <ul className="check-list mt-6">
            {about.points.map((point) => (
              <li key={point}>
                <Check />
                {point}
              </li>
            ))}
          </ul>
          <ButtonLink href={bookingUrl} variant="primary" arrow>
            Book a call
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto w-full max-w-105 min-[861px]:max-w-none">
          <figure className="portrait m-0">
            <Image
              src={about.photoSrc}
              alt={about.photoAlt}
              width={900}
              height={1350}
              sizes="(max-width: 860px) 90vw, 440px"
              loading="lazy"
            />
            <figcaption className="portrait-cap">
              <p>
                <strong className="block font-display text-[1.05rem]">Oluwanifemi Adefisayo</strong>
                <span className="text-[.88rem] opacity-80">{about.role}</span>
              </p>
              <span className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="btn icon-btn h-10! w-10! border-white/20! bg-white/10!"
                  >
                    <BrandIcon name={s.brand} size={18} />
                  </a>
                ))}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
