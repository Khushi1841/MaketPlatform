
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
      {/* Hero Section - Updated gradient and animations */}
      <section className="bg-gradient-to-br from-violet-600 via-primary to-pink-500 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                Connect, Collaborate, and Create Amazing Projects
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Join our marketplace connecting students, freelancers, and companies for real-world project collaborations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/projects')}
                  className="bg-white/10 hover:bg-white/20 border-transparent text-white"
                >
                  Find Projects
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/register')}
                  className="bg-white/10 hover:bg-white/20 border-transparent text-white"
                >
                  Join Now
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 max-w-2xl">
                {randomSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-white/10 hover:bg-white/20 border-transparent text-white">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="/images/boy (2).png" 
                alt="Collaboration Illustration" 
                className="w-full max-w-md ml-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Updated styling */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-violet-100/50 to-pink-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-violet-100/20 cursor-pointer transform hover:-translate-y-1" onClick={() => navigate('/profile')}>
              <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {localStorage.getItem('user') ? 'Update Profile' : 'Create your Profile'}
              </h3>
              <p className="text-gray-700">
                {localStorage.getItem('user') 
                  ? 'Enhance your profile with additional skills, experience, and portfolio items.'
                  : 'Sign up and create a detailed profile showcasing your skills, experience, and interests.'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100/50 to-violet-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-pink-100/20 cursor-pointer transform hover:-translate-y-1" onClick={() => navigate('/community')}>
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Discover Opportunities</h3>
              <p className="text-gray-700">
                Browse projects, connect with talented individuals, or find mentors in your field.
              </p>
            </div>
            <div className="bg-gradient-to-br from-violet-100/50 to-pink-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-violet-100/20 cursor-pointer transform hover:-translate-y-1" onClick={() => navigate('/projects')}>
              <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Collaborate & Grow</h3>
              <p className="text-gray-700">
                Work together on projects, gain real-world experience, and build your professional portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Updated design */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Explore Project Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {randomCategories.map((category) => (
              <div
                key={category}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/20 transform hover:-translate-y-1"
                onClick={() => navigate(`/projects?category=${category}`)}
              >
                <h3 className="font-medium">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated styling */}
      <section className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students, freelancers, and companies already collaborating on meaningful projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="default"
              onClick={() => navigate('/register')}
              className="bg-white text-purple-600 hover:bg-white/90 transform hover:scale-105 transition-transform"
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
