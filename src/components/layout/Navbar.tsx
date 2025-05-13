import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Briefcase, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-700">JobNest</span>
            </Link>
            
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/jobs" className="border-transparent text-gray-600 hover:text-primary-600 hover:border-primary-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Browse Jobs
              </Link>
              
              {currentUser?.userType === 'provider' && (
                <Link to="/create-job" className="border-transparent text-gray-600 hover:text-primary-600 hover:border-primary-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                  Post a Job
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={toggleProfile}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt={currentUser.name} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link 
                        to={currentUser.userType === 'seeker' ? '/seeker-dashboard' : '/provider-dashboard'} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-primary-600 hover:text-primary-700 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 animate-slide-down">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/jobs"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Jobs
            </Link>
            
            {currentUser?.userType === 'provider' && (
              <Link
                to="/create-job"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Post a Job
              </Link>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {currentUser ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt={currentUser.name} 
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to={currentUser.userType === 'seeker' ? '/seeker-dashboard' : '/provider-dashboard'}
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <LogOut className="mr-2 h-5 w-5" />
                      Sign out
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-4">
                <Link
                  to="/login"
                  className="block mb-2 text-primary-600 hover:text-primary-700 px-4 py-2 text-base font-medium hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;