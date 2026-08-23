import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Server,
  ShieldCheck,
  Trophy,
  Users,
  Sparkles,
  Layers,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
  Cpu,
  ArrowRight,
  Flame,
  Globe
} from "lucide-react";

export const metadata: Metadata = {
  title: "TheySix Minecraft Server | Survival, Technical Farms & Cross-Play",
  description: "Join the official TheySix Minecraft Server for Java and Bedrock. Community events managed by ro_mihaiu at discord.ro-mihaiu.xyz.",
};

export default function ServerMainPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto py-2">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 p-8 sm:p-12 text-center space-y-5 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase font-mono">
          <Server className="w-3.5 h-3.5" /> Official Minecraft SMP
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">TheySix Server</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The official community server built for survival enthusiasts, redstone engineers, and mega-builders. Fully compatible with both <strong className="text-[#9fff99] font-semibold">Java</strong> and <strong className="text-slate-200 font-semibold">Bedrock</strong> editions.
        </p>

        {/* Event Manager Highlight Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 text-amber-200 max-w-2xl mx-auto text-xs sm:text-sm space-y-3 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 font-bold text-amber-300 text-sm sm:text-base">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" /> Community Events & Tournaments
          </div>
          <p className="leading-relaxed text-slate-200 text-sm">
            All server events, tournaments, and community competitions are personally organized and managed by <a
              href="https://discord.ro-mihaiu.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
            <strong className="text-amber-300 font-bold underline decoration-amber-400/50 underline-offset-2">ro_mihaiu</strong>.
            </a>
          </p>
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
            <a
              href="https://discord.gg/theysix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Globe className="w-4 h-4" />
              <span>Join Discord</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Server Connection Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2 text-left text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="text-slate-500 font-mono uppercase font-semibold">Java Edition IP</span>
            <div className="font-mono text-cyan-300 font-bold text-sm select-all">
              theysix.sparked.host
            </div>
            <span className="text-[11px] text-slate-400">Version 1.21+ (Default port: 25565)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="text-slate-500 font-mono uppercase font-semibold">Bedrock Edition IP & Port</span>
            <div className="font-mono text-slate-100 font-bold text-sm select-all">
              theysix.sparked.host:19132
            </div>
            <span className="text-[11px] text-slate-400">Bedrock iOS / Android / Win10 / Console</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rules */}
        <Link
          href="/server/rules"
          className="group glass-panel p-7 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Server Rules & Guidelines
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read community standards, griefing policies, allowed client mods, and redstone lag limit rules.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
            <span>View Rules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Events */}
        <Link
          href="/server/events"
          className="group glass-panel p-7 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit group-hover:scale-105 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              Events & Competitions
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Participate in seasonal build battles, dragon rushes, and UHC tournaments to win in-game prizes.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>Explore Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Staff */}
        <Link
          href="/server/staff"
          className="group glass-panel p-7 rounded-3xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              Server Staff Team
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Meet the founders, developers, redstone leads, and moderators dedicated to keeping gameplay smooth.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
            <span>Meet the Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Community Links Callout */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <MessageSquare className="w-5 h-5 text-[#5865F2]" /> Need Whitelist Support or Farm Help?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Join the official TheySix Discord for whitelist support, player voice chats, and schematic discussions.
          </p>
        </div>

        <a
          href="https://discord.gg/theysix"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm transition-all shadow-md shadow-[#5865F2]/20 shrink-0"
        >
          <MessageSquare className="w-4 h-4 fill-current" /> Join Discord Server
        </a>
      </div>
    </div>
  );
}
