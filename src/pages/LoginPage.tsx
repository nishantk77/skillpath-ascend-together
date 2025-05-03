
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Log In to SkillPath</h1>
            <p className="text-gray-600 mt-2">
              Continue your learning journey with SkillPath
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
