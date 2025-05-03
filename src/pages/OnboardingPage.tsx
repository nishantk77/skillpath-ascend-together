
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import OnboardingForm from "@/components/profile/OnboardingForm";
import { useUser } from "@/contexts/UserContext";

export default function OnboardingPage() {
  const { isAuthenticated } = useUser();
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Set Up Your Profile</h1>
            <p className="text-gray-600 mt-2">
              Let's personalize your learning experience
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
