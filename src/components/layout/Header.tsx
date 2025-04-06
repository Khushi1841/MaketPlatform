
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Menu, X, Mic } from 'lucide-react';

const mockProjects = [
  { id: 1, title: 'E-commerce Website', skills: ['React', 'Node.js', 'MongoDB'] },
  { id: 2, title: 'Mobile App Development', skills: ['React Native', 'Firebase'] },
  { id: 3, title: 'UI/UX Design', skills: ['Figma', 'Adobe XD'] },
];

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(mockProjects);
  const [showResults, setShowResults] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    closeMenu();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = mockProjects.filter(project => 
      project.title.toLowerCase().includes(text.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(text.toLowerCase()))
    );
    setSearchResults(filtered);
    setShowResults(true);
  };

  const handleVoiceSearch = async () => {
    try {
      // First, request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        setIsListening(true);
  
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchText(transcript);
          handleSearch(transcript);
        };
  
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            alert('Please allow microphone access to use voice search');
          }
        };
  
        recognition.onend = () => {
          setIsListening(false);
        };
  
        recognition.start();
      } else {
        alert('Voice search is not supported in your browser');
      }
    } catch (error) {
      console.error('Microphone access error:', error);
      setIsListening(false);
      alert('Please allow microphone access to use voice search');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ProjectMarket
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/projects" className="text-gray-700 hover:text-primary">Projects</Link>
          <Link to="/freelancers" className="text-gray-700 hover:text-primary">Freelancers</Link>
          <Link to="/companies" className="text-gray-700 hover:text-primary">Companies</Link>
          <Link to="/mentorship" className="text-gray-700 hover:text-primary">Mentorship</Link>
          <Link to="/community" className="text-gray-700 hover:text-primary">Community</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-64 search-container">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search projects, skills..."
              className="w-full pl-10 pr-12 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleVoiceSearch}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isListening ? 'text-red-500' : 'text-gray-400'} hover:text-primary transition-colors`}
            >
              <Mic size={18} />
            </button>
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
                {searchResults.map((project) => (
                  <div
                    key={project.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      navigate(`/projects/${project.id}`);
                      setShowResults(false);
                      setSearchText('');
                    }}
                  >
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-500">{project.skills.join(', ')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
              <Button onClick={() => navigate('/register')}>Sign Up</Button>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <div className="relative w-full mb-2 search-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search projects, skills..."
                className="w-full pl-10 pr-12 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isListening ? 'text-red-500' : 'text-gray-400'} hover:text-primary transition-colors`}
              >
                <Mic size={18} />
              </button>
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
                  {searchResults.map((project) => (
                    <div
                      key={project.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => {
                        navigate(`/projects/${project.id}`);
                        setShowResults(false);
                        setSearchText('');
                        closeMenu();
                      }}
                    >
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-gray-500">{project.skills.join(', ')}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <Link to="/projects" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>Projects</Link>
              <Link to="/freelancers" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>Freelancers</Link>
              <Link to="/companies" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>Companies</Link>
              <Link to="/mentorship" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>Mentorship</Link>
              <Link to="/community" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>Community</Link>

              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>Profile</Link>
                  <Link to="/dashboard" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>Dashboard</Link>
                  <Link to="/settings" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>Settings</Link>
                  <button className="py-2 text-left text-gray-700 hover:text-primary" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Button variant="outline" onClick={() => { navigate('/login'); closeMenu(); }}>Login</Button>
                  <Button onClick={() => { navigate('/register'); closeMenu(); }}>Sign Up</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
