import React from 'react';
import { Job } from '../../types';
import JobCard from './JobCard';
import { SearchX } from 'lucide-react';

interface JobGridProps {
  jobs: Job[];
  isLoading?: boolean;
}

const JobGrid: React.FC<JobGridProps> = ({ jobs, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-card animate-pulse h-[350px]">
            <div className="h-36 bg-gray-200"></div>
            <div className="p-5">
              <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/5"></div>
              </div>
              <div className="h-[1px] bg-gray-200 mb-3"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <SearchX className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any jobs matching your search criteria. Try adjusting your filters or check back later for new opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobGrid;