import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, FileCode, Youtube, Coffee, Box, ArrowUpRight, Gauge } from "lucide-react";
import { RealViewsCount } from "@/components/RealViewsCount";
import type { FarmWithMetadata } from "@/types/farm";

interface FarmCardProps {
  farm: FarmWithMetadata;
}

export function FarmCard({ farm }: FarmCardProps) {
  const isJava = farm.category === "java";
  const farmUrl = `/farm/${farm.category}/${farm.dn}`;

  return (
    <div className="group glass-panel rounded-2xl border border-slate-800/80 hover:border-slate-700 bg-slate-900/60 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20">
      {/* Media / Thumbnail Header */}
      <Link href={farmUrl} className="relative aspect-video w-full overflow-hidden bg-slate-950 block">
        <Image
          src={farm.resolvedThumbnail}
          alt={farm.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized={farm.resolvedThumbnail.startsWith("http")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Edition Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase font-mono shadow-md backdrop-blur-md ${
              isJava
                ? "bg-[#9fff99]/15 text-[#9fff99] border border-[#9fff99]/30 bg-slate-950/80"
                : "bg-white/15 text-slate-100 border border-slate-300/30 bg-slate-950/80"
            }`}
          >
            {isJava ? <Coffee className="w-3 h-3" /> : <Box className="w-3 h-3" />}
            {isJava ? "Java" : "Bedrock"}
          </span>

          {farm.version && (
            <span className="px-2 py-1 rounded-md text-xs font-mono font-medium text-slate-300 bg-slate-950/80 border border-slate-700 backdrop-blur-md">
              {farm.version}
            </span>
          )}
        </div>

        {/* DN ID Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 rounded-md text-xs font-mono font-bold text-slate-400 bg-slate-950/90 border border-slate-800 backdrop-blur-md">
            #{farm.dn}
          </span>
        </div>

        {/* Bottom thumbnail bar: View count on bottom-left, Rates on bottom-right */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-slate-300 border border-slate-700/80 backdrop-blur-md font-mono text-[11px] shadow-sm pointer-events-auto">
            <RealViewsCount dn={farm.dn} initialViews={farm.views} />
          </span>

          {farm.rates && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 backdrop-blur-md font-mono text-[11px] shadow-sm">
              <Gauge className="w-3 h-3" /> {farm.rates}
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Farm Type */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              {farm.farmType}
            </span>
            {farm.difficulty && (
              <span className="text-[11px] font-medium text-slate-400">
                {farm.difficulty}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={farmUrl} className="group-hover:text-cyan-300 transition-colors">
            <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:underline">
              {farm.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {farm.description}
          </p>

          {/* Tags */}
          {farm.tags && farm.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {farm.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[11px] font-medium text-slate-400 bg-slate-800/60 border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
              {farm.tags.length > 3 && (
                <span className="text-[11px] text-slate-500 self-center">
                  +{farm.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
          {/* World Download Link */}
          {farm.hasWorldDownload && farm.worldDownloadUrl && farm.worldDownloadUrl !== "link" && farm.worldDownloadUrl !== "#" ? (
            <a
              href={farm.worldDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all"
              title="Download World Save"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>World Save</span>
            </a>
          ) : (
            <Link
              href={farmUrl}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-medium text-slate-500 bg-slate-900/80 border border-slate-800/80 hover:text-cyan-400 hover:border-slate-700 transition-colors"
              title="No world file provided - Click to request ticket"
            >
              <span>No World</span>
            </Link>
          )}

          {/* Java Schematic Download / Preview Link */}
          {isJava && (
            farm.hasSchematic && farm.schematicUrl ? (
              <a
                href={farm.schematicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all"
                title="Download .litematic Schematic"
              >
                <FileCode className="w-3.5 h-3.5 text-[#9fff99]" />
                <span>Schematic</span>
              </a>
            ) : (
              <Link
                href={farmUrl}
                className="px-2.5 py-2 rounded-xl text-[11px] font-medium text-slate-500 bg-slate-900/80 border border-slate-800/80 hover:text-[#9fff99] hover:border-slate-700 transition-colors"
                title="No schematic provided - Click to request ticket"
              >
                <span>No Schem.</span>
              </Link>
            )
          )}

          {/* YouTube Tutorial Link */}
          {farm.hasYoutube && farm.youtubeUrl ? (
            <a
              href={farm.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 transition-all"
              title="Watch Video Tutorial on YouTube"
              aria-label="Watch YouTube video"
            >
              <Youtube className="w-4 h-4" />
            </a>
          ) : (
            <Link
              href={farmUrl}
              className="p-2 rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 border border-slate-800/80 hover:border-slate-700 transition-colors"
              title="No video link provided - Click to request ticket"
              aria-label="No video link provided"
            >
              <Youtube className="w-4 h-4 opacity-40" />
            </Link>
          )}

          {/* View Details Link */}
          <Link
            href={farmUrl}
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/30 transition-all"
            title="View Full Farm Page"
            aria-label="View Full Farm Page"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

