
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import FreelancerDashboard from './FreelancerDashboard';
import StudentDashboard from './StudentDashboard';
import CompanyDashboard from './CompanyDashboard';

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'freelancer':
        return <FreelancerDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'company':
        return <CompanyDashboard />;
      default:
        return <Navigate to="/" />;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome back, {user?.name}!</p>
        {getDashboardComponent()}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
