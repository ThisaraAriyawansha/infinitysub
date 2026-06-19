export interface SubBlock {
  num: string;
  ts: string;
  text: string;
  translated?: string;
  assLead?: string;
  assTrail?: string;
}

export interface AssExtra {
  lines: string[];
  dialogueLineIndices: number[];
}

export type VttSegment =
  | { type: "raw"; content: string }
  | { type: "cue"; index: number };

export interface VttExtra {
  segments: VttSegment[];
}

export interface SubFileExtra {
  header?: string;
}

export type FormatExtra = AssExtra | VttExtra | SubFileExtra;

export type SubFormat = "srt" | "vtt" | "ass" | "sub";

export const SUPPORTED_EXTENSIONS = [".srt", ".vtt", ".ass", ".ssa", ".sub"];

export function detectFormat(filename: string): SubFormat | null {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".srt")) return "srt";
  if (lower.endsWith(".vtt")) return "vtt";
  if (lower.endsWith(".ass") || lower.endsWith(".ssa")) return "ass";
  if (lower.endsWith(".sub")) return "sub";
  return null;
}

export function formatLabel(format: SubFormat): string {
  switch (format) {
    case "srt": return "SRT";
    case "vtt": return "WebVTT";
    case "ass": return "SubStation Alpha";
    case "sub": return "MicroDVD";
  }
}

function parseSRT(raw: string): SubBlock[] {
  const blocks: SubBlock[] = [];
  const parts = raw.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/);
  for (const part of parts) {
    const lines = part.trim().split("\n");
    if (lines.length < 3) continue;
    const num = lines[0].trim();
    const ts = lines[1].trim();
    const text = lines.slice(2).join(" ").trim();
    if (text) blocks.push({ num, ts, text });
  }
  return blocks;
}

function buildSRT(blocks: SubBlock[]): string {
  return blocks
    .map((b) => `${b.num}\n${b.ts}\n${b.translated || "[error]"}`)
    .join("\n\n");
}

function parseVTT(raw: string): { blocks: SubBlock[]; extra: VttExtra } {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  const parts = normalized.split(/\n\s*\n/);
  const blocks: SubBlock[] = [];
  const segments: VttSegment[] = [];
  for (const part of parts) {
    const lines = part.split("\n").filter((l) => l.trim() !== "");
    if (!lines.length) continue;
    if (/^WEBVTT/i.test(lines[0]) || /^(NOTE|STYLE|REGION)/i.test(lines[0])) {
      segments.push({ type: "raw", content: part });
      continue;
    }
    let idx = 0;
    let cueId = "";
    if (!lines[idx].includes("-->")) {
      cueId = lines[idx].trim();
      idx++;
    }
    if (idx >= lines.length || !lines[idx].includes("-->")) {
      segments.push({ type: "raw", content: part });
      continue;
    }
    const ts = lines[idx].trim();
    idx++;
    const text = lines.slice(idx).join(" ").trim();
    if (!text) {
      segments.push({ type: "raw", content: part });
      continue;
    }
    blocks.push({ num: cueId, ts, text });
    segments.push({ type: "cue", index: blocks.length - 1 });
  }
  return { blocks, extra: { segments } };
}

function buildVTT(blocks: SubBlock[], extra: VttExtra): string {
  return extra.segments
    .map((seg) => {
      if (seg.type === "raw") return seg.content;
      const b = blocks[seg.index];
      if (!b) return "";
      const idLine = b.num ? `${b.num}\n` : "";
      return `${idLine}${b.ts}\n${b.translated || "[error]"}`;
    })
    .join("\n\n");
}

// Splits leading/trailing ASS override tag groups (e.g. "{\b1}Hello{\b0}")
// from the translatable core text so style codes aren't sent to translation.
function splitAssTags(text: string): { lead: string; core: string; trail: string } {
  const leadMatch = text.match(/^(\{[^{}]*\})+/);
  const lead = leadMatch ? leadMatch[0] : "";
  const rest = text.slice(lead.length);
  const trailMatch = rest.match(/(\{[^{}]*\})+$/);
  const trail = trailMatch ? trailMatch[0] : "";
  const core = trail ? rest.slice(0, rest.length - trail.length) : rest;
  return { lead, core, trail };
}

