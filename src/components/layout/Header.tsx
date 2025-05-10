
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, Bell, ChevronDown, Book, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import { useMobile } from "@/hooks/use-mobile";

export default function Header() {
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinks = [
    { name: "Dashboard", path: "/dashboard", requiredAuth: true },
    { name: "Explore", path: "/explore", requiredAuth: true },
    { name: "Discussions", path: "/discussions", requiredAuth: true },
    { name: "Resources", path: "/resources", requiredAuth: true, roles: ["curator", "admin"] },
  ];
  
  const filteredNavLinks = navLinks.filter(link => {
    if (!link.requiredAuth) return true;
    if (!isAuthenticated) return false;
    if (link.roles && user) {
      return link.roles.includes(user.role);
    }
    return true;
  });
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-skillpath-purple">Skill<span className="text-skillpath-dark-purple">Path</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex space-x-6">
            {isAuthenticated && filteredNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-skillpath-purple ${
                  isActive(link.path) 
                    ? "text-skillpath-purple border-b-2 border-skillpath-purple" 
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
        
        {/* User Menu / Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-skillpath-purple"
                  onClick={() => navigate("/badges")}
                >
                  <Bell className="h-5 w-5" />
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-skillpath-pale-purple flex items-center justify-center">
                      <span className="text-sm font-medium text-skillpath-dark-purple">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    {!isMobile && (
                      <>
                        <span className="text-sm font-medium">{user?.name || "User"}</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/badges")} className="cursor-pointer">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Badges</span>
                  </DropdownMenuItem>
                  {(user?.role === "curator" || user?.role === "admin") && (
                    <DropdownMenuItem onClick={() => navigate("/resources")} className="cursor-pointer">
                      <Video className="mr-2 h-4 w-4" />
                      <span>Manage Resources</span>
                    </DropdownMenuItem>
                  )}
                  {user?.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
                      <Book className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {!isMobile && (
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
              <Button onClick={() => navigate(isMobile ? "/login" : "/signup")}>
                {isMobile ? "Login" : "Sign Up"}
              </Button>
            </>
          )}
          
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {isAuthenticated ? (
              filteredNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 text-sm font-medium ${
                    isActive(link.path) 
                      ? "text-skillpath-purple" 
                      : "text-gray-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 text-sm font-medium text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="py-2 text-sm font-medium text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
