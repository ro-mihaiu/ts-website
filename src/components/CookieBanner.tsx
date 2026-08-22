"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check, Shield } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("theysix_cookie_consent");
    if (!consent) {
      // Small delay for natural presentation
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("theysix_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("theysix_cookie_consent", "essential_only");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="glass-panel p-5 rounded-2xl border border-slate-700/80 shadow-2xl shadow-black/80 bg-slate-900/95 backdrop-blur-xl">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              Cookie Preferences
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              We use cookies and local storage to enhance your browsing experience, remember your download preferences, and analyze site traffic.
            </p>
            <div className="mt-2 text-xs">
              <Link href="/cookies" className="text-cyan-400 hover:text-cyan-300 underline font-medium">
                Read our Cookie Policy
              </Link>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2.5 mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={handleDecline}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80 transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-600/30 transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

