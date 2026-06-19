const STEPS = [
  {
    n: "01",
    title: "Upload your subtitle file",
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
    desc: "Get back a perfectly timed file - same format you uploaded - in your chosen language, ready to drop straight into your player.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-4 sm:px-6 py-14 sm:py-20 md:py-24 border-t border-[#e5e5ea] scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: "#E8003D" }}>
            How it works
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
            Three steps. Zero setup.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[#e5e5ea] border border-[#e5e5ea] rounded-2xl overflow-hidden">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white p-6 sm:p-8">
              <div
                className="w-9 h-9 rounded-full border flex items-center justify-center text-sm font-semibold mb-5"
                style={{ borderColor: "#E8003D", color: "#E8003D" }}
              >
                {s.n}
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[#6e6e73] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
