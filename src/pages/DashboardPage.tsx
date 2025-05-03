
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import { useSkill } from "@/contexts/SkillContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import XPProgress from "@/components/profile/XPProgress";
import BadgeDisplay from "@/components/profile/BadgeDisplay";
import SkillCard from "@/components/skills/SkillCard";
import { ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated } = useUser();
  const { getInProgressSkills, getRecommendedSkills, skills } = useSkill();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  const inProgressSkills = getInProgressSkills();
  const recommendedSkills = getRecommendedSkills().slice(0, 3);
  
  // Calculate module completion stats for in-progress skills
  const completionStats = inProgressSkills.map(skill => {
    const totalModules = skill.modules.length;
    const completedModules = skill.modules.filter(m => m.status === "completed").length;
    const inProgressModules = skill.modules.filter(m => m.status === "in-progress").length;
    const completionPercentage = totalModules > 0 
      ? (completedModules / totalModules) * 100 
      : 0;
    
    return {
      skill,
      completedModules,
      inProgressModules,
      totalModules,
      completionPercentage
    };
  });
  
  const hasBadges = user?.badges && user.badges.length > 0;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {user && (
          <>
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row items-start mb-10 gap-6">
              <div className="md:flex-1">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 mb-4">Continue your learning journey</p>
              </div>
              
              <div className="flex gap-4 items-center bg-white p-4 rounded-lg border">
                <XPProgress xp={user.xp} />
                <div>
                  <p className="font-semibold text-lg">{user.xp} XP</p>
                  <p className="text-sm text-gray-600">Keep learning to level up</p>
                </div>
              </div>
            </div>
            
            {/* In Progress Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">In Progress</h2>
                <Link to="/skills">
                  <Button variant="ghost" className="text-skillpath-purple gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              {completionStats.length > 0 ? (
                <div className="grid gap-6">
                  {completionStats.map(({ skill, completedModules, inProgressModules, totalModules, completionPercentage }) => (
                    <Card key={skill.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{skill.name}</CardTitle>
                            <CardDescription>{skill.description}</CardDescription>
                          </div>
                          <Link to={`/skills/${skill.id}`}>
                            <Button variant="outline">Continue</Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{completedModules} of {totalModules} modules completed</span>
                            <span>{Math.round(completionPercentage)}%</span>
                          </div>
                          <Progress value={completionPercentage} className="h-2" />
                        </div>
                        <div className="text-sm text-gray-600">
                          {inProgressModules > 0 ? (
                            <p>You have {inProgressModules} module{inProgressModules > 1 ? 's' : ''} in progress</p>
                          ) : (
                            <p>Ready to start your next module!</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">No skills in progress yet</h3>
                  <p className="text-gray-600 mb-4">Start your learning journey by exploring skills</p>
                  <Link to="/explore">
                    <Button>Explore Skills</Button>
                  </Link>
                </div>
              )}
            </section>
            
            {/* Recommended Skills Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recommended for You</h2>
                <Link to="/explore">
                  <Button variant="ghost" className="text-skillpath-purple gap-1">
                    Explore All <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {recommendedSkills.length > 0 ? (
                  recommendedSkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))
                ) : (
                  <div className="col-span-3 bg-gray-50 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-medium mb-2">No recommendations yet</h3>
                    <p className="text-gray-600 mb-4">Update your interests to get personalized recommendations</p>
                    <Link to="/profile">
                      <Button>Update Profile</Button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
            
            {/* Badges Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Badges</h2>
                <Link to="/badges">
                  <Button variant="ghost" className="text-skillpath-purple gap-1">
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                  <CardDescription>Badges you've earned on your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <BadgeDisplay badges={user.badges} />
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
