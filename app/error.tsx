"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="scanline flex min-h-screen items-center justify-center bg-ink px-5 py-20 text-white">
      <section className="panel-glow w-full max-w-2xl border border-red-300/25 bg-panel/90 p-6">
        <div className="flex items-center gap-3 text-red-300"><AlertTriangle size={24} /><p className="font-mono text-xs uppercase">System recovery</p></div>
        <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">Something failed to load cleanly.</h1>
        <p className="mt-5 text-sm leading-7 text-white/62">The site caught the issue instead of leaving a blank screen. You can retry the current view or return home.</p>
        {error.digest && <p className="mt-4 font-mono text-xs text-white/42">Digest: {error.digest}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 bg-mint px-4 py-3 font-bold text-ink hover:bg-white"><RefreshCw size={17} />Retry</button>
          <Link href="/" className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 font-bold text-white hover:border-cyan hover:text-cyan">Back home</Link>
        </div>
      </section>
    </main>
  );
}
