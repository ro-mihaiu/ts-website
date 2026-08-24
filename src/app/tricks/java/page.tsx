import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Java Tricks | TheySix",
  description: "Useful Minecraft Java tricks and references used by the TheySix community.",
};

export default function JavaTricksPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800 bg-cyan-950 px-3.5 py-1.5 text-xs font-semibold uppercase font-mono text-cyan-400">
          <Lightbulb className="h-3.5 w-3.5" /> Java Tricks
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Minecraft Java Tricks</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Curated trick references for Java Edition. This page is intentionally hidden from navbar/footer and can be shared directly.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 space-y-4">
        <h2 className="text-xl font-bold text-white">Featured Trick</h2>
        <p className="text-sm text-slate-300">
          Source video:
          <a
            href="https://youtu.be/povFs7-MjLQ?si=KaWDcLLOd37GWw62"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
          >
            Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </p>

        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-black">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/povFs7-MjLQ"
            title="Java Trick Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <p className="text-xs text-slate-500">
        Want more trick entries? Add them and I can wire a data-driven list next. Return to <Link href="/" className="text-slate-300 hover:text-white">home</Link>.
      </p>
    </div>
  );
}
