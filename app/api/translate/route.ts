import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { blocks } = await req.json();

    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
      return NextResponse.json({ error: "No subtitle blocks provided" }, { status: 400 });
    }

    const numbered = blocks
      .map((b: { index: number; text: string }) => `[${b.index}] ${b.text}`)
      .join("\n");

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Translate the following English subtitle lines to Sinhala (සිංහල script).
Keep each line with its number prefix [N]. Translate ONLY the text content.
Return ONLY the translated lines, nothing else, no explanation.

${numbered}`,
        },
      ],
    });

    const raw = message.content.find((c) => c.type === "text")?.text || "";
    const lines = raw.trim().split("\n");

    const translations: Record<number, string> = {};
    for (const line of lines) {
      const match = line.match(/^\[(\d+)\]\s*(.*)/);
      if (match) {
        translations[parseInt(match[1])] = match[2].trim();
      }
    }

    return NextResponse.json({ translations });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
