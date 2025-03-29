
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { getProjectById, getUserById } from '@/data/mockData';
import { Project, User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [company, setCompany] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      const projectData = getProjectById(id);
      if (projectData) {
        setProject(projectData);
        
        // Get company data
        const companyData = getUserById(projectData.company.id);
        if (companyData) {
          setCompany(companyData);
        }
        
        // Check if user has already applied
        if (user && projectData.applicants) {
          setHasApplied(projectData.applicants.includes(user.id));
        }
      }
      setIsLoading(false);
    }
  }, [id, user]);

  const handleApply = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to apply for this project",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (project && user) {
      // In a real app, this would be an API call
      if (!project.applicants) {
        project.applicants = [];
      }
      
      project.applicants.push(user.id);
      setHasApplied(true);
      
      toast({
        title: "Application submitted",
        description: "Your application has been successfully submitted",
      });
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-40 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-60 bg-gray-200 rounded col-span-2"></div>
              <div className="h-60 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/projects')}>Browse Projects</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate('/projects')}
          >
            ← Back to Projects
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Badge
              variant={project.status === 'open' ? 'default' : 'secondary'}
              className="capitalize"
            >
              {project.status}
            </Badge>
            <span className="text-gray-500 text-sm">
              Posted {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <Avatar className="h-8 w-8">
              <AvatarImage src={company?.avatar} />
              <AvatarFallback>{company?.name?.charAt(0) || 'C'}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{company?.name}</span>
            {company?.location && (
              <span className="text-gray-500">• {company.location}</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="description">
                  <TabsList className="mb-6">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description">
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">{project.description}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="requirements">
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3">Team Size</h3>
                      <p>{project.teamSize} team member{project.teamSize !== 1 ? 's' : ''}</p>
                      
                      {project.budget && (
                        <>
                          <h3 className="text-lg font-semibold mb-3 mt-6">Budget</h3>
                          <p>{project.budget}</p>
                        </>
                      )}
                      
                      <h3 className="text-lg font-semibold mb-3 mt-6">Duration</h3>
                      <p>{project.duration}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Apply for this Project</h3>
                
                {user?.role === 'company' ? (
                  <p className="text-gray-600 mb-4">
                    Companies cannot apply to projects. Switch to a student or freelancer account to apply.
                  </p>
                ) : project.status !== 'open' ? (
                  <p className="text-gray-600 mb-4">
                    This project is no longer accepting applications.
                  </p>
                ) : hasApplied ? (
                  <div className="bg-primary/10 p-4 rounded-md mb-4">
                    <p className="text-primary font-medium">You have already applied to this project.</p>
                  </div>
                ) : (
                  <p className="text-gray-600 mb-4">
                    Interested in this project? Submit your application now!
                  </p>
                )}
                
                <Button 
                  className="w-full" 
                  disabled={hasApplied || project.status !== 'open' || user?.role === 'company'}
                  onClick={handleApply}
                >
                  {hasApplied ? 'Application Submitted' : 'Apply Now'}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Categories</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.categories.map((category) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Company</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={company?.avatar} />
                        <AvatarFallback>{company?.name?.charAt(0) || 'C'}</AvatarFallback>
                      </Avatar>
                      <span>{company?.name}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="mt-1">{company?.location || 'Remote'}</p>
                  </div>
                  
                  {company?.website && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Website</h4>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline mt-1 block"
                      >
                        {company.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetailPage;
