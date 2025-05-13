import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Clock, Briefcase, Share2, Bookmark, BookmarkCheck, ChevronLeft, Building2, Users, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import { Job } from '../types';
import { mockJobs } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading job data from an API
    const fetchJob = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundJob = mockJobs.find(job => job.id === id);
      
      if (foundJob) {
        setJob(foundJob);
        
        // Check if job is saved by current user
        if (currentUser?.userType === 'seeker') {
          const seeker = currentUser as any;
          if (seeker.savedJobs && seeker.savedJobs.includes(foundJob.id)) {
            setIsSaved(true);
          }
        }
      }
      
      setLoading(false);
    };

    fetchJob();
  }, [id, currentUser]);

  const toggleSaveJob = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // In a real app, this would make an API call to save/unsave the job
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.userType !== 'seeker') {
      // Show error or redirect to seeker signup
      return;
    }
    
    setIsApplying(true);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-64 bg-gray-200 rounded mb-6"></div>
              </div>
              <div className="md:col-span-1">
                <div className="h-64 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs">
            <Button>Browse All Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/jobs" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to jobs
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-gray-700 mb-4">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-5">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Briefcase className="h-5 w-5 mr-2 text-gray-400" />
                      <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-5 w-5 mr-2 text-gray-400" />
                      <span>Posted {formatDistanceToNow(job.createdAt, { addSuffix: true })}</span>
                    </div>
                  </div>
                  
                  {job.salary && (
                    <div className="mb-5">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.salary}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="hidden md:flex space-x-2">
                  <Button 
                    variant="ghost" 
                    icon={Share2} 
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    title="Copy job link"
                  >
                    Share
                  </Button>
                  <Button 
                    variant={isSaved ? 'primary' : 'ghost'} 
                    icon={isSaved ? BookmarkCheck : Bookmark}
                    size="sm"
                    onClick={toggleSaveJob}
                  >
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-gray-100 my-6"></div>
              
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                <p className="mb-5">{job.description}</p>
                
                <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
                <ul className="list-disc pl-5 mb-5 space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                
                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="list-disc pl-5 mb-5 space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex">
                    <div className="p-2 bg-primary-100 rounded-md">
                      <Building2 className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="p-2 bg-primary-100 rounded-md">
                      <MapPin className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="p-2 bg-primary-100 rounded-md">
                      <Briefcase className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Job Type</p>
                      <p className="font-medium capitalize">{job.jobType.replace('-', ' ')}</p>
                    </div>
                  </div>
                  
                  {job.salary && (
                    <div className="flex">
                      <div className="p-2 bg-primary-100 rounded-md">
                        <Users className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500">Salary</p>
                        <p className="font-medium">{job.salary}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button 
                    fullWidth 
                    size="lg"
                    onClick={handleApply}
                  >
                    Apply Now
                  </Button>
                  
                  <Button 
                    variant={isSaved ? 'primary' : 'outline'} 
                    icon={isSaved ? BookmarkCheck : Bookmark}
                    fullWidth
                    onClick={toggleSaveJob}
                  >
                    {isSaved ? 'Saved' : 'Save Job'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isApplying && (
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-6">Apply for {job.title}</h2>
            
            <div className="max-w-2xl">
              <form className="space-y-6">
                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                    Resume/CV
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex justify-center">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex justify-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter (optional)
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={6}
                    className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Tell the employer why you're a good fit for this position..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mr-3"
                    onClick={() => setIsApplying(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" icon={Send}>
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;