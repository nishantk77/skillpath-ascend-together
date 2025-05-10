
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Resource } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Video, FileText, Book } from "lucide-react";

export default function ResourceTable() {
  const { user } = useUser();
  // In a real app, we would fetch resources from a database
  // For now, we'll use a mock list
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "res-1",
      title: "Introduction to React Hooks",
      description: "Learn the basics of React Hooks with practical examples",
      type: "video",
      url: "https://example.com/video1",
      estimatedMinutes: 15,
      creator: user?.name || "Unknown Creator",
      createdAt: new Date("2023-05-10"),
      curatorId: user?.id
    },
    {
      id: "res-2",
      title: "Advanced CSS Techniques",
      description: "Master advanced CSS features like Grid and Flexbox",
      type: "article",
      url: "https://example.com/article1",
      estimatedMinutes: 10,
      creator: user?.name || "Unknown Creator",
      createdAt: new Date("2023-06-15"),
      curatorId: user?.id
    },
    {
      id: "res-3",
      title: "JavaScript Testing Best Practices",
      description: "Learn how to write effective tests for your JavaScript code",
      type: "quiz",
      url: "https://example.com/quiz1",
      estimatedMinutes: 20,
      creator: user?.name || "Unknown Creator",
      createdAt: new Date("2023-07-20"),
      curatorId: user?.id
    }
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      case "quiz":
        return <Book className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleDeleteResource = (id: string) => {
    // In a real app, we would delete from the database
    setResources(resources.filter(resource => resource.id !== id));
    
    toast({
      title: "Resource deleted",
      description: "The resource has been successfully deleted."
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableCaption>List of resources you've created</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.length > 0 ? (
              resources.map(resource => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getResourceIcon(resource.type)}
                      <span className="capitalize">{resource.type}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <div>{resource.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">
                        {resource.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(resource.createdAt)}</TableCell>
                  <TableCell>{resource.estimatedMinutes} min</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(resource.url, "_blank")}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteResource(resource.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  You haven't created any resources yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
