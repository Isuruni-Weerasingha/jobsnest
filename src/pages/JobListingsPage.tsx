import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';
import Button from '../components/ui/Button';
import JobGrid from '../components/jobs/JobGrid';
import { Job } from '../types';
import { mockJobs } from '../data/mockData';

const JobListingsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate loading jobs from an API
    const fetchJobs = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, location, jobType, jobs]);

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (jobType) {
      filtered = filtered.filter(job => job.jobType === jobType);
    }

    setFilteredJobs(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterJobs();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setLocation('');
    setJobType('');
    setFilteredJobs(jobs);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="bg-primary-700 text-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Part-Time Job</h1>
            <p className="text-lg text-white/90 max-w-xl mx-auto mb-8">
              Browse through hundreds of part-time opportunities that match your skills and schedule.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Job title, company, or keywords"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                />
              </div>

              <Button type="submit">
                Search
              </Button>

              <Button
                type="button"
                variant="outline"
                icon={Filter}
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                Filters
              </Button>
            </form>

            {showFilters && (
              <div className="mt-4 md:hidden">
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-3">Job Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value=""
                        checked={jobType === ''}
                        onChange={() => setJobType('')}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">All Types</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="full-time"
                        checked={jobType === 'full-time'}
                        onChange={() => setJobType('full-time')}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="part-time"
                        checked={jobType === 'part-time'}
                        onChange={() => setJobType('part-time')}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">Part-time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="contract"
                        checked={jobType === 'contract'}
                        onChange={() => setJobType('contract')}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">Contract</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="internship"
                        checked={jobType === 'internship'}
                        onChange={() => setJobType('internship')}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">Internship</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="font-medium text-lg text-gray-900 mb-3">Filters</h3>
              {(searchTerm || location || jobType) && (
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Active filters</span>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Job Type</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value=""
                    checked={jobType === ''}
                    onChange={() => setJobType('')}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">All Types</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value="full-time"
                    checked={jobType === 'full-time'}
                    onChange={() => setJobType('full-time')}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Full-time</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value="part-time"
                    checked={jobType === 'part-time'}
                    onChange={() => setJobType('part-time')}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Part-time</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value="contract"
                    checked={jobType === 'contract'}
                    onChange={() => setJobType('contract')}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Contract</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value="internship"
                    checked={jobType === 'internship'}
                    onChange={() => setJobType('internship')}
                    className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Internship</span>
                </label>
              </div>
            </div>

            {/* Additional filters can be added here */}
          </div>

          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isLoading
                      ? 'Loading jobs...'
                      : `${filteredJobs.length} ${
                          filteredJobs.length === 1 ? 'Job' : 'Jobs'
                        } Found`}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Browse and find the perfect opportunity
                  </p>
                </div>
                {/* Additional sorting options can be added here */}
              </div>
            </div>

            <JobGrid jobs={filteredJobs} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;