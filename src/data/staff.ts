import type { StaffProfile } from "@/types/staff";

export const FALLBACK_STAFF_AVATAR = "/pfp/--.png";

export const STAFF_PROFILES: StaffProfile[] = [
  {
    id: "theysix",
    name: "TheySix",
    ign: "TheySix",
    role: "Server Owner & Founder",
    department: "Leadership",
    expertise: ["Farm Design", "Technical Survival", "Content Creation"],
    bio: "Head technical architect, farm designer, content creator, and founder of the TheySix community.",
    discordTag: "@theysix",
    avatarPath: "/logo.gif",
    status: "active",
  },
  {
    id: "Mihaitzuuu",
    name: "mihulish",
    ign: "Mihaitzuuu",
    role: "Lead Developer & Manager",
    department: "Development",
    expertise: ["Backend Plugins", "Website Integrations", "Anti-cheat Rules"],
    bio: "Maintains server backend plugins, database integrity, custom anti-cheat rules, and web integrations.",
    discordTag: "@ro_mihaiu",
    avatarPath: FALLBACK_STAFF_AVATAR,
    status: "active",
  },
  {
    id: "onyxtrace",
    name: "Talha",
    ign: "OnyxTrace",
    role: "Early Tester & Manager",
    department: "Testing",
    expertise: ["Feature Testing", "Balance Feedback", "QA Reports"],
    bio: "Tests new features, provides feedback, and helps manage the testing process.",
    discordTag: "@talhamolla_777",
    avatarPath: FALLBACK_STAFF_AVATAR,
    status: "active",
  },
  {
    id: "itz-sitian",
    name: "Satan",
    ign: "itz_sitian",
    role: "Early Tester & Helper",
    department: "Testing",
    expertise: ["Regression Checks", "Gameplay QA", "Community Support"],
    bio: "Tests new features, provides feedback, and helps manage the testing process.",
    discordTag: "@itz_sitian",
    avatarPath: FALLBACK_STAFF_AVATAR,
    status: "active",
  },
  /*{
    id: "warden-guard",
    name: "WardenGuard",
    ign: "WardenGuard",
    role: "Head Community Moderator",
    department: "Staff Management",
    expertise: ["Conflict Resolution", "Ticket Handling", "Community Safety"],
    bio: "Formerly oversaw community safety, ticket resolution, grief restorations, and player reports.",
    discordTag: "@warden_guard",
    avatarPath: FALLBACK_STAFF_AVATAR,
    status: "retired",
  },
  {
    id: "craft-voxel",
    name: "CraftVoxel",
    ign: "CraftVoxel",
    role: "Lead Builder & Event Director",
    department: "Creative Team",
    expertise: ["Spawn Design", "Event Builds", "Aesthetic Landscaping"],
    bio: "Former lead for spawn hubs, arena battlegrounds, event zones, and server style direction.",
    discordTag: "@craft_voxel",
    avatarPath: FALLBACK_STAFF_AVATAR,
    status: "retired",
  },*/
];

export const ACTIVE_STAFF = STAFF_PROFILES.filter((staff) => staff.status === "active");

export const RETIRED_STAFF = STAFF_PROFILES.filter((staff) => staff.status === "retired");

export function getStaffById(userId: string) {
  return STAFF_PROFILES.find((staff) => staff.id === userId);
}
