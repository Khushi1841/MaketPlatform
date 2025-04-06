
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProfilePage from '@/pages/ProfilePage';

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotFound from "./pages/NotFound";
import CompaniesPage from "./pages/companies/CompaniesPage";
import FreelancersPage from "./pages/freelancers/FreelancersPage";
import MentorshipPage from "./pages/mentorship/MentorshipPage";
import CommunityPage from './pages/community/CommunityPage';
import DiscussionRoom from './pages/community/DiscussionRoom';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import FreelancerDashboard from './pages/dashboard/FreelancerDashboard';
import CompanyDashboard from './pages/dashboard/CompanyDashboard';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
          <Route path="/dashboard/company" element={<CompanyDashboard />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/freelancers" element={<FreelancersPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/discussion" element={<DiscussionRoom />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

