
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, AdminCredentials } from "@/types";
import { adminCredentials } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";

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
        setUser(parsedUser);
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
        joinDate: new Date()
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
        joinDate: new Date(userData.joinDate) // Convert date string back to Date object
      };
      
      setUser(loggedInUser);
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
      joinDate: new Date()
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
    setUser({ ...user, xp: newXp });
    
    toast({
      title: `+${points} XP`,
      description: "You've earned experience points!",
    });
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
      addXp 
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
