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
    <section className="bg-white px-4 py-16 border-t border-[#e5e5ea]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold tracking-wide uppercase mb-2"
            style={{ color: "#E8003D" }}
          >
            How it works
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">
            Three steps. Zero setup.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
          {STEPS.map((s) => (
            <div key={s.n} className="relative text-center md:text-left">
              <div
                className="text-3xl font-bold mb-3"
                style={{ color: "#ffd6e2" }}
              >
                {s.n}
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-1.5">
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
