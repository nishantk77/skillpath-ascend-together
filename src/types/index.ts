
export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "learner" | "curator";
  xp: number;
  interests: string[];
  weeklyTime: number;
  goals: string[];
  badges: Badge[];
  joinDate: Date;
  lastLoginDate?: Date;
  currentStreak?: number;
  longestStreak?: number;
  completedModules?: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  dateEarned: Date;
  type: BadgeType;
  tier?: BadgeTier;
};

export type BadgeType = "streak" | "completion" | "mastery" | "special";

export type BadgeTier = "bronze" | "silver" | "gold";

export type Skill = {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  imageUrl: string;
  modules: Module[];
  estimatedWeeks: number;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  week: number;
  status: "not-started" | "in-progress" | "completed";
  resources: Resource[];
  estimatedHours: number;
  xpReward: number;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: "video" | "article" | "quiz" | "exercise";
  url: string;
  estimatedMinutes: number;
  creator: string;
  createdAt: Date;
  curatorId?: string;
};

export type Discussion = {
  id: string;
  skillId: string;
  moduleId: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  createdAt: Date;
  replies: DiscussionReply[];
};

export type DiscussionReply = {
  id: string;
  discussionId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
};

export type AdminCredentials = {
  username: string;
  password: string;
};

// Quiz specific types
export type Quiz = {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  questions: QuizQuestion[];
  createdAt: Date;
  curatorId: string;
  estimatedMinutes: number;
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
};

export type QuizOption = {
  id: string;
  text: string;
};
