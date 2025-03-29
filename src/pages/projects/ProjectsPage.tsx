
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Filter } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ProjectCard from '@/components/common/ProjectCard';
import SkillBadge from '@/components/common/SkillBadge';
import { Project } from '@/types';
import { PROJECTS, SKILLS, CATEGORIES } from '@/data/mockData';

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Initialize projects
    setProjects(PROJECTS);
    
    // Initialize selected skills from URL
    const skillsParam = searchParams.get('skills');
    if (skillsParam) {
      setSelectedSkills(skillsParam.split(','));
    }
    
    // Initialize search term from URL
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }

    // Initialize category from URL
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    // Initialize status from URL
    const statusParam = searchParams.get('status');
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // Apply filters and search
    let result = [...projects];
    
    // Filter by search term
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        project => 
          project.title.toLowerCase().includes(lowercaseSearch) ||
          project.description.toLowerCase().includes(lowercaseSearch) ||
          project.company.name.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(project => project.status === selectedStatus);
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(project => project.categories.includes(selectedCategory));
    }
    
    // Filter by skills
    if (selectedSkills.length > 0) {
      result = result.filter(project => 
        selectedSkills.every(skill => project.skills.includes(skill))
      );
    }
    
    setFilteredProjects(result);
  }, [projects, searchTerm, selectedStatus, selectedCategory, selectedSkills]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams();
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (selectedStatus !== 'all') params.set('status', selectedStatus);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedSkills.length > 0) params.set('skills', selectedSkills.join(','));
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSelectedSkills([]);
    setSearchParams(new URLSearchParams());
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Projects</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="mt-4">
                  <Button type="submit" className="w-full">Search</Button>
                </div>
              </form>
            </div>
            
            {/* Mobile filters toggle */}
            <div className="lg:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={toggleFilters}
              >
                <Filter size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="block mb-2">Skills</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedSkills.map(skill => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          onDelete={() => toggleSkill(skill)}
                        />
                      ))}
                    </div>
                    <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                      {SKILLS.map(skill => (
                        <div key={skill} className="flex items-center space-x-2 py-1">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <Label
                            htmlFor={`skill-${skill}`}
                            className="text-sm cursor-pointer"
                          >
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                  
                  <div>
                    <Button
                      className="w-full"
                      onClick={updateSearchParams}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="lg:w-3/4">
            <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                </p>
                <Select
                  defaultValue="newest"
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg border shadow-sm text-center">
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find projects.
                </p>
                <Button onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
