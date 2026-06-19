import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "InfinitySub - AI Subtitle Translator",
    short_name: "InfinitySub",
    description:
      "Upload an SRT, VTT, ASS/SSA, or SUB subtitle file and translate it instantly with AI to Sinhala, Tamil, Hindi, and 20+ other languages.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#E8003D",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
