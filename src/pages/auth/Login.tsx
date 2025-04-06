
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Use the role from the mock data based on email
      if (email === 'john@example.com') {
        navigate('/dashboard/student');
      } else if (email === 'jane@example.com') {
        navigate('/dashboard/freelancer');
      } else if (email === 'info@techinnovations.com') {
        navigate('/dashboard/company');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const getDemoCredentials = () => {
    return [
      {
        role: 'Student',
        email: 'john@example.com',
        description: 'Access student learning dashboard'
      },
      {
        role: 'Freelancer',
        email: 'jane@example.com',
        description: 'Access freelancer project dashboard'
      },
      {
        role: 'Company',
        email: 'info@techinnovations.com',
        description: 'Access company recruitment dashboard'
      }
    ];
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                {error && <p className="text-sm text-destructive">{error}</p>}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                
                <div className="text-center text-sm">
                  <p className="font-medium mb-2">Demo Accounts:</p>
                  <div className="space-y-2 text-muted-foreground">
                    {getDemoCredentials().map((cred) => (
                      <div 
                        key={cred.role} 
                        className="p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted"
                        onClick={() => setEmail(cred.email)}
                      >
                        <p className="font-medium text-primary">{cred.role}</p>
                        <p className="text-xs">{cred.email}</p>
                        <p className="text-xs text-muted-foreground">{cred.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">(Any password will work)</p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
