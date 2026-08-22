export type FarmCategory = "java" | "bedrock";

export const FARM_TYPES = [
  "Shulker",
  "Raid",
  "Iron",
  "Mob",
  "Bonemeal",
  "Wood",
  "XP",
  "Cobblestone & Stone",
  "Kelp",
  "Other",
] as const;

export type FarmType = (typeof FARM_TYPES)[number] | string;

export interface FarmMaterialItem {
  name: string;
  count: number;
  stacks?: string;
  color?: string;
}

export type FarmMaterialInput = FarmMaterialItem | string;

export interface FarmData {
  id?: string;
  dn?: string;
  title: string;
  category?: FarmCategory;
  farmType: string;
  description: string;
  detailedDescription?: string;
  worldDownloadUrl: string;
  schematicUrl?: string;
  youtubeUrl: string;
  version?: string;
  rates?: string;
  difficulty?: "Easy" | "Medium" | "Hard" | "Expert";
  tags?: string[];
  thumbnailUrl?: string;
  author?: string;
  date?: string;
  featured?: boolean;
  views?: number | string;
  materials?: FarmMaterialInput[];
}

export interface SchematicFileFormats {
  litematic: string;
  schematic: string;
  schem: string;
  nbt: string;
}

export interface FarmWithMetadata extends FarmData {
  id: string;
  dn: string;
  category: FarmCategory;
  normalizedDn: string; // e.g. "111" for both "111-dn" and "111"
  youtubeId?: string;
  resolvedThumbnail: string;
  hasSchematic: boolean;
  views: number;
  viewsDisplay: string;
  schematicFiles: SchematicFileFormats;
  materials: FarmMaterialItem[];
}
