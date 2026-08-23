import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { 
  ShieldAlert, 
  Crown, 
  Code, 
  Wrench, 
  Shield, 
  Palette, 
  MessageSquare, 
  Sparkles,
  ExternalLink
} from "lucide-react";

export const metadata: Metadata = {
  title: "Server Staff & Leadership Team | TheySix",
  description: "Meet the founders, developers, redstone architects, and moderators behind the TheySix Minecraft community.",
};

const staffMembers = [
  {
    name: "TheySix",
    ign: "TheySix",
    role: "Server Owner & Founder",
    department: "Leadership",
    icon: Crown,
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    avatar: "/logo.gif",
    bio: "Head technical architect, farm designer, content creator, and founder of the TheySix community.",
    discord: "@theysix",
  },
  /*{
    name: "Redstone Lead",
    ign: "RedstoneArch",
    role: "Lead Redstone Engineer",
    department: "Technical & Redstone",
    icon: Wrench,
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    avatar: "/logo.gif",
    bio: "Optimizes server tick-rates, verifies farm schematics, and manages the bedrock/java technical test realms.",
    discord: "@redstone_lead",
  },*/
  {
    name: "Mihai",
    ign: "Mihaitzuuu",
    role: "Lead Developer & Manager",
    department: "Development",
    icon: Code,
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    avatar: "/logo.gif",
    bio: "Maintains server backend plugins, database integrity, custom anti-cheat rules, and web integrations.",
    discord: "@ro_mihaiu",
  },
  {
    name: "Talha",
    ign: "OnyxTrace",
    role: "Early Tester & Manager",
    department: "Testing",
    icon: Sparkles,
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    avatar: "/logo.gif",
    bio: "Tests new features, provides feedback, and helps manage the testing process.",
    discord: "@talhamolla_77",
  },
  {
    name: "Satan",
    ign: "itz_sitian",
    role: "Early Tester & Helper",
    department: "Testing",
    icon: Sparkles,
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    avatar: "/logo.gif",
    bio: "Tests new features, provides feedback, and helps manage the testing process.",
    discord: "@itz_sitian",
  },
  /*{
    name: "Head Moderator",
    ign: "WardenGuard",
    role: "Head Community Moderator",
    department: "Staff Management",
    icon: Shield,
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    avatar: "/logo.gif",
    bio: "Oversees community safety, ticket resolution, grief restorations, and player reports.",
    discord: "@warden_guard",
  },
  {
    name: "Master Architect",
    ign: "CraftVoxel",
    role: "Lead Builder & Event Director",
    department: "Creative Team",
    icon: Palette,
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    avatar: "/logo.gif",
    bio: "Designs spawn hubs, arena battlegrounds, event zones, and server aesthetic landscapes.",
    discord: "@craft_voxel",
  },*/
];

export default function ServerStaffPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase font-mono">
          <Crown className="w-3.5 h-3.5" /> Leadership & Staff
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">Staff Team</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The passionate developers, moderators, redstone engineers, and builders ensuring a great survival experience.
        </p>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers.map((member) => {
          const Icon = member.icon ?? Shield;
          const badgeColor = member.badgeColor ?? "bg-slate-700/40 text-slate-200 border-slate-600/60";
          const avatar = member.avatar ?? "/logo.gif";
          const bio = member.bio ?? "Community team member helping keep the server friendly and active.";
          const discord = member.discord ?? "N/A";
          return (
            <div
              key={member.name}
              className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-md">
                    <Image
                      src={avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      IGN: <span className="text-slate-300 font-semibold">{member.ign}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono border ${badgeColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {member.role}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-slate-400">Discord: {discord}</span>
                <a
                  href="https://discord.gg/theysix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                  title="Contact on Discord"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Staff Applications Box */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-white">Interested in Joining the Staff Team?</h3>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          We occasionally open staff recruitment for builders, helper moderators, and redstone testers. Join our Discord to see when applications open!
        </p>
        <div className="pt-2">
          <a
            href="https://discord.gg/theysix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm transition-all shadow-md shadow-[#5865F2]/20"
          >
            <MessageSquare className="w-4 h-4 fill-current" /> Join Discord for Staff Openings
          </a>
        </div>
      </div>
    </div>
  );
}
