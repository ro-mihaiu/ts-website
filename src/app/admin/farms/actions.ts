"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canManageFarms, hasFarmAdminMetadata } from "@/lib/auth";

const allowedExtensions = new Set(["litematic", "schem", "schematic"]);
const maxSchematicSize = 50 * 1024 * 1024;

async function requireFarmManager() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !hasFarmAdminMetadata(user) || !canManageFarms(user)) redirect("/login?error=unauthorized");
  return { supabase, user };
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function parseTags(value: string) {
  return value.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 50);
}

async function uploadSchematic(supabase: Awaited<ReturnType<typeof createClient>>, dn: string, file: File) {
  if (!file.size) return null;
  if (file.size > maxSchematicSize) throw new Error("Schematic files must be 50 MB or smaller.");
  const extension = file.name.toLowerCase().split(".").pop() || "";
  if (!allowedExtensions.has(extension)) throw new Error("Only .litematic, .schem, and .schematic files are allowed.");
  const path = `${dn}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("schematics").upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });
  if (error) throw new Error(`Schematic upload failed: ${error.message}`);
  return path;
}

export async function saveFarm(formData: FormData) {
  const { supabase } = await requireFarmManager();
  const existingDn = readText(formData, "existingDn");
  const dn = readText(formData, "dn");
  const title = readText(formData, "title");
  const description = readText(formData, "description");
  const category = readText(formData, "category");
  const farmType = readText(formData, "farmType");
  if (!/^\d+$/.test(dn) || !title || !description || !farmType || !["java", "bedrock", "build"].includes(category)) {
    redirect(`/admin/farms/${encodeURIComponent(existingDn || dn)}/edit?error=invalid_form`);
  }

  const duplicateQuery = supabase.from("farms").select("id").eq("dn", dn);
  const { data: duplicate } = existingDn ? await duplicateQuery.neq("dn", existingDn).maybeSingle() : await duplicateQuery.maybeSingle();
  if (duplicate) redirect(`/admin/farms/${encodeURIComponent(existingDn || dn)}/edit?error=duplicate_dn`);

  const file = formData.get("schematic");
  let schematicPath: string | null | undefined;
  if (file instanceof File && file.size > 0) schematicPath = await uploadSchematic(supabase, dn, file);
  let oldSchematicPath: string | null = null;
  if (existingDn && schematicPath) {
    const { data: oldFarm } = await supabase.from("farms").select("schematic_path").eq("dn", existingDn).maybeSingle();
    oldSchematicPath = oldFarm?.schematic_path || null;
  }

  const row = {
    id: dn,
    dn,
    title,
    category,
    farm_type: farmType,
    description,
    detailed_description: readText(formData, "detailedDescription") || null,
    world_download_url: readText(formData, "worldDownloadUrl") || "link",
    schematic_url: readText(formData, "schematicUrl") || null,
    youtube_url: readText(formData, "youtubeUrl"),
    version: readText(formData, "version") || null,
    rates: readText(formData, "rates") || null,
    difficulty: readText(formData, "difficulty") || null,
    tags: parseTags(readText(formData, "tags")),
    thumbnail_url: readText(formData, "thumbnailUrl") || null,
    author: readText(formData, "author") || null,
    date: readText(formData, "date") || null,
    featured: formData.get("featured") === "on",
    views: Number(readText(formData, "views") || 0),
    materials: [],
    ...(schematicPath !== undefined ? { schematic_path: schematicPath } : {}),
  };

  const { error } = existingDn
    ? await supabase.from("farms").update(row).eq("dn", existingDn)
    : await supabase.from("farms").insert(row);
  if (error) redirect(`/admin/farms/${encodeURIComponent(existingDn || dn)}/edit?error=${encodeURIComponent(error.message)}`);
  if (oldSchematicPath) await supabase.storage.from("schematics").remove([oldSchematicPath]);

  revalidatePath("/");
  revalidatePath(`/farm/java/${dn}`);
  revalidatePath(`/farm/bedrock/${dn}`);
  redirect(`/farm/${category}/${dn}`);
}

export async function deleteFarm(formData: FormData) {
  const { supabase } = await requireFarmManager();
  const dn = readText(formData, "dn");
  const { data: farm, error: readError } = await supabase.from("farms").select("schematic_path, category").eq("dn", dn).single();
  if (readError || !farm) redirect("/admin/farms?error=not_found");
  const { error } = await supabase.from("farms").delete().eq("dn", dn);
  if (error) redirect(`/admin/farms?error=${encodeURIComponent(error.message)}`);
  if (farm.schematic_path) await supabase.storage.from("schematics").remove([farm.schematic_path]);
  revalidatePath("/");
  revalidatePath(`/farm/${farm.category}/${dn}`);
  redirect("/admin/farms?success=deleted");
}