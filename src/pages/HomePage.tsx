import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Briefcase, ArrowRight, CheckCircle2, Building2, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { mockJobs } from '../data/mockData';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();
  const featuredJobs = mockJobs.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Find Your Perfect Part-Time Job
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-xl mx-auto lg:mx-0">
                JobNest connects part-time job seekers with employers in a simple and effective way. Start your journey today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/jobs">
                  <Button size="lg" icon={Search}>
                    Browse Jobs
                  </Button>
                </Link>
                {!currentUser && (
                  <Link to="/signup">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      Create Account
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-accent-400 to-secondary-400 opacity-30 blur"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded mb-4">
                    <h3 className="font-medium text-lg mb-2">Popular Job Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/20 p-2 rounded flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="text-sm">Technology</span>
                      </div>
                      <div className="bg-white/20 p-2 rounded flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span className="text-sm">Marketing</span>
                      </div>
                      <div className="bg-white/20 p-2 rounded flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">Customer Support</span>
                      </div>
                      <div className="bg-white/20 p-2 rounded flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        <span className="text-sm">Design</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded">
                    <h3 className="font-medium text-lg mb-2">Latest Opportunity</h3>
                    <div className="mb-3">
                      <h4 className="font-medium">Frontend Developer</h4>
                      <div className="flex items-center text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                    <Link to="/jobs/1" className="flex items-center text-accent-300 hover:text-accent-200 text-sm font-medium">
                      <span>View details</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-white w-full h-auto">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover some of the latest part-time positions from top employers looking for talent like you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover border border-gray-100">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={job.imageUrl || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                    alt={job.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.jobType === 'part-time' ? 'bg-green-100 text-green-800' : 
                      job.jobType === 'full-time' ? 'bg-blue-100 text-blue-800' : 
                      job.jobType === 'contract' ? 'bg-purple-100 text-purple-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {job.jobType.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                  
                  <Link to={`/jobs/${job.id}`}>
                    <Button variant="outline" fullWidth iconPosition="right" icon={ArrowRight}>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/jobs">
              <Button variant="primary" size="lg">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How JobNest Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect job seekers with the perfect opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 rounded-full p-4">
                  <Users className="h-10 w-10 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build your professional profile to showcase your skills and experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 rounded-full p-4">
                  <Search className="h-10 w-10 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Perfect Matches</h3>
              <p className="text-gray-600">
                Browse through our curated list of part-time opportunities that match your skills.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 rounded-full p-4">
                  <Briefcase className="h-10 w-10 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply With Ease</h3>
              <p className="text-gray-600">
                Submit your applications with just a few clicks and track your application status.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from job seekers and employers who've found success with JobNest.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Emily Johnson"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Emily Johnson</h4>
                  <p className="text-sm text-gray-500">Marketing Specialist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "JobNest helped me find a flexible part-time role that perfectly complements my schedule as a graduate student. The process was seamless!"
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Michael Chen"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone looking to gain experience while studying, JobNest connected me with quality opportunities that respected my limited availability."
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah Miller"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Miller</h4>
                  <p className="text-sm text-gray-500">Hiring Manager, TechCorp</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As an employer, JobNest has dramatically simplified our process of finding qualified part-time talent. The quality of applicants is exceptional."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Opportunity?</h2>
              <p className="text-lg text-white/90 max-w-2xl">
                Join thousands of job seekers who have found their perfect part-time positions through JobNest.
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
              <Link to="/jobs">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Browse Jobs
                </Button>
              </Link>
              {!currentUser && (
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;