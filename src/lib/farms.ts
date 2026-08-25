import fs from "fs";
import path from "path";
import type { FarmCategory, FarmData, FarmWithMetadata, FarmMaterialItem } from "@/types/farm";
import { createClient } from "@/lib/supabase/server";

export const BOTH_PLATFORMS_TAG = "Both Platforms";

function parseBuildArchive(filePath: string, linkLabel: string): Map<string, string> {
  const links = new Map<string, string>();
  if (!fs.existsSync(filePath)) return links;

  const content = fs.readFileSync(filePath, "utf-8");
  const entries = content.split(/(?=📭DN\s*:\s*C\d+)/i);
  for (const entry of entries) {
    const dnMatch = entry.match(/DN\s*:\s*(C\d+)/i);
    if (!dnMatch) continue;

    const linkSection = entry.match(new RegExp(`${linkLabel}[\\s\\S]*?Link\\s*:\\s*(https?:\\/\\/\\S+)`, "i"));
    if (linkSection) links.set(dnMatch[1].toUpperCase(), linkSection[1].trim());
  }
  return links;
}

function getBuildFarms(): FarmWithMetadata[] {
  const root = process.cwd();
  const schematicLinks = parseBuildArchive(path.join(root, "schematics.md"), "Schematic File Download Link");
  const worldLinks = parseBuildArchive(path.join(root, "worlds.md"), "World File Download Link \\( Java \\)");
  const fallbackWorldLinks = parseBuildArchive(path.join(root, "worlds.md"), "World File Download Link");
  const videosPath = path.join(root, "Videos_export", "Videos.txt");
  if (!fs.existsSync(videosPath)) return [];

  const records = fs.readFileSync(videosPath, "utf-8").split(/\n#{20,}\n/);
  const builds: FarmWithMetadata[] = [];
  for (const record of records) {
    const dnMatch = record.match(/Download Number[^:]*:\s*(C\d+)/i);
    if (!dnMatch) continue;
    const dn = dnMatch[1].toUpperCase();
    const title = record.match(/^Title:\s*(.+)$/m)?.[1]?.trim() || `TheySix Minecraft Build ${dn}`;
    const youtubeUrl = record.match(/^Video url:\s*(https?:\/\/\S+)$/m)?.[1]?.trim() || "";
    const thumbnailUrl = record.match(/^Thumbnail url:\s*(https?:\/\/\S+)$/m)?.[1]?.trim() || "";
    const date = record.match(/^Uploaded Time:\s*(.+)$/m)?.[1]?.trim() || "";
    const description = record.match(/^Description:\s*([\s\S]*?)(?=^Tags \(in description\):|^Tags:|$)/m)?.[1]?.trim() || "Minecraft build tutorial by TheySix.";
    const schematicUrl = schematicLinks.get(dn);
    const worldDownloadUrl = worldLinks.get(dn) || fallbackWorldLinks.get(dn) || "link";

    builds.push({
      id: dn,
      dn,
      category: "build",
      title,
      farmType: "Build",
      description,
      worldDownloadUrl,
      schematicUrl,
      youtubeUrl,
      version: "Java & Bedrock",
      tags: ["Build", "Java & Bedrock"],
      thumbnailUrl,
      author: "TheySix",
      date,
      views: 0,
      resolvedThumbnail: getThumbnailUrl(youtubeUrl, thumbnailUrl),
      hasSchematic: Boolean(schematicUrl),
      hasWorldDownload: worldDownloadUrl !== "link",
      hasYoutube: Boolean(youtubeUrl),
      hasMaterials: false,
      normalizedDn: dn.toLowerCase(),
      youtubeId: extractYouTubeId(youtubeUrl),
      viewsDisplay: "Build",
      schematicFiles: { litematic: `${dn}.litematic`, schematic: `${dn}.schematic`, schem: `${dn}.schem`, nbt: `${dn}.nbt` },
      materials: [],
      supportsBothPlatforms: true,
    });
  }
  return builds;
}

export function farmSupportsBothPlatforms(tags?: string[]): boolean {
  if (!tags?.length) return false;
  return tags.some((t) =>
    /both platforms|both editions|java\s*&\s*bedrock|java and bedrock/i.test(t)
  );
}

/**
 * Format a material item with calculated stacks and theme color
 */
export function formatMaterialItem(name: string, count: number, customColor?: string, customIcon?: string): FarmMaterialItem {
  const stacksCount = Math.floor(count / 64);
  const remainder = count % 64;
  let stacks = "";
  if (stacksCount > 0 && remainder > 0) {
    stacks = `${stacksCount} stack${stacksCount > 1 ? "s" : ""} + ${remainder}`;
  } else if (stacksCount > 0) {
    stacks = `${stacksCount} stack${stacksCount > 1 ? "s" : ""}`;
  } else {
    stacks = `${count} items`;
  }

  // Assign block color based on name
  let color = customColor || "#888888";
  const nl = name.toLowerCase();
  if (nl.includes("stone")) color = "#888888";
  else if (nl.includes("deepslate")) color = "#333538";
  else if (nl.includes("hopper")) color = "#3b3c40";
  else if (nl.includes("chest") || nl.includes("barrel")) color = "#9d6834";
  else if (nl.includes("observer")) color = "#42474d";
  else if (nl.includes("piston")) color = "#6c804f";
  else if (nl.includes("redstone")) color = "#e63946";
  else if (nl.includes("repeater") || nl.includes("comparator")) color = "#d90429";
  else if (nl.includes("glass")) color = "#2b3a4a";
  else if (nl.includes("trapdoor") || nl.includes("wood") || nl.includes("plank")) color = "#8b5a2b";
  else if (nl.includes("water") || nl.includes("ice")) color = "#1d6fa5";
  else if (nl.includes("lava") || nl.includes("magma") || nl.includes("campfire")) color = "#e85d04";
  else if (nl.includes("obsidian")) color = "#1e102d";
  else if (nl.includes("slime")) color = "#7bb85c";
  else if (nl.includes("honey")) color = "#ff9f1c";
  else if (nl.includes("gold") || nl.includes("iron")) color = "#d8d8d8";
  else if (nl.includes("quartz") || nl.includes("concrete")) color = "#eaeaea";
  else if (nl.includes("emerald")) color = "#10b981";

  return { name, count, stacks, color, icon: customIcon };
}

/**
 * Format a number to compact estimated format (e.g. 83233 -> '83k', 854784 -> '855k', 1200000 -> '1.2m')
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    const val = num / 1_000_000;
    return (val >= 10 || val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)).replace(/\.0$/, "") + "m";
  }
  if (num >= 1_000) {
    const val = num / 1_000;
    return (val >= 10 || val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

/**
 * Format rates string to replace large numbers with compact estimated values (e.g. "12,000+ Gunpowder/hr" -> "12k+ Gunpowder/hr")
 */
export function formatCompactRates(rates?: string): string {
  if (!rates) return "";
  return rates.replace(/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b|\b\d{4,}(?:\.\d+)?\b/g, (match) => {
    const num = parseFloat(match.replace(/,/g, ""));
    if (isNaN(num)) return match;
    return formatCompactNumber(num);
  });
}

/**
 * Extract YouTube ID from various YouTube URL formats
 */
export function extractYouTubeId(url?: string): string | undefined {
  if (!url) return undefined;

  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : undefined;
}

/**
 * Get YouTube high-res thumbnail URL or fallback
 */
export function getThumbnailUrl(youtubeUrl?: string, customThumbnail?: string): string {
  if (customThumbnail) return customThumbnail;
  const ytId = extractYouTubeId(youtubeUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return "/logo.gif";
}

/**
 * Extract farm data from file content (.tsx, .ts, or .json)
 */
function parseFarmFileContent(content: string, filename: string): FarmData {
  try {
    // If it's pure JSON
    if (filename.endsWith(".json")) {
      return JSON.parse(content);
    }

    // Helper regex to extract fields from TS/TSX object exports
    const extractStringField = (fieldName: string): string => {
      // Matches fieldName: "value" or fieldName: 'value' or fieldName: `value`
      const regex = new RegExp(`${fieldName}\\s*:\\s*["'\`]([\\s\\S]*?)["'\`]`, "i");
      const match = content.match(regex);
      return match ? match[1].trim() : "";
    };

    const extractArrayField = (fieldName: string): string[] => {
      const regex = new RegExp(`${fieldName}\\s*:\\s*\\[([\\s\\S]*?)\\]`, "i");
      const match = content.match(regex);
      if (!match) return [];
      const inner = match[1];
      const items = inner
        .split(",")
        .map((s) => s.replace(/["'`\n\r]/g, "").trim())
        .filter(Boolean);
      return items;
    };

    const title = extractStringField("title") || "Untitled Minecraft Farm";
    const dn = extractStringField("dn") || undefined;
    const farmType = extractStringField("farmType") || "General Farm";
    const description = extractStringField("description") || "No description provided.";
    const detailedDescription = extractStringField("detailedDescription") || "";
    const worldDownloadUrl = extractStringField("worldDownloadUrl") || "#";
    const schematicUrl = extractStringField("schematicUrl") || "#";
    const youtubeUrl = extractStringField("youtubeUrl") || "";
    const version = extractStringField("version") || "1.21+";
    const rates = extractStringField("rates") || "";
    const difficultyRaw = extractStringField("difficulty") as "Easy" | "Medium" | "Hard" | "Expert";
    const difficulty = ["Easy", "Medium", "Hard", "Expert"].includes(difficultyRaw) ? difficultyRaw : undefined;
    const author = extractStringField("author") || "TheySix";
    const date = extractStringField("date") || "";
    const thumbnailUrl = extractStringField("thumbnailUrl") || "";
    const categoryRaw = extractStringField("category") as FarmCategory;
    const tags = extractArrayField("tags");

    const featured = /featured\s*:\s*true/i.test(content);
    const viewsMatch = content.match(/views\s*:\s*["'`]?([^"',`\n\r]+)["'`]?/i);
    const viewsRaw = viewsMatch ? viewsMatch[1].trim() : "";
    let views: number | string | undefined = undefined;
    if (viewsRaw) {
      const parsedNum = parseInt(viewsRaw.replace(/[^0-9]/g, ""), 10);
      views = isNaN(parsedNum) ? viewsRaw : parsedNum;
    }

    // Extract materials if defined in file
    let customMaterials: FarmMaterialItem[] | undefined = undefined;
    const matMatch = content.match(/materials\s*:\s*\[([\s\S]*?)\]/i);
    if (matMatch) {
      const inner = matMatch[1];
      const parsedMatList: FarmMaterialItem[] = [];

      // Try object matches { name: "...", count: 123, icon?: "..." }
      const objRegex = /\{[\s\S]*?name\s*:\s*["'`]?([^"',`]+)["'`]?[\s\S]*?count\s*:\s*(\d+)(?:[\s\S]*?icon\s*:\s*["'`]?([^"',`]+)["'`]?)?[\s\S]*?\}/gi;
      let matchObj;
      while ((matchObj = objRegex.exec(inner)) !== null) {
        const name = matchObj[1].trim();
        const count = parseInt(matchObj[2], 10) || 1;
        const icon = matchObj[3]?.trim();
        parsedMatList.push(formatMaterialItem(name, count, undefined, icon));
      }

      // If string array
      if (parsedMatList.length === 0) {
        const lines = inner.split(",").map((s) => s.replace(/["'`\n\r]/g, "").trim()).filter(Boolean);
        for (const line of lines) {
          const strMatch = line.match(/^(\d+)\s*x?\s*(.+)$/i) || line.match(/^(.+?)\s*[:x]\s*(\d+)$/i);
          if (strMatch) {
            const count = isNaN(parseInt(strMatch[1], 10)) ? parseInt(strMatch[2], 10) : parseInt(strMatch[1], 10);
            const name = isNaN(parseInt(strMatch[1], 10)) ? strMatch[1].trim() : strMatch[2].trim();
            parsedMatList.push(formatMaterialItem(name, count));
          } else if (line.length > 0) {
            parsedMatList.push(formatMaterialItem(line, 1));
          }
        }
      }

      if (parsedMatList.length > 0) {
        customMaterials = parsedMatList;
      }
    }

    return {
      dn,
      title,
      farmType,
      description,
      detailedDescription,
      worldDownloadUrl,
      schematicUrl,
      youtubeUrl,
      version,
      rates,
      difficulty,
      author,
      date,
      thumbnailUrl,
      category: categoryRaw || undefined,
      tags,
      featured,
      views,
      materials: customMaterials,
    };
  } catch (err) {
    console.error(`Error parsing farm file ${filename}:`, err);
    return {
      title: "Error loading farm",
      farmType: "General",
      description: "Could not parse farm file.",
      worldDownloadUrl: "#",
      schematicUrl: "#",
      youtubeUrl: "",
    };
  }
}

/**
 * Recursively find all farm files (*dn.tsx, *dn.ts, *dn.json, *-dn.tsx, etc.)
 */
function getAllFarmFiles(dirPath: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dirPath)) return results;

  const list = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const dirent of list) {
    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(getAllFarmFiles(fullPath));
    } else {
      // Auto-recognize files matching *-dn.tsx, *-dn.ts, *dn.tsx, *dn.ts, *dn.json
      if (
        (dirent.name.endsWith("-dn.tsx") ||
          dirent.name.endsWith("-dn.ts") ||
          dirent.name.endsWith("dn.tsx") ||
          dirent.name.endsWith("dn.ts") ||
          dirent.name.endsWith("-dn.json") ||
          dirent.name.endsWith("dn.json"))
      ) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * Load all farms from the `src/data/farms` directory
 */
export function getLegacyFarms(): FarmWithMetadata[] {
  const farmsDir = path.join(process.cwd(), "src", "data", "farms");
  const filePaths = getAllFarmFiles(farmsDir);

  const farms: FarmWithMetadata[] = [];

  for (const filePath of filePaths) {
    const filename = path.basename(filePath);
    // Remove extensions .tsx, .ts, .json
    const fileSlug = filename.replace(/\.(tsx|ts|json)$/i, "");

    // Auto-detect category from file naming:
    // If starts with 'b' (e.g. b111-dn, b111, b042-dn) -> Bedrock
    // Otherwise -> Java
    const isBedrockByFilename = /^b[0-9a-zA-Z]/i.test(fileSlug);
    const autoCategory: FarmCategory = isBedrockByFilename ? "bedrock" : "java";

    const content = fs.readFileSync(filePath, "utf-8");
    const parsedData = parseFarmFileContent(content, filename);

    const category = parsedData.category || autoCategory;

    // Bedrock Edition does not have schematics at all
    const isJava = category === "java";
    const rawSchematic = parsedData.schematicUrl?.trim();
    const hasSchematic = Boolean(isJava && rawSchematic && rawSchematic !== "#" && rawSchematic.toLowerCase() !== "link" && rawSchematic.length > 0);
    const schematicUrl = isJava && hasSchematic ? rawSchematic : undefined;

    // World download handling & placeholder detection
    let rawWorld = parsedData.worldDownloadUrl?.trim() || "";
    if (rawWorld.includes("sites.google.com/view/theysixdownloads/home/")) {
      rawWorld = "link";
    }
    const hasWorldDownload = Boolean(
      rawWorld &&
      rawWorld !== "#" &&
      rawWorld.toLowerCase() !== "link" &&
      rawWorld.length > 0 &&
      !rawWorld.includes("sites.google.com/view/theysixdownloads/home/")
    );
    const worldDownloadUrl = rawWorld || "link";

    // DN identifier: fileSlug (e.g., "111-dn", "b111-dn")
    const dn = parsedData.dn || fileSlug;

    // Normalized DN (e.g., "111-dn" -> "111", "b111-dn" -> "b111" or "111")
    const normalizedDn = dn.replace(/-dn$/i, "").replace(/^b/i, "");
    const id = parsedData.id || dn;

    // YouTube link & embed detection
    const rawYoutube = parsedData.youtubeUrl?.trim() || "";
    const hasYoutube = Boolean(
      rawYoutube &&
      rawYoutube !== "#" &&
      rawYoutube.toLowerCase() !== "link" &&
      rawYoutube.length > 0
    );
    const youtubeUrl = hasYoutube ? rawYoutube : "";
    const youtubeId = hasYoutube ? extractYouTubeId(youtubeUrl) : undefined;
    const resolvedThumbnail = getThumbnailUrl(youtubeUrl, parsedData.thumbnailUrl);

    // Calculate deterministic view counts if not explicitly defined
    let calculatedViews = 15200;

    if (parsedData.views !== undefined) {
      if (typeof parsedData.views === "number") {
        calculatedViews = parsedData.views;
      } else {
        const parsedNum = parseInt(parsedData.views.toString().replace(/[^0-9]/g, ""), 10);
        calculatedViews = isNaN(parsedNum) ? 15200 : parsedNum;
      }
    } else {
      let hash = 0;
      const seedStr = `${dn}-${parsedData.title}-${category}`;
      for (let i = 0; i < seedStr.length; i++) {
        hash = (hash << 5) - hash + seedStr.charCodeAt(i);
        hash |= 0;
      }
      const positiveHash = Math.abs(hash);
      calculatedViews = (positiveHash % 86400) + 4800;
    }

    const viewsDisplay = formatCompactNumber(calculatedViews);
    const resolvedRates = formatCompactRates(parsedData.rates || "");

    const schematicFiles = {
      litematic: `${dn}.litematic`,
      schematic: `${dn}.schematic`,
      schem: `${dn}.schem`,
      nbt: `${dn}.nbt`,
    };

    const resolvedMaterials = (parsedData.materials as FarmMaterialItem[] | undefined) || [];
    const hasMaterials = resolvedMaterials.length > 0;

    farms.push({
      ...parsedData,
      id,
      dn,
      category,
      rates: resolvedRates,
      worldDownloadUrl,
      hasWorldDownload,
      schematicUrl,
      hasSchematic,
      youtubeUrl,
      hasYoutube,
      hasMaterials,
      normalizedDn,
      youtubeId,
      resolvedThumbnail,
      views: calculatedViews,
      viewsDisplay,
      schematicFiles,
      materials: resolvedMaterials,
      supportsBothPlatforms: farmSupportsBothPlatforms(parsedData.tags),
    });
  }

  farms.push(...getBuildFarms());

  // Sort by featured first, then by date descending (newest first), then by dn descending
  return farms.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    if (dateB !== dateA) return dateB - dateA;
    return b.dn.localeCompare(a.dn, undefined, { numeric: true, sensitivity: "base" });
  });
}

/**
 * Find a farm by category ("java" or "bedrock") and dn slug (e.g. "111-dn", "111", "b111-dn", "b111")
 */
export function getLegacyFarmByCategoryAndDn(
  category: string,
  dnParam: string
): FarmWithMetadata | undefined {
  const allFarms = getLegacyFarms();
  const normalizedCategory = category.toLowerCase().trim();
  const normalizedParam = dnParam.toLowerCase().trim();

  return allFarms.find((farm) => {
    // Check category match
    if (farm.category.toLowerCase() !== normalizedCategory) return false;

    // Check slug matches
    const farmDn = farm.dn.toLowerCase();
    const farmId = farm.id.toLowerCase();
    const farmNorm = farm.normalizedDn.toLowerCase();

    const paramWithoutDn = normalizedParam.replace(/-dn$/i, "");
    const paramWithoutB = paramWithoutDn.replace(/^b/i, "");

    return (
      farmDn === normalizedParam ||
      farmId === normalizedParam ||
      farmNorm === normalizedParam ||
      farmDn === `${normalizedParam}-dn` ||
      farmNorm === paramWithoutB ||
      farmDn === `b${normalizedParam}` ||
      farmDn === `b${normalizedParam}-dn`
    );
  });
}

type FarmRow = {
  id: string;
  dn: string;
  title: string;
  category: FarmCategory;
  farm_type: string;
  description: string;
  detailed_description: string | null;
  world_download_url: string;
  schematic_url: string | null;
  youtube_url: string;
  version: string | null;
  rates: string | null;
  difficulty: FarmData["difficulty"] | null;
  tags: string[];
  thumbnail_url: string | null;
  author: string | null;
  date: string | null;
  featured: boolean;
  views: number;
  materials: FarmMaterialItem[];
  schematic_path: string | null;
};

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

function normalizeDate(date?: string | null) {
  return date || undefined;
}

function rowToFarm(row: FarmRow, schematicUrl?: string): FarmWithMetadata {
  const rawWorld = row.world_download_url?.trim() || "link";
  const worldDownloadUrl = rawWorld.includes("sites.google.com/view/theysixdownloads/home/") ? "link" : rawWorld;
  const youtubeUrl = row.youtube_url?.trim() || "";
  const actualSchematicUrl = schematicUrl || row.schematic_url || undefined;
  const hasSchematic = Boolean(actualSchematicUrl && actualSchematicUrl !== "#" && actualSchematicUrl.toLowerCase() !== "link");
  const calculatedViews = Number(row.views) || 0;
  const materials = Array.isArray(row.materials) ? row.materials : [];
  const normalizedDn = row.dn.replace(/-dn$/i, "").replace(/^b/i, "");

  return {
    id: row.id,
    dn: row.dn,
    title: row.title,
    category: row.category,
    farmType: row.farm_type,
    description: row.description,
    detailedDescription: row.detailed_description || undefined,
    worldDownloadUrl,
    schematicUrl: hasSchematic ? actualSchematicUrl : undefined,
    youtubeUrl,
    version: row.version || undefined,
    rates: formatCompactRates(row.rates || ""),
    difficulty: row.difficulty || undefined,
    tags: row.tags || [],
    thumbnailUrl: row.thumbnail_url || undefined,
    author: row.author || undefined,
    date: normalizeDate(row.date),
    featured: row.featured,
    views: calculatedViews,
    materials,
    resolvedThumbnail: getThumbnailUrl(youtubeUrl, row.thumbnail_url || undefined),
    hasSchematic,
    hasWorldDownload: Boolean(worldDownloadUrl && worldDownloadUrl !== "#" && worldDownloadUrl.toLowerCase() !== "link"),
    hasYoutube: Boolean(youtubeUrl && youtubeUrl !== "#" && youtubeUrl.toLowerCase() !== "link"),
    hasMaterials: materials.length > 0,
    normalizedDn,
    youtubeId: extractYouTubeId(youtubeUrl),
    viewsDisplay: formatCompactNumber(calculatedViews),
    schematicFiles: {
      litematic: `${row.dn}.litematic`,
      schematic: `${row.dn}.schematic`,
      schem: `${row.dn}.schem`,
      nbt: `${row.dn}.nbt`,
    },
    supportsBothPlatforms: farmSupportsBothPlatforms(row.tags),
  };
}

export async function getAllFarms(): Promise<FarmWithMetadata[]> {
  if (!isSupabaseConfigured()) return getLegacyFarms();

  const supabase = await createClient();
  const { data, error } = await supabase.from("farms").select("*").order("featured", { ascending: false }).order("date", { ascending: false, nullsFirst: false }).order("dn", { ascending: false });
  if (error) throw new Error(`Unable to load farms: ${error.message}`);

  return (data as FarmRow[]).map((row) => {
    const storageUrl = row.schematic_path
      ? supabase.storage.from("schematics").getPublicUrl(row.schematic_path).data.publicUrl
      : undefined;
    return rowToFarm(row, storageUrl);
  });
}

export async function getFarmByCategoryAndDn(category: string, dnParam: string): Promise<FarmWithMetadata | undefined> {
  const allFarms = await getAllFarms();
  const normalizedCategory = category.toLowerCase().trim();
  const normalizedParam = dnParam.toLowerCase().trim();

  return allFarms.find((farm) => {
    if (farm.category.toLowerCase() !== normalizedCategory) return false;
    const farmDn = farm.dn.toLowerCase();
    const farmId = farm.id.toLowerCase();
    const farmNorm = farm.normalizedDn.toLowerCase();
    const paramWithoutDn = normalizedParam.replace(/-dn$/i, "");
    const paramWithoutB = paramWithoutDn.replace(/^b/i, "");
    return farmDn === normalizedParam || farmId === normalizedParam || farmNorm === normalizedParam || farmDn === `${normalizedParam}-dn` || farmNorm === paramWithoutB || farmDn === `b${normalizedParam}` || farmDn === `b${normalizedParam}-dn`;
  });
}

export { rowToFarm };

