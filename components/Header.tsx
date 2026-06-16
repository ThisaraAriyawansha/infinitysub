import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e5ea] bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="InfinitySub home">
          <Image
            src="/logo/logo.png"
            alt="InfinitySub logo"
            width={1176}
            height={172}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <p className="hidden sm:block text-xs font-medium text-[#6e6e73]">
          AI Subtitle Translator
        </p>
      </div>
    </header>
  );
}
