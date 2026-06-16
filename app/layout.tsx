import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SubTitle Translator — English to Sinhala",
  description: "Upload an English .srt subtitle file and convert it to Sinhala instantly using AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
