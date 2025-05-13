import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { LogIn, Briefcase } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'seeker' | 'provider'>('seeker');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // In a real app, this would send a request to the backend
      if (userType === 'seeker') {
        if (email !== 'alex@example.com') {
          throw new Error('Invalid credentials. For demo, use alex@example.com with any password.');
        }
      } else {
        if (email !== 'sarah@techcorp.com') {
          throw new Error('Invalid credentials. For demo, use sarah@techcorp.com with any password.');
        }
      }

      await login(email, password, userType);
      
      // Redirect based on user type
      if (userType === 'seeker') {
        navigate('/seeker-dashboard');
      } else {
        navigate('/provider-dashboard');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - prefill login credentials
  const fillDemoCredentials = (type: 'seeker' | 'provider') => {
    if (type === 'seeker') {
      setEmail('alex@example.com');
      setPassword('password');
      setUserType('seeker');
    } else {
      setEmail('sarah@techcorp.com');
      setPassword('password');
      setUserType('provider');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Briefcase className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Log in to JobNest
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex space-x-4">
              <div 
                className={`flex-1 text-center py-2 px-4 rounded-md cursor-pointer transition-colors ${
                  userType === 'seeker' 
                    ? 'bg-primary-100 text-primary-800 font-medium' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setUserType('seeker')}
              >
                Job Seeker
              </div>
              <div 
                className={`flex-1 text-center py-2 px-4 rounded-md cursor-pointer transition-colors ${
                  userType === 'provider' 
                    ? 'bg-primary-100 text-primary-800 font-medium' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setUserType('provider')}
              >
                Job Provider
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                fullWidth
                size="lg"
                icon={LogIn}
                isLoading={isLoading}
              >
                Log in
              </Button>
            </div>
            
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo accounts</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={() => fillDemoCredentials('seeker')}
                >
                  Job Seeker Demo
                </button>
                <button
                  type="button"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={() => fillDemoCredentials('provider')}
                >
                  Provider Demo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;