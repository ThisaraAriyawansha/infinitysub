const FAQS = [
  {
    q: "Is InfinitySub free to use?",
    a: "Yes. Upload a subtitle file, translate it, and download the result - no account or payment required.",
  },
  {
    q: "Which subtitle formats are supported?",
    a: "SRT, WebVTT (.vtt), SubStation Alpha (.ass/.ssa), and MicroDVD (.sub). We parse each subtitle block, translate the text, and rebuild the file in its original format with timestamps and styling untouched.",
  },
  {
    q: "Do I need to know the source language?",
    a: "No. We auto-detect the source language from a sample of the file before translating, so you only pick the target language.",
  },
  {
    q: "Is my subtitle file stored anywhere?",
    a: "No. Files are processed in your browser session and sent only to the translation API for the duration of the request - nothing is saved server-side.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white px-4 sm:px-6 py-14 sm:py-20 md:py-24 border-t border-[#e5e5ea] scroll-mt-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
            Frequently asked questions
          </h2>
        </div>

        <div className="divide-y divide-[#e5e5ea] border-t border-b border-[#e5e5ea]">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-[15px] font-medium text-[#1d1d1f]">
                {f.q}
                <span
                  className="flex-shrink-0 text-lg leading-none transition-transform group-open:rotate-45"
                  style={{ color: "#E8003D" }}
                >
                  +
                </span>
              </summary>
              <p className="text-[15px] text-[#6e6e73] leading-relaxed mt-3 pr-6">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
