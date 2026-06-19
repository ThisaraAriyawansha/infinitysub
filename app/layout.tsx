import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_NAME = "InfinitySub";
const TITLE = "InfinitySub - AI Subtitle Translator | English to Sinhala & 20+ Languages";
const DESCRIPTION =
  "Upload an SRT, VTT, ASS/SSA, or SUB subtitle file and translate it instantly with AI. Auto-detects the source language and exports to Sinhala, Tamil, Hindi, and 20+ other languages while preserving timing and formatting.";
const OG_IMAGE = "/logo/og.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://infinitysub.vercel.app"),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "subtitle translator",
    "srt translator",
    "vtt translator",
    "ass subtitle translator",
    "english to sinhala subtitles",
    "AI subtitle translation",
    "translate srt file",
    "translate vtt file",
    "subtitle converter",
  ],
  authors: [{ name: "PlexCode", url: "https://plexcode.vercel.app/" }],
  creator: "PlexCode",
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1358,
        height: 1159,
        alt: "InfinitySub - Translate Subtitles. Connect Worlds.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E8003D",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: "https://infinitysub.vercel.app",
  description: DESCRIPTION,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "PlexCode",
    url: "https://plexcode.vercel.app/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
