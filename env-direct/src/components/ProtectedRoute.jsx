import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated: userAuth, loading: userLoading } = useAuth();
  const { isAuthenticated: adminAuth, loading: adminLoading, isAdmin } = useAdminAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (userLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  // If admin access is required
  if (requireAdmin) {
    if (!adminAuth || !isAdmin()) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return children;
  }

  // For regular user routes
  if (!userAuth) {
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
