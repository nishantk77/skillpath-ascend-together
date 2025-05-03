import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useDiscussion } from "@/contexts/DiscussionContext";
import { useUser } from "@/contexts/UserContext";
import DiscussionThread from "@/components/discussions/DiscussionThread";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function DiscussionsPage() {
  const { discussions } = useDiscussion();
  const { isAuthenticated } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Filter discussions based on search term
  const filteredDiscussions = discussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Community Discussions</h1>
          {isAuthenticated && (
            <Button>Start New Discussion</Button>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search discussions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredDiscussions.length > 0 ? (
          <div className="space-y-6">
            {filteredDiscussions.map(discussion => (
              <DiscussionThread key={discussion.id} discussion={discussion} />
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No discussions found</h3>
            {searchTerm ? (
              <div>
                <p className="text-gray-600 mb-4">Try adjusting your search terms</p>
                <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">Be the first to start a discussion!</p>
                {isAuthenticated ? (
                  <Button>Start Discussion</Button>
                ) : (
                  <Button onClick={() => navigate("/login")}>Sign In to Start Discussion</Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
