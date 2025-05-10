
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import OnboardingForm from "@/components/profile/OnboardingForm";
import { useUser } from "@/contexts/UserContext";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPage() {
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold">Set Up Your Profile</h1>
              <span className="text-sm text-gray-500">Step 1 of 1</span>
            </div>
            
            <Progress value={100} className="h-2" />
            
            <p className="text-gray-600 mt-4">
              Let's personalize your learning experience. Tell us about your interests,
              goals, and how much time you can dedicate to learning each week.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <OnboardingForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
