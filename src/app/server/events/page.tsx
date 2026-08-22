import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Clock,
  Sparkles,
  Gift,
  Flame,
  Swords,
  Hammer,
  ExternalLink,
  MessageSquare
} from "lucide-react";

export const metadata: Metadata = {
  title: "Server Events & Tournaments | TheySix",
  description: "Join official community events, build battles, UHC tournaments, and dragon slaying challenges on the TheySix Minecraft Server.",
};

const upcomingEvents = [
  {
    title: "Summer Mega-Base Build Challenge",
    category: "Building",
    icon: Hammer,
    color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    date: "August 28, 2026 - 18:00 UTC",
    duration: "7 Days",
    prize: "50k In-Game Coins + Achievement",
    description: "Design and build your dream base within a 64x64 plot. Judged on creativity, redstone integration, and aesthetic harmony.",
    status: "Upcoming",
    statusColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  {
    title: "End Dragon & Elytra Rush Season 4",
    category: "PvE Race",
    icon: Flame,
    color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
    date: "September 5, 2026 - 19:00 UTC",
    duration: "3 Hours",
    prize: "Custom Elytra Skin + Achievement",
    description: "Speedrun the Ender Dragon fight alongside the community and be the first squad to discover the new End City loot.",
    status: "Upcoming",
    statusColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  },
  {
    title: "Community UHC Champions Cup",
    category: "PvP Tournament",
    icon: Swords,
    color: "from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30",
    date: "September 19, 2026 - 17:00 UTC",
    duration: "2 Hours",
    prize: "100k In-Game Coins + Achievement",
    description: "Hardcore survival PvP with no natural health regeneration. Craft golden apples, brew potions, and be the last player standing.",
    status: "Upcoming",
    statusColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  },
];

export default function ServerEventsPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-800 text-amber-400 text-xs font-semibold uppercase font-mono">
          <Trophy className="w-3.5 h-3.5" /> Competitions & Prizes
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Server <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400">Events & Tournaments</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Participate in weekly community competitions, build battles, speedruns, and seasonal tournaments to win exclusive rewards. All server events are managed by <strong className="text-amber-300">ro_mihaiu</strong>.
        </p>
        <div className="pt-2">
          <a
            href="https://discord.ro-mihaiu.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
          >
            <span>Events Discord (discord.ro-mihaiu.xyz)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" /> Featured & Upcoming Events
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {upcomingEvents.map((evt) => {
            const Icon = evt.icon;
            return (
              <div
                key={evt.title}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 hover:border-slate-700 transition-all shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${evt.color} border shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                          {evt.category}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${evt.statusColor}`}>
                          {evt.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {evt.title}
                      </h3>
                    </div>
                  </div>

                  <a
                    href="https://discord.ro-mihaiu.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
                  >
                    <span>Register on Discord</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {evt.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5 text-slate-300">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-500 font-mono">Date & Time</div>
                      <div className="font-semibold">{evt.date}</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5 text-slate-300">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-500 font-mono">Duration</div>
                      <div className="font-semibold">{evt.duration}</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-2.5 text-slate-300">
                    <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-500 font-mono">Prize Pool</div>
                      <div className="font-semibold text-emerald-400 truncate">{evt.prize}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
