import type { User } from "@supabase/supabase-js";

const managerIds = () => [
  process.env.DISCORD_MANAGER_USER_ID,
  process.env.DISCORD_THEYSIX_USER_ID,
].filter((id): id is string => Boolean(id));

export function getDiscordUserId(user: User | null) {
  const identity = user?.identities?.find((candidate) => candidate.provider === "discord");
  return user?.app_metadata?.discord_user_id || user?.app_metadata?.provider_id || user?.user_metadata?.provider_id || user?.user_metadata?.sub || identity?.identity_data?.provider_id || identity?.identity_data?.sub || null;
}

export function canManageFarms(user: User | null) {
  const discordUserId = getDiscordUserId(user);
  return Boolean(discordUserId && managerIds().includes(discordUserId));
}

export function hasFarmAdminMetadata(user: User | null) {
  return user?.app_metadata?.farm_admin === true;
}