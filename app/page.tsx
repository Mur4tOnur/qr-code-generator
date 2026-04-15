"use client";

import { useCallback, useState } from "react";

import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";

export default function Home() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const generate = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please enter a URL or text.");
      setDataUrl(null);
      return;
    }
    setError("");
    try {
      const QRCode = (await import("qrcode")).default;
      const url = await QRCode.toDataURL(trimmed, {
        width: 280,
        margin: 2,
        color: { dark: "#0f172aFF", light: "#FFFFFFFF" },
        errorCorrectionLevel: "M",
      });
      setDataUrl(url);
    } catch {
      setError("Could not generate a QR code for this input.");
      setDataUrl(null);
    }
  }, [text]);

  const downloadPng = useCallback(() => {
    if (!dataUrl) return;
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = "qr-code.png";
    anchor.rel = "noopener";
    anchor.click();
  }, [dataUrl]);

  return (
    <div className="relative flex min-h-svh flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div
        className="pointer-events-none fixed inset-0 z-0 h-svh w-full"
        aria-hidden
      >
        <SmokeBackground smokeColor="#6366f1" />
      </div>

      <main className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-lg shadow-zinc-900/10 backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-950/90 dark:shadow-black/40 sm:p-8">
          <h1 className="text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            QR Code Generator
          </h1>

          <div className="mt-8 space-y-2">
            <label htmlFor="qr-input" className="sr-only">
              Text or URL for the QR code
            </label>
            <textarea
              id="qr-input"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError("");
              }}
              placeholder="https://example.com or any text"
              rows={4}
              spellCheck={false}
              className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-inner outline-none ring-zinc-400 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-600"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Paste a URL or any text to generate a QR code
            </p>
            {error ? (
              <p
                className="text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                {error}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => void generate()}
            className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-200"
          >
            Generate QR Code
          </button>

          {dataUrl ? (
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dataUrl}
                alt="Generated QR code"
                width={280}
                height={280}
                className="h-auto w-full max-w-[280px] rounded-lg border border-zinc-200 bg-white p-2 dark:border-zinc-700"
              />
              <button
                type="button"
                onClick={downloadPng}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-300"
              >
                Download PNG
              </button>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
