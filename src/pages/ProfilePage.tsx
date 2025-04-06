import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    experience: '',
    education: '',
    portfolio: '',
    linkedin: '',
    github: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-violet-200">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
            Complete Your Profile
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-800 font-medium">Professional Bio</Label>
              <Textarea 
                id="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="border-gray-300 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="text-gray-800 font-medium">Skills</Label>
              <Input 
                id="skills"
                placeholder="e.g., React, Node.js, UI/UX Design"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="border-gray-300 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-gray-800 font-medium">Work Experience</Label>
              <Textarea 
                id="experience"
                placeholder="Share your work experience..."
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="border-gray-300 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education" className="text-gray-800 font-medium">Education</Label>
              <Input 
                id="education"
                placeholder="Your educational background"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="border-gray-300 focus:border-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-gray-800 font-medium">Portfolio URL</Label>
              <Input 
                id="portfolio"
                type="url"
                placeholder="https://your-portfolio.com"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                className="border-gray-300 focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-gray-800 font-medium">LinkedIn Profile</Label>
                <Input 
                  id="linkedin"
                  placeholder="LinkedIn URL"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="border-gray-300 focus:border-violet-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github" className="text-gray-800 font-medium">GitHub Profile</Label>
                <Input 
                  id="github"
                  placeholder="GitHub URL"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="border-gray-300 focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:opacity-90"
              >
                Save Changes
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="border-violet-500 text-violet-700 hover:bg-violet-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;