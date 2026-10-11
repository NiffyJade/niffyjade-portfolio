import { hero, nav, site, socials } from "@/content/site";
import { bookingUrl } from "@/lib/config";
import { BrandIcon } from "./BrandIcon";
import { ButtonLink } from "./ButtonLink";
import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        {/* Row 1: brand and the one primary action */}
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <a href="#top" className="brand mb-2" aria-label={`${site.alias}, back to top`}>
              <Mark id="footer-mark" size={32} />
              {site.alias}
            </a>
            <p className="max-w-[36ch] text-muted">
              Automation systems that run the busywork so people can focus on the work only they can do.
            </p>
          </div>
          <div className="grid justify-items-start gap-4 min-[861px]:justify-items-end">
            <span className="badge mb-0!">
              <i aria-hidden="true" />
              {hero.badge}
            </span>
            <ButtonLink href={bookingUrl} variant="primary" arrow>
              {hero.primaryCta}
            </ButtonLink>
          </div>
        </div>

        {/* Row 2: page links and socials */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <nav aria-label="Footer">
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="footer-link">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="m-0 flex list-none gap-3 p-0">
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

        {/* Row 3: copyright and back to top */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[.9rem] text-muted">
          <p className="m-0">
            © {site.year} {site.name} ({site.alias}). Built in Ile-Ife, Nigeria.
          </p>
          <a href="#top" className="footer-link">
            Back to top ↑
          </a>
        </div>

        <div className="footer-word pb-[env(safe-area-inset-bottom)]" aria-hidden="true">
          {site.alias}
        </div>
      </div>
    </footer>
  );
}
