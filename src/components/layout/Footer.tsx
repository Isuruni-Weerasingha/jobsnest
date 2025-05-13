import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Briefcase className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-700">JobNest</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Connecting part-time job seekers with opportunities that matter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              For Job Seekers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-primary-600 text-sm">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-primary-600 text-sm">
                  Create Account
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Job Alerts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Career Resources
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              For Employers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/create-job" className="text-gray-600 hover:text-primary-600 text-sm">
                  Post a Job
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Recruitment Tools
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JobNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;