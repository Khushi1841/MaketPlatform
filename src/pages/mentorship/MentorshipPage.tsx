
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import UserCard from '@/components/common/UserCard';
import { getRandomUsersByRole } from '@/data/mockData';

const MentorshipPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [mentors, setMentors] = useState(getRandomUsersByRole('freelancer', 6));
  
  // Mock mentorship programs
  const mentorshipPrograms = [
    {
      id: "1",
      title: "Web Development Mentorship",
      description: "Learn modern web development practices with experienced mentors",
      duration: "12 weeks",
      skills: ["React", "Node.js", "JavaScript"]
    },
    {
      id: "2",
      title: "UI/UX Design Program",
      description: "Master the principles of user interface and experience design",
      duration: "8 weeks",
      skills: ["Figma", "UI Design", "UX Research"]
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      description: "Build a solid foundation in data science and analytics",
      duration: "16 weeks",
      skills: ["Python", "Statistics", "Machine Learning"]
    }
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter from an API
    console.log('Searching for:', searchTerm);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Mentorship Programs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with industry experts and experienced professionals to guide your learning journey and career development.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search for mentors, programs, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </form>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Mentorship Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorshipPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>{program.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{program.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                  <Button className="w-full">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Mentors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <UserCard key={mentor.id} user={mentor} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate('/mentors')}>
              View All Mentors
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MentorshipPage;
