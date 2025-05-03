
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Skill, Module, Badge } from "@/types";
import { skills as initialSkills } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/components/ui/use-toast";

type SkillContextType = {
  skills: Skill[];
  selectedSkill: Skill | null;
  selectSkill: (skillId: string) => void;
  updateModuleStatus: (skillId: string, moduleId: string, status: Module["status"]) => void;
  getRecommendedSkills: () => Skill[];
  getInProgressSkills: () => Skill[];
};

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export function SkillProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { user, addXp, awardBadge } = useUser();
  
  // Save skills to localStorage when they change
  useEffect(() => {
    if (skills !== initialSkills) {
      localStorage.setItem("skillpath_skills", JSON.stringify(skills));
    }
  }, [skills]);

  // Load skills from localStorage on initial load
  useEffect(() => {
    const storedSkills = localStorage.getItem("skillpath_skills");
    if (storedSkills) {
      try {
        const parsedSkills = JSON.parse(storedSkills);
        setSkills(parsedSkills);
      } catch (err) {
        console.error("Failed to parse stored skills:", err);
        localStorage.removeItem("skillpath_skills");
      }
    }
  }, []);

  const selectSkill = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId) || null;
    setSelectedSkill(skill);
  };

  const updateModuleStatus = (skillId: string, moduleId: string, status: Module["status"]) => {
    setSkills(prevSkills => {
      const newSkills = [...prevSkills];
      const skillIndex = newSkills.findIndex(s => s.id === skillId);
      
      if (skillIndex !== -1) {
        const moduleIndex = newSkills[skillIndex].modules.findIndex(m => m.id === moduleId);
        
        if (moduleIndex !== -1) {
          // Create a new module with the updated status
          const updatedModule = {
            ...newSkills[skillIndex].modules[moduleIndex],
            status
          };
          
          // Create a new modules array with the updated module
          const updatedModules = [...newSkills[skillIndex].modules];
          updatedModules[moduleIndex] = updatedModule;
          
          // Create a new skill with the updated modules
          const updatedSkill = {
            ...newSkills[skillIndex],
            modules: updatedModules
          };
          
          // Create a new skills array with the updated skill
          newSkills[skillIndex] = updatedSkill;
          
          // If the new status is "completed", award XP and check for badges
          if (status === "completed") {
            const xpReward = updatedModule.xpReward;
            addXp(xpReward);
            
            // Update completed modules count and check for skill mastery
            if (user) {
              const completedModules = (user.completedModules || 0) + 1;
              
              // Update the user in localStorage to track completed modules
              const usersData = localStorage.getItem("skillpath_users");
              if (usersData) {
                const users = JSON.parse(usersData);
                const updatedUsers = users.map((u: any) => {
                  if (u.email === user.email) {
                    return { ...u, completedModules };
                  }
                  return u;
                });
                localStorage.setItem("skillpath_users", JSON.stringify(updatedUsers));
              }
              
              // Check for skill mastery - if all modules in a skill are completed
              const allModulesInSkillCompleted = updatedModules.every(m => m.status === "completed");
              if (allModulesInSkillCompleted) {
                // Award skill mastery badge
                const masteryBadge: Badge = {
                  id: `skill-mastery-${skillId}-${Date.now()}`,
                  name: `${updatedSkill.name} Master`,
                  description: `Completed all modules in ${updatedSkill.name}`,
                  iconUrl: "", // Empty for now
                  dateEarned: new Date(),
                  type: "mastery",
                  tier: "gold"
                };
                
                awardBadge(masteryBadge);
              }
            }
            
            toast({
              title: "Module completed!",
              description: `You've earned ${xpReward} XP`,
            });
          }
          
          // If the selected skill is the one being updated, also update it
          if (selectedSkill?.id === skillId) {
            setSelectedSkill(updatedSkill);
          }
        }
      }
      
      return newSkills;
    });
  };

  const getRecommendedSkills = () => {
    if (!user) return skills;
    
    // In a real app, this would use a more sophisticated algorithm based on user preferences
    return skills.filter(skill => user.interests.includes(skill.name));
  };

  const getInProgressSkills = () => {
    return skills.filter(skill => 
      skill.modules.some(module => module.status === "in-progress" || module.status === "completed")
    );
  };

  return (
    <SkillContext.Provider value={{ 
      skills, 
      selectedSkill, 
      selectSkill, 
      updateModuleStatus,
      getRecommendedSkills,
      getInProgressSkills
    }}>
      {children}
    </SkillContext.Provider>
  );
}

export function useSkill() {
  const context = useContext(SkillContext);
  if (context === undefined) {
    throw new Error("useSkill must be used within a SkillProvider");
  }
  return context;
}
