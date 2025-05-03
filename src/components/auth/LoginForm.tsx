
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
  // Admin login state
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  
  // User login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin, userLogin } = useUser();
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

  const handleUserLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await userLogin(email, password);
    setIsLoading(false);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="user">User Login</TabsTrigger>
          <TabsTrigger value="admin">Admin Login</TabsTrigger>
        </TabsList>
        
        {/* User Login Tab */}
        <TabsContent value="user" className="space-y-4">
          <form onSubmit={handleUserLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-skillpath-purple hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </TabsContent>
        
        {/* Admin Login Tab */}
        <TabsContent value="admin" className="space-y-4">
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
          
          <div className="mt-6 text-center text-sm">
            <p>For demo purposes:</p>
            <div className="mt-2 p-3 bg-gray-50 rounded-md text-left">
              <p><strong>Admin:</strong> username: admin, password: skillpath123</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
