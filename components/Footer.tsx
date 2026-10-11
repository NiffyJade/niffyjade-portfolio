import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line pt-[30px] pb-[calc(30px+env(safe-area-inset-bottom))] text-[.9rem] text-muted">
      <div className="wrap">
        © {site.year} {site.name} ({site.alias}). Built in Ile-Ife, Nigeria.
      </div>
    </footer>
  );
}
