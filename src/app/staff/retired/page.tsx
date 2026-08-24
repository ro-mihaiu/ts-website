import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { getPublicStaffAvatarPath, RETIRED_PUBLIC_STAFF } from "@/data/staff-directory";

export const metadata: Metadata = {
  title: "Retired Staff | TheySix",
  description: "See former staff members who helped shape the TheySix community.",
};

export default function RetiredStaffPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Link href="/staff" className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to active staff
      </Link>

      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-10 text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Retired Staff</h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400">
          Former team members who contributed to moderation, technical growth, and community events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RETIRED_PUBLIC_STAFF.map((member) => (
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
    </div>
  );
}
