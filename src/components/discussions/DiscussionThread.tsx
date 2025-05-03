
import { useState, FormEvent } from "react";
import { Discussion } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDiscussion } from "@/contexts/DiscussionContext";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

type DiscussionThreadProps = {
  discussion: Discussion;
};

export default function DiscussionThread({ discussion }: DiscussionThreadProps) {
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addReply } = useDiscussion();
  const { isAuthenticated, user } = useUser();
  
  const handleSubmitReply = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    
    // Add a small delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addReply(discussion.id, replyContent);
    setReplyContent("");
    setIsSubmitting(false);
  };
  
  const formatDate = (date: Date) => {
    // Parse the date if it's a string (which might happen after localStorage storage/retrieval)
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true });
  };
  
  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${discussion.userId}`} />
          <AvatarFallback>{discussion.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{discussion.userName}</h3>
            <span className="text-sm text-gray-500">{formatDate(discussion.createdAt)}</span>
          </div>
          
          <h2 className="text-xl font-bold mb-2">{discussion.title}</h2>
          <p className="text-gray-700 whitespace-pre-line">{discussion.content}</p>
          
          <div className="mt-6 border-t pt-4">
            <h4 className="text-lg font-medium mb-4">
              {discussion.replies.length} {discussion.replies.length === 1 ? 'Reply' : 'Replies'}
            </h4>
            
            <div className="space-y-6">
              {discussion.replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.userId}`} />
                    <AvatarFallback>{reply.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{reply.userName}</h3>
                      <span className="text-sm text-gray-500">{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {isAuthenticated ? (
              <form onSubmit={handleSubmitReply} className="mt-6">
                <div className="mb-3">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-24"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={!replyContent.trim() || isSubmitting}>
                    {isSubmitting ? "Posting..." : "Post Reply"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mt-6 p-4 bg-gray-50 rounded-md text-center">
                <p className="text-gray-600">Please log in to join the discussion</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
