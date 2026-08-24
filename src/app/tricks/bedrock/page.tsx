import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Bedrock Tricks | TheySix",
  description: "Useful Minecraft Bedrock tricks and references used by the TheySix community.",
};

export default function BedrockTricksPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold uppercase font-mono text-slate-300">
          <Lightbulb className="h-3.5 w-3.5" /> Bedrock Tricks
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Minecraft Bedrock Tricks</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Direct-link-only tips page for Bedrock Edition. This route is intentionally not shown in the navbar or footer.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 space-y-3">
        <h2 className="text-lg font-bold text-white">No entries yet</h2>
        <p className="text-sm text-slate-300">
          Add your first Bedrock trick source and I can format it here just like the Java page.
        </p>
      </section>

      <p className="text-xs text-slate-500">
        Return to <Link href="/" className="text-slate-300 hover:text-white">home</Link>.
      </p>
    </div>
  );
}
