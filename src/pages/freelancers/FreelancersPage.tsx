
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import UserCard from '@/components/common/UserCard';
import { getRandomUsersByRole } from '@/data/mockData';
import { SKILLS } from '@/data/mockData';

const FreelancersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [freelancers, setFreelancers] = useState(getRandomUsersByRole('freelancer', 9));
  const [selectedSkill, setSelectedSkill] = useState('all');
  
  // Get a subset of skills for the filter
  const popularSkills = SKILLS.slice(0, 10);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter from an API
    console.log('Searching for:', searchTerm);
  };

  const filterBySkill = (skill: string) => {
    setSelectedSkill(skill);
    // In a real app, this would filter from an API
    console.log('Filtering by skill:', skill);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Freelancers</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search freelancers by name, skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </form>
          </div>
          
          <div className="w-full md:w-1/3">
            <Select
              value={selectedSkill}
              onValueChange={filterBySkill}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {popularSkills.map((skill) => (
                  <SelectItem key={skill} value={skill.toLowerCase()}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Popular skills:</div>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map(skill => (
              <Badge 
                key={skill} 
                variant={selectedSkill === skill.toLowerCase() ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => filterBySkill(skill.toLowerCase())}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <UserCard key={freelancer.id} user={freelancer} />
          ))}
        </div>
        
        {freelancers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No freelancers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default FreelancersPage;
