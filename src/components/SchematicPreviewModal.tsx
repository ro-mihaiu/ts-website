"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  FileCode,
  Download,
  Box,
  Layers,
  Check,
  Info,
  ExternalLink,
  Eye,
  Terminal,
  Grid,
  ShieldCheck,
  Search,
  Lock,
  GitBranch,
  Sparkles,
  ClipboardList
} from "lucide-react";
import { SchematicViewer3D } from "@/components/SchematicViewer3D";
import { MaterialListChecklist } from "@/components/MaterialListChecklist";
import type { FarmWithMetadata } from "@/types/farm";

interface SchematicPreviewModalProps {
  farm: FarmWithMetadata;
  isOpen: boolean;
  onClose: () => void;
}

export function SchematicPreviewModal({ farm, isOpen, onClose }: SchematicPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<"viewer" | "materials" | "guide">("viewer");
  const [selectedFormat, setSelectedFormat] = useState<"litematic" | "schematic" | "schem" | "nbt">("litematic");
  const [materialSearch, setMaterialSearch] = useState("");
  const [copiedMaterials, setCopiedMaterials] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const farmFormats = {
    litematic: `${farm.dn}.litematic`,
    schematic: `${farm.dn}.schematic`,
    schem: `${farm.dn}.schem`,
    nbt: `${farm.dn}.nbt`,
  };

  const materialsList = farm.materials || [];

  const filteredMaterials = materialsList.filter((m) =>
    m.name.toLowerCase().includes(materialSearch.toLowerCase())
  );

  const handleCopyMaterialsText = () => {
    const text = materialsList.map((m) => `${m.name}: ${m.count} (${m.stacks || `${m.count} items`})`).join("\n");
    navigator.clipboard.writeText(`=== Material List for ${farm.title} (#${farm.dn}) ===\n` + text);
    setCopiedMaterials(true);
    setTimeout(() => setCopiedMaterials(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-700/80 bg-slate-900/98 shadow-2xl shadow-cyan-950/40 overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in zoom-in-95 duration-200">

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-md">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Interactive Schematic Viewer
                </span>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  #{farm.dn}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-white line-clamp-1 mt-0.5">
                {farm.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
            aria-label="Close schematic viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-2 border-b border-slate-800 text-xs font-semibold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("viewer")}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "viewer"
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> 3D View
          </button>

          <button
            onClick={() => setActiveTab("materials")}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "materials"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" /> Material List
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === "guide"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Info className="w-3.5 h-3.5" /> Litematica Guide
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-sm text-slate-300">
          {/* TAB 1: 3D SCHEMAT.IO VIEWER */}
          {activeTab === "viewer" && (
            <div className="space-y-4">
              <SchematicViewer3D farm={farm} selectedFormat={selectedFormat} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Format</span>
                  <p className="font-mono font-bold text-amber-300">{farmFormats[selectedFormat]}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Target Version</span>
                  <p className="font-bold text-cyan-300">Minecraft Java {farm.version || "1.21+"}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Expected Rates</span>
                  <p className="font-bold text-emerald-400">{farm.rates || "High Yield"}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Verification</span>
                  <p className="font-bold text-slate-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Staff Verified
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MATERIAL LIST & CHECKLIST */}
          {activeTab === "materials" && (
            <div className="space-y-4">
              {farm.materials && farm.materials.length > 0 && (
                <p className="text-xs text-slate-400">
                  Check off materials as you collect them in Minecraft. Your inventory progress is saved automatically.
                </p>
              )}
              <MaterialListChecklist
                materials={farm.materials || []}
                farmId={farm.dn}
                farmTitle={farm.title}
                youtubeUrl={farm.youtubeUrl}
              />
            </div>
          )}

          {/* TAB 3: LITEMATICA & STRUCTURE GUIDE */}
          {activeTab === "guide" && (
            <div className="space-y-4 text-xs sm:text-sm">
              <h3 className="font-bold text-white text-base">How to Load & Build in Minecraft:</h3>
              <ol className="list-decimal list-inside space-y-3 text-slate-300 pl-1 leading-relaxed">
                <li>
                  <strong>For Litematica (.litematic):</strong> Install Fabric Loader and add the <strong>Litematica</strong> & <strong>MaLiLib</strong> mods to your mods folder.
                </li>
                <li>
                  Place the downloaded <code className="text-amber-300 font-mono">{farmFormats[selectedFormat]}</code> file into your Minecraft schematics directory:
                  <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 mt-1 border border-slate-800">
                    .minecraft/schematics/
                  </div>
                </li>
                <li>
                  In-game, press <kbd className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono text-xs border border-slate-700">M</kbd> to open the Litematica Menu, click <strong>Load Schematics</strong>, and load this farm.
                </li>
                <li>
                  Use <kbd className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono text-xs border border-slate-700">Alt + Mouse Wheel</kbd> to inspect the hologram layer-by-layer and build without mistakes!
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500">Selected:</span>
            <span className="font-bold text-amber-300">{farmFormats[selectedFormat]}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
            {farm.schematicUrl && (
              <a
                href={farm.schematicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20"
              >
                <Download className="w-4 h-4" /> Download {farmFormats[selectedFormat]}
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

