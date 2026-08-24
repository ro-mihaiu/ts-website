import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Shield, Sparkles } from "lucide-react";
import {
  ACTIVE_PUBLIC_STAFF,
  getPublicStaffAvatarPath,
} from "@/data/staff-directory";

export const metadata: Metadata = {
  title: "Staff Directory | TheySix",
  description: "Browse all active TheySix staff and see what each member specializes in.",
};

export default function StaffDirectoryPage() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800 bg-cyan-950 px-3.5 py-1.5 text-xs font-semibold uppercase font-mono text-cyan-400">
          <Shield className="h-3.5 w-3.5" /> Staff Directory
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          All Active <span className="bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent">Staff</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400">
          View each profile to see what each staff member knows best and how to contact them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACTIVE_PUBLIC_STAFF.map((member) => (
          <article
            key={member.userId}
            className="glass-panel rounded-3xl border border-slate-800 p-6 shadow-lg transition-all hover:border-slate-700"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                  <Image
                    src={getPublicStaffAvatarPath(member.userId)}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">{member.name}</h2>
                  <p className="text-xs font-mono text-slate-400">{member.headline}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{member.bio}</p>

              <div className="flex flex-wrap gap-2">
                {member.bestAt.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-mono text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
              <span className="font-mono">{member.discordTag}</span>
              <Link href={`/staff/${member.userId}`} className="text-cyan-400 transition-colors hover:text-cyan-300" title="Open detailed staff profile">
                <MessageSquare className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">Need retired staff history or help?</h3>
          <p className="text-sm text-slate-400">Use the additional staff routes for retired members and reporting.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link href="/staff/retired" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800/70">
            <Sparkles className="h-4 w-4" /> Retired
          </Link>
          <Link href="/staff/report" className="inline-flex items-center gap-2 rounded-xl bg-red-500/90 px-4 py-2 text-sm font-bold text-white hover:bg-red-500">
            Report Staff
          </Link>
        </div>
      </div>
    </div>
  );
}
