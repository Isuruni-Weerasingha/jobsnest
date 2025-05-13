import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Page not found</h2>
        <p className="mt-2 text-lg text-gray-600 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" icon={ArrowLeft}>
              Back to Homepage
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline" icon={Search}>
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;