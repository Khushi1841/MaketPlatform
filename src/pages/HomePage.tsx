
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/MainLayout';
import ProjectCard from '@/components/common/ProjectCard';
import UserCard from '@/components/common/UserCard';
import { getRandomProjects, getRandomUsersByRole } from '@/data/mockData';
import { SKILLS, CATEGORIES } from '@/data/mockData';

const HomePage = () => {
  const navigate = useNavigate();
  const featuredProjects = getRandomProjects(3);
  const featuredFreelancers = getRandomUsersByRole('freelancer', 3);
  const featuredCompanies = getRandomUsersByRole('company', 3);

  // Get random skills and categories for the hero section
  const randomSkills = [...SKILLS].sort(() => 0.5 - Math.random()).slice(0, 8);
  const randomCategories = [...CATEGORIES].sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Connect, Collaborate, and Create Amazing Projects
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Join our marketplace connecting students, freelancers, and companies for real-world project collaborations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/projects')}
                className="bg-white text-primary hover:bg-white/90"
              >
                Find Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/register')}
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Join Now
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {randomSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-white/10 hover:bg-white/20 border-transparent text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create your Profile</h3>
              <p className="text-gray-600">
                Sign up and create a detailed profile showcasing your skills, experience, and interests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Opportunities</h3>
              <p className="text-gray-600">
                Browse projects, connect with talented individuals, or find mentors in your field.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaborate & Grow</h3>
              <p className="text-gray-600">
                Work together on projects, gain real-world experience, and build your professional portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Button variant="outline" onClick={() => navigate('/projects')}>
              View All Projects
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Explore Project Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {randomCategories.map((category) => (
              <div
                key={category}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/projects?category=${category}`)}
              >
                <h3 className="font-medium">{category}</h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate('/projects')}>
              Browse All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Users Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Freelancers</h2>
              <Button variant="outline" onClick={() => navigate('/freelancers')}>
                View All Freelancers
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFreelancers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Companies</h2>
              <Button variant="outline" onClick={() => navigate('/companies')}>
                View All Companies
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCompanies.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students, freelancers, and companies already collaborating on meaningful projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="default"
              onClick={() => navigate('/register')}
              className="bg-white text-secondary hover:bg-white/90"
            >
              Sign Up Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/projects')}
              className="border-white text-white hover:bg-white/10"
            >
              Browse Projects
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
