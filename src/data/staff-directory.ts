export interface PublicStaffProfile {
  userId: string;
  name: string;
  headline: string;
  bestAt: string[];
  bio: string;
  discordTag: string;
  status: "active" | "retired";
}

export const PUBLIC_STAFF_FALLBACK_AVATAR = "/pfp/--.png";

export function getPublicStaffAvatarPath(userId: string) {
  return `/pfp/${userId}.png`;
}

export const PUBLIC_STAFF_PROFILES: PublicStaffProfile[] = [
  {
    userId: "483592560842113025",
    name: "TheySix",
    headline: "Server Owner",
    bestAt: ["Creating Farms", "Server Management", "Community Engagement"],
    bio: "Head technical architect, farm designer, content creator, and founder of the TheySix community.",
    discordTag: "@theysix",
    status: "active",
  },
  {
    userId: "1027052856697684099",
    name: "mihulish",
    headline: "Manager",
    bestAt: ["Conflict Resolution", "Technical Support", "Event Coordination"],
    bio: "Fixes issues, resolves conflicts, and manages community events to ensure a smooth experience.",
    discordTag: "@ro_mihaiu",
    status: "active",
  },
  {
    userId: "1174717898049212426",
    name: "Talha",
    headline: "Manager",
    bestAt: ["Conflict Handling", "Rule Clarification", "Incident Reports"],
    bio: "Helps manage the community, resolve conflicts, and clarify server rules.",
    discordTag: "@talhamolla_777",
    status: "active",
  },
  {
    userId: "1379526531415806135",
    name: "Catrooper",
    headline: "Manager",
    bestAt: ["Community Events", "Event Coordination", "Player Engagement"],
    bio: "Manages partnerships, and engages with players to enhance their experience.",
    discordTag: "@catrooper",
    status: "active",
  },
  {
    userId: "941372925754359848",
    name: "notMik",
    headline: "Manager",
    bestAt: ["Community Support", "Conflict Resolution", "Rule Enforcement"],
    bio: "Resolves conflicts, and enforces server rules to maintain a positive environment.",
    discordTag: "@.notmik",
    status: "active",
  },
  {
    userId: "738037578673946644",
    name: "Amethyst",
    headline: "Admin",
    bestAt: ["Ticket Handling", "Rule Enforcement", "Community Engagement"],
    bio: "Manages server operations, handles tickets, and engages with the community.",
    discordTag: "@honeysucking",
    status: "active",
  },
  {
    userId: "208189775474065409",
    name: "Mister Fish",
    headline: "Admin",
    bestAt: ["Server Maintenance", "Bot Management", "Community Engagement"],
    bio: "Maintains server operations, provides technical support, and engages with the community.",
    discordTag: "@fish5438",
    status: "active",
  },
  {
    userId: "1092526308531114095",
    name: "kiaxiko",
    headline: "Admin",
    bestAt: ["Support", "Rule Enforcement", "Rule Clarification"],
    bio: "Provides support, enforces server rules, and clarifies rule-related questions for the community.",
    discordTag: "@kiaxiko",
    status: "active",
  },
  {
    userId: "1033408653685960744",
    name: "Savitar",
    headline: "Head Moderator",
    bestAt: ["Support", "Ticket Handling", "Community Safety"],
    bio: "Manages the moderation team, resolves conflicts, and ensures the safety of the community.",
    discordTag: "@savitar02245",
    status: "active",
  },
  {
    userId: "210670132345700353",
    name: "Alex",
    headline: "Moderator",
    bestAt: ["Conflict Resolution", "Ticket Handling", "Community Safety"],
    bio: "Resolves conflicts, handles tickets, and ensures the safety of the community.",
    discordTag: "@alexmartz.",
    status: "active",
  },
  {
    userId: "885967601505820752",
    name: "Omar Mokhtar",
    headline: "Moderator",
    bestAt: ["Ticket Handling", "Community Support", "Player Engagement"],
    bio: "Handles tickets, provides support, and engages with players to enhance their experience.",
    discordTag: "@omarmokhtar.",
    status: "active",
  },
  {
    userId: "893168132531818517",
    name: "killermachine_13",
    headline: "Moderator",
    bestAt: ["Conflict Resolution", "Rule Clarification", "Community Support"],
    bio: "Resolves conflicts, clarifies rules, and provides support to the community.",
    discordTag: "@killermachine_13",
    status: "active",
  },
  {
    userId: "683356159134138372",
    name: "xqc",
    headline: "Moderator",
    bestAt: ["Rule Enforcement", "Community Support", "Player Engagement"],
    bio: "Enforces server rules, provides support, and engages with players to enhance their experience.",
    discordTag: "@xqc.",
    status: "active",
  },
  {
    userId: "971206603023999088",
    name: "Chefjr73",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@chefjr73",
    status: "active",
  },
  {
    userId: "1095772392103624796",
    name: "Xero",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@xerodegreess",
    status: "active",
  },
  {
    userId: "1088035064757108787",
    name: "Squidy_787",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@squidy_322",
    status: "active",
  },
  {
    userId: "1121166404113150022",
    name: "itz_sitian",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@itz_sitian",
    status: "active",
  },
  {
    userId: "928704170389807165",
    name: "tanxim__",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@tanxim__",
    status: "active",
  },
  {
    userId: "893718609375944725",
    name: "chaoscrusher_.",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@chaoscrusher_.",
    status: "active",
  },
  {
    userId: "980057313278840853",
    name: "Hindustani_Gamer_Fardin",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@hindustani_gamer_fardin",
    status: "active",
  },
  {
    userId: "1031270899430731907",
    name: "͘.michal_w",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@.michal_w",
    status: "active",
  },
  {
    userId: "1276220517191520340",
    name: "harsh",
    headline: "Helper",
    bestAt: ["Community Support", "Player Engagement"],
    bio: "Provides support to the community and engages with players to enhance their experience.",
    discordTag: "@harshxd073",
    status: "active",
  },
];

export const ACTIVE_PUBLIC_STAFF = PUBLIC_STAFF_PROFILES.filter((staff) => staff.status === "active");

export const RETIRED_PUBLIC_STAFF = PUBLIC_STAFF_PROFILES.filter((staff) => staff.status === "retired");

export function getPublicStaffByUserId(userId: string) {
  return PUBLIC_STAFF_PROFILES.find((staff) => staff.userId === userId);
}
