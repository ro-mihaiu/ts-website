import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  Bot, 
  Code, 
  Terminal, 
  ShieldCheck, 
  Users, 
  ExternalLink, 
  GitBranch, 
  Zap, 
  CheckCircle2,
  FileCode,
  MessageSquare
} from "lucide-react";

export const metadata: Metadata = {
  title: "About TS-Bot | Official TheySix Discord Bot",
  description: "Learn about TS-Bot, the official custom discord.js bot powerering staff management and Leave of Absence (LOA) systems for TheySix.",
};

export default function BotAboutPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
          <Bot className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-mono font-semibold">
          <GitBranch className="w-3.5 h-3.5" /> Open Source on GitHub
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">TS-Bot</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          The custom Discord utility bot built specifically to manage TheySix community staff rosters, activity logs, and Leave of Absence (LOA) workflows.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs">
          <a
            href="https://github.com/ro-mihaiu/ts-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-md shadow-cyan-600/20"
          >
            <Code className="w-4 h-4" /> View on GitHub
          </a>
          <Link
            href="/bot/commands"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-colors"
          >
            <Terminal className="w-4 h-4 text-amber-400" /> View Commands
          </Link>
          <a
            href="https://discord.gg/theysix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold transition-colors"
          >
            <MessageSquare className="w-4 h-4 fill-current" /> Discord Server
          </a>
        </div>
      </div>

      {/* Bot Architecture & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Staff Roster Management</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Automates role assignment and hierarchy management across official preset staff ranks (<code className="text-amber-300">TheySix</code>, <code className="text-amber-300">Manager</code>, <code className="text-amber-300">Admin</code>, <code className="text-amber-300">Head Moderator</code>, <code className="text-amber-300">Moderator</code>, <code className="text-amber-300">Helper Team</code>).
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Leave of Absence (LOA) Tracking</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enables team members to file inactivity notices with reasons and date stamps, helping server management track roster availability.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Dual-Prefix & Slash Commands</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Full support for modern Discord Application Slash commands (<code className="text-emerald-300">/</code>) as well as text prefixes (<code className="text-emerald-300">!</code> and <code className="text-emerald-300">th</code>).
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Lightweight Node.js Engine</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Built with <strong>Node.js</strong> and <strong>discord.js v14</strong>, providing ultra-low memory footprint and instant response times.
          </p>
        </div>
      </div>

      {/* Tech Stack Info */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileCode className="w-5 h-5 text-cyan-400" /> Technical Details & Source Code
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          TS-Bot is open-source software maintained by <strong className="text-white">ro-mihaiu</strong> and the TheySix development team. Contributions, issue reports, and feature requests can be submitted directly on the official repository.
        </p>
        <div className="pt-2">
          <a
            href="https://github.com/ro-mihaiu/ts-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 underline"
          >
            <span>https://github.com/ro-mihaiu/ts-bot</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

