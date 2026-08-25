import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canManageFarms, hasFarmAdminMetadata } from "@/lib/auth";
import { getFarmByCategoryAndDn, getAllFarms } from "@/lib/farms";
import { FarmForm } from "../../FarmForm";

export default async function EditFarmPage({ params }: { params: { dn: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !hasFarmAdminMetadata(user) || !canManageFarms(user)) redirect("/login?error=unauthorized");
  const farm = (await getAllFarms()).find((candidate) => candidate.dn.toLowerCase() === decodeURIComponent(params.dn).toLowerCase());
  if (!farm) notFound();
  return <div className="mx-auto max-w-4xl space-y-6"><div><p className="text-xs font-mono uppercase tracking-widest text-cyan-400">Staff area / {farm.dn}</p><h1 className="text-3xl font-extrabold text-white">Edit farm</h1></div><FarmForm farm={farm} /></div>;
}