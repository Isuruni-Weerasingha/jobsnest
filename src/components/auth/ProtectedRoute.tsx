import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserType?: 'seeker' | 'provider';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedUserType 
}) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserType && currentUser.userType !== allowedUserType) {
    // Redirect to appropriate dashboard if user type doesn't match
    if (currentUser.userType === 'seeker') {
      return <Navigate to="/seeker-dashboard" replace />;
    } else {
      return <Navigate to="/provider-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;