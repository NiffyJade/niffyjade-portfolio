/** NJ monogram (from public/logo.svg) in the accent gradient, same as the favicon. `id` keeps the gradient id unique per use. */
export function Mark({ id, size = 28 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)" }} />
          <stop offset="1" style={{ stopColor: "var(--accent2)" }} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="var(--bg2)" stroke="var(--line)" strokeWidth="2" />
      <g fill={`url(#${id})`} transform="translate(10 10) scale(0.0786) translate(-232 -271)">
        <path d="M270 300 H354 L614 552 V694 L354 444 V724 H270 Z" />
        <path d="M654 300 H754 V650 C754 747 700 802 616 802 C560 802 518 771 496 718 L557 659 C569 691 589 710 617 710 C643 710 654 688 654 650 Z" />
      </g>
    </svg>
  );
}
