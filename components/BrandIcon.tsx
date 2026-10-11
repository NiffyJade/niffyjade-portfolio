import { brands } from "@/content/brands";

interface BrandIconProps {
  /** Key into content/brands.ts */
  name: string;
  size?: number;
  className?: string;
}

/** Brand logo. Decorative: the adjacent text already names the brand. */
export function BrandIcon({ name, size = 20, className }: BrandIconProps) {
  const brand = brands[name];

  // No official mark available: neutral monogram tile so layout stays consistent
  if (!brand) {
    return (
      <span
        aria-hidden="true"
        className={`inline-grid shrink-0 place-items-center rounded-md border border-line bg-surface font-display font-bold text-accent-text ${className ?? ""}`}
        style={{ width: size, height: size, fontSize: size * 0.55 }}
      >
        {name[0].toUpperCase()}
      </span>
    );
  }

  const common = {
    width: size,
    height: size,
    viewBox: brand.viewBox,
    "aria-hidden": true,
    focusable: false,
    className: `shrink-0 ${className ?? ""}`,
  } as const;

  return brand.svg ? (
    // Static, trusted markup from our own brands file (multi-colour marks)
    <svg {...common} dangerouslySetInnerHTML={{ __html: brand.svg }} />
  ) : (
    <svg {...common} fill={brand.color}>
      <path d={brand.path} />
    </svg>
  );
}
