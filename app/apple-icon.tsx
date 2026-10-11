import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon: the NJ monogram in the accent gradient on the ink background. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#070a12" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f2c26b" />
              <stop offset="1" stopColor="#ff8a5c" />
            </linearGradient>
          </defs>
          <g fill="url(#g)" transform="translate(10 10) scale(0.0786) translate(-232 -271)">
            <path d="M270 300 H354 L614 552 V694 L354 444 V724 H270 Z" />
            <path d="M654 300 H754 V650 C754 747 700 802 616 802 C560 802 518 771 496 718 L557 659 C569 691 589 710 617 710 C643 710 654 688 654 650 Z" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
