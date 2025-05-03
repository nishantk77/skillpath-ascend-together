
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useSkill } from "@/contexts/SkillContext";
import { useDiscussion } from "@/contexts/DiscussionContext";
import ModuleCard from "@/components/roadmap/ModuleCard";
import DiscussionThread from "@/components/discussions/DiscussionThread";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";

export default function SkillDetailPage() {
  const { skillId } = useParams<{ skillId: string }>();
  const { selectSkill, selectedSkill, skills } = useSkill();
  const { getDiscussionsForSkill } = useDiscussion();
  const navigate = useNavigate();
  
  // Load skill data
  useEffect(() => {
    if (skillId) {
      const skill = skills.find(s => s.id === skillId);
      if (skill) {
        selectSkill(skillId);
      } else {
        // Skill not found, redirect
        navigate("/explore");
      }
    }
  }, [skillId, skills, selectSkill, navigate]);
  
  // Get discussions for this skill
  const discussions = skillId ? getDiscussionsForSkill(skillId) : [];
  
  if (!selectedSkill) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p>Loading skill data...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Skill Header */}
        <div className="relative mb-8">
          <div className="h-48 w-full overflow-hidden rounded-lg">
            <img 
              src={selectedSkill.imageUrl} 
              alt={selectedSkill.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{selectedSkill.name}</h1>
            <p className="text-white/80">{selectedSkill.description}</p>
            
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {selectedSkill.estimatedWeeks} weeks
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm capitalize">
                {selectedSkill.difficulty}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {selectedSkill.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Skill Content Tabs */}
        <Tabs defaultValue="roadmap">
          <TabsList className="mb-6">
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roadmap">
            <div className="space-y-6">
              {selectedSkill.modules.length > 0 ? (
                selectedSkill.modules
                  .sort((a, b) => a.week - b.week)
                  .map(module => (
                    <ModuleCard 
                      key={module.id} 
                      module={module} 
                      skillId={selectedSkill.id} 
                    />
                  ))
              ) : (
                <div className="text-center p-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No modules available for this skill yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="discussions">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Community Discussions</h2>
              <Button>
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Discussion
              </Button>
            </div>
            
            {discussions.length > 0 ? (
              <div className="space-y-6">
                {discussions.map(discussion => (
                  <DiscussionThread 
                    key={discussion.id} 
                    discussion={discussion}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No discussions started for this skill yet.</p>
                <Button>Start the First Discussion</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
