import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | TheySix",
  description: "TheySix Privacy Policy regarding data handling, downloads, and privacy protection.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5" /> Privacy & Protection
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400">
          Last revised: August 2026
        </p>
      </div>

      {/* Content */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-slate-300 space-y-8 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Information We Do Not Collect</h2>
          <p>
            TheySix is committed to protecting your privacy. We do not require accounts, sign-ups, or credit cards to browse farm blueprints and download world or schematic files. We do not sell personal information or use advertising profiles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Analytics & Performance Measurement</h2>
          <p>
            We use Vercel Analytics to measure page views and general site traffic, and Vercel Speed Insights to measure anonymous performance information such as page-load and responsiveness metrics. These services help us understand how the site is used and improve its reliability. They are designed to operate without advertising cookies and are not used to identify you by name.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. External Links & Third-Party Services</h2>
          <p>
            Our website links to third-party services such as YouTube, Discord, TikTok, Instagram, and X (Twitter). When clicking external links, your interactions are governed by their respective privacy policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Local Storage</h2>
          <p>
            We use browser <code>localStorage</code> purely to remember your UI preferences (such as filtering by Java or Bedrock, and acknowledging cookie notifications).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Contacting Us</h2>
          <p>
            If you have questions about our privacy practices, contact us via Discord or our contact channels on the{" "}
            <Link href="/socials" className="text-cyan-400 hover:underline">
              Socials page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

