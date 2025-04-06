import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for testing
const mockProjects = [
  { id: 1, title: 'Web App Development', description: 'React-based web application' },
  { id: 2, title: 'Mobile App Design', description: 'UI/UX design for iOS app' },
  { id: 3, title: 'E-commerce Platform', description: 'Full-stack e-commerce solution' },
];

const mockClients = [
  { id: 1, name: 'Tech Solutions Inc', description: 'Software Development Company' },
  { id: 2, name: 'Digital Innovators', description: 'Digital Marketing Agency' },
  { id: 3, name: 'Creative Studios', description: 'Design Agency' },
];

const FreelancerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!isAuthenticated || user?.role !== 'freelancer') {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Freelancer Hub</h1>
          <p className="opacity-90">Welcome back, {user?.name || 'Freelancer'}!</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-red-50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Active Projects</TabsTrigger>
            <TabsTrigger value="proposals" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">My Proposals</TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Earnings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-red-100 hover:border-red-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">4</div>
                  <p className="text-gray-500 text-sm">Active Projects</p>
                </CardContent>
              </Card>
              <Card className="border-red-100 hover:border-red-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">$2,450</div>
                  <p className="text-gray-500 text-sm">Monthly Earnings</p>
                </CardContent>
              </Card>
              <Card className="border-red-100 hover:border-red-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">8</div>
                  <p className="text-gray-500 text-sm">Pending Proposals</p>
                </CardContent>
              </Card>
              <Card className="border-red-100 hover:border-red-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">4.9</div>
                  <p className="text-gray-500 text-sm">Rating</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-100">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-red-700">Available Projects</h2>
                  <div className="space-y-4">
                    {mockProjects.map((project) => (
                      <div key={project.id} className="p-4 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <Button variant="outline" className="border-red-200 hover:bg-red-100">View Details</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-100">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-red-700">Potential Clients</h2>
                  <div className="space-y-4">
                    {mockClients.map((client) => (
                      <div key={client.id} className="p-4 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                        <h3 className="font-medium">{client.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{client.description}</p>
                        <Button variant="outline" className="border-red-200 hover:bg-red-100">Connect</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="text-center text-gray-500 py-8">Projects content coming soon...</div>
          </TabsContent>

          <TabsContent value="proposals">
            <div className="text-center text-gray-500 py-8">Proposals content coming soon...</div>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="text-center text-gray-500 py-8">Earnings content coming soon...</div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FreelancerDashboard;