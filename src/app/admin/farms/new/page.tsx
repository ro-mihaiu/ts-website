import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canManageFarms, hasFarmAdminMetadata } from "@/lib/auth";
import { FarmForm } from "../FarmForm";

export default async function NewFarmPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !hasFarmAdminMetadata(user) || !canManageFarms(user)) redirect("/login?error=unauthorized");
  return <div className="mx-auto max-w-4xl space-y-6"><div><p className="text-xs font-mono uppercase tracking-widest text-cyan-400">Staff area</p><h1 className="text-3xl font-extrabold text-white">Add farm</h1></div><FarmForm /></div>;
}