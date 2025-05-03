
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, AdminCredentials, Badge, BadgeType, BadgeTier } from "@/types";
import { adminCredentials } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Award } from "lucide-react";

type UserContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  userLogin: (email: string, password: string) => Promise<boolean>;
  userSignup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addXp: (points: number) => void;
  awardBadge: (badge: Badge) => void;
  updateStreak: () => void;
  checkAndAwardBadges: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("skillpath_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Initialize streak-related properties if they don't exist
        if (!parsedUser.currentStreak) parsedUser.currentStreak = 0;
        if (!parsedUser.longestStreak) parsedUser.longestStreak = 0;
        if (!parsedUser.lastLoginDate) parsedUser.lastLoginDate = new Date();
        if (!parsedUser.completedModules) parsedUser.completedModules = 0;
        
        setUser(parsedUser);
        
        // Check if this is a new day login to update streak
        const lastLogin = new Date(parsedUser.lastLoginDate);
        const today = new Date();
        if (lastLogin.toDateString() !== today.toDateString()) {
          setTimeout(() => {
            updateStreak();
          }, 1000);
        }
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("skillpath_user");
      }
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("skillpath_user", JSON.stringify(user));
    }
  }, [user]);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
      const adminUser: User = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@skillpath.com",
        role: "admin",
        xp: 0,
        interests: [],
        weeklyTime: 0,
        goals: [],
        badges: [],
        joinDate: new Date(),
        lastLoginDate: new Date(),
        currentStreak: 0,
        longestStreak: 0,
        completedModules: 0
      };
      setUser(adminUser);
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin dashboard",
      });
      return true;
    }
    
    toast({
      title: "Admin login failed",
      description: "Invalid admin credentials",
      variant: "destructive",
    });
    return false;
  };

  // Add user login function
  const userLogin = async (email: string, password: string): Promise<boolean> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user exists in localStorage
    const usersData = localStorage.getItem("skillpath_users");
    const users = usersData ? JSON.parse(usersData) : [];
    
    const matchedUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (matchedUser) {
      // Create user object without password
      const { password, ...userData } = matchedUser;
      const loggedInUser: User = {
        ...userData,
        joinDate: new Date(userData.joinDate), // Convert date string back to Date object
        lastLoginDate: new Date(), // Update last login date
        currentStreak: userData.currentStreak || 0,
        longestStreak: userData.longestStreak || 0,
        completedModules: userData.completedModules || 0
      };
      
      setUser(loggedInUser);
      
      // Update the user in localStorage to save streak info
      const updatedUsers = users.map((u: any) => {
        if (u.email === email) {
          return { ...u, lastLoginDate: new Date(), currentStreak: loggedInUser.currentStreak, longestStreak: loggedInUser.longestStreak };
        }
        return u;
      });
      localStorage.setItem("skillpath_users", JSON.stringify(updatedUsers));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to SkillPath!",
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  // Add user signup function
  const userSignup = async (email: string, password: string): Promise<boolean> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    const usersData = localStorage.getItem("skillpath_users");
    const users = usersData ? JSON.parse(usersData) : [];
    
    if (users.some((user: any) => user.email === email)) {
      toast({
        title: "Signup failed",
        description: "Email already in use",
        variant: "destructive",
      });
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0], // Default name from email
      email,
      password, // In a real app, this would be hashed
      role: "user",
      xp: 0,
      interests: [],
      weeklyTime: 0,
      goals: [],
      badges: [],
      joinDate: new Date(),
      lastLoginDate: new Date(),
      currentStreak: 1, // First day streak
      longestStreak: 1,
      completedModules: 0
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("skillpath_users", JSON.stringify(users));
    
    // Log the user in (without password in the user state)
    const { password: pwd, ...userData } = newUser;
    setUser(userData as User);
    
    toast({
      title: "Account created",
      description: "Welcome to SkillPath!",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skillpath_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // No need for navigate here as we'll handle it in the Header component
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    
    toast({
      title: "Profile updated",
      description: "Your changes have been saved",
    });
  };

  const addXp = (points: number) => {
    if (!user) return;
    
    const newXp = user.xp + points;
    const updatedUser = { ...user, xp: newXp };
    setUser(updatedUser);
    
    toast({
      title: `+${points} XP`,
      description: "You've earned experience points!",
    });
    
    // Check if user should receive XP-based badges
    checkXpBadges(newXp);
  };

  const checkXpBadges = (xp: number) => {
    if (!user) return;
    
    // Define XP milestones for badges
    const xpMilestones = [
      { xp: 100, tier: "bronze" as BadgeTier },
      { xp: 500, tier: "silver" as BadgeTier },
      { xp: 1000, tier: "gold" as BadgeTier },
    ];
    
    // Check if user has reached any milestones
    for (const { xp: milestone, tier } of xpMilestones) {
      if (xp >= milestone) {
        // Check if user already has this badge
        const hasBadge = user.badges.some(
          badge => badge.name === `XP Master ${tier}` && badge.type === "mastery"
        );
        
        if (!hasBadge) {
          // Award new badge
          const newBadge: Badge = {
            id: `xp-${tier}-${Date.now()}`,
            name: `XP Master ${tier}`,
            description: `Earned ${milestone} XP on your learning journey`,
            iconUrl: "", // Empty for now
            dateEarned: new Date(),
            type: "mastery",
            tier
          };
          
          awardBadge(newBadge);
        }
      }
    }
  };

  const awardBadge = (badge: Badge) => {
    if (!user) return;
    
    const updatedBadges = [...user.badges, badge];
    setUser({ ...user, badges: updatedBadges });
    
    toast({
      title: "🏆 New Badge Earned!",
      description: `You've earned the "${badge.name}" badge`,
    });
  };

  const updateStreak = () => {
    if (!user) return;
    
    // Get the last login date
    const lastLoginDate = user.lastLoginDate ? new Date(user.lastLoginDate) : new Date();
    const today = new Date();
    
    // Set today as last login date
    const updatedUser = { ...user, lastLoginDate: today };
    
    // Check if this is a new day login
    if (lastLoginDate.toDateString() !== today.toDateString()) {
      // Check if the last login was yesterday (to maintain streak)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastLoginDate.toDateString() === yesterday.toDateString()) {
        // Increment streak
        const newStreak = (user.currentStreak || 0) + 1;
        const longestStreak = Math.max(newStreak, user.longestStreak || 0);
        
        updatedUser.currentStreak = newStreak;
        updatedUser.longestStreak = longestStreak;
        
        // Check for streak badges
        checkStreakBadges(newStreak);
        
        toast({
          title: `🔥 ${newStreak} Day Streak!`,
          description: "Keep up the momentum!",
        });
      } else if (lastLoginDate < yesterday) {
        // Streak broken - reset to 1 for today's login
        updatedUser.currentStreak = 1;
        
        toast({
          title: "New Streak Started",
          description: "Login daily to build your streak",
        });
      }
    }
    
    setUser(updatedUser);
  };

  const checkStreakBadges = (streak: number) => {
    if (!user) return;
    
    // Define streak milestones for badges
    const streakMilestones = [
      { days: 3, tier: "bronze" as BadgeTier },
      { days: 7, tier: "silver" as BadgeTier },
      { days: 30, tier: "gold" as BadgeTier },
    ];
    
    // Check if user has reached any streak milestones
    for (const { days, tier } of streakMilestones) {
      if (streak >= days) {
        // Check if user already has this badge
        const hasBadge = user.badges.some(
          badge => badge.name === `${days} Day Streak ${tier}` && badge.type === "streak"
        );
        
        if (!hasBadge) {
          // Award new badge
          const newBadge: Badge = {
            id: `streak-${days}-${Date.now()}`,
            name: `${days} Day Streak ${tier}`,
            description: `Logged in for ${days} consecutive days`,
            iconUrl: "", // Empty for now
            dateEarned: new Date(),
            type: "streak",
            tier
          };
          
          awardBadge(newBadge);
        }
      }
    }
  };

  // Check for completion badges
  const checkCompletionBadges = (completedModules: number) => {
    if (!user) return;
    
    // Define completion milestones for badges
    const completionMilestones = [
      { modules: 5, tier: "bronze" as BadgeTier },
      { modules: 15, tier: "silver" as BadgeTier },
      { modules: 30, tier: "gold" as BadgeTier },
    ];
    
    // Check if user has reached any completion milestones
    for (const { modules, tier } of completionMilestones) {
      if (completedModules >= modules) {
        // Check if user already has this badge
        const hasBadge = user.badges.some(
          badge => badge.name === `Module Master ${tier}` && badge.type === "completion"
        );
        
        if (!hasBadge) {
          // Award new badge
          const newBadge: Badge = {
            id: `completion-${modules}-${Date.now()}`,
            name: `Module Master ${tier}`,
            description: `Completed ${modules} learning modules`,
            iconUrl: "", // Empty for now
            dateEarned: new Date(),
            type: "completion",
            tier
          };
          
          awardBadge(newBadge);
        }
      }
    }
  };

  // Check for all badges at once
  const checkAndAwardBadges = () => {
    if (!user) return;
    
    // Check different badge types
    checkXpBadges(user.xp);
    checkStreakBadges(user.currentStreak || 0);
    checkCompletionBadges(user.completedModules || 0);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      adminLogin,
      userLogin,
      userSignup,
      logout, 
      updateUser,
      addXp,
      awardBadge,
      updateStreak,
      checkAndAwardBadges
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
