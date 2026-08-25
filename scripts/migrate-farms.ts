import { loadEnvConfig } from "@next/env";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { getLegacyFarms } from "../src/lib/farms";

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");

const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
const farms = getLegacyFarms();
const rows = farms.map((farm) => ({
  id: farm.id,
  dn: farm.dn,
  title: farm.title,
  category: farm.category,
  farm_type: farm.farmType,
  description: farm.description,
  detailed_description: farm.detailedDescription || null,
  world_download_url: farm.worldDownloadUrl || "link",
  schematic_url: farm.schematicUrl || null,
  youtube_url: farm.youtubeUrl || "",
  version: farm.version || null,
  rates: farm.rates || null,
  difficulty: farm.difficulty || null,
  tags: farm.tags || [],
  thumbnail_url: farm.thumbnailUrl || null,
  author: farm.author || null,
  date: farm.date && /^\d{4}-\d{2}-\d{2}$/.test(farm.date) ? farm.date : null,
  featured: Boolean(farm.featured),
  views: farm.views || 0,
  materials: farm.materials || [],
}));

function countLegacyFiles(dir: string): number {
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((count, entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return count + countLegacyFiles(entryPath);
    return count + (/(?:-dn|dn)\.(?:tsx|ts|json)$/i.test(entry.name) ? 1 : 0);
  }, 0);
}

async function main() {
  const { error } = await supabase.from("farms").upsert(rows, { onConflict: "dn" });
  if (error) throw error;
  const fileCount = countLegacyFiles(path.join(process.cwd(), "src", "data", "farms"));
  const { count, error: countError } = await supabase.from("farms").select("dn", { count: "exact", head: true }).neq("category", "build");
  if (countError) throw countError;
  console.log(`Upserted ${rows.length} records (${fileCount} legacy farm files and ${rows.length - fileCount} generated builds).`);
  console.log(`Verification: ${count} non-build Supabase rows, ${fileCount} legacy farm files.`);
  if (count !== fileCount) process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});