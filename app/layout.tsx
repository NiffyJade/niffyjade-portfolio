import type { Metadata, Viewport } from "next";
import { Inter_Tight, Sora } from "next/font/google";
import { site, socials } from "@/content/site";
import { siteUrl } from "@/lib/config";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], weight: ["500", "700"], display: "swap", variable: "--font-sora" });
const inter = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.alias,
    title: `${site.alias} | Automation Engineer`,
    description: site.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.alias} | Automation Engineer`,
    description: site.ogDescription,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Runs before first paint: applies the saved theme and marks JS as available (gates reveal CSS). */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}})();`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  jobTitle: site.role,
  url: siteUrl,
  sameAs: socials.filter((x) => x.brand !== "whatsapp").map((x) => x.href),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.country,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: bootScript changes data-theme and class before React hydrates
    <html lang="en" data-theme="dark" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
