import React from "react";
import Link from "next/link";
import { Compass, Home, Search, AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 text-center max-w-lg w-full space-y-6 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-inner">
          <span className="text-3xl font-black font-mono">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Lost in the Void
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The farm blueprint, coordinate, or chunk you are looking for does not exist or has fallen out of the world.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-md shadow-cyan-600/20"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            href="/?category=all"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
          >
            <Compass className="w-4 h-4" /> Browse All Farms
          </Link>
        </div>
      </div>
    </div>
  );
}

