import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import JobListingsPage from './pages/JobListingsPage';
import JobDetailPage from './pages/JobDetailPage';
import SeekerDashboard from './pages/SeekerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import CreateJobPage from './pages/CreateJobPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-primary-600 text-xl font-semibold">Loading JobNest...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="jobs" element={<JobListingsPage />} />
        <Route path="jobs/:id" element={<JobDetailPage />} />
        
        <Route path="seeker-dashboard" element={
          <ProtectedRoute allowedUserType="seeker">
            <SeekerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="provider-dashboard" element={
          <ProtectedRoute allowedUserType="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="create-job" element={
          <ProtectedRoute allowedUserType="provider">
            <CreateJobPage />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;