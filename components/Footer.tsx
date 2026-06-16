import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e5ea] bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col items-center gap-4 text-center">
        <Link href="/" aria-label="InfinitySub home">
          <Image
            src="/logo/logo.jpg"
            alt="InfinitySub logo"
            width={880}
            height={170}
            className="h-8 w-auto opacity-90"
          />
        </Link>
        <p className="text-[#6e6e73] text-sm max-w-md">
          Translate subtitle files instantly with AI — auto-detect the source
          language and export to 20+ languages while preserving timing.
        </p>
        <p className="text-xs text-[#aeaeb2]">
          Copyright © {new Date().getFullYear()} InfinitySub. All rights reserved.
          <br />
          Designed &amp; Developed by{" "}
          <a
            href="https://plexcode.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6e6e73] transition-colors"
          >
            PlexCode
          </a>
        </p>
      </div>
    </footer>
  );
}
