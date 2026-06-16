"use client";
import { useState, useCallback, useRef } from "react";

interface SrtBlock {
  num: string;
  ts: string;
  text: string;
  sinhala?: string;
}

interface LogEntry {
  msg: string;
  ok: boolean;
}

function parseSRT(raw: string): SrtBlock[] {
  const blocks: SrtBlock[] = [];
  const parts = raw.trim().split(/\n\s*\n/);
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

function buildSRT(blocks: SrtBlock[]): string {
  return blocks
    .map((b) => `${b.num}\n${b.ts}\n${b.sinhala || "[error]"}`)
    .join("\n\n");
}

export default function Translator() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [blocks, setBlocks] = useState<SrtBlock[]>([]);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<"idle" | "translating" | "done" | "error">("idle");
  const [outputSrt, setOutputSrt] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string, ok = true) => {
    setLogs((prev) => [...prev, { msg, ok }]);
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 50);
  };

  const loadFile = async (f: File) => {
    if (!f.name.endsWith(".srt")) {
      setError("Please upload a valid .srt subtitle file.");
      return;
    }
    setError("");
    setStatus("idle");
    setBlocks([]);
    setLogs([]);
    setProgress(0);
    setOutputSrt("");
    const text = await f.text();
    const parsed = parseSRT(text);
    if (!parsed.length) {
      setError("Could not parse subtitle blocks. Check the file is a valid .srt.");
      return;
    }
    setFile(f);
    setBlocks(parsed);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) loadFile(f);
  }, []);

  const removeFile = () => {
    setFile(null);
    setBlocks([]);
    setStatus("idle");
    setLogs([]);
    setProgress(0);
    setOutputSrt("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const translate = async () => {
    if (!blocks.length) return;
    setStatus("translating");
    setLogs([]);
    setProgress(0);
    setOutputSrt("");
    const start = Date.now();
    const BATCH = 40;
    const result = [...blocks];
    addLog(`Found ${blocks.length} subtitle blocks — starting translation…`);

    for (let i = 0; i < blocks.length; i += BATCH) {
      const chunk = blocks.slice(i, i + BATCH);
      const payload = chunk.map((b, j) => ({ index: i + j + 1, text: b.text }));
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blocks: payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API error");
        chunk.forEach((_, j) => {
          const idx = i + j;
          result[idx] = { ...result[idx], sinhala: data.translations[idx + 1] || "[error]" };
        });
        addLog(`✓ Blocks ${i + 1}–${Math.min(i + BATCH, blocks.length)} translated`, true);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        addLog(`✗ Error on blocks ${i + 1}–${Math.min(i + BATCH, blocks.length)}: ${msg}`, false);
        chunk.forEach((_, j) => {
          result[i + j] = { ...result[i + j], sinhala: "[error]" };
        });
      }
      setProgress(Math.round(((Math.min(i + BATCH, blocks.length)) / blocks.length) * 100));
    }

    const srt = buildSRT(result);
    setOutputSrt(srt);
    setBlocks(result);
    setElapsed(Math.round((Date.now() - start) / 100) / 10);
    setStatus("done");
    addLog(`Done! All ${blocks.length} subtitles translated.`);
  };

  const download = () => {
    if (!outputSrt || !file) return;
    const blob = new Blob([outputSrt], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name.replace(".srt", "_sinhala.srt");
    a.click();
  };

  const wordCount = blocks.reduce((s, b) => s + b.text.split(/\s+/).length, 0);

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      {/* Header */}
      <div className="max-w-xl mx-auto text-center mb-12">
        <div
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full mb-5"
          style={{ background: "#fff0f4", color: "#E8003D" }}
        >
          <span>AI Powered</span>
          <span>•</span>
          <span>English → සිංහල</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
          Subtitle Translator
        </h1>
        <p className="text-[#6e6e73] text-base leading-relaxed">
          Upload your English <code className="text-[#E8003D] text-sm">.srt</code> subtitle file
          and get a Sinhala translation in seconds.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        {/* Drop Zone */}
        {!file ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className="relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all"
            style={{
              borderColor: dragging ? "#E8003D" : "#d2d2d7",
              background: dragging ? "#fff0f4" : "#fafafa",
            }}
          >
            <input ref={inputRef} type="file" accept=".srt" className="hidden" onChange={onFileChange} />
            <div className="text-5xl mb-4">📄</div>
            <p className="text-[#1d1d1f] font-medium text-base mb-1">Drop your .srt file here</p>
            <p className="text-[#6e6e73] text-sm">or click to browse</p>
          </div>
        ) : (
          /* File Info Card */
          <div className="flex items-center gap-4 bg-[#f5f5f7] rounded-2xl px-5 py-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: "#E8003D" }}
            >
              SRT
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#1d1d1f] text-sm truncate">{file.name}</p>
              <p className="text-[#6e6e73] text-xs mt-0.5">
                {blocks.length} subtitles · {wordCount.toLocaleString()} words ·{" "}
                {file.size < 1024 ? file.size + "B" : Math.round(file.size / 1024) + "KB"}
              </p>
            </div>
            <button
              onClick={removeFile}
              className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e5e5ea]"
            >
              ✕
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-[#fff0f4] text-[#E8003D] text-sm rounded-2xl px-5 py-4">
            {error}
          </div>
        )}

        {/* Translate Button */}
        {file && status !== "done" && (
          <button
            onClick={translate}
            disabled={status === "translating"}
            className="w-full py-4 rounded-2xl text-white font-medium text-base transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#E8003D" }}
          >
            {status === "translating" ? "Translating…" : "Translate to Sinhala"}
          </button>
        )}

        {/* Progress */}
        {status === "translating" && (
          <div className="bg-[#f5f5f7] rounded-2xl p-5 space-y-3">
            <div className="flex justify-between text-xs text-[#6e6e73]">
              <span>Translating…</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-[#e5e5ea] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: "#E8003D" }}
              />
            </div>
            <div
              ref={logRef}
              className="max-h-28 overflow-y-auto space-y-0.5 font-mono"
            >
              {logs.map((l, i) => (
                <p key={i} className="text-xs" style={{ color: l.ok ? "#6e6e73" : "#E8003D" }}>
                  {l.msg}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {status === "done" && (
          <div className="bg-[#f5f5f7] rounded-2xl p-5 space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: blocks.length, lbl: "subtitles" },
                { val: wordCount.toLocaleString(), lbl: "words" },
                { val: `${elapsed}s`, lbl: "duration" },
              ].map((s) => (
                <div key={s.lbl} className="bg-white rounded-xl p-3 text-center">
                  <p className="text-xl font-semibold text-[#1d1d1f]">{s.val}</p>
                  <p className="text-xs text-[#6e6e73] mt-0.5">{s.lbl}</p>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl divide-y divide-[#f5f5f7]">
              {blocks.slice(0, 4).map((b, i) => (
                <div key={i} className="px-4 py-3">
                  <p className="text-[10px] font-mono text-[#aeaeb2] mb-1">{b.ts}</p>
                  <p className="text-xs text-[#6e6e73] mb-0.5">{b.text}</p>
                  <p className="text-sm font-medium text-[#1d1d1f]">{b.sinhala}</p>
                </div>
              ))}
            </div>

            {/* Log summary */}
            <div ref={logRef} className="max-h-20 overflow-y-auto">
              {logs.map((l, i) => (
                <p key={i} className="text-xs font-mono" style={{ color: l.ok ? "#6e6e73" : "#E8003D" }}>
                  {l.msg}
                </p>
              ))}
            </div>

            {/* Download + Retranslate */}
            <div className="flex gap-3">
              <button
                onClick={download}
                className="flex-1 py-3.5 rounded-xl text-white font-medium text-sm transition-all active:scale-[0.99]"
                style={{ background: "#E8003D" }}
              >
                ↓ Download Sinhala .srt
              </button>
              <button
                onClick={translate}
                className="px-5 py-3.5 rounded-xl font-medium text-sm border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-all"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-[#aeaeb2] mt-16">
        Powered by Google Translate · Built with Next.js
        <br />
        Designed & Developed by{" "}
        <a
          href="https://plexcode.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6e6e73] transition-colors"
        >
          PlexCode
        </a>
      </p>
    </div>
  );
}
