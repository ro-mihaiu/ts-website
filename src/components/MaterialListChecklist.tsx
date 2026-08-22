"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CheckSquare,
  Square,
  Check,
  Search,
  RotateCcw,
  ClipboardList,
  Sparkles,
  Layers,
  Boxes,
  CheckCircle2
} from "lucide-react";
import type { FarmMaterialItem } from "@/types/farm";

interface MaterialListChecklistProps {
  materials: FarmMaterialItem[];
  farmId: string;
  farmTitle?: string;
  compact?: boolean;
}

export function MaterialListChecklist({
  materials,
  farmId,
  farmTitle = "Farm Blueprint",
  compact = false
}: MaterialListChecklistProps) {
  const storageKey = `theysix_materials_${farmId}`;

  // Checked state keyed by material name
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Load saved checked items from localStorage on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedMap(JSON.parse(saved));
      }
    } catch {
      // ignore localStorage errors
    }
    setIsLoaded(true);
  }, [storageKey]);

  // Save changes to localStorage
  const toggleItem = (name: string) => {
    setCheckedMap((prev) => {
      const next = { ...prev, [name]: !prev[name] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleReset = () => {
    setCheckedMap({});
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  const handleCheckAll = () => {
    const allChecked: Record<string, boolean> = {};
    materials.forEach((m) => {
      allChecked[m.name] = true;
    });
    setCheckedMap(allChecked);
    try {
      localStorage.setItem(storageKey, JSON.stringify(allChecked));
    } catch {
      // ignore
    }
  };

  // Filtered materials
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return materials;
    return materials.filter((m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [materials, searchQuery]);

  // Progress metrics
  const totalItems = materials.length;
  const collectedCount = materials.filter((m) => checkedMap[m.name]).length;
  const progressPercent = totalItems > 0 ? Math.round((collectedCount / totalItems) * 100) : 0;
  const isAllDone = totalItems > 0 && collectedCount === totalItems;

  // Copy helpers
  const handleCopyAll = () => {
    const text = materials
      .map((m) => `${m.name}: ${m.count} (${m.stacks || `${m.count} items`})`)
      .join("\n");
    navigator.clipboard.writeText(`=== Material List: ${farmTitle} (#${farmId}) ===\n` + text);
    setCopiedNotification("All materials copied!");
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const handleCopyRemaining = () => {
    const remaining = materials.filter((m) => !checkedMap[m.name]);
    if (remaining.length === 0) {
      setCopiedNotification("All items already gathered!");
      setTimeout(() => setCopiedNotification(null), 2500);
      return;
    }
    const text = remaining
      .map((m) => `${m.name}: ${m.count} (${m.stacks || `${m.count} items`})`)
      .join("\n");
    navigator.clipboard.writeText(`=== Remaining Needed: ${farmTitle} (#${farmId}) ===\n` + text);
    setCopiedNotification("Remaining items copied!");
    setTimeout(() => setCopiedNotification(null), 2500);
  };
  if (!materials || materials.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-400">
        No materials listed for this farm yet.
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      {/* Progress & Header Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Boxes className="w-4 h-4 text-amber-400" /> In-Game Resource Tracker
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-900 text-cyan-300 border border-slate-700">
              {collectedCount}/{totalItems} items ({progressPercent}%)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={handleCheckAll}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium transition-colors"
            >
              Check All
            </button>
            <button
              onClick={handleReset}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-300 border border-slate-700 text-[11px] font-medium transition-colors flex items-center gap-1"
              title="Reset all checkboxes"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isAllDone 
                ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/30" 
                : "bg-gradient-to-r from-amber-500 to-cyan-400"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* All items done message */}
        {isAllDone && (
          <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold pt-0.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>All materials gathered! You have everything ready in your inventory to build this farm.</span>
          </div>
        )}
      </div>

      {/* Toolbar: Search & Copy Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search items (e.g. Hopper, Piston, Glass)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={handleCopyRemaining}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-semibold border border-slate-700 transition-colors"
            title="Copy only uncollected items"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Copy Needed</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Copy All</span>
          </button>
        </div>
      </div>

      {/* Copied notification toast */}
      {copiedNotification && (
        <div className="p-2 rounded-xl bg-cyan-950/90 border border-cyan-800 text-cyan-300 text-xs font-mono text-center animate-in fade-in">
          {copiedNotification}
        </div>
      )}

      {/* Interactive Item Checkbox Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
        {filtered.map((mat) => {
          const isChecked = isLoaded && Boolean(checkedMap[mat.name]);
          return (
            <div
              key={mat.name}
              onClick={() => toggleItem(mat.name)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                isChecked
                  ? "bg-emerald-950/20 border-emerald-800/60 text-slate-400 opacity-75"
                  : "bg-slate-950/70 border-slate-800/90 text-slate-200 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Checkbox Icon */}
                <div className={`p-1 rounded-lg border transition-colors shrink-0 ${
                  isChecked
                    ? "bg-emerald-500 border-emerald-400 text-slate-950"
                    : "bg-slate-900 border-slate-700 text-transparent"
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>

                {/* Color Dot */}
                <div
                  className="w-3.5 h-3.5 rounded-md border border-white/20 shadow-sm shrink-0"
                  style={{ backgroundColor: mat.color || "#888888" }}
                />

                {/* Name & Stacks */}
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${isChecked ? "line-through text-slate-400" : "text-white"}`}>
                    {mat.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {mat.stacks || `${mat.count} items`}
                  </div>
                </div>
              </div>

              {/* Total Count Badge */}
              <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold border shrink-0 ${
                isChecked
                  ? "bg-emerald-950/50 text-emerald-400 border-emerald-800/80"
                  : "bg-slate-900 text-cyan-300 border-slate-800"
              }`}>
                x{mat.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
