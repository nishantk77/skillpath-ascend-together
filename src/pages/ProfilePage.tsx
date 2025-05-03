
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import OnboardingForm from "@/components/profile/OnboardingForm";
import XPProgress from "@/components/profile/XPProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
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
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start mb-8 gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-24 h-24 bg-skillpath-pale-purple rounded-full overflow-hidden mb-4">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                    alt="Profile"
                    className="w-full h-full"
                  />
                </div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500 mb-4">{user.email}</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <XPProgress xp={user.xp} size={60} />
                  <div>
                    <p className="font-medium">{user.xp} XP</p>
                    <p className="text-xs text-gray-500">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="w-full border-t pt-4">
                  <h3 className="font-semibold mb-2">Current Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="bg-skillpath-pale-purple text-skillpath-dark-purple px-3 py-1 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <OnboardingForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
