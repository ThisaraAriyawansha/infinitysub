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
        <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: "#E8003D" }}>
          24 languages
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-8 sm:mb-10">
          Translate to any of these, out of the box
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-[#e5e5ea] border border-[#e5e5ea] rounded-2xl overflow-hidden">
          {LANGUAGES.map((l) => (
            <span
              key={l}
              className="text-sm text-[#1d1d1f] bg-white px-4 py-3 text-left transition-colors hover:text-[#E8003D]"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
