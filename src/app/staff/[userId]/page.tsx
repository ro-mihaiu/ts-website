import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageSquare, Shield } from "lucide-react";
import {
  getPublicStaffAvatarPath,
  PUBLIC_STAFF_PROFILES,
  getPublicStaffByUserId,
} from "@/data/staff-directory";

interface StaffDetailPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export async function generateMetadata({ params }: StaffDetailPageProps): Promise<Metadata> {
  const { userId } = await params;
  const staff = getPublicStaffByUserId(userId);

  if (!staff) {
    return {
      title: "Staff Profile Not Found | TheySix",
    };
  }

  return {
    title: `${staff.name} | Staff Profile | TheySix`,
    description: `Learn more about ${staff.name}, ${staff.headline} at TheySix.`,
  };
}

export function generateStaticParams() {
  return PUBLIC_STAFF_PROFILES.map((staff) => ({ userId: staff.userId }));
}

export default async function StaffDetailPage({ params }: StaffDetailPageProps) {
  const { userId } = await params;
  const staff = getPublicStaffByUserId(userId);

  if (!staff) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/staff" className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to all staff
      </Link>

      <section className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-7 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-slate-700 bg-slate-950">
            <Image
              src={getPublicStaffAvatarPath(staff.userId)}
              alt={staff.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{staff.name}</h1>
            <p className="text-sm text-cyan-300 font-semibold">{staff.headline}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-300">{staff.bio}</p>

        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-300">Best At</h2>
          <div className="flex flex-wrap gap-2">
            {staff.bestAt.map((topic) => (
              <span
                key={topic}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-800 pt-4">
          <p className="text-xs font-mono text-slate-400">Discord: {staff.discordTag}</p>
          <a
            href="https://discord.gg/theysix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5865F2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4752C4]"
          >
            <MessageSquare className="h-4 w-4 fill-current" /> Open Discord
          </a>
        </div>
      </section>

      {/* <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-400">
        <p>
          Profile image fallback is <strong className="text-slate-200">/public/pfp/--.png</strong>. You can replace each staff image manually in <strong className="text-slate-200">/public/pfp</strong> or wire authenticated Discord avatars later.
        </p>
      </section> */}

      <div className="flex flex-wrap gap-2">
        <Link href="/staff/retired" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800/60">
          <Shield className="h-4 w-4" /> View Retired Staff
        </Link>
        <Link href="/staff/report" className="inline-flex items-center gap-2 rounded-xl border border-red-700/70 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-900/20">
          Report a Staff Issue
        </Link>
      </div>
    </div>
  );
}
