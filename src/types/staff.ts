export type StaffStatus = "active" | "retired";

export interface StaffProfile {
  id: string;
  name: string;
  ign: string;
  role: string;
  department: string;
  expertise: string[];
  bio: string;
  discordTag: string;
  avatarPath?: string;
  status: StaffStatus;
}
