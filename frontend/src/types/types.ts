// Types
type ClubMember = {
  id: string;
  name: string;
  role: "leader" | "deputy" | "member";
  joinDate: string;
  activityScore: number;
  achievements: string[];
};

type ClubEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  participants: number;
  imageUrl?: string;
};

type ClubAchievement = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: "competition" | "project" | "social" | "other";
  imageUrl?: string;
};

type ClubActivity = {
  id: string;
  date: string;
  type: "event" | "meeting" | "achievement" | "other";
  description: string;
};

type ClubStats = {
  totalMembers: number;
  activeMembers: number;
  eventsHeld: number;
  achievementsCount: number;
  foundedDate: string;
};

type ClubDetail = {
  id: number;
  name: string;
  description: string;
  telegram: string;
  logo?: string;
  coverImage?: string;
  leader: ClubMember;
  deputies: ClubMember[];
  members: ClubMember[];
  events: ClubEvent[];
  achievements: ClubAchievement[];
  recentActivities: ClubActivity[];
  stats: ClubStats;
  mission: string;
  vision: string;
  goals: string[];
};
export {
  ClubMember,
  ClubEvent,
  ClubAchievement,
  ClubActivity,
  ClubStats,
  ClubDetail,
};
