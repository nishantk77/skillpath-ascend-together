
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useUser();
  const navigate = useNavigate();

  const handleAdminLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!adminUsername || !adminPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await adminLogin(adminUsername, adminPassword);
    setIsLoading(false);

    if (success) {
      navigate("/admin");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Admin Login</h2>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="adminUsername">Admin Username</Label>
            <Input
              id="adminUsername"
              type="text"
              placeholder="admin"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminPassword">Admin Password</Label>
            <Input
              id="adminPassword"
              type="password"
              placeholder="••••••••"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Admin Login"}
          </Button>
        </form>
      </div>

      <div className="mt-6 text-center text-sm">
        <p>For demo purposes:</p>
        <div className="mt-2 p-3 bg-gray-50 rounded-md text-left">
          <p><strong>Admin:</strong> username: admin, password: skillpath123</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Need a learner account?{" "}
          <Link to="/signup" className="text-skillpath-purple hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
