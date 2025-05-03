
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-gray-600 mt-2">
              Join SkillPath to start your learning journey
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <SignupForm />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-skillpath-purple hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
