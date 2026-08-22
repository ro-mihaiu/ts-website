import React from "react";
import Link from "next/link";
import { ShieldAlert, Home, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "403 Forbidden | TheySix",
};

export default function ForbiddenPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 text-center max-w-lg w-full space-y-6 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Error 403
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Access Forbidden
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            You do not have administrative permission to access this area or the Nether portal has been sealed.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-md shadow-cyan-600/20"
          >
            <Home className="w-4 h-4" /> Return to Safe Ground
          </Link>
        </div>
      </div>
    </div>
  );
}

