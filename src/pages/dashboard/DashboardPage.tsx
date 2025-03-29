
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import ProjectCard from '@/components/common/ProjectCard';
import UserCard from '@/components/common/UserCard';
import { getRandomProjects, getRandomUsersByRole } from '@/data/mockData';

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Mock data for the dashboard
  const recentProjects = getRandomProjects(4);
  const recommendedProjects = getRandomProjects(2);
  const recommendedUsers = getRandomUsersByRole(
    user?.role === 'company' ? 'freelancer' : 'company', 
    3
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome back, {user?.name}!</p>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-gray-500 text-sm">Active Projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-gray-500 text-sm">Project Applications</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-gray-500 text-sm">Completed Projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-gray-500 text-sm">New Messages</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recommended Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Projects</CardTitle>
                <CardDescription>
                  Projects that match your skills and interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link to="/projects">View All Projects</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Recommended Connections */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Connections</CardTitle>
                <CardDescription>
                  {user?.role === 'company' 
                    ? 'Talented freelancers you might want to work with' 
                    : 'Companies with projects matching your skills'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link to={user?.role === 'company' ? '/freelancers' : '/companies'}>
                      View All {user?.role === 'company' ? 'Freelancers' : 'Companies'}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>
                  Projects you've created or are participating in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentProjects.slice(0, 2).map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                {user?.role === 'company' && (
                  <div className="mt-6 text-center">
                    <Button asChild>
                      <Link to="/projects/create">Create New Project</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  Projects you've applied to
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentProjects.slice(2, 4).map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Your conversations with other users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Messaging functionality will be implemented in Phase 2.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
