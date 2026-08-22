"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  FileCode,
  Youtube,
  Layers,
  Sparkles,
  Calendar,
  User,
  Gauge,
  ArrowLeft,
  Share2,
  ExternalLink,
  Info,
  Eye,
  AlertCircle,
  MessageSquarePlus,
  Check,
  Copy,
  Boxes
} from "lucide-react";
import { FarmCard } from "@/components/FarmCard";
import { SchematicPreviewModal } from "@/components/SchematicPreviewModal";
import { RealViewsCount } from "@/components/RealViewsCount";
import { MaterialListChecklist } from "@/components/MaterialListChecklist";
import type { FarmWithMetadata } from "@/types/farm";

interface FarmDetailViewProps {
  farm: FarmWithMetadata;
  relatedFarms: FarmWithMetadata[];
}

export function FarmDetailView({ farm, relatedFarms }: FarmDetailViewProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isJava = farm.category === "java";
  const ytId = farm.youtubeId;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href={`/?category=${farm.category}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to {isJava ? "Java" : "Bedrock"} Farms</span>
        </Link>

        {/* Badges / Edition info */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold font-mono uppercase tracking-wide border shadow-sm ${
              isJava
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                : "bg-rose-500/10 text-rose-300 border-rose-500/30"
            }`}
          >
            {isJava ? <Layers className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            {isJava ? "Minecraft Java" : "Minecraft Bedrock"}
          </span>

          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold text-slate-300 bg-slate-900 border border-slate-800">
            DN #{farm.dn}
          </span>

          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-slate-900 border border-slate-800">
            <RealViewsCount dn={farm.dn} initialViews={farm.views} showLivePulse={true} />
          </span>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Copy page link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Farm Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Video / Media Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
            {ytId ? (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?rel=0`}
                title={farm.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={farm.resolvedThumbnail}
                  alt={farm.title}
                  fill
                  className="object-cover"
                  unoptimized={farm.resolvedThumbnail.startsWith("http")}
                />
              </div>
            )}
          </div>

          {/* Farm Details Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                {farm.farmType}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {farm.title}
              </h1>
            </div>

            <p className="text-base text-slate-300 leading-relaxed">
              {farm.description}
            </p>

            {farm.detailedDescription && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400" /> Farm Overview & Guide
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {farm.detailedDescription}
                </p>
              </div>
            )}

            {/* Tags */}
            {farm.tags && farm.tags.length > 0 && (
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                {farm.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Material List & Checklist (Track items in-game) */}
          {farm.materials && farm.materials.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Boxes className="w-4 h-4" />
                  </span>
                  <span>Material List & In-Game Checklist</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {farm.materials.length} components
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Check off items as you gather them in Minecraft survival. Your progress is saved automatically on this device.
              </p>
              <MaterialListChecklist
                materials={farm.materials}
                farmId={farm.dn}
                farmTitle={farm.title}
              />
            </div>
          )}
        </div>

        {/* Right: Quick Action & Download Panel */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              Download & Resources
            </h2>

            {/* Download Buttons */}
            <div className="space-y-3">
              {/* World Download */}
              <a
                href={farm.worldDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full p-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-lg shadow-cyan-600/20 group"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-sm">World Download</div>
                    <div className="text-[11px] font-normal text-cyan-100 font-mono">
                      {isJava ? ".zip world save" : ".mcworld save"}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>

              {/* Java Schematic Handling */}
              {isJava ? (
                farm.hasSchematic && farm.schematicUrl ? (
                  <div className="space-y-2">
                    {/* Schematic Download Button */}
                    <a
                      href={farm.schematicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full p-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all shadow-lg shadow-amber-600/20 group"
                    >
                      <div className="flex items-center gap-3">
                        <FileCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <div className="text-left">
                          <div className="text-sm">Schematic File</div>
                          <div className="text-[11px] font-normal text-amber-100 font-mono">
                            .litematic file (Fabric)
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-80" />
                    </a>

                    {/* Preview Schematic Option */}
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview Schematic</span>
                    </button>
                  </div>
                ) : (
                  /* Missing Schematic Error / Notice with Discord Ticket Button */
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs leading-relaxed">
                        This farm doesn&apos;t have a schematic provided, create a ticket and ask nicely for the schematic to be provided.
                      </p>
                    </div>
                    <a
                      href="https://discord.gg/theysix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <MessageSquarePlus className="w-4 h-4" />
                      <span>Open Discord Ticket</span>
                    </a>
                  </div>
                )
              ) : (
                /* Bedrock Notice - No Schematics for Bedrock */
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-300">Bedrock Edition Notice</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Bedrock Edition does not support .litematic schematics. Full playable world save is provided above.
                  </p>
                </div>
              )}

              {/* YouTube Tutorial Link */}
              {farm.youtubeUrl && (
                <a
                  href={farm.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-4 rounded-2xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 font-semibold transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Youtube className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-sm">Watch on YouTube</div>
                      <div className="text-[11px] font-normal text-red-300/80">
                        TheySix Video Tutorial
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>
              )}
            </div>

            {/* Farm Specs Table */}
            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Minecraft Version</span>
                <span className="font-mono font-semibold text-slate-200">
                  {farm.version || "1.21+"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Total Views</span>
                <span className="font-mono font-semibold text-cyan-400">
                  <RealViewsCount dn={farm.dn} initialViews={farm.views} format="full" />
                </span>
              </div>

              {farm.rates && (
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Expected Rates</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {farm.rates}
                  </span>
                </div>
              )}

              {farm.difficulty && (
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Difficulty</span>
                  <span className="font-semibold text-slate-200">{farm.difficulty}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Creator / Designer</span>
                <span className="font-semibold text-slate-200">{farm.author || "TheySix"}</span>
              </div>

              {farm.date && (
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Updated Date</span>
                  <span className="font-mono text-slate-400">{farm.date}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Farms */}
      {relatedFarms.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-slate-800">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            More {isJava ? "Java" : "Bedrock"} Farm Blueprints
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedFarms.map((rf) => (
              <FarmCard key={`${rf.category}-${rf.dn}`} farm={rf} />
            ))}
          </div>
        </div>
      )}

      {/* Schematic Preview Modal */}
      {isJava && (
        <SchematicPreviewModal
          farm={farm}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
