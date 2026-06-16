const STEPS = [
  {
    n: "01",
    title: "Upload your .srt",
    desc: "Drag and drop any subtitle file - no account or sign-up needed.",
  },
  {
    n: "02",
    title: "Auto-detect & translate",
    desc: "We detect the source language and translate every line with AI, in batches.",
  },
  {
    n: "03",
    title: "Download, ready to use",
    desc: "Get back a perfectly timed .srt in your chosen language - drop it straight into your player.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-4 sm:px-6 py-14 sm:py-20 md:py-24 border-t border-[#e5e5ea]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
            Three steps. Zero setup.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center md:text-left">
              <div
                className="text-sm font-semibold mb-3"
                style={{ color: "#E8003D" }}
              >
                {s.n}
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">
                {s.title}
              </h3>
              <p className="text-[15px] text-[#6e6e73] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