function parseASS(raw: string): { blocks: SubBlock[]; extra: AssExtra } {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  let textFieldIndex = -1;
  const blocks: SubBlock[] = [];
  const dialogueLineIndices: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (/^Format:/i.test(trimmed)) {
      const fields = trimmed.slice(trimmed.indexOf(":") + 1).split(",").map((s) => s.trim().toLowerCase());
      textFieldIndex = fields.indexOf("text");
      continue;
    }
    if (/^Dialogue:/i.test(trimmed) && textFieldIndex >= 0) {
      const prefixLen = lines[i].toLowerCase().indexOf("dialogue:") + "dialogue:".length;
      const rest = lines[i].slice(prefixLen).replace(/^\s*/, "");
      const parts = rest.split(",");
      if (parts.length > textFieldIndex) {
        const before = parts.slice(0, textFieldIndex).join(",");
        const rawText = parts.slice(textFieldIndex).join(",").trim();
        const { lead, core, trail } = splitAssTags(rawText);
        blocks.push({ num: String(i), ts: before, text: core, assLead: lead, assTrail: trail });
        dialogueLineIndices.push(i);
      }
    }
  }
  return { blocks, extra: { lines, dialogueLineIndices } };
}

function buildASS(blocks: SubBlock[], extra: AssExtra): string {
  const lines = [...extra.lines];
  extra.dialogueLineIndices.forEach((lineIdx, i) => {
    const b = blocks[i];
    if (!b) return;
    const translated = `${b.assLead || ""}${b.translated || "[error]"}${b.assTrail || ""}`;
    lines[lineIdx] = `Dialogue: ${b.ts},${translated}`;
  });
  return lines.join("\n");
}

function parseSUB(raw: string): { blocks: SubBlock[]; extra: SubFileExtra } {
  const blocks: SubBlock[] = [];
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  let header: string | undefined;
  let sawFirstBlock = false;
  for (const line of lines) {
    const m = line.match(/^\{(\d+)\}\{(\d+)\}(.*)$/);
    if (!m) continue;
    const text = m[3].trim();
    if (!sawFirstBlock && /^\d+(\.\d+)?$/.test(text)) {
      // Leading {start}{end}<fps> header some MicroDVD tools write — not translatable text.
      header = line;
      sawFirstBlock = true;
      continue;
    }
    sawFirstBlock = true;
    const cleanText = text.replace(/\|/g, " ").trim();
    if (cleanText) blocks.push({ num: m[1], ts: m[2], text: cleanText });
  }
  return { blocks, extra: { header } };
}

function buildSUB(blocks: SubBlock[], extra: SubFileExtra): string {
  const headerLine = extra.header ? `${extra.header}\n` : "";
  return (
    headerLine +
    blocks
      .map((b) => `{${b.num}}{${b.ts}}${(b.translated || "[error]").replace(/\n/g, "|")}`)
      .join("\n")
  );
}

export function parseSubtitle(raw: string, format: SubFormat): { blocks: SubBlock[]; extra?: FormatExtra } {
  switch (format) {
    case "srt": return { blocks: parseSRT(raw) };
    case "vtt": return parseVTT(raw);
    case "ass": return parseASS(raw);
    case "sub": return parseSUB(raw);
  }
}

export function buildSubtitle(blocks: SubBlock[], format: SubFormat, extra?: FormatExtra): string {
  switch (format) {
    case "srt": return buildSRT(blocks);
    case "vtt": return buildVTT(blocks, extra as VttExtra);
    case "ass": return buildASS(blocks, extra as AssExtra);
    case "sub": return buildSUB(blocks, (extra as SubFileExtra) || {});
  }
}

export function outputExtension(filename: string, format: SubFormat): string {
  if (format === "ass") {
    return filename.toLowerCase().endsWith(".ssa") ? ".ssa" : ".ass";
  }
  return `.${format}`;
}
