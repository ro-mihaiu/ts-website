import type { Metadata } from "next";
import { AlertTriangle, UploadCloud } from "lucide-react";
import { UploadRequestForm } from "@/components/UploadRequestForm";

export const metadata: Metadata = {
  title: "Trusted Uploads | TheySix",
  description: "Trusted staff upload request details for YouTube links, schematics, and descriptions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UploadPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800 bg-cyan-950 px-3.5 py-1.5 text-xs font-semibold uppercase font-mono text-cyan-400">
          <UploadCloud className="h-3.5 w-3.5" /> Trusted Upload Endpoint
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">/upload</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Hidden route for trusted staff uploads. This page is not linked in navigation and is meant for people who already know the URL.
        </p>
      </section>

      <UploadRequestForm />

      <section className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100 flex gap-3">
        <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
        <p>
          This form currently prepares a clean submission block for Discord. If you want, I can wire it to a protected backend endpoint next.
        </p>
      </section>
    </div>
  );
}
