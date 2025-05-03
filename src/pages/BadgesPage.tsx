
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import BadgeDisplay from "@/components/profile/BadgeDisplay";
import { availableBadges } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function BadgesPage() {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) {
    return null;
  }
  
  // Get earned badge IDs
  const earnedBadgeIds = user.badges.map(badge => badge.id);
  
  // Filter not earned badges
  const notEarnedBadges = availableBadges.filter(badge => !earnedBadgeIds.includes(badge.id));
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Achievement Badges</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your progress and showcase your accomplishments
          </p>
        </div>
        
        <Tabs defaultValue="earned">
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="earned">Earned Badges</TabsTrigger>
            <TabsTrigger value="available">Available Badges</TabsTrigger>
          </TabsList>
          
          <TabsContent value="earned">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>
                  You've earned {user.badges.length} out of {availableBadges.length} total badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Progress 
                    value={(user.badges.length / availableBadges.length) * 100} 
                    className="w-full max-w-md h-3"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    {Math.round((user.badges.length / availableBadges.length) * 100)}% complete
                  </p>
                </div>
                
                {user.badges.length > 0 ? (
                  <BadgeDisplay badges={user.badges} size="lg" />
                ) : (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      You haven't earned any badges yet. Complete learning modules to earn badges!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="available">
            <Card>
              <CardHeader>
                <CardTitle>Badges to Earn</CardTitle>
                <CardDescription>
                  Complete these achievements to earn more badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {notEarnedBadges.map(badge => (
                    <div key={badge.id} className="border rounded-lg p-5 flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <div className="w-12 h-12 text-gray-400">
                          {/* Placeholder for badge icon */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-semibold text-center">{badge.name}</h3>
                      <p className="text-sm text-gray-600 text-center">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
