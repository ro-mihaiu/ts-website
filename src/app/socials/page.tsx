import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Youtube,
  MessageSquare,
  Mail,
  Instagram,
  Twitter,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Share2,
  Tv
} from "lucide-react";

export const metadata: Metadata = {
  title: "Official Socials & Channels | TheySix",
  description: "Connect with TheySix across YouTube, Discord, TikTok, Instagram, X (Twitter), and business email.",
};

const socialsData = [
  {
    name: "YouTube (Java Edition)",
    handle: "@TheySix",
    url: "https://www.youtube.com/@TheySix",
    description: "Main channel for Minecraft Java tutorials, high-yield farm designs, and technical mechanics.",
    icon: Youtube,
    color: "from-red-600 to-rose-700",
    hoverBg: "hover:border-red-500/50",
    badge: "Java Edition",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  {
    name: "YouTube (Bedrock Edition)",
    handle: "@TheySixMC",
    url: "https://www.youtube.com/@TheySixMC",
    description: "Dedicated Bedrock Edition channel featuring trident killers, portal ticking, and mobile/console farms.",
    icon: Youtube,
    color: "from-red-500 to-pink-600",
    hoverBg: "hover:border-rose-500/50",
    badge: "Bedrock Edition",
    badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
  {
    name: "YouTube (Minecraft Builds)",
    handle: "@TheySixCreations",
    url: "https://www.youtube.com/@TheySixCreations",
    description: "Aesthetic Minecraft mega-builds, creative farm structures, timelapse builds, and world design showcases.",
    icon: Youtube,
    color: "from-amber-600 via-orange-600 to-red-600",
    hoverBg: "hover:border-amber-500/50",
    badge: "Minecraft Builds",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  {
    name: "Discord Community",
    handle: "discord.gg/theysix",
    url: "https://discord.gg/theysix",
    description: "Join the official TheySix Discord server for farm help, schematic downloads, giveaways, and chat.",
    icon: MessageSquare,
    color: "from-[#5865F2] to-[#4752C4]",
    hoverBg: "hover:border-[#5865F2]/50",
    badge: "Community Hub",
    badgeColor: "bg-[#5865F2]/20 text-[#5865F2] border-[#5865F2]/40",
  },
  {
    name: "TikTok (Java Edition)",
    handle: "@theysixcreations",
    url: "https://www.tiktok.com/@theysixcreations",
    description: "Short-form Minecraft Java farm tips, redstone quick tricks, and build highlights.",
    icon: Tv,
    color: "from-slate-700 to-slate-900",
    hoverBg: "hover:border-cyan-500/50",
    badge: "TikTok Java",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  },
  {
    name: "TikTok (Bedrock Edition)",
    handle: "@theysixmc",
    url: "https://www.tiktok.com/@theysixmc",
    description: "Quick Bedrock farm tutorials, bug workarounds, and MCPE survival tips.",
    icon: Tv,
    color: "from-slate-700 to-slate-900",
    hoverBg: "hover:border-rose-500/50",
    badge: "TikTok Bedrock",
    badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
  {
    name: "Instagram",
    handle: "@theysixyt",
    url: "https://www.instagram.com/theysixyt/",
    description: "Behind the scenes, farm screenshots, release announcements, and updates.",
    icon: Instagram,
    color: "from-purple-600 via-pink-600 to-orange-500",
    hoverBg: "hover:border-pink-500/50",
    badge: "Photos & Stories",
    badgeColor: "bg-pink-500/10 text-pink-300 border-pink-500/30",
  },
  {
    name: "X / Twitter",
    handle: "@TheySixYT",
    url: "https://x.com/TheySixYT",
    description: "Latest news, updates on new videos, Minecraft snapshot coverage, and discussions.",
    icon: Twitter,
    color: "from-sky-500 to-blue-600",
    hoverBg: "hover:border-sky-500/50",
    badge: "Announcements",
    badgeColor: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  },
  {
    name: "Business Inquiries / Email",
    handle: "theysixyt.business@gmail.com",
    url: "mailto:theysixyt.business@gmail.com",
    description: "For sponsorships, collaborations, partnerships, or official business contact.",
    icon: Mail,
    color: "from-teal-600 to-emerald-700",
    hoverBg: "hover:border-emerald-500/50",
    badge: "Contact",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  },
];

export default function SocialsPage() {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase font-mono">
          <Share2 className="w-3.5 h-3.5" /> Official Channels
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">TheySix</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Follow our official media channels, join our growing community of Minecraft builders, and stay updated with new farm blueprints.
        </p>
      </div>

      {/* Social Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialsData.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/80 bg-slate-900/60 ${social.hoverBg} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${social.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {social.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {social.handle}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border ${social.badgeColor}`}>
                    {social.badge}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {social.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>Visit Channel / Link</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

