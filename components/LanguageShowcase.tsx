const LANGUAGES = [
  "Sinhala", "English", "Tamil", "Hindi", "French", "Spanish", "German",
  "Italian", "Portuguese", "Russian", "Japanese", "Korean",
  "Chinese (Simplified)", "Chinese (Traditional)", "Arabic", "Turkish",
  "Dutch", "Polish", "Swedish", "Thai", "Vietnamese", "Indonesian",
  "Malay", "Ukrainian",
];

export default function LanguageShowcase() {
  return (
    <section className="bg-[#fafafa] px-4 sm:px-6 py-14 sm:py-20 md:py-24 border-t border-[#e5e5ea]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-8 sm:mb-10">
          Translate to 24 languages, out of the box
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          {LANGUAGES.map((l) => (
            <span
              key={l}
              className="text-sm font-medium px-3.5 py-1.5 rounded-full bg-white border border-[#e5e5ea] text-[#1d1d1f] transition-colors hover:border-[#E8003D]/30 hover:text-[#E8003D]"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
