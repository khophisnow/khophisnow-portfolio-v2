import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NavigationMemory } from "@/components/NavigationMemory";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khophisnow.vercel.app"),
  title: {
    default: "KhophiSnow | Backend API Developer & Ethical Hacking Enthusiast",
    template: "%s | KhophiSnow",
  },
  applicationName: "KhophiSnow Portfolio",
  category: "technology",
  creator: "Somuah Julius Mcbraham Paapa-Boateng",
  publisher: "KhophiSnow / WaskiZone",
  keywords: [
    "KhophiSnow",
    "Somuah Julius Mcbraham Paapa-Boateng",
    "backend developer Ghana",
    "NestJS developer",
    "API developer",
    "ethical hacking",
    "WaskiZone",
    "secure systems",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  description:
    "Portfolio of Somuah Julius Mcbraham Paapa-Boateng, a backend and API developer building secure systems with NestJS, Express, PostgreSQL, Prisma, and TypeScript.",
  openGraph: {
    title: "KhophiSnow | Backend API Developer",
    description:
      "Secure APIs, multi-tenant platforms, backend architecture, and cybersecurity practice from Cape Coast, Ghana.",
    url: "https://khophisnow.vercel.app",
    siteName: "KhophiSnow Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Somuah Julius Mcbraham Paapa-Boateng",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KhophiSnow | Backend API Developer",
    description:
      "Backend/API developer and cybersecurity enthusiast building secure systems.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030605",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://khophisnow.vercel.app/#person",
      name: "Somuah Julius Mcbraham Paapa-Boateng",
      alternateName: "KhophiSnow",
      url: "https://khophisnow.vercel.app",
      jobTitle: "Backend API Developer",
      sameAs: ["https://github.com/khophisnow", "https://www.linkedin.com/in/khophisnow"],
      knowsAbout: ["Backend APIs", "NestJS", "PostgreSQL", "Prisma", "Secure systems", "Ethical hacking"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://waskizone.vercel.app/#company",
      name: "WaskiZone",
      url: "https://waskizone.vercel.app",
      founder: { "@id": "https://khophisnow.vercel.app/#person" },
      areaServed: "Ghana",
      serviceType: ["Software development", "School management systems", "Authorized cybersecurity support", "Data analysis"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <NavigationMemory />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Analytics />
      </body>
    </html>
  );
}
