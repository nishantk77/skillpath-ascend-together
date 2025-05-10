
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { UserProvider } from "@/contexts/UserContext";
import { SkillProvider } from "@/contexts/SkillContext";
import { DiscussionProvider } from "@/contexts/DiscussionContext";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import ExplorePage from "./pages/ExplorePage";
import SkillDetailPage from "./pages/SkillDetailPage";
import DiscussionsPage from "./pages/DiscussionsPage";
import ProfilePage from "./pages/ProfilePage";
import BadgesPage from "./pages/BadgesPage";
import AdminPage from "./pages/AdminPage";
import ResourceManagementPage from "./pages/ResourceManagementPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <SkillProvider>
          <DiscussionProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/skills/:skillId" element={<SkillDetailPage />} />
                <Route path="/discussions" element={<DiscussionsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/badges" element={<BadgesPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/resources" element={<ResourceManagementPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </DiscussionProvider>
        </SkillProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
