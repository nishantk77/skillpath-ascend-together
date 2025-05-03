
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Discussion, DiscussionReply } from "@/types";
import { discussions as initialDiscussions } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/components/ui/use-toast";

type DiscussionContextType = {
  discussions: Discussion[];
  getDiscussionsForSkill: (skillId: string) => Discussion[];
  getDiscussionsForModule: (moduleId: string) => Discussion[];
  addDiscussion: (skillId: string, moduleId: string, title: string, content: string) => void;
  addReply: (discussionId: string, content: string) => void;
};

const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined);

export function DiscussionProvider({ children }: { children: ReactNode }) {
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const { user } = useUser();

  // Save discussions to localStorage when they change
  useEffect(() => {
    if (discussions !== initialDiscussions) {
      localStorage.setItem("skillpath_discussions", JSON.stringify(discussions));
    }
  }, [discussions]);

  // Load discussions from localStorage on initial load
  useEffect(() => {
    const storedDiscussions = localStorage.getItem("skillpath_discussions");
    if (storedDiscussions) {
      try {
        const parsedDiscussions = JSON.parse(storedDiscussions);
        setDiscussions(parsedDiscussions);
      } catch (err) {
        console.error("Failed to parse stored discussions:", err);
        localStorage.removeItem("skillpath_discussions");
      }
    }
  }, []);

  const getDiscussionsForSkill = (skillId: string) => {
    return discussions.filter(d => d.skillId === skillId);
  };

  const getDiscussionsForModule = (moduleId: string) => {
    return discussions.filter(d => d.moduleId === moduleId);
  };

  const addDiscussion = (skillId: string, moduleId: string, title: string, content: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to start a discussion",
        variant: "destructive",
      });
      return;
    }

    const newDiscussion: Discussion = {
      id: `disc-${Date.now()}`,
      skillId,
      moduleId,
      userId: user.id,
      userName: user.name,
      title,
      content,
      createdAt: new Date(),
      replies: []
    };

    setDiscussions(prev => [...prev, newDiscussion]);
    
    toast({
      title: "Discussion created",
      description: "Your question has been posted",
    });
  };

  const addReply = (discussionId: string, content: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to reply to discussions",
        variant: "destructive",
      });
      return;
    }

    const newReply: DiscussionReply = {
      id: `reply-${Date.now()}`,
      discussionId,
      userId: user.id,
      userName: user.name,
      content,
      createdAt: new Date()
    };

    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId
        ? { ...discussion, replies: [...discussion.replies, newReply] }
        : discussion
    ));
    
    toast({
      title: "Reply posted",
      description: "Your response has been added to the discussion",
    });
  };

  return (
    <DiscussionContext.Provider value={{
      discussions,
      getDiscussionsForSkill,
      getDiscussionsForModule,
      addDiscussion,
      addReply
    }}>
      {children}
    </DiscussionContext.Provider>
  );
}

export function useDiscussion() {
  const context = useContext(DiscussionContext);
  if (context === undefined) {
    throw new Error("useDiscussion must be used within a DiscussionProvider");
  }
  return context;
}
