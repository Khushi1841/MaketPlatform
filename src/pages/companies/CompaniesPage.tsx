
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
import { Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import UserCard from '@/components/common/UserCard';
import { getRandomUsersByRole } from '@/data/mockData';

const CompaniesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState(getRandomUsersByRole('company', 9));
  const [industry, setIndustry] = useState('all');
  
  // Industries from the mock data
  const industries = ['Technology', 'Marketing', 'Finance', 'Education', 'Healthcare'];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter from an API
    console.log('Searching for:', searchTerm);
  };

  const filterByIndustry = (selectedIndustry: string) => {
    setIndustry(selectedIndustry);
    // In a real app, this would filter from an API
    console.log('Filtering by industry:', selectedIndustry);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Companies</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search companies by name, industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </form>
          </div>
          
          <div className="w-full md:w-1/3">
            <Select
              value={industry}
              onValueChange={filterByIndustry}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind.toLowerCase()}>
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <UserCard key={company.id} user={company} />
          ))}
        </div>
        
        {companies.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CompaniesPage;
