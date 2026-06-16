import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_NAME = "InfinitySub";
const TITLE = "InfinitySub - AI Subtitle Translator | English to Sinhala & 20+ Languages";
const DESCRIPTION =
  "Upload an .srt subtitle file and translate it instantly with AI. Auto-detects the source language and exports to Sinhala, Tamil, Hindi, and 20+ other languages while preserving timing.";
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
    "english to sinhala subtitles",
    "AI subtitle translation",
    "translate srt file",
    "subtitle converter",
  ],
  authors: [{ name: "PlexCode", url: "https://plexcode.vercel.app/" }],
  creator: "PlexCode",
  publisher: SITE_NAME,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <div
          aria-hidden
          className="h-[3px] w-full"
          style={{ background: "linear-gradient(90deg, #E8003D, #ff6b8a, #E8003D)" }}
        />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
