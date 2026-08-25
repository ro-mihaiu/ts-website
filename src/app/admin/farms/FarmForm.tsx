"use client";

import type { FarmWithMetadata } from "@/types/farm";
import { saveFarm } from "./actions";

export function FarmForm({ farm }: { farm?: FarmWithMetadata }) {
  const input = "w-full rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none";
  return <form action={saveFarm} className="glass-panel rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-5">
    <input type="hidden" name="existingDn" value={farm?.dn || ""} />
    <div className="grid gap-5 sm:grid-cols-2">
      {[["dn", "DN", farm?.dn || ""], ["title", "Title", farm?.title || ""], ["farmType", "Farm type", farm?.farmType || ""], ["author", "Author", farm?.author || "TheySix"], ["version", "Minecraft version", farm?.version || ""], ["rates", "Rates", farm?.rates || ""], ["date", "Date", farm?.date || ""]].map(([name, label, value]) => <label key={name} className="space-y-1.5 text-sm text-slate-300">{label}<input className={input} name={name} defaultValue={value} required={name !== "author" && name !== "date"} /></label>)}
      <label className="space-y-1.5 text-sm text-slate-300">Category<select className={input} name="category" defaultValue={farm?.category || "java"}><option value="java">Java</option><option value="bedrock">Bedrock</option><option value="build">Build</option></select></label>
      <label className="space-y-1.5 text-sm text-slate-300">Difficulty<select className={input} name="difficulty" defaultValue={farm?.difficulty || ""}><option value="">Not set</option>{["Easy", "Medium", "Hard", "Expert"].map((value) => <option key={value}>{value}</option>)}</select></label>
    </div>
    {[['description', 'Description', farm?.description || ''], ['detailedDescription', 'Detailed description', farm?.detailedDescription || ''], ['worldDownloadUrl', 'World download URL', farm?.worldDownloadUrl || ''], ['schematicUrl', 'External schematic URL', farm?.schematicUrl || ''], ['youtubeUrl', 'YouTube URL', farm?.youtubeUrl || ''], ['thumbnailUrl', 'Thumbnail URL', farm?.thumbnailUrl || ''], ['tags', 'Tags (comma separated)', farm?.tags?.join(', ') || '']].map(([name, label, value]) => <label key={name} className="block space-y-1.5 text-sm text-slate-300">{label}<textarea className={input} name={name} rows={name.includes('Description') ? 4 : 2} defaultValue={value} required={name === 'description'} /></label>)}
    <label className="block space-y-1.5 text-sm text-slate-300">Schematic file (.litematic, .schem, .schematic)<input className={input} type="file" name="schematic" accept=".litematic,.schem,.schematic" /></label>
    <div className="flex flex-wrap gap-5 text-sm text-slate-300"><label><input type="checkbox" name="featured" defaultChecked={farm?.featured} className="mr-2" />Featured</label><label>Views <input className="ml-2 w-28 rounded-lg bg-slate-950 border border-slate-800 px-2 py-1" name="views" type="number" min="0" defaultValue={farm?.views || 0} /></label></div>
    <button className="rounded-xl bg-[#9fff99] px-5 py-3 font-bold text-slate-950 hover:bg-[#86efac]" type="submit">{farm ? "Save Farm" : "Add Farm"}</button>
  </form>;
}