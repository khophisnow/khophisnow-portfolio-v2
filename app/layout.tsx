import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "KhophiSnow | Backend API Developer & Ethical Hacking Enthusiast",
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
        url: "/images/khophisnow-avatar.jpeg",
        width: 800,
        height: 800,
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
    images: ["/images/khophisnow-avatar.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
