import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRandomProjects, getRandomUsersByRole } from '@/data/mockData';
import { Plus, Upload } from 'lucide-react';

const StudentDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/login" />;
  }

  // Mock data for the dashboard
  const recentProjects = getRandomProjects(4);
  const recommendedProjects = getRandomProjects(2);
  const recommendedUsers = getRandomUsersByRole('company', 3);
  const myProjects = getRandomProjects(3); // Add this line for my projects

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome back, {user?.name}!</p>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="learning">Learning Path</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-gray-500 text-sm">Active Projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-gray-500 text-sm">Learning Courses</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-gray-500 text-sm">Completed Projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-gray-500 text-sm">Course Progress</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-gray-500">{project.description}</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Recommended Projects</h2>
                  <div className="space-y-4">
                    {recommendedProjects.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-gray-500">{project.description}</p>
                        <Button variant="outline" size="sm">Learn More</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Recommended Mentors</h2>
                  <div className="space-y-4">
                    {recommendedUsers.map((mentor) => (
                      <div key={mentor.id} className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h3 className="font-medium">{mentor.name}</h3>
                          <p className="text-sm text-gray-500">{mentor.role}</p>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <Button onClick={() => setShowUploadForm(!showUploadForm)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {showUploadForm && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Upload New Project</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Project Title</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter project title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        className="w-full p-2 border rounded-md"
                        rows={3}
                        placeholder="Describe your project"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Project Files</label>
                      <div className="border-2 border-dashed rounded-md p-4 text-center">
                        <Upload className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Drag & drop files here or click to browse</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowUploadForm(false)}>Cancel</Button>
                      <Button type="submit">Upload Project</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {myProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-500 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Edit</Button>
                      <Button>View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="learning">
            {/* Learning content */}
          </TabsContent>

          <TabsContent value="mentorship">
            {/* Mentorship content */}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;