import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | TheySix",
  description: "Terms and conditions for downloading and using Minecraft farm schematics and world saves from TheySix.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono font-bold">
          <FileText className="w-3.5 h-3.5" /> Agreement
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-400">
          Last revised: August 2026
        </p>
      </div>

      {/* Content */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-slate-300 space-y-8 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the TheySix website (theysix.ro-mihaiu.xyz) and downloading our Minecraft world files or Litematica schematics, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Intellectual Property & Usage License</h2>
          <p>
            All farm blueprints, schematics, world files, and video tutorials created by TheySix are provided for personal, educational, and non-commercial survival/creative gameplay use.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
            <li>You may build, modify, and use these farm designs in your singleplayer worlds and multiplayer servers.</li>
            <li>You may not re-upload our schematic or world download files to paid paywalls or mirror sites without explicit permission and attribution.</li>
            <li>Content creators featuring our designs in YouTube videos or streams are requested to credit <strong>TheySix</strong> with a link back to our video or website.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Mojang & Minecraft Disclaimer</h2>
          <p>
            TheySix is an independent fan community and is <strong>NOT AN OFFICIAL MINECRAFT PRODUCT</strong>. We are not affiliated with, endorsed, or sponsored by Mojang Studios or Microsoft Corporation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Disclaimer of Warranties</h2>
          <p>
            All files are provided &quot;as is&quot;. While we rigorously test all farms in Minecraft 1.21+ (Java and Bedrock), updates and snapshot changes by Mojang may occasionally alter mob AI or redstone mechanics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Changes to Terms</h2>
          <p>
            We reserve the right to revise these terms at any time. Continued usage of our website indicates your agreement with the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}

