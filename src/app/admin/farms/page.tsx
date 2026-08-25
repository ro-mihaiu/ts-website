import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canManageFarms, hasFarmAdminMetadata } from "@/lib/auth";
import { getAllFarms } from "@/lib/farms";
import { deleteFarm } from "./actions";
import { DeleteButton } from "./DeleteButton";

export default async function AdminFarmsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !hasFarmAdminMetadata(user) || !canManageFarms(user)) redirect("/login?error=unauthorized");
  const farms = await getAllFarms();

  return <div className="space-y-8"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-mono uppercase tracking-widest text-cyan-400">Staff area</p><h1 className="text-3xl font-extrabold text-white">Farm management</h1><p className="mt-2 text-sm text-slate-400">{farms.length} farms in Supabase</p></div><div className="flex gap-3"><Link href="/" className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:text-white">Public site</Link><Link href="/admin/farms/new" className="rounded-xl bg-[#9fff99] px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-[#86efac]">Add farm</Link></div></div>
    <div className="overflow-x-auto glass-panel rounded-3xl border border-slate-800"><table className="w-full text-left text-sm"><thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">DN</th><th className="px-5 py-4">Title</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Actions</th></tr></thead><tbody className="divide-y divide-slate-800/80">{farms.map((farm) => <tr key={`${farm.category}-${farm.dn}`}><td className="px-5 py-4 font-mono text-cyan-300">{farm.dn}</td><td className="max-w-md px-5 py-4 text-white">{farm.title}</td><td className="px-5 py-4 capitalize text-slate-400">{farm.category}</td><td className="px-5 py-4"><div className="flex items-center gap-3"><Link className="text-cyan-300 hover:text-cyan-200" href={`/admin/farms/${encodeURIComponent(farm.dn)}/edit`}>Edit</Link><form action={deleteFarm}><input type="hidden" name="dn" value={farm.dn} /><DeleteButton /></form></div></td></tr>)}</tbody></table></div>
  </div>;
}