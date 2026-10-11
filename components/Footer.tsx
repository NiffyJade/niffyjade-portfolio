import { nav, site, socials } from "@/content/site";
import { BrandIcon } from "./BrandIcon";

export function Footer() {
  return (
    <footer className="pt-16 pb-[calc(30px+env(safe-area-inset-bottom))] text-[.95rem]">
      <div className="wrap">
        <div className="grid gap-10 border-b border-line pb-10 min-[861px]:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mb-2 font-display text-[1.15rem] font-bold">{site.alias}</p>
            <p className="max-w-[34ch] text-muted">
              Automation systems that run the busywork so people can focus on the work only they can do.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="m-0 grid list-none gap-2 p-0">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="footer-link">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="m-0 flex list-none gap-3 p-0 min-[861px]:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="btn icon-btn"
                >
                  <BrandIcon name={s.brand} size={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 mb-0 text-[.9rem] text-muted">
          © {site.year} {site.name} ({site.alias}). Built in Ile-Ife, Nigeria.
        </p>
      </div>
    </footer>
  );
}
