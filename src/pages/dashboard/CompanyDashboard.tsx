import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockCandidates = [
  { id: 1, name: 'Sarah Wilson', role: 'Full Stack Developer', experience: '5 years' },
  { id: 2, name: 'Mike Chen', role: 'UI/UX Designer', experience: '3 years' },
  { id: 3, name: 'Emma Davis', role: 'Product Manager', experience: '4 years' },
];

const mockJobs = [
  { id: 1, title: 'Senior React Developer', applications: 12, status: 'Active' },
  { id: 2, title: 'UX Research Lead', applications: 8, status: 'Active' },
  { id: 3, title: 'DevOps Engineer', applications: 15, status: 'Active' },
];

const CompanyDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!isAuthenticated || user?.role !== 'company') {
    return <Navigate to="/login" />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Company Dashboard</h1>
          <p className="opacity-90">Welcome back, {user?.name || 'Company'}!</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-purple-50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Job Listings</TabsTrigger>
            <TabsTrigger value="candidates" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Candidates</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <p className="text-gray-500 text-sm">Active Job Listings</p>
                </CardContent>
              </Card>
              <Card className="border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-purple-600">124</div>
                  <p className="text-gray-500 text-sm">Total Applications</p>
                </CardContent>
              </Card>
              <Card className="border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-purple-600">28</div>
                  <p className="text-gray-500 text-sm">Interviews Scheduled</p>
                </CardContent>
              </Card>
              <Card className="border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <p className="text-gray-500 text-sm">Positions Filled</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-purple-100">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-purple-700">Recent Job Postings</h2>
                  <div className="space-y-4">
                    {mockJobs.map((job) => (
                      <div key={job.id} className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {job.applications} applications • {job.status}
                        </p>
                        <Button variant="outline" className="border-purple-200 hover:bg-purple-100">View Applications</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-purple-700">Top Candidates</h2>
                  <div className="space-y-4">
                    {mockCandidates.map((candidate) => (
                      <div key={candidate.id} className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                        <h3 className="font-medium">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.role}</p>
                        <p className="text-sm text-gray-500 mb-2">{candidate.experience}</p>
                        <Button variant="outline" className="border-purple-200 hover:bg-purple-100">View Profile</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="text-center text-gray-500 py-8">Job listings management coming soon...</div>
          </TabsContent>

          <TabsContent value="candidates">
            <div className="text-center text-gray-500 py-8">Candidate tracking coming soon...</div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center text-gray-500 py-8">Recruitment analytics coming soon...</div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyDashboard;