import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden h-full">
        <div className="relative h-36 overflow-hidden">
          <img
            src={job.imageUrl || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
            alt={job.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="mb-3">
            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
              job.jobType === 'full-time' ? 'bg-blue-100 text-blue-800' :
              job.jobType === 'part-time' ? 'bg-green-100 text-green-800' :
              job.jobType === 'contract' ? 'bg-purple-100 text-purple-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {job.jobType.replace('-', ' ')}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{job.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{job.company}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span>{job.location}</span>
            </div>
            {job.salary && (
              <div className="flex items-center text-sm text-gray-500">
                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                <span>{job.salary}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>{formatDistanceToNow(job.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              {job.applicants.length} {job.applicants.length === 1 ? 'applicant' : 'applicants'}
            </p>
            <span className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;