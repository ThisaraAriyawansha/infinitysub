import { NextRequest, NextResponse } from "next/server";

const LANG_NAMES: Record<string, string> = {
  af: "Afrikaans", ar: "Arabic", bg: "Bulgarian", bn: "Bengali",
  ca: "Catalan", cs: "Czech", cy: "Welsh", da: "Danish",
  de: "German", el: "Greek", en: "English", es: "Spanish",
  et: "Estonian", fa: "Persian", fi: "Finnish", fr: "French",
  gu: "Gujarati", he: "Hebrew", hi: "Hindi", hr: "Croatian",
  hu: "Hungarian", hy: "Armenian", id: "Indonesian", is: "Icelandic",
  it: "Italian", ja: "Japanese", ka: "Georgian", kn: "Kannada",
  ko: "Korean", lt: "Lithuanian", lv: "Latvian", mk: "Macedonian",
  ml: "Malayalam", mr: "Marathi", ms: "Malay", mt: "Maltese",
  nl: "Dutch", no: "Norwegian", pa: "Punjabi", pl: "Polish",
  pt: "Portuguese", ro: "Romanian", ru: "Russian", si: "Sinhala",
  sk: "Slovak", sl: "Slovenian", sq: "Albanian", sr: "Serbian",
  sv: "Swedish", sw: "Swahili", ta: "Tamil", te: "Telugu",
  th: "Thai", tl: "Filipino", tr: "Turkish", uk: "Ukrainian",
  ur: "Urdu", vi: "Vietnamese", zh: "Chinese (Simplified)",
  "zh-CN": "Chinese (Simplified)", "zh-TW": "Chinese (Traditional)",
};

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(String(text).slice(0, 200))}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Google error: ${res.status}`);
    const data = await res.json();

    const code: string = data[2] ?? "unknown";
    const name = LANG_NAMES[code] ?? code;
    return NextResponse.json({ code, name });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Detection failed" }, { status: 500 });
  }
}
