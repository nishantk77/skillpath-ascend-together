
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Skill, Resource } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Video, FileText } from "lucide-react";

type ResourceUploaderProps = {
  skills: Skill[];
};

export default function ResourceUploader({ skills }: ResourceUploaderProps) {
  const { user } = useUser();
  const [resourceType, setResourceType] = useState<"video" | "article">("video");
  const [isUploading, setIsUploading] = useState(false);
  const [resourceData, setResourceData] = useState({
    title: "",
    description: "",
    url: "",
    skillId: "",
    moduleId: "",
    estimatedMinutes: 10,
  });
  
  // Get modules for selected skill
  const selectedSkill = skills.find(skill => skill.id === resourceData.skillId);
  const modules = selectedSkill?.modules || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResourceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectSkill = (value: string) => {
    setResourceData(prev => ({
      ...prev,
      skillId: value,
      moduleId: ""  // Reset module when skill changes
    }));
  };

  const handleSelectModule = (value: string) => {
    setResourceData(prev => ({
      ...prev,
      moduleId: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      // In a real app, this would upload to a cloud storage and save to database
      // For now, we'll simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newResource: Resource = {
        id: `resource-${Date.now()}`,
        title: resourceData.title,
        description: resourceData.description,
        type: resourceType,
        url: resourceData.url,
        estimatedMinutes: Number(resourceData.estimatedMinutes),
        creator: user?.name || "Unknown Creator",
        createdAt: new Date(),
        curatorId: user?.id
      };
      
      console.log("New resource created:", newResource);
      
      // Reset form
      setResourceData({
        title: "",
        description: "",
        url: "",
        skillId: "",
        moduleId: "",
        estimatedMinutes: 10
      });
      
      toast({
        title: "Resource uploaded",
        description: "Your resource has been successfully uploaded.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resource.",
        variant: "destructive"
      });
      console.error("Error uploading resource:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs value={resourceType} onValueChange={(value: "video" | "article") => setResourceType(value)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="article" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Article/Blog
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                name="title"
                value={resourceData.title}
                onChange={handleInputChange}
                placeholder="Enter resource title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={resourceData.description}
                onChange={handleInputChange}
                placeholder="Enter resource description"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">
                {resourceType === "video" ? "Video URL" : "Article URL"}
              </Label>
              <Input 
                id="url"
                name="url"
                value={resourceData.url}
                onChange={handleInputChange}
                placeholder={resourceType === "video" ? "Enter video URL (YouTube, Vimeo, etc.)" : "Enter article URL"}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skillId">Related Skill</Label>
                <Select 
                  value={resourceData.skillId}
                  onValueChange={handleSelectSkill}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills.map(skill => (
                      <SelectItem key={skill.id} value={skill.id}>
                        {skill.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="moduleId">Related Module</Label>
                <Select 
                  value={resourceData.moduleId}
                  onValueChange={handleSelectModule}
                  disabled={!resourceData.skillId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map(module => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="estimatedMinutes">Estimated Minutes</Label>
              <Input 
                id="estimatedMinutes"
                name="estimatedMinutes"
                type="number"
                min="1"
                value={resourceData.estimatedMinutes}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Resource"}
            </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
