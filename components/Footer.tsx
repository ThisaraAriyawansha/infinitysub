import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

const socials = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <path d="M22 5.92a8.2 8.2 0 0 1-2.36.65 4.07 4.07 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.65 11.65 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.27 5.47 4.1 4.1 0 0 1-1.86-.51 4.1 4.1 0 0 0 3.29 4.07 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.53A8.18 8.18 0 0 0 22 5.92Z" />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5.02 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.57.69.48A10 10 0 0 0 12 2Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.06 1.97.24 2.43.41a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.17.46.35 1.26.41 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.24 1.97-.41 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.17-1.26.35-2.43.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.97-.24-2.43-.41a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.17-.46-.35-1.26-.41-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.06-1.17.24-1.97.41-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.6 1.8c.46-.17 1.26-.35 2.43-.41C9.3 1.33 9.68 1.32 12 1.32Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.06.05-1.64.22-2.02.37a3.3 3.3 0 0 0-1.2.78 3.3 3.3 0 0 0-.78 1.2c-.15.38-.32.96-.37 2.02-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.06.22 1.64.37 2.02a3.3 3.3 0 0 0 .78 1.2c.36.36.71.59 1.2.78.38.15.96.32 2.02.37 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.06-.05 1.64-.22 2.02-.37a3.3 3.3 0 0 0 1.2-.78 3.3 3.3 0 0 0 .78-1.2c.15-.38.32-.96.37-2.02.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.06-.22-1.64-.37-2.02a3.3 3.3 0 0 0-.78-1.2 3.3 3.3 0 0 0-1.2-.78c-.38-.15-.96-.32-2.02-.37-1.24-.06-1.59-.07-4.74-.07Zm0 4.07a4.11 4.11 0 1 1 0 8.22 4.11 4.11 0 0 1 0-8.22Zm0 1.62a2.49 2.49 0 1 0 0 4.98 2.49 2.49 0 0 0 0-4.98Zm5.23-2.86a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 lg:px-12 pb-6 pt-12">
      <div className="relative w-full overflow-hidden rounded-3xl bg-[#B30030] text-white px-6 sm:px-10 lg:px-16 py-12">
        {/* decorative background layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />
          <div className="footer-glow-a absolute -top-32 -left-20 h-72 w-72 rounded-full bg-white/35 blur-3xl" />
          <div className="footer-glow-b absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#ff5577]/45 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-10">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="InfinitySub home" className="inline-block rounded-lg bg-white px-3 py-1.5 w-fit">
              <Image
                src="/logo/logo.png"
                alt="InfinitySub logo"
                width={1176}
                height={172}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-white/80 max-w-sm">
              Translate subtitle files instantly with AI - auto-detect the
              source language and export to 20+ languages while preserving
              timing.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white hover:text-[var(--red)] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/85">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm text-white/85">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-white/40 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <path d="M4 4h16v16H4z" opacity="0" />
                    <path d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                  </svg>
                </span>
                <a href="mailto:hello@infinitysub.app" className="hover:text-white transition-colors">
                  hello@infinitysub.app
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 flex items-center justify-center rounded-full border border-white/40 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
                  </svg>
                </span>
                <a href="https://plexcode.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  plexcode.vercel.app
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p>Copyright © {new Date().getFullYear()} InfinitySub. All rights reserved.</p>
            <a
              href="https://plexcode.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/60 hover:text-white transition-colors"
            >
              Designed and Developed by plexCode
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
