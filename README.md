# InfinitySub

InfinitySub is a web-based subtitle translation platform that lets users upload subtitle files, translate them into multiple languages, and download the translated subtitles while preserving timing and formatting.

## Features

- Drag-and-drop subtitle upload with automatic format detection
- Supports `.srt`, `.vtt`, `.ass`/`.ssa`, and `.sub` subtitle formats
- Translation powered by Google Translate
- Preserves cue timing, indices, and format-specific markup during translation
- Download the translated file in its original format

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Project Structure

- `app/` — pages, layout, and API routes (`app/api/detect`, `app/api/translate`)
- `components/` — UI components (Header, Translator, HowItWorks, LanguageShowcase, FAQ, Footer)
- `lib/subtitleFormats.ts` — subtitle format detection and parsing utilities

## Deployment

Configured for deployment on Netlify via `netlify.toml` using `@netlify/plugin-nextjs`.
