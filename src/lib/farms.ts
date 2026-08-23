import fs from "fs";
import path from "path";
import type { FarmCategory, FarmData, FarmWithMetadata, FarmMaterialItem } from "@/types/farm";

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
    const viewsRaw = extractStringField("views");
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
export function getAllFarms(): FarmWithMetadata[] {
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
    let viewsDisplay = "15.2K";

    if (parsedData.views !== undefined) {
      if (typeof parsedData.views === "number") {
        calculatedViews = parsedData.views;
        viewsDisplay = calculatedViews >= 1000 ? `${(calculatedViews / 1000).toFixed(1)}K` : `${calculatedViews}`;
      } else {
        viewsDisplay = parsedData.views.toString();
        calculatedViews = parseInt(viewsDisplay.replace(/[^0-9]/g, ""), 10) || 15200;
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
      viewsDisplay = `${(calculatedViews / 1000).toFixed(1)}K`;
    }

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
    });
  }

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
export function getFarmByCategoryAndDn(
  category: string,
  dnParam: string
): FarmWithMetadata | undefined {
  const allFarms = getAllFarms();
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

