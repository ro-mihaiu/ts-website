import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Bot, Shield, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "TS-Bot Terms of Service | TheySix",
  description: "Terms of Service and Data Policy for the TS-Bot Discord Application.",
};

export default function BotTOSPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono font-bold">
          <Bot className="w-3.5 h-3.5" /> Bot Legal Terms
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          TS-Bot Terms of Service
        </h1>
        <p className="text-sm text-slate-400">
          Last revised: August 2026 • Applies to TS-Bot (GitHub: ro-mihaiu/ts-bot)
        </p>
      </div>

      {/* Content */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 text-slate-300 space-y-8 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By adding, utilizing, or interacting with <strong>TS-Bot</strong> in Discord servers or direct messages, you agree to comply with these Terms of Service as well as the official{" "}
            <a
              href="https://discord.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              Discord Terms of Service <ExternalLink className="w-3 h-3" />
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              Discord Community Guidelines <ExternalLink className="w-3 h-3" />
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Scope of Service & Data Usage</h2>
          <p>
            TS-Bot provides staff management, role hierarchy synchronization, and Leave of Absence (LOA) activity tracking.
          </p>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h3 className="font-bold text-cyan-400">What data does TS-Bot store?</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1 text-xs">
              <li><strong>User IDs & Guild IDs:</strong> Used to map staff members to their assigned roles in <code>data/staff.json</code>.</li>
              <li><strong>LOA Status & Reason:</strong> User-submitted text from <code>/loa status</code> for management record keeping.</li>
              <li><strong>No message logging or analytics tracking</strong> is conducted outside command execution.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Acceptable Use & Prohibited Conduct</h2>
          <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
            <li>You may not attempt to reverse engineer unhandled vulnerabilities, flood the Discord API with bot commands, or use the bot to harass other server members.</li>
            <li>Commands that modify Discord roles (e.g. <code>/staff add</code>, <code>/staff upgrade</code>) require standard Discord <strong>Manage Roles</strong> permissions.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Availability & Warranty</h2>
          <p>
            TS-Bot is provided on an &quot;as-is&quot; basis without warranties of uninterrupted service. The maintainers reserve the right to modify or discontinue features at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Contact & Support</h2>
          <p>
            For inquiries, data deletion requests, or support, please open an issue on the{" "}
            <a
              href="https://github.com/ro-mihaiu/ts-bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-semibold"
            >
              GitHub repository
            </a>{" "}
            or contact us in the{" "}
            <a
              href="https://discord.gg/theysix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-semibold"
            >
              TheySix Discord server
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}

