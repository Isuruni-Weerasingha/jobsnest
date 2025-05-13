import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Plus, Users, Briefcase, Building2, UserCircle, FileText, Edit, Trash2, ChevronDown, Eye, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { mockJobs } from '../data/mockData';

const ProviderDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [isEditing, setIsEditing] = useState(false);
  
  // Define provider
  const provider = currentUser as any;
  
  // Mock posted jobs
  const postedJobs = mockJobs.filter(job => 
    provider.postedJobs && provider.postedJobs.includes(job.id)
  );
  
  // Mock applicants for demo
  const applicants = [
    {
      id: 'app1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      jobId: postedJobs[0]?.id || '1',
      jobTitle: postedJobs[0]?.title || 'Frontend Developer',
      appliedDate: new Date(2023, 5, 15),
      status: 'pending',
      resumeURL: '#'
    },
    {
      id: 'app2',
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      jobId: postedJobs[0]?.id || '1',
      jobTitle: postedJobs[0]?.title || 'Frontend Developer',
      appliedDate: new Date(2023, 5, 16),
      status: 'reviewed',
      resumeURL: '#'
    }
  ];
  
  // Form state for profile editing
  const [formData, setFormData] = useState({
    name: provider.name || '',
    companyName: provider.companyName || '',
    industry: provider.industry || '',
    companySize: provider.companySize || '',
    location: provider.location || '',
    website: provider.website || '',
    description: provider.description || ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the profile
    // For demo, we'll just toggle the edit mode
    setIsEditing(false);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 bg-primary-600 text-white">
                <div className="flex items-center mb-4">
                  {provider.photoURL ? (
                    <img 
                      src={provider.photoURL} 
                      alt={provider.name} 
                      className="h-16 w-16 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center border-2 border-white">
                      <Building2 className="h-10 w-10 text-primary-600" />
                    </div>
                  )}
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{provider.companyName}</h2>
                    <p className="text-primary-100">{provider.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${
                    activeTab === 'jobs' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Briefcase className="h-5 w-5 mr-3" />
                  <span>Posted Jobs</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('applicants')}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${
                    activeTab === 'applicants' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Users className="h-5 w-5 mr-3" />
                  <span>Applicants</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Building2 className="h-5 w-5 mr-3" />
                  <span>Company Profile</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Posted Jobs</h1>
                    <Link to="/create-job">
                      <Button icon={Plus}>
                        Post New Job
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {postedJobs.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      {postedJobs.map(job => (
                        <li key={job.id} className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  job.jobType === 'full-time' ? 'bg-blue-100 text-blue-800' :
                                  job.jobType === 'part-time' ? 'bg-green-100 text-green-800' :
                                  job.jobType === 'contract' ? 'bg-purple-100 text-purple-800' :
                                  'bg-orange-100 text-orange-800'
                                }`}>
                                  {job.jobType.replace('-', ' ')}
                                </span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                </span>
                              </div>
                              
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                                <span>{job.applicants.length} {job.applicants.length === 1 ? 'applicant' : 'applicants'}</span>
                              </div>
                              
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <span>Posted {format(job.createdAt, 'MMM d, yyyy')}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-2">
                              <Link to={`/jobs/${job.id}`}>
                                <Button size="sm" variant="ghost" icon={Eye}>
                                  View
                                </Button>
                              </Link>
                              <Button size="sm" variant="ghost" icon={Edit}>
                                Edit
                              </Button>
                              <Button size="sm" variant="ghost" icon={Trash2} className="text-error-600 hover:text-error-700 hover:bg-error-50">
                                Delete
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
                    <p className="text-gray-500 mb-4">
                      Create your first job posting to start receiving applications.
                    </p>
                    <Link to="/create-job">
                      <Button icon={Plus}>
                        Post a Job
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Applicants Tab */}
            {activeTab === 'applicants' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Applicants</h1>
                  <p className="text-gray-600">Manage and review job applications.</p>
                </div>
                
                {applicants.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      {applicants.map(applicant => (
                        <li key={applicant.id} className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                              <p className="text-gray-600">{applicant.email}</p>
                              
                              <div className="mt-2">
                                <span className="text-sm text-gray-500">Applied for: </span>
                                <span className="font-medium">{applicant.jobTitle}</span>
                              </div>
                              
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <span>Applied on {format(applicant.appliedDate, 'MMM d, yyyy')}</span>
                              </div>
                              
                              <div className="mt-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  applicant.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : applicant.status === 'reviewed'
                                    ? 'bg-blue-100 text-blue-800'
                                    : applicant.status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-2">
                              <Button size="sm" variant="outline" icon={FileText}>
                                View Resume
                              </Button>
                              <Button size="sm" variant="outline" icon={CheckCircle} className="text-success-600 hover:text-success-700 hover:border-success-500">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline" icon={XCircle} className="text-error-600 hover:text-error-700 hover:border-error-500">
                                Reject
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants yet</h3>
                    <p className="text-gray-500 mb-4">
                      Once job seekers apply to your postings, they will appear here for review.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
                  {!isEditing && (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Person Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                            Industry
                          </label>
                          <input
                            type="text"
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Size
                          </label>
                          <select
                            id="companySize"
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleInputChange}
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
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Website
                        </label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="https://example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Company Name</h2>
                        <p className="mt-1 text-lg text-gray-900">{provider.companyName}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Contact Person</h2>
                        <p className="mt-1 text-lg text-gray-900">{provider.name}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Industry</h2>
                        <p className="mt-1 text-lg text-gray-900">{provider.industry}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Company Size</h2>
                        <p className="mt-1 text-lg text-gray-900">{provider.companySize} employees</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Location</h2>
                        <p className="mt-1 text-lg text-gray-900">{provider.location}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Email</h2>
                        <p className="mt-1 text-lg text-gray-900">{provider.email}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Website</h2>
                        <p className="mt-1 text-lg text-gray-900">
                          {provider.website ? (
                            <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 hover:underline">
                              {provider.website.replace(/^https?:\/\//, '')}
                            </a>
                          ) : (
                            "Not provided"
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Member Since</h2>
                        <p className="mt-1 text-lg text-gray-900">{format(provider.createdAt, 'MMMM yyyy')}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">Company Description</h2>
                      <p className="mt-1 text-gray-900 whitespace-pre-line">{provider.description}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;