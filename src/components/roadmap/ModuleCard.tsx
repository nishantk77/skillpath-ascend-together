
import { useState } from "react";
import { Module } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, FileText, Clock, Video, Book } from "lucide-react";
import { useSkill } from "@/contexts/SkillContext";

type ModuleCardProps = {
  module: Module;
  skillId: string;
};

export default function ModuleCard({ module, skillId }: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateModuleStatus } = useSkill();
  
  const { id, title, description, week, status, resources, estimatedHours, xpReward } = module;
  
  const statusIcons = {
    "not-started": <Circle className="h-5 w-5 text-gray-400" />,
    "in-progress": <Circle className="h-5 w-5 text-skillpath-light-purple" />,
    "completed": <CheckCircle className="h-5 w-5 text-green-500" />
  };
  
  const resourceTypeIcons = {
    "video": <Video className="h-4 w-4" />,
    "article": <FileText className="h-4 w-4" />,
    "quiz": <Book className="h-4 w-4" />,
    "exercise": <Book className="h-4 w-4" />
  };
  
  const handleModuleStart = () => {
    updateModuleStatus(skillId, id, "in-progress");
  };
  
  const handleModuleComplete = () => {
    updateModuleStatus(skillId, id, "completed");
  };
  
  const getProgressPercentage = () => {
    switch(status) {
      case "not-started":
        return 0;
      case "in-progress":
        return 50;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };
  
  return (
    <div className={`module-card ${status === "completed" ? "completed" : ""} ${status === "in-progress" ? "in-progress" : ""}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div>{statusIcons[status]}</div>
          <span className="text-sm font-medium text-gray-500">Week {week}</span>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{estimatedHours} hours</span>
        </Badge>
      </div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? "Less" : "More"}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <p className="text-gray-600 mt-1 mb-3">{description}</p>
        
        <Progress value={getProgressPercentage()} className="h-2 mb-4" />
        
        <CollapsibleContent>
          <div className="mt-4 space-y-4">
            <h4 className="text-lg font-medium">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.id} className="border rounded-md p-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 font-medium">
                      {resourceTypeIcons[resource.type]}
                      {resource.title}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.estimatedMinutes} min
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500">By: {resource.creator}</span>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-skillpath-purple hover:underline"
                    >
                      View Resource
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex gap-2 justify-between items-center">
              <div className="badge-xp">+{xpReward} XP</div>
              {status === "not-started" ? (
                <Button onClick={handleModuleStart}>
                  Start Module
                </Button>
              ) : status === "in-progress" ? (
                <Button onClick={handleModuleComplete}>
                  Mark as Completed
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  Completed
                </Button>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
