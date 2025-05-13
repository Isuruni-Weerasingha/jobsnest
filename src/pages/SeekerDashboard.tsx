import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Briefcase, Clock, MapPin, Building2, BookmarkCheck, History, UserCircle, ChevronDown, Upload, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { mockJobs } from '../data/mockData';
import JobCard from '../components/jobs/JobCard';

const SeekerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Define seeker
  const seeker = currentUser as any;
  
  // Mock saved jobs
  const savedJobs = mockJobs.filter(job => 
    seeker.savedJobs && seeker.savedJobs.includes(job.id)
  );
  
  // Mock application history
  const applicationHistory = mockJobs.slice(0, 2).map(job => ({
    job,
    status: Math.random() > 0.5 ? 'pending' : 'reviewed',
    appliedDate: new Date(2023, 5, 15)
  }));
  
  // Form state for profile editing
  const [formData, setFormData] = useState({
    name: seeker.name || '',
    location: seeker.location || '',
    bio: seeker.bio || '',
    skills: seeker.skills ? seeker.skills.join(', ') : '',
    experience: seeker.experience || '',
    education: seeker.education || ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                  {seeker.photoURL ? (
                    <img 
                      src={seeker.photoURL} 
                      alt={seeker.name} 
                      className="h-16 w-16 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center border-2 border-white">
                      <UserCircle className="h-10 w-10 text-primary-600" />
                    </div>
                  )}
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{seeker.name}</h2>
                    <p className="text-primary-100">{seeker.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <UserCircle className="h-5 w-5 mr-3" />
                  <span>My Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('savedJobs')}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${
                    activeTab === 'savedJobs' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookmarkCheck className="h-5 w-5 mr-3" />
                  <span>Saved Jobs</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${
                    activeTab === 'applications' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <History className="h-5 w-5 mr-3" />
                  <span>Application History</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`w-full flex items-center px-4 py-3 rounded-md text-left text-sm font-medium transition-colors ${
                    activeTab === 'resume' 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  <span>Resume/CV</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
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
                            Full Name
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
                      </div>
                      
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={3}
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="Tell employers about yourself..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                          Skills (comma separated)
                        </label>
                        <input
                          type="text"
                          id="skills"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="JavaScript, React, Marketing, etc."
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            Experience
                          </label>
                          <input
                            type="text"
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g. 2 years"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                            Education
                          </label>
                          <input
                            type="text"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="e.g. Bachelor's in Computer Science"
                          />
                        </div>
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
                        <h2 className="text-sm font-medium text-gray-500">Full Name</h2>
                        <p className="mt-1 text-lg text-gray-900">{seeker.name}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Location</h2>
                        <p className="mt-1 text-lg text-gray-900">{seeker.location}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Email</h2>
                        <p className="mt-1 text-lg text-gray-900">{seeker.email}</p>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Member Since</h2>
                        <p className="mt-1 text-lg text-gray-900">{format(seeker.createdAt, 'MMMM yyyy')}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">Bio</h2>
                      <p className="mt-1 text-gray-900">{seeker.bio || "No bio provided yet."}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Skills</h2>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {seeker.skills && seeker.skills.length > 0 ? (
                            seeker.skills.map((skill: string, index: number) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500">No skills listed yet.</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-sm font-medium text-gray-500">Experience</h2>
                        <p className="mt-1 text-gray-900">{seeker.experience || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">Education</h2>
                      <p className="mt-1 text-gray-900">{seeker.education || "Not specified"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Saved Jobs Tab */}
            {activeTab === 'savedJobs' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Saved Jobs</h1>
                  <p className="text-gray-600 mb-4">Jobs you've bookmarked for later.</p>
                </div>
                
                {savedJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedJobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <BookmarkCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
                    <p className="text-gray-500 mb-4">
                      Browse jobs and click the save button to add them to your saved jobs list.
                    </p>
                    <Link to="/jobs">
                      <Button variant="outline">
                        Browse Jobs
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Application History</h1>
                  <p className="text-gray-600 mb-4">Track the status of your job applications.</p>
                </div>
                
                {applicationHistory.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      {applicationHistory.map((application, index) => (
                        <li key={index} className="p-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{application.job.title}</h3>
                              <p className="text-gray-600">{application.job.company}</p>
                              
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                <span>{application.job.location}</span>
                              </div>
                              
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                <span>Applied {format(application.appliedDate, 'MMM d, yyyy')}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 flex items-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                application.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : application.status === 'reviewed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : application.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </span>
                              
                              <div className="ml-4">
                                <Link to={`/jobs/${application.job.id}`}>
                                  <Button size="sm" variant="ghost">
                                    View Job
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-500 mb-4">
                      When you apply for jobs, they will appear here so you can track their status.
                    </p>
                    <Link to="/jobs">
                      <Button variant="outline">
                        Find Jobs to Apply
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Resume Tab */}
            {activeTab === 'resume' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Resume / CV</h1>
                  <p className="text-gray-600 mb-4">Upload and manage your resume for job applications.</p>
                  
                  {seeker.resumeURL ? (
                    <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-primary-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">My Resume.pdf</p>
                          <p className="text-sm text-gray-500">Uploaded on May 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Replace
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No resume uploaded yet</h3>
                      <p className="text-gray-500 mb-4">
                        Upload your resume to easily apply for jobs. We support PDF, DOC, and DOCX formats.
                      </p>
                      <Button>
                        Upload Resume
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;