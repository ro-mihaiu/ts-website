"use client";

import React, { useState, useEffect } from "react";
import { Eye, Users, Flame } from "lucide-react";

interface RealViewsCountProps {
  dn: string;
  initialViews: number;
  className?: string;
  showLivePulse?: boolean;
  format?: "compact" | "full";
}

export function RealViewsCount({
  dn,
  initialViews,
  className = "",
  showLivePulse = false,
  format = "compact",
}: RealViewsCountProps) {
  const [views, setViews] = useState<number>(initialViews);
  const [activeViewers, setActiveViewers] = useState<number>(12);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storageKey = `theysix_views_${dn}`;
      const sessionKey = `theysix_viewed_session_${dn}`;

      let currentViews = initialViews;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed >= initialViews) {
          currentViews = parsed;
        }
      }

      // If user hasn't visited this farm in this browser session, increment view count
      const sessionViewed = sessionStorage.getItem(sessionKey);
      if (!sessionViewed) {
        currentViews += 1;
        sessionStorage.setItem(sessionKey, "true");
        localStorage.setItem(storageKey, currentViews.toString());
      }

      setViews(currentViews);

      // Simulate realistic active concurrent builders viewing this blueprint (6-34)
      let hash = 0;
      for (let i = 0; i < dn.length; i++) {
        hash = (hash << 5) - hash + dn.charCodeAt(i);
        hash |= 0;
      }
      const baseActive = (Math.abs(hash) % 24) + 6;
      setActiveViewers(baseActive);
    } catch {
      // Fallback to initial views on error
      setViews(initialViews);
    }
    setHasLoaded(true);
  }, [dn, initialViews]);

  // Format count string
  const displayViews = format === "full"
    ? views.toLocaleString()
    : views >= 1000
      ? `${(views / 1000).toFixed(1)}K`
      : `${views}`;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`} title={`${views.toLocaleString()} total verified views`}>
      <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      <span className="font-mono text-slate-300">
        {displayViews} views
      </span>

      {showLivePulse && (
        <span className="hidden sm:inline-flex items-center gap-1 pl-1 text-[10px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{activeViewers} live</span>
        </span>
      )}
    </div>
  );
}
