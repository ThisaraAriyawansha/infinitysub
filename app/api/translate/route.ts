import { NextRequest, NextResponse } from "next/server";

async function translateText(text: string, sourceLang: string, targetLang: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Translate error: ${res.status}`);
  const data = await res.json();
  return (data[0] as [string][]).map((item) => item[0]).filter(Boolean).join("");
}

export async function POST(req: NextRequest) {
  try {
    const { blocks, sourceLang = "auto", targetLang = "si" } = await req.json();

    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
      return NextResponse.json({ error: "No subtitle blocks provided" }, { status: 400 });
    }

    const results = await Promise.all(
      (blocks as { index: number; text: string }[]).map(async (b) => ({
        index: b.index,
        translated: await translateText(b.text, sourceLang, targetLang),
      }))
    );

    const translations: Record<number, string> = {};
    for (const r of results) {
      translations[r.index] = r.translated;
    }

    return NextResponse.json({ translations });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
