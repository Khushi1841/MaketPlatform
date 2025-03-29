
import { useState } from 'react';
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
import { Search, User, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ProjectMarket
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/projects" className="text-gray-700 hover:text-primary">
            Projects
          </Link>
          <Link to="/freelancers" className="text-gray-700 hover:text-primary">
            Freelancers
          </Link>
          <Link to="/companies" className="text-gray-700 hover:text-primary">
            Companies
          </Link>
          <Link to="/mentorship" className="text-gray-700 hover:text-primary">
            Mentorship
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects, skills..."
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
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
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <div className="relative w-full mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects, skills..."
                className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <Link to="/projects" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>
              Projects
            </Link>
            <Link to="/freelancers" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>
              Freelancers
            </Link>
            <Link to="/companies" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>
              Companies
            </Link>
            <Link to="/mentorship" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>
              Mentorship
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>
                  Profile
                </Link>
                <Link to="/dashboard" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>
                  Dashboard
                </Link>
                <Link to="/settings" className="py-2 text-gray-700 hover:text-primary" onClick={closeMenu}>
                  Settings
                </Link>
                <button 
                  className="py-2 text-left text-gray-700 hover:text-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="outline" onClick={() => { navigate('/login'); closeMenu(); }}>
                  Login
                </Button>
                <Button onClick={() => { navigate('/register'); closeMenu(); }}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
