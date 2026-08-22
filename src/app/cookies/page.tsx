import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Shield, CheckCircle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | TheySix",
  description: "Learn how TheySix uses cookies and browser local storage to provide Minecraft farm schematics and downloads.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono font-bold">
          <Cookie className="w-3.5 h-3.5" /> Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Cookie & Storage Policy
        </h1>
        <p className="text-sm text-slate-400">
          Last updated: August 2026
        </p>
      </div>

      {/* Content */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-slate-300 space-y-8 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            1. What Are Cookies & Local Storage?
          </h2>
          <p>
            Cookies are small text files placed on your device by websites that you visit. We also utilize standard browser <code>localStorage</code> to store preferences without transferring personal data to remote tracking servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            2. Types of Cookies We Use
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h3 className="font-bold text-cyan-400">Essential Technical Storage</h3>
              <p className="text-xs text-slate-400">
                Required for the website to function properly, including caching your preferred platform (Java or Bedrock Edition) and storing your cookie consent status.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <h3 className="font-bold text-amber-400">Embedded Video Players (YouTube)</h3>
              <p className="text-xs text-slate-400">
                Our farm pages embed official YouTube tutorials. When you interact with YouTube video embeds, Google/YouTube may set cookies according to their Privacy Policy.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            3. Managing Your Preferences
          </h2>
          <p>
            You can modify your browser settings to reject cookies or notify you when a cookie is placed. Note that disabling essential cookies may impact certain interface filters and theme preferences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            4. Contact Us
          </h2>
          <p>
            For questions regarding this policy, feel free to reach out via our{" "}
            <Link href="/socials" className="text-cyan-400 hover:underline">
              official Discord server
            </Link>{" "}
            or email.
          </p>
        </section>
      </div>
    </div>
  );
}

