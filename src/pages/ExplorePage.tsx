
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useSkill } from "@/contexts/SkillContext";
import SkillCard from "@/components/skills/SkillCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export default function ExplorePage() {
  const { skills } = useSkill();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get unique categories from skills
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  // Filter skills based on search term
  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Skills</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover learning paths and start building your personalized roadmap
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for skills..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Tabs for filtering by category */}
        <Tabs defaultValue="all" className="mb-10">
          <TabsList className="flex justify-center">
            <TabsTrigger value="all">All</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredSkills
                  .filter(skill => skill.category === category)
                  .map(skill => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {filteredSkills.length === 0 && (
          <div className="text-center p-10 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No skills found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms</p>
            <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
