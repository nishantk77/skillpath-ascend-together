
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import { useSkill } from "@/contexts/SkillContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Video, FileText, BookOpen } from "lucide-react";
import ResourceUploader from "@/components/resources/ResourceUploader";
import QuizCreator from "@/components/resources/QuizCreator";
import ResourceTable from "@/components/resources/ResourceTable";

export default function ResourceManagementPage() {
  const { user, isAuthenticated } = useUser();
  const { skills } = useSkill();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resources");
  
  // Check if user is authenticated and is a curator
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  
  if (user?.role !== "curator" && user?.role !== "admin") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You need to be a curator to access this page.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Resource Management</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="resources">My Resources</TabsTrigger>
            <TabsTrigger value="upload">Upload Content</TabsTrigger>
            <TabsTrigger value="create-quiz">Create Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="space-y-4">
            <ResourceTable />
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <ResourceUploader skills={skills} />
          </TabsContent>
          
          <TabsContent value="create-quiz" className="space-y-4">
            <QuizCreator skills={skills} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
