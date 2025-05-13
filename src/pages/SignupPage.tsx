import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { UserPlus, Briefcase } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'seeker' | 'provider'>('seeker');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  
  // Seeker-specific fields
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  
  // Provider-specific fields
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Additional validation can be added here
    
    setIsLoading(true);
    
    try {
      // Prepare user data based on type
      if (userType === 'seeker') {
        const seekerData = {
          name,
          email,
          userType,
          location,
          skills: skills.split(',').map(skill => skill.trim()),
          experience,
          education,
          bio: '',
          savedJobs: [],
          appliedJobs: []
        };
        
        await signup(seekerData, password);
        navigate('/seeker-dashboard');
      } else {
        const providerData = {
          name,
          email,
          userType,
          companyName,
          industry,
          companySize,
          location,
          website,
          description,
          postedJobs: []
        };
        
        await signup(providerData, password);
        navigate('/provider-dashboard');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate first step
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Briefcase className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Create your JobNest account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Account Type Selection */}
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

          {/* Step indicator */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className={`flex-1 border-t-2 ${step >= 1 ? 'border-primary-500' : 'border-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>1</div>
              <div className={`flex-1 border-t-2 ${step >= 2 ? 'border-primary-500' : 'border-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>2</div>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Account</span>
              <span className="text-xs text-gray-500">Profile</span>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={step === 1 ? goToNextStep : handleSubmit}>
            {/* Step 1: Basic Account Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

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
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Profile Information */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="mt-1">
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                {userType === 'seeker' ? (
                  <>
                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                        Skills (comma separated)
                      </label>
                      <div className="mt-1">
                        <input
                          id="skills"
                          name="skills"
                          type="text"
                          value={skills}
                          onChange={(e) => setSkills(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="JavaScript, React, Marketing, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                        Years of Experience
                      </label>
                      <div className="mt-1">
                        <input
                          id="experience"
                          name="experience"
                          type="text"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="e.g. 2 years"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                        Education
                      </label>
                      <div className="mt-1">
                        <input
                          id="education"
                          name="education"
                          type="text"
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="e.g. Bachelor's in Computer Science"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                        Industry
                      </label>
                      <div className="mt-1">
                        <input
                          id="industry"
                          name="industry"
                          type="text"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="e.g. Technology, Healthcare"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                        Company Size
                      </label>
                      <div className="mt-1">
                        <select
                          id="companySize"
                          name="companySize"
                          value={companySize}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option value="">Select company size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Company Website (optional)
                      </label>
                      <div className="mt-1">
                        <input
                          id="website"
                          name="website"
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Company Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="Tell us about your company..."
                        ></textarea>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    icon={UserPlus}
                    isLoading={isLoading}
                    className="flex-1"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;