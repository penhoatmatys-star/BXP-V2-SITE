import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { SITE } from "@/lib/site";
import { CookieBanner } from "@/components/site/cookie-banner";
import "./globals.css";

// Archivo carries a width axis: the display voice runs it at its widest cut,
// the same wide stance as the BXP letters, body text at normal width.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "BXP — Football performance programs | BXP Discover",
    template: "%s | BXP",
  },
  description: SITE.description,
  applicationName: SITE.fullName,
  keywords: [
    "BXP Discover",
    "football trial week",
    "football performance assessment",
    "player development program",
    "football camp abroad",
    "BXP DNA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.fullName,
    title: "BXP — Your potential. Your opportunity.",
    description: SITE.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "BXP — Best for Performance" }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "BXP — Your potential. Your opportunity.",
    description: SITE.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: SITE.fullName,
  alternateName: "BXP",
  url: SITE.url,
  logo: `${SITE.url}/img/bxp-logo.webp`,
  email: SITE.email,
  sport: "Football",
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: `<!-- impeccable direction contract
THESIS: BXP is matchday at night: the floodlit pitch, the tunnel, the gold X. The page refuses the stacked-SaaS-cards homepage and moves like a walk from tunnel to centre circle.
OWN-WORLD: night black #070708, floodlight gold #e6bd51, kit silver #c9ccd1; Archivo at its widest cut for display, hairline gold rules, gold light that follows the pointer.
STORY: a player or parent understands Discover in one viewport, sees every program, what the Welcome Pack holds, how DNA is built, then applies on bxpsport.com.
FIRST VIEWPORT: full-bleed 12s film (tunnel, night training, line-up), headline bottom-left at 5-6rem, Apply + Discover actions under it, audience strip at the fold.
FORM: brief-pinned (client prototype, logo, memorandum creative direction); no roll. Signature interaction: the DNA profile redraws by data source.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance -->` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
