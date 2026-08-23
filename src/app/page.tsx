import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllFarms } from "@/lib/farms";
import { FarmGrid } from "@/components/FarmGrid";
import { JavaBrandIcon } from "@/components/JavaBrandIcon";
import { Sparkles, Box, Download, Youtube, MessageSquare, ShieldCheck, FileCode, Hammer } from "lucide-react";

export const revalidate = 0; // Dynamic server evaluation

export default function HomePage() {
  const farms = getAllFarms();

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-slate-950 p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Background glow accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="space-y-6 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Official TheySix Farm Database
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">Minecraft Farm</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore world downloads, Litematica schematics, and step-by-step video tutorials for both
              <strong className="text-[#9fff99] font-semibold"> Java</strong> and
              <strong className="text-slate-200 font-semibold"> Bedrock</strong> editions.
            </p>

            {/* Quick Action CTA buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-2">
              <Link
                href="/?category=java#farms"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#9fff99] hover:bg-[#86efac] text-slate-950 font-bold text-sm shadow-lg shadow-[#9fff99]/20 transition-all hover:scale-[1.02]"
              >
                <JavaBrandIcon size={16} /> Java Farms
              </Link>
              <Link
                href="/?category=bedrock#farms"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-white text-slate-950 font-bold text-sm shadow-lg shadow-white/20 transition-all hover:scale-[1.02]"
              >
                <Box className="w-4 h-4" /> Bedrock Farms
              </Link>
              <Link
                href="/?category=build#farms"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02]"
              >
                <Hammer className="w-4 h-4" /> Builds
              </Link>
              <Link
                href="/?category=both"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/20 transition-all hover:scale-[1.02]"
              >
                <span>Both Platforms</span>
              </Link>
              <a
                href="https://discord.gg/theysix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#5865F2]" /> Join Community
              </a>
            </div>
          </div>

          {/* Hero Branding / Logo Preview */}
          <div className="shrink-0 relative">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#9fff99]/30 shadow-2xl bg-slate-950/80 p-2 group flex items-center justify-center">
                <Image src="/logo.gif" alt="TheySix logo" fill className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" priority unoptimized />
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2.5">
            <Download className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Instant World Saves</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FileCode className="w-4 h-4 text-[#9fff99] shrink-0" />
            <span>Litematica Schematics</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Youtube className="w-4 h-4 text-red-400 shrink-0" />
            <span>Video Tutorials</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tested on 1.21+</span>
          </div>
        </div>
      </section>

      {/* Farm Catalog Section */}
      <section id="farms" className="scroll-mt-24 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Farm Schematics & Downloads
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Browse through our collection of Minecraft farm blueprints and world archives.
            </p>
          </div>
        </div>

        {/* Dynamic Client Grid */}
        <Suspense fallback={<div className="text-center py-20 text-slate-400 font-mono">Loading farms...</div>}>
          <FarmGrid initialFarms={farms} />
        </Suspense>
      </section>
    </div>
  );
}

